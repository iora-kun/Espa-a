const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'contabilidad',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para ejecutar consultas
// Compatible con modelos que usan execute() directamente y esperan resultados sin array extra
const execute = async (query, params = []) => {
    try {
        const [results] = await pool.execute(query, params);
        return results;
    } catch (error) {
        console.error('Error en la consulta:', error);
        throw error;
    }
};

// Función alternativa para modelos que esperan [results] directamente
const db = async (query, params = []) => {
    try {
        const [results] = await pool.execute(query, params);
        return [results];
    } catch (error) {
        console.error('Error en la consulta:', error);
        throw error;
    }
};

// Exportar execute como función principal (para compatibilidad con modelos existentes)
// También exportar db para modelos que lo necesitan
module.exports = execute;
module.exports.execute = execute;
module.exports.db = db;

