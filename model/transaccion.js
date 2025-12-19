const execute = require('../config/database');

class Transaccion {
    static async crear(transaccionData) {
        const result = await execute(
            `INSERT INTO transacciones 
            (tipo, monto, descripcion, categoria, categoria_id, entidad_id, proyecto_id, tarea_id, fecha_transaccion, comprobante)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                transaccionData.tipo,
                transaccionData.monto,
                transaccionData.descripcion,
                transaccionData.categoria || null, // Mantener compatibilidad temporal
                transaccionData.categoria_id || null,
                transaccionData.entidad_id || null,
                transaccionData.proyecto_id || null,
                transaccionData.tarea_id || null,
                transaccionData.fecha_transaccion,
                transaccionData.comprobante || null
            ]
        );
        return result.insertId;
    }

    static async obtenerTodos(filtros = {}) {
        let query = `
            SELECT t.*, e.nombre as entidad_nombre, p.nombre as proyecto_nombre, c.nombre as categoria_nombre, tr.titulo as tarea_titulo
            FROM transacciones t
            LEFT JOIN entidades e ON t.entidad_id = e.id
            LEFT JOIN proyectos p ON t.proyecto_id = p.id
            LEFT JOIN categorias c ON t.categoria_id = c.id
            LEFT JOIN tareas tr ON t.tarea_id = tr.id
            WHERE 1=1
        `;
        const params = [];

        if (filtros.tipo) {
            query += ' AND t.tipo = ?';
            params.push(filtros.tipo);
        }

        if (filtros.fecha_inicio) {
            query += ' AND t.fecha_transaccion >= ?';
            params.push(filtros.fecha_inicio);
        }

        if (filtros.fecha_fin) {
            query += ' AND t.fecha_transaccion <= ?';
            params.push(filtros.fecha_fin);
        }

        query += ' ORDER BY t.fecha_transaccion DESC';

        const rows = await execute(query, params);
        return rows;
    }

    static async obtenerPorId(id) {
        const rows = await execute(
            `SELECT t.*, e.nombre as entidad_nombre, p.nombre as proyecto_nombre, c.nombre as categoria_nombre, tr.titulo as tarea_titulo
            FROM transacciones t
            LEFT JOIN entidades e ON t.entidad_id = e.id
            LEFT JOIN proyectos p ON t.proyecto_id = p.id
            LEFT JOIN categorias c ON t.categoria_id = c.id
            LEFT JOIN tareas tr ON t.tarea_id = tr.id
            WHERE t.id = ?`,
            [id]
        );
        return rows[0] || null;
    }

    static async obtenerResumen() {
        const query = `
            SELECT 
                tipo,
                COUNT(*) as cantidad,
                SUM(monto) as total,
                MONTH(fecha_transaccion) as mes,
                YEAR(fecha_transaccion) as año
            FROM transacciones
            WHERE YEAR(fecha_transaccion) = YEAR(CURDATE())
            GROUP BY tipo, MONTH(fecha_transaccion), YEAR(fecha_transaccion)
            ORDER BY año DESC, mes DESC
        `;
        const rows = await execute(query);
        return rows;
    }
}

module.exports = Transaccion;
