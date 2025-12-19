const execute = require('../config/database');

class Entidad {
    static async crear(entidadData) {
        const result = await execute(
            `INSERT INTO entidades (nombre, tipo, email, telefono, direccion, ruc_ci)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                entidadData.nombre,
                entidadData.tipo,
                entidadData.email || null,
                entidadData.telefono || null,
                entidadData.direccion || null,
                entidadData.ruc_ci || null
            ]
        );
        return result.insertId;
    }

    static async obtenerTodos(filtros = {}) {
        let query = 'SELECT * FROM entidades WHERE 1=1';
        const params = [];

        if (filtros.tipo) {
            query += ' AND tipo = ?';
            params.push(filtros.tipo);
        }

        if (filtros.texto) {
            query += ' AND (nombre LIKE ? OR email LIKE ? OR telefono LIKE ?)';
            const termino = `%${filtros.texto}%`;
            params.push(termino, termino, termino);
        }

        query += ' ORDER BY nombre ASC';

        const rows = await execute(query, params);
        return rows;
    }

    static async obtenerPorId(id) {
        const rows = await execute('SELECT * FROM entidades WHERE id = ?', [id]);
        return rows[0] || null;
    }

    static async actualizar(id, entidadData) {
        await execute(
            `UPDATE entidades 
            SET nombre = ?, tipo = ?, email = ?, telefono = ?, direccion = ?, ruc_ci = ?
            WHERE id = ?`,
            [
                entidadData.nombre,
                entidadData.tipo,
                entidadData.email || null,
                entidadData.telefono || null,
                entidadData.direccion || null,
                entidadData.ruc_ci || null,
                id
            ]
        );
        return true;
    }

    static async eliminar(id) {
        await execute('DELETE FROM entidades WHERE id = ?', [id]);
        return true;
    }
}

module.exports = Entidad;
