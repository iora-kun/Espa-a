const { db } = require('../config/database');

class Categoria {
    static async crear(data) {
        const [result] = await db(
            'INSERT INTO categorias (nombre, tipo, descripcion) VALUES (?, ?, ?)',
            [data.nombre, data.tipo, data.descripcion || null]
        );
        return result.insertId;
    }

    static async obtenerTodas() {
        const [rows] = await db('SELECT * FROM categorias ORDER BY nombre ASC');
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await db('SELECT * FROM categorias WHERE id = ?', [id]);
        return rows[0] || null;
    }

    static async actualizar(id, data) {
        await db(
            'UPDATE categorias SET nombre = ?, tipo = ?, descripcion = ? WHERE id = ?',
            [data.nombre, data.tipo, data.descripcion || null, id]
        );
        return true;
    }

    static async eliminar(id) {
        await db('DELETE FROM categorias WHERE id = ?', [id]);
        return true;
    }
}

module.exports = Categoria;
