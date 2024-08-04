const Joi = require('joi');

const customerSchema = Joi.object({
    name: Joi.string().required(),
    gender: Joi.string(),
    age: Joi.number().integer().required(),
    identification: Joi.number().integer().required(),
    address: Joi.string(),
    cellphone: Joi.string(),
    password: Joi.string().required(),
    status: Joi.boolean().default(true),
});

const validateCustomerBody = (data) => customerSchema.validate(data);

module.exports = {
    validateCustomerBody
}