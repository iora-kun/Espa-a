const { db } = require('../config/database');

class Proyecto {
    static async crear(proyectoData) {
        const [result] = await db(
            `INSERT INTO proyectos (nombre, descripcion, estado, fecha_inicio, fecha_fin, presupuesto)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                proyectoData.nombre,
                proyectoData.descripcion || null,
                proyectoData.estado || 'activo',
                proyectoData.fecha_inicio || null,
                proyectoData.fecha_fin || null,
                proyectoData.presupuesto || null
            ]
        );
        return result.insertId;
    }

    static async obtenerTodos() {
        const [rows] = await db('SELECT * FROM proyectos ORDER BY fecha_inicio DESC, nombre ASC');
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await db('SELECT * FROM proyectos WHERE id = ?', [id]);
        return rows[0] || null;
    }

    static async actualizar(id, proyectoData) {
        await db(
            `UPDATE proyectos 
            SET nombre = ?, descripcion = ?, estado = ?, fecha_inicio = ?, fecha_fin = ?, presupuesto = ?
            WHERE id = ?`,
            [
                proyectoData.nombre,
                proyectoData.descripcion || null,
                proyectoData.estado,
                proyectoData.fecha_inicio || null,
                proyectoData.fecha_fin || null,
                proyectoData.presupuesto || null,
                id
            ]
        );
        return true;
    }

    static async eliminar(id) {
        await db('DELETE FROM proyectos WHERE id = ?', [id]);
        return true;
    }
}

module.exports = Proyecto;
