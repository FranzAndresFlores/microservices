'use strict'

const request = require('supertest');
const babel = require('babel-polyfill');
const { sequelize } = require('../database');
require('dotenv').config();

const app = require('../index');
let accountId;

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.close();
});

describe('Prueba de Integración - Crear cuenta y movimiento', () => {
    it('Debería crear una cuenta en BD', async () => {
        await request(app)
            .post('/api/cuentas/create')
            .send({
                number: '478758',
                type: 'Ahorro',
                balance: 2000,
                status: true,
                customerId: 1
            })
            .then((response, err) => {
                accountId = response.body.id;
            });
    });

    it('Debería crear un movimiento en BD', async () => {
        await request(app)
            .post('/api/movimientos/create')
            .send({
                date: "2024-08-05",
                type: "Ahorros",
                value: 10.50,
                accountId: accountId
            })
            .expect(200)
    });
});