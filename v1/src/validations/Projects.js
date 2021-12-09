const Joi = require("joi");

const createValidation = Joi.object({
    name : Joi.string().required().min(5)
});
const updateValidation = Joi.object({
    name : Joi.string().required().min(5)
});

module.exports = {
    createValidation,
    updateValidation,
};