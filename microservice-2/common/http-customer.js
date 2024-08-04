const axios = require('axios');
require('dotenv').config();

const HttpCustomer = {};

HttpCustomer.findOne = async (customerId) => {
    try {
        const url = process.env.TEST_URL + `/clientes/${customerId}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al consultar cliente' });
    }
}

module.exports = HttpCustomer;