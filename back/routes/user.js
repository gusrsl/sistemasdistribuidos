const express = require('express');
const userController = require('../controllers/UserController');
const protect = require('../middleware/authenticate');
const api = express.Router();

api.post('/registrar', userController.registrar);
api.post('/login', userController.login);
api.delete('/cookie/eliminar', userController.deleteCookiee )
api.get('/listado', userController.listarUsers);
api.get('/movimientos', protect, userController.movimientos);
api.get('/ver/:id', userController.obtenerUser);

api.put('/editar/:id', userController.actualizarUser);
api.delete('/eliminar/:id', userController.eliminarUser);

module.exports = api