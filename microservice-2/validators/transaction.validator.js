const Joi = require('joi');

const transactionSchema = Joi.object({
    date: Joi.date().required().iso(),
    type: Joi.string(),
    value: Joi.number().precision(2).required(),
    accountId: Joi.number().required()
});
const validateTransaction = (data) => transactionSchema.validate(data);

const paramsTransactionSchema = Joi.object({
    startDate: Joi.date().required().iso(),
    endDate: Joi.date().required().iso(),
    customerId: Joi.number().required()
});
const validateParamsTransaction = (data) => paramsTransactionSchema.validate(data);

module.exports = {
    validateTransaction,
    validateParamsTransaction
}