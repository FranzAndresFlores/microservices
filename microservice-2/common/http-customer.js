const axios = require('axios');
require('dotenv').config();

const HttpCustomer = {};

HttpCustomer.findOne = async (customerId) => {
    try {
        const microservice1Url = process.env.NODE_ENV === 'test' ? process.env.URL_MICROSERVICE_TEST : process.env.URL_MICROSERVICE;
        const url = microservice1Url + `/api/clientes/${customerId}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = HttpCustomer;