const {insert, modify, list, remove, findOne } = require("../services/Tasks");
const httpStatus = require("http-status");

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

module.exports = {
    create,
    index,
    update,
    deleteTask,
    makeComment,
};