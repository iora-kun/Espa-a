const { db } = require('../config/database');

class Pago {
    static async crear(pagoData) {
        const [result] = await db(
            `INSERT INTO pagos (transaccion_id, metodo_pago, referencia, estado, fecha_pago, notas)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                pagoData.transaccion_id,
                pagoData.metodo_pago,
                pagoData.referencia || null,
                pagoData.estado || 'pendiente',
                pagoData.fecha_pago || null,
                pagoData.notas || null
            ]
        );
        return result.insertId;
    }

    static async obtenerTodos(filtros = {}) {
        let query = `
            SELECT p.*, t.tipo as transaccion_tipo, t.monto as transaccion_monto,
                   t.descripcion as transaccion_descripcion, e.nombre as entidad_nombre
            FROM pagos p
            LEFT JOIN transacciones t ON p.transaccion_id = t.id
            LEFT JOIN entidades e ON t.entidad_id = e.id
            WHERE 1=1
        `;
        const params = [];

        if (filtros.transaccion_id) {
            query += ' AND p.transaccion_id = ?';
            params.push(filtros.transaccion_id);
        }

        if (filtros.estado) {
            query += ' AND p.estado = ?';
            params.push(filtros.estado);
        }

        query += ' ORDER BY p.fecha_pago DESC, p.id DESC';

        const [rows] = await db(query, params);
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await db(
            `SELECT p.*, t.tipo as transaccion_tipo, t.monto as transaccion_monto,
                   t.descripcion as transaccion_descripcion, e.nombre as entidad_nombre
            FROM pagos p
            LEFT JOIN transacciones t ON p.transaccion_id = t.id
            LEFT JOIN entidades e ON t.entidad_id = e.id
            WHERE p.id = ?`,
            [id]
        );
        return rows[0];
    }

    static async actualizar(id, pagoData) {
        await db(
            `UPDATE pagos 
            SET metodo_pago = ?, referencia = ?, estado = ?, fecha_pago = ?, notas = ?
            WHERE id = ?`,
            [
                pagoData.metodo_pago,
                pagoData.referencia || null,
                pagoData.estado,
                pagoData.fecha_pago || null,
                pagoData.notas || null,
                id
            ]
        );
        return true;
    }

    static async eliminar(id) {
        await db('DELETE FROM pagos WHERE id = ?', [id]);
        return true;
    }
}

module.exports = Pago;

