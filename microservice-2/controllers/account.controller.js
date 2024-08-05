'use strict'

const { Account } = require('../database');
const HttpCustomer = require('../common/http-customer');
const { validateAccount } = require('../validators/account.validator');
const AccountController = {};

AccountController.create = async (req, res) => {
    try {
        const validate = validateAccount(req.body);
        if (validate.error) {
            return res.status(400).send(validate.error.details);
        }

        const account = await Account.create({ ...req.body });

        return res.status(200).send(account);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al crear cuenta' });
    }
}

AccountController.findAll = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            where: { status: true }
        });

        return res.status(200).send(accounts);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al obtener cuentas' });
    }
}

AccountController.update = async (req, res) => {
    try {
        const account = await Account.findOne({ where: { id: req.params.id } });
        if (!account) {
            return res.status(404).send({ message: 'No se encontró la cuenta a actualizar' });
        }

        await Account.update({ ...req.body }, {
            where: {
                id: req.params.id
            }
        });

        return res.status(200).send({ message: 'Se ha actualizado la cuenta correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al actualizar la cuenta' });
    }
}

AccountController.remove = async (req, res) => {
    try {
        await Account.destroy({
            where: { id: req.params.id }
        });

        return res.status(200).send({ message: 'Se ha eliminado la cuenta correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al eliminar la cuenta' });
    }
}

module.exports = AccountController;