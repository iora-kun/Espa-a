const { db } = require('../config/database');

class Tarea {
    static async crear(tareaData) {
        const [result] = await db(
            `INSERT INTO tareas (titulo, descripcion, proyecto_id, estado, prioridad, fecha_vencimiento, categoria_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                tareaData.titulo,
                tareaData.descripcion || null,
                tareaData.proyecto_id || null,
                tareaData.estado || 'pendiente',
                tareaData.prioridad || 'media',
                tareaData.fecha_vencimiento || null,
                tareaData.categoria_id || null
            ]
        );
        return result.insertId;
    }

    static async obtenerTodas(filtros = {}) {
        let query = `
            SELECT t.*, p.nombre as proyecto_nombre, c.nombre as categoria_nombre,
            (SELECT COALESCE(SUM(tr.monto), 0) FROM transacciones tr WHERE tr.tarea_id = t.id AND tr.tipo = 'salida') as total_gastado
            FROM tareas t
            LEFT JOIN proyectos p ON t.proyecto_id = p.id
            LEFT JOIN categorias c ON t.categoria_id = c.id
            WHERE 1=1
        `;
        const params = [];

        if (filtros.proyecto_id) {
            query += ' AND t.proyecto_id = ?';
            params.push(filtros.proyecto_id);
        }

        if (filtros.estado) {
            query += ' AND t.estado = ?';
            params.push(filtros.estado);
        }

        if (filtros.categoria_id) {
            query += ' AND t.categoria_id = ?';
            params.push(filtros.categoria_id);
        }

        query += ' ORDER BY t.fecha_creacion DESC';

        const [rows] = await db(query, params);
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await db(
            `SELECT t.*, p.nombre as proyecto_nombre, c.nombre as categoria_nombre
            FROM tareas t
            LEFT JOIN proyectos p ON t.proyecto_id = p.id
            LEFT JOIN categorias c ON t.categoria_id = c.id
            WHERE t.id = ?`,
            [id]
        );
        return rows[0] || null;
    }

    static async actualizar(id, tareaData) {
        await db(
            `UPDATE tareas 
            SET titulo = ?, descripcion = ?, proyecto_id = ?, estado = ?, prioridad = ?, fecha_vencimiento = ?, categoria_id = ?
            WHERE id = ?`,
            [
                tareaData.titulo,
                tareaData.descripcion || null,
                tareaData.proyecto_id || null,
                tareaData.estado || 'pendiente',
                tareaData.prioridad || 'media',
                tareaData.fecha_vencimiento || null,
                tareaData.categoria_id || null,
                id
            ]
        );
        return true;
    }

    static async eliminar(id) {
        await db('DELETE FROM tareas WHERE id = ?', [id]);
        return true;
    }

    static async obtenerPorEstado(estado) {
        const [rows] = await db('SELECT * FROM tareas WHERE estado = ? ORDER BY fecha_creacion DESC', [estado]);
        return rows;
    }
}

module.exports = Tarea;
