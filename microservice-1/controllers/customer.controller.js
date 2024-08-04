'use strict'

const { Customer, Person } = require('../database');
const { validateCustomerBody } = require('../validators/customer.validator');
const password = require('../helpers/password');
const CustomerController = {};

CustomerController.create = async (req, res) => {
    try {
        const validate = validateCustomerBody(req.body);
        if (validate.error) {
            return res.status(400).send(validate.error.details);
        }

        const person = await Person.create({
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            identification: req.body.identification,
            address: req.body.address,
            cellphone: req.body.cellphone
        });

        await Customer.create({
            password: password.generateHash(req.body.password),
            status: req.body.status ?? true,
            personId: person.id
        });

        return res.status(200).send(person);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al crear cliente' });
    }
}

CustomerController.findAll = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            where: { status: true },
            include: [{ model: Person, as: 'person' }]
        });

        return res.status(200).send(customers);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al obtener clientes' });
    }
}

CustomerController.findOne = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            where: { id: req.params.id },
            include: [{ model: Person, as: 'person' }]
        });

        return res.status(200).send(customer);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al obtener cliente' });
    }
}

CustomerController.update = async (req, res) => {
    try {
        const customer = await Customer.findOne({ where: { id: req.params.id } });
        if (!customer) {
            return res.status(404).send({ message: 'No se encontró el cliente a actualizar' });
        }

        await Person.update({
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            identification: req.body.identification,
            address: req.body.address,
            cellphone: req.body.cellphone
        }, {
            where: {
                id: customer.personId
            }
        });

        await Customer.update({ status: req.body.status }, {
            where: {
                id: req.params.id
            }
        });

        return res.status(200).send({ message: 'Se ha actualizado el cliente correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al actualizar cliente' });
    }
}

CustomerController.remove = async (req, res) => {
    try {
        const customer = await Customer.findOne({ where: { id: req.params.id } });

        await Customer.destroy({ where: { id: req.params.id } });
        await Person.destroy({ where: { id: customer.personId } });

        return res.status(200).send({ message: 'Se ha eliminado el cliente correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al eliminar cliente' });
    }
}

module.exports = CustomerController;