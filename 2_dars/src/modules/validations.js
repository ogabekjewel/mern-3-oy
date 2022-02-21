const Joi = require("joi")

module.exports = class Validations {
    static SignUpValidation(data) {
        return Joi.object({
            full_name: Joi.string().min(3).max(50).required(),
            username: Joi.string().min(3).max(50).required(),
            email: Joi.string().required(),
            password: Joi.string().min(3).required(),
        }).validateAsync(data)
    }

    static LoginValidation(data) {
        return Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(3).required(),
        }).validateAsync(data)
    } 
}