const {insert, modify, list, remove, findOne } = require("../services/Tasks");
const httpStatus = require("http-status");
const Mongoose = require("mongoose");

const index = (req, res) => {
    if(!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({ error : "Task bilgisi eksik !" })
    list({ project_id : req.params.projectId }).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};
const create = (req, res) => {
    req.body.user_id = req.user;
    insert(req.body).then(response => {
        res.status(httpStatus.CREATED).send(response);
    }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const update = (req, res) => {
    if(!req.params?.id){
      return res.status(httpStatus.BAD_REQUEST).send({
          message : "ID bilgisi eksik !",
      });
    };
    modify(req.body, req.params?.id).then(updatedTask => {
        res.status(httpStatus.OK).send(updatedTask)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu."}));
};

const deleteTask = (req, res) => {
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "ID bilgisi eksik !"
        });
    };
    remove(req.params?.id).then((deletedSection) => {
        if(!deletedSection) {
            return res.status(httpStatus.NOT_FOUND).send({
                message : "Bu ID değerine sahip kayıt bulunmamaktadır. !"
            });
        };
        res.status(httpStatus.OK).send({ message : "Belirtilen task silinmiştir"});
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Task silinirken bir sorunla karşılaşıldı."}));
};

const makeComment = (req, res) => {
    findOne({ _id : req.params.id })
    .then(mainTask => {
        if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message : "Böyle bir kayıt bulunmamaktadır." })
        const comment = {
            ...req.body,
            commented_at : new Date(),
            user_id : req.user,
        };
        mainTask.comments.push(comment);
        mainTask.save().then(updatedDoc => {
            return res.status(httpStatus.OK).send(updatedDoc);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu." }));
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu." }));
};

const deleteComment = (req, res) => {
    findOne({ _id : req.params.id })
    .then(mainTask => {
        if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message : "Böyle bir kayıt bulunmamaktadır." });
        mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() !== req.params.commentId);
        mainTask.save().then(updatedDoc => {
            return res.status(httpStatus.OK).send(updatedDoc);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu." }));
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu." }));
};

const addSubTask = (req, res) => {
    //! 1 MainTask çekilir
    if(!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message : "ID Bilgisi eksik !" });
    findOne({ _id : req.params.id })
    .then((mainTask) => {
        if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message : "Böyle bir kayıt bulunmamaktadır." })
        //! 2 SubTask create
        // req.body.user_id = req.user;
        insert({...req.body, user_id : req.user}).then((subTask) => {
            //! 3 SubTask refaransı MainTask üzerinde göster ve update et
            mainTask.sub_tasks.push(subTask)
            mainTask.save().then(updatedDoc => {
                return res.status(httpStatus.OK).send(updatedDoc);
            }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu." }));
        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu." }));
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu." }));
    //! 4 Kullanıcıya yeni döküman
};

// Belirli bir task, bu taskin subTask'leri ve commentlerini bir arada getirir
const fetchTask = (req, res) => {
    if(!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message : "ID Bilgisi eksik !" });
    findOne({ _id : req.params.id }, true).then((task) => {
        if(!task) return res.status(httpStatus.NOT_FOUND).send({ message : "Böyle bir kayıt bulunmamaktadır." });
        res.status(httpStatus.OK).send(task);
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}


module.exports = {
    create,
    index,
    update,
    deleteTask,
    makeComment,
    deleteComment,
    addSubTask,
    fetchTask,
};