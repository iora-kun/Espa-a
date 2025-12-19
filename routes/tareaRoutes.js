const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController');

// Obtener todas las tareas
router.get('/', tareaController.obtenerTodas);

// Obtener tareas por estado (útil para Kanban)
router.get('/estado/:estado', tareaController.obtenerPorEstado);

// Obtener una tarea por ID
router.get('/:id', tareaController.obtenerPorId);

// Crear una nueva tarea
router.post('/', tareaController.crear);

// Actualizar una tarea
router.put('/:id', tareaController.actualizar);

// Eliminar una tarea
router.delete('/:id', tareaController.eliminar);

module.exports = router;
