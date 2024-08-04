'use strict'

const { validateAccount } = require('../models/account/accont.validator');

describe('Prueba Unitaria - validación de datos cuenta', () => {
    it('debería validar los datos enviados en la cuenta', ()=> {
        const validAccount = {
            number: '478758',
            type: 'Ahorro',
            balance: 2000,
            status: true,
            customerId: 1
        }

        const validate = validateAccount(validAccount);
        expect(validate.error == null);
    });

    it('debería retornar error por falta de datos requeridos', ()=> {
        const invalidAccount = {
            type: 'Ahorro',
            balance: 2000
        }

        const validate = validateAccount(invalidAccount);
        expect(validate.error == Array);
    });
});