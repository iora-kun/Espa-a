const express = require('express');
const router = express.Router();
const informeController = require('../controller/informeController');

// Obtener resumen general
router.get('/resumen', informeController.obtenerResumen);

// Obtener resumen por entidad
router.get('/resumen/entidades', informeController.resumenPorEntidad);

// Obtener resumen por categoría
router.get('/resumen/categorias', informeController.resumenPorCategoria);

// Generar pseudo-factura
router.get('/factura', informeController.generarFactura);

module.exports = router;
