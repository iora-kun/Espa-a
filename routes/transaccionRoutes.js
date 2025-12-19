const express = require('express');
const router = express.Router();
const transaccionController = require('../controller/transaccionController');

// Obtener todas las transacciones
router.get('/', transaccionController.obtenerTodas);

// Obtener una transacción por ID
router.get('/:id', transaccionController.obtenerPorId);

// Crear una nueva transacción
router.post('/', transaccionController.crear);

// Obtener resumen
router.get('/resumen/general', transaccionController.obtenerResumen);

module.exports = router;
