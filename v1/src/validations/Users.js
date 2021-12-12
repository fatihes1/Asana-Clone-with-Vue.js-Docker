const Joi = require("joi");

const createValidation = Joi.object({
    full_name : Joi.string().required().min(3),
    password : Joi.string().required().min(8),
    email : Joi.string().email().required().min(8),

});

const loginValidation = Joi.object({
    password : Joi.string().required().min(8),
    email : Joi.string().email().required().min(8),
});

const resetPasswordValidation = Joi.object({
    email : Joi.string().email().required().min(8),
});

const updateUserValidation = Joi.object({
    full_name : Joi.string().min(3),
    email : Joi.string().email().min(8),
});

module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
    updateUserValidation,
};