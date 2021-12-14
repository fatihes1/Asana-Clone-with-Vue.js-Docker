const Joi = require("joi");

const createValidation = Joi.object({
    name : Joi.string().required().min(3),
    project_id : Joi.string().required().min(8)
});
const updateValidation = Joi.object({
    name : Joi.string().min(3),
    project_id : Joi.string().min(8)
});

module.exports = {
    createValidation,
    updateValidation,
};