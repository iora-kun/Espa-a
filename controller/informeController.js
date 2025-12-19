const execute = require('../config/database');
const Transaccion = require('../model/transaccion');

// Obtener resumen general de finanzas
exports.obtenerResumen = async (req, res) => {
    try {
        // Calcular totales de entradas y salidas
        const queryEntradas = `
            SELECT COALESCE(SUM(monto), 0) as total
            FROM transacciones
            WHERE tipo = 'entrada'
        `;
        
        const querySalidas = `
            SELECT COALESCE(SUM(monto), 0) as total
            FROM transacciones
            WHERE tipo = 'salida'
        `;

        const entradas = await execute(queryEntradas);
        const salidas = await execute(querySalidas);

        const resumen = {
            total_entradas: parseFloat(entradas[0].total) || 0,
            total_salidas: parseFloat(salidas[0].total) || 0,
            balance: (parseFloat(entradas[0].total) || 0) - (parseFloat(salidas[0].total) || 0),
            resumen_mensual: await Transaccion.obtenerResumen()
        };

        res.json(resumen);
    } catch (error) {
        console.error('Error obteniendo resumen:', error);
        res.status(500).json({ error: 'Error al obtener resumen' });
    }
};

// Obtener resumen por entidad
exports.resumenPorEntidad = async (req, res) => {
    try {
        const query = `
            SELECT 
                e.id,
                e.nombre,
                e.tipo,
                COALESCE(SUM(CASE WHEN t.tipo = 'entrada' THEN t.monto ELSE 0 END), 0) as total_entradas,
                COALESCE(SUM(CASE WHEN t.tipo = 'salida' THEN t.monto ELSE 0 END), 0) as total_salidas,
                COUNT(t.id) as cantidad_transacciones
            FROM entidades e
            LEFT JOIN transacciones t ON e.id = t.entidad_id
            GROUP BY e.id, e.nombre, e.tipo
            ORDER BY cantidad_transacciones DESC
        `;
        
        const rows = await execute(query);
        res.json(rows);
    } catch (error) {
        console.error('Error obteniendo resumen por entidad:', error);
        res.status(500).json({ error: 'Error al obtener resumen por entidad' });
    }
};

// Obtener resumen por categoría
exports.resumenPorCategoria = async (req, res) => {
    try {
        const query = `
            SELECT 
                categoria,
                tipo,
                COUNT(*) as cantidad,
                SUM(monto) as total
            FROM transacciones
            WHERE categoria IS NOT NULL
            GROUP BY categoria, tipo
            ORDER BY total DESC
        `;
        
        const rows = await execute(query);
        res.json(rows);
    } catch (error) {
        console.error('Error obteniendo resumen por categoría:', error);
        res.status(500).json({ error: 'Error al obtener resumen por categoría' });
    }
};

// Generar pseudo-factura (informe detallado)
exports.generarFactura = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin, entidad_id } = req.query;
        
        let query = `
            SELECT 
                t.*,
                e.nombre as entidad_nombre,
                e.tipo as entidad_tipo,
                e.ruc_ci as entidad_ruc,
                e.direccion as entidad_direccion,
                p.nombre as proyecto_nombre
            FROM transacciones t
            LEFT JOIN entidades e ON t.entidad_id = e.id
            LEFT JOIN proyectos p ON t.proyecto_id = p.id
            WHERE 1=1
        `;
        
        const params = [];
        
        if (fecha_inicio) {
            query += ' AND t.fecha_transaccion >= ?';
            params.push(fecha_inicio);
        }
        
        if (fecha_fin) {
            query += ' AND t.fecha_transaccion <= ?';
            params.push(fecha_fin);
        }
        
        if (entidad_id) {
            query += ' AND t.entidad_id = ?';
            params.push(entidad_id);
        }
        
        query += ' ORDER BY t.fecha_transaccion ASC';
        
        const transacciones = await execute(query, params);
        
        // Calcular totales
        const totalEntradas = transacciones
            .filter(t => t.tipo === 'entrada')
            .reduce((sum, t) => sum + parseFloat(t.monto), 0);
        
        const totalSalidas = transacciones
            .filter(t => t.tipo === 'salida')
            .reduce((sum, t) => sum + parseFloat(t.monto), 0);
        
        const factura = {
            periodo: {
                fecha_inicio: fecha_inicio || null,
                fecha_fin: fecha_fin || null
            },
            transacciones,
            resumen: {
                total_entradas: totalEntradas,
                total_salidas: totalSalidas,
                balance: totalEntradas - totalSalidas,
                cantidad_transacciones: transacciones.length
            }
        };
        
        res.json(factura);
    } catch (error) {
        console.error('Error generando factura:', error);
        res.status(500).json({ error: 'Error al generar factura' });
    }
};
