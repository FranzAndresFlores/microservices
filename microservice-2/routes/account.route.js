'use strict'

const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account.controller');

router.post('/create', accountController.create);
router.get('/all', accountController.findAll);
router.put('/update/:id', accountController.update);
router.delete('/delete/:id', accountController.remove);

module.exports = router;