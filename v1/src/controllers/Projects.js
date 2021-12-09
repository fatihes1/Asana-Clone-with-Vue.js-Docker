const {insert, modify, list } = require("../services/Projects");
const httpStatus = require("http-status");

const index = (req, res) => {
    list().then(response => {
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
    modify(req.body, req.params?.id).then(updatedPRoject => {
        res.status(httpStatus.OK).send(updatedPRoject)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Kayıt sırasında bir problem oluştu."}));
};
module.exports = {
    create,
    index,
    update,
};