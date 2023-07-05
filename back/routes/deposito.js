const express = require('express');
const DepositoController = require('../controllers/DepositoController');
const protect = require('../middleware/authenticate');
const api = express.Router();
api.post('/registrar', protect, DepositoController.createDeposito);
api.get('/depositos', protect, DepositoController.getDepositos);
api.delete('/eliminarDeposito/:id', protect, DepositoController.deleteDeposito);
module.exports = api;