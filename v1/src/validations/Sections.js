const Joi = require("joi");

const createValidation = Joi.object({
    name : Joi.string().required().min(5),
    project : Joi.string().required().min(8)
});
const updateValidation = Joi.object({
    name : Joi.string().min(5),
    project : Joi.string().min(8)
});

module.exports = {
    createValidation,
    updateValidation,
};