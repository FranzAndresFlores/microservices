const { Sequelize } = require('sequelize');
require('dotenv').config();

const AccountModel = require('./models/account.model');
const TransactionModel = require('./models/transaction.model');

const dbName = process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB_NAME;
const sequelize = new Sequelize(dbName, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ?? 3306,
  dialect: 'mysql',
  operatorsAliases: false
});

const Account = AccountModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);

Account.hasMany(Transaction, { foreignKey: 'accountId', as: 'transactions' });
Transaction.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });

sequelize.sync()
  .then(() => {
    console.log(`La base de Datos y las tablas han sido creadas`);
  });

module.exports = {
  sequelize,
  Account,
  Transaction
}