const express = require('express');
const router = express.Router();
const proyectoController = require('../controller/proyectoController');

// Obtener todos los proyectos
router.get('/', proyectoController.obtenerTodos);

// Obtener un proyecto por ID
router.get('/:id', proyectoController.obtenerPorId);

// Crear un nuevo proyecto
router.post('/', proyectoController.crear);

// Actualizar un proyecto
router.put('/:id', proyectoController.actualizar);

// Eliminar un proyecto
router.delete('/:id', proyectoController.eliminar);

module.exports = router;
