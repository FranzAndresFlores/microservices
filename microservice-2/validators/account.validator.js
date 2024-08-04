const Joi = require('joi');

const accountSchema = Joi.object({
    number: Joi.string().required(),
    type: Joi.string().required(),
    balance: Joi.number().required(),
    status: Joi.boolean(),
    customerId: Joi.number().required()
});

const validateAccount = (data) => accountSchema.validate(data);

module.exports = {
    validateAccount
}