'use strict'

const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer.controller');

router.post('/create', customerController.create);
router.get('/all', customerController.findAll);
router.get('/:id', customerController.findOne);
router.put('/update/:id', customerController.update);
router.delete('/delete/:id', customerController.remove);

module.exports = router;