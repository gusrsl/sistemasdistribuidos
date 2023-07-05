const express = require('express');
const RetiroController = require('../controllers/RetiroController');
const protect = require('../middleware/authenticate');
const api = express.Router();
api.post('/registrar', protect, RetiroController.createRetiro);
api.get('/retiros', protect, RetiroController.getRetiros);
api.delete('/eliminarRetiro/:id', protect, RetiroController.deleteRetiro);
module.exports = api;