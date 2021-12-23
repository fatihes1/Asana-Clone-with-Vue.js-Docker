const httpStatus = require("http-status");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper");
const uuid = require("uuid");
const eventEmitter = require("../scripts/events/eventEmitter");
const path = require("path");
const UserService = require("../services/UserService");
// const UserService = new Service();
const ProjectService = require("../services/ProjectService");
// const ProjectService = new projectService();


class User {
    index (req, res) {
        UserService.list()
        .then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        });
    }

    create (req, res) {
        req.body.password = passwordToHash(req.body.password);
        UserService.create(req.body)
            .then(response => {
                res.status(httpStatus.CREATED).send(response);
            })
            .catch((e) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
            });
    }
    
    login (req, res) {
        req.body.password = passwordToHash(req.body.password);
        UserService.findOne(req.body)
            .then(user => {
                if (!user) return res.status(httpStatus.NOT_FOUND).send({
                    message: "Böyle bir kullanıcı bulunamadı."
                });
                user = {
                    ...user.toObject(),
                    tokens: {
                        access_token: generateAccessToken(user),
                        refresh_token: generateRefreshToken(user),
                    },
                };
                delete user.password;
                res.status(httpStatus.OK).send(user);
            })
            .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
    }
    
    
    projectList (req, res) {
        ProjectService.list({
            user_id: req.user?._id
        }).then(projects => {
            res.status(httpStatus.OK).send(projects)
        }).catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            error: "Projeleri getirirken beklenmedik bir hata oluştu."
        }));
    }
    
    resetPassword (req, res) {
        const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
        UserService.updateWhere({ email : req.body.email }, { password : passwordToHash(new_password) })
        .then((updatedUser) => {
            if(!updatedUser) {
                return res.status(httpStatus.NOT_FOUND).send({ error : 'Böyle bir kullanıcı bulunamadı !'});
            };
            eventEmitter.emit("send_email", {
                to: updatedUser.email, // list of receivers
                subject: "Şifre Sıfırlama", // Subject line
                html: `Talebiniz üzerine şifre sıfırlama işleminiz gerçekleşmiştir. <br /> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayınız ! <br /> Yeni şifreniz : <b>${new_password}</b>`, // html body
            });
            res.status(httpStatus.OK).send({
                message : "Şifre sıfırlama işlemi için sisteme kayıtlı olan e-posta adresinizi kontrol ediniz."
            });
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Şifre sıfırlama işlemi sırasında bir sorunla karşılaşıldı !" }));
    }
    
    update (req, res) {
        UserService.update({ _id : req.user?._id }, req.body)
        .then(updatedUser => {
            res.status(httpStatus.OK).send(updatedUser);
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Güncelleme işlemi sırasında bir problem oluştu !"}));
    }
    
    deleteUser (req, res) {
        if(!req.params?.id){
            return res.status(httpStatus.BAD_REQUEST).send({
                message : "ID bilgisi eksik !"
            });
        };
        UserService.delete(req.params?.id).then((deletedUser) => {
            if(!deletedUser) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message : "Bu ID değerine sahip kullanıcı bulunmamaktadır. !"
                });
            };
            res.status(httpStatus.OK).send({ message : "Belirtilen kullanıcı silinmiştir"});
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kullanıcı silinirken bir sorunla karşılaşıldı."}));
    }
    
    changePassword (req, res) {
        req.body.password = passwordToHash(req.body.password);
        //! UI geldikten sonra şifre karşılaştırmalarına ilişkin kurallar eklenebilir.
        UserService.update({ _id : req.user?._id }, req.body)
        .then(updatedUser => {
            res.status(httpStatus.OK).send(updatedUser);
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Güncelleme işlemi sırasında bir problem oluştu !"}));
    }
    
    updateProfileImage (req, res) {
        //! 1 - Resim kontrolü
        if(!req?.files?.profile_image) {
            return res.status(httpStatus.BAD_REQUEST).send({ error : "Bu işlemi yapabilmek için yeterli veriye sahip değilsiniz!" });
        }
        //! 2 - Upload işlemi
        const extension = path.extname(req.files.profile_image.name);
        const fileName = `${req?.user._id}${extension}`;
        const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
        req.files.profile_image.mv(folderPath, function (err) {
            if(err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : err });
            UserService.update(req.user._id, { profile_image: fileName })
            .then(updatedUser => {
                res.status(httpStatus.OK).send(updatedUser);
            })
            .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Upload Başarılı, ancak kayıt sırasında sorun oluştu." }));
        });
        //! 3 - DB save
        //! 4 - Response
    }
}

module.exports = new User();

