const { Sequelize } = require('sequelize');
require('dotenv').config();

const PersonModel = require('./models/person.model');
const CustomerModel = require('./models/customer.model');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ?? 3306,
  dialect: 'mysql',
  operatorsAliases: false
});

const Person = PersonModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);

Person.hasOne(Customer, { foreignKey: 'personId', as: 'customer' });
Customer.belongsTo(Person, { foreignKey: 'personId', as: 'person' });

sequelize.sync()
  .then(() => {
    console.log(`La base de Datos y las tablas han sido creadas`);
  });

module.exports = {
  Person,
  Customer
}