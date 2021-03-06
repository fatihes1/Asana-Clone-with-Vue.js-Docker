const httpStatus = require("http-status");

const ProjectService = require("../services/ProjectService");
// const ProjectService = new Service();

const index = (req, res) => {
    ProjectService.list().then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};
const create = (req, res) => {
    req.body.user_id = req.user;
    ProjectService.create(req.body).then(response => {
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
    ProjectService.update(req.params?.id, req.body).then(updatedProject => {
        res.status(httpStatus.OK).send(updatedProject)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu."}));
};
const deleteProject = (req, res) => {
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "ID bilgisi eksik !"
        });
    };
    ProjectService.delete(req.params?.id).then((deletedProject) => {
        if(!deletedProject) {
            return res.status(httpStatus.NOT_FOUND).send({
                message : "Bu ID değerine sahip kayıt bulunmamaktadır. !"
            });
        };
        res.status(httpStatus.OK).send({ message : "Belirtilen proje silinmiştir"});
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Proje silinirken bir sorunla karşılaşıldı."}));
};
module.exports = {
    create,
    index,
    update,
    deleteProject,
};