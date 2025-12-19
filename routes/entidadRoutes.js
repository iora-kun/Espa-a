const express = require('express');
const router = express.Router();
const entidadController = require('../controller/entidadController');

// Obtener todas las entidades
router.get('/', entidadController.obtenerTodas);

// Obtener una entidad por ID
router.get('/:id', entidadController.obtenerPorId);

// Crear una nueva entidad
router.post('/', entidadController.crear);

// Actualizar una entidad
router.put('/:id', entidadController.actualizar);

// Eliminar una entidad
router.delete('/:id', entidadController.eliminar);

module.exports = router;
