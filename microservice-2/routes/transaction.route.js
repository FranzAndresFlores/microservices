'use strict'

const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transaction.controller');

router.post('/create', transactionController.create);
router.get('/by-account/:id', transactionController.findAllByAccount);
router.put('/update/:id', transactionController.update);
router.delete('/delete/:id', transactionController.remove);

router.get('/report', transactionController.report);

module.exports = router;