const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
    origin: '*', // Permitir todas las conexiones por ahora para facilitar desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/proyectos', require('../routes/proyectoRoutes'));
app.use('/api/tareas', require('../routes/tareaRoutes'));
app.use('/api/transacciones', require('../routes/transaccionRoutes'));
app.use('/api/entidades', require('../routes/entidadRoutes'));
app.use('/api/informes', require('../routes/informeRoutes'));
console.log('🔄 Carga de ruta: /api/categorias');
app.use('/api/categorias', require('../routes/categoriaRoutes'));
console.log('✅ Ruta /api/categorias cargada');

// Ruta de prueba
app.get('/api', (req, res) => {
    res.json({ message: 'API de Kanban Contable funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});