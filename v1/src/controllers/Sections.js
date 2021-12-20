const httpStatus = require("http-status");

const Service = require("../services/Sections");
const SectionService = new Service();

const index = (req, res) => {
    if(!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({ error : "PRoje bilgisi eksik !" })
    SectionService.list({ project_id : req.params.projectId }).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};
const create = (req, res) => {
    req.body.user_id = req.user;
    SectionService.create(req.body).then(response => {
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
    SectionService.update(req.params?.id, req.body).then(updatedSection => {
        res.status(httpStatus.OK).send(updatedSection)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu."}));
};
const deleteSection = (req, res) => {
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "ID bilgisi eksik !"
        });
    };
    SectionService.delete(req.params?.id).then((deletedSection) => {
        if(!deletedSection) {
            return res.status(httpStatus.NOT_FOUND).send({
                message : "Bu ID değerine sahip kayıt bulunmamaktadır. !"
            });
        };
        res.status(httpStatus.OK).send({ message : "Belirtilen sections silinmiştir"});
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Section silinirken bir sorunla karşılaşıldı."}));
};

module.exports = {
    create,
    index,
    update,
    deleteSection,
};