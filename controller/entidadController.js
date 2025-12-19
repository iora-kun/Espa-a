const Entidad = require('../model/entidad');

// Obtener todas las entidades
exports.obtenerTodas = async (req, res) => {
    try {
        const { tipo, texto } = req.query;
        const entidades = await Entidad.obtenerTodos({ tipo, texto });
        res.json(entidades);
    } catch (error) {
        console.error('Error obteniendo entidades:', error);
        res.status(500).json({ error: 'Error al obtener entidades' });
    }
};

// Crear una nueva entidad
exports.crear = async (req, res) => {
    try {
        const { nombre, tipo, email, telefono, direccion, ruc_ci } = req.body;

        if (!nombre || !tipo) {
            return res.status(400).json({ error: 'Nombre y tipo son requeridos' });
        }

        const entidadData = {
            nombre,
            tipo,
            email: email || null,
            telefono: telefono || null,
            direccion: direccion || null,
            ruc_ci: ruc_ci || null
        };

        const id = await Entidad.crear(entidadData);
        res.status(201).json({ id, ...entidadData });
    } catch (error) {
        console.error('Error creando entidad:', error);
        res.status(500).json({ error: 'Error al crear entidad' });
    }
};

// Obtener una entidad por ID
exports.obtenerPorId = async (req, res) => {
    try {
        const entidad = await Entidad.obtenerPorId(req.params.id);
        if (!entidad) {
            return res.status(404).json({ error: 'Entidad no encontrada' });
        }
        res.json(entidad);
    } catch (error) {
        console.error('Error obteniendo entidad:', error);
        res.status(500).json({ error: 'Error al obtener entidad' });
    }
};

// Actualizar una entidad
exports.actualizar = async (req, res) => {
    try {
        const { nombre, tipo, email, telefono, direccion, ruc_ci } = req.body;

        const entidadData = {
            nombre,
            tipo,
            email: email || null,
            telefono: telefono || null,
            direccion: direccion || null,
            ruc_ci: ruc_ci || null
        };

        await Entidad.actualizar(req.params.id, entidadData);
        res.json({ id: req.params.id, ...entidadData });
    } catch (error) {
        console.error('Error actualizando entidad:', error);
        res.status(500).json({ error: 'Error al actualizar entidad' });
    }
};

// Eliminar una entidad
exports.eliminar = async (req, res) => {
    try {
        await Entidad.eliminar(req.params.id);
        res.json({ message: 'Entidad eliminada correctamente' });
    } catch (error) {
        console.error('Error eliminando entidad:', error);
        res.status(500).json({ error: 'Error al eliminar entidad' });
    }
};
