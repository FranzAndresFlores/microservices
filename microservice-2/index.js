'use strict'

const express = require('express');
const morgan = require('morgan');
const errors = require('http-errors');
const path = require('path');
const cookie = require('cookie-parser');
const cors = require('cors');
const db = require('./database');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(cors());

// Rutas
app.use('/cuentas', require('./routes/account.route'));
app.use('/movimientos', require('./routes/transaction.route'));


app.use(function(req, res, next) {
    next(errors(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send(err.message);
});

module.exports = app;

