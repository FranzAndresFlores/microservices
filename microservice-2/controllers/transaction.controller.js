'use strict'

const { Op } = require('sequelize');
const HttpCustomer = require('../common/http-customer');
const { Transaction, Account } = require('../database');
const { validateTransaction, validateParamsTransaction } = require('../validators/transaction.validator');
const TransactionController = {};

TransactionController.create = async (req, res) => {
    try {
        const validate = validateTransaction(req.body);
        if (validate.error) {
            return res.status(400).send(validate.error.details);
        }

        const account = await Account.findOne({ where: { id: req.body.accountId } });
        if (!account) {
            return res.status(400).send({ message: 'No existe la cuenta con la que se desea asociar' });
        }

        const value = req.body.value;
        const balance = (req.body.value <= 0) ? account.balance - (value * (-1)) : account.balance + value;
        if (balance < 0) {
            return res.status(400).send({ message: 'Saldo no disponible' });
        }

        const transaction = await Transaction.create({ ...req.body, balance_initial: account.balance, balance: balance });
        await Account.update({ balance: balance }, { where: { id: req.body.accountId } });

        return res.status(200).send(transaction);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al crear movimiento' });
    }
}

TransactionController.findAllByAccount = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            accountId: req.params.id
        });

        return res.status(200).send(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al obtener movimientos de la cuenta' });
    }
}

TransactionController.update = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ where: { id: req.params.id } });
        if (!transaction) {
            return res.status(404).send({ message: 'No se encontró el movimiento a actualizar' });
        }

        await Transaction.update({ ...req.body }, {
            where: {
                id: req.params.id
            }
        });

        return res.status(200).send({ message: 'Se ha actualizado el movimiento correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error al actualizar el movimiento' });
    }
}

TransactionController.remove = async (req, res) => {
    try {
        await Transaction.destroy({
            where: { id: req.params.id }
        });

        return res.status(200).send({ message: 'Se ha eliminado el movimiento correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error al eliminar el movimiento' });
    }
}

TransactionController.report = async (req, res) => {
    try {
        const validate = validateParamsTransaction(req.query);
        if (validate.error) {
            return res.status(400).send(validate.error.details);
        }

        const customer = await HttpCustomer.findOne(req.query.customerId);
        if (!customer) {
            return res.status(400).send({ message: 'No existe el cliente' });
        }

        const accounts = await Account.findAll({
            where: {
                customerId: req.query.customerId
            },
            include: [{
                model: Transaction,
                as: 'transactions',
                where: {
                    date: { [Op.between]: [req.query.startDate, req.query.endDate] },
                }
            }]
        });

        const result = [];
        accounts.map(a => {
            a.transactions.map(t => {
                const report = {
                    "Fecha": t.date,
                    "Cliente": customer.person.name,
                    "Numero Cuenta": a.number,
                    "Tipo": a.type,
                    "Saldo Inicial":t.balance_initial,
                    "Estado": a.status,
                    "Movimiento": t.value,
                    "Saldo Disponible": t.balance
                }

                result.push(report);
            });
        });

        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error al generar reporte' });
    }
}


module.exports = TransactionController;