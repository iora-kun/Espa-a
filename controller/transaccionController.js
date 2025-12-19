const Transaccion = require('../model/transaccion');

// Obtener todas las transacciones
exports.obtenerTodas = async (req, res) => {
    try {
        const filtros = {
            tipo: req.query.tipo || null,
            fecha_inicio: req.query.fecha_inicio || null,
            fecha_fin: req.query.fecha_fin || null
        };
        const transacciones = await Transaccion.obtenerTodos(filtros);
        res.json(transacciones);
    } catch (error) {
        console.error('Error obteniendo transacciones:', error);
        res.status(500).json({ error: 'Error al obtener transacciones' });
    }
};

// Crear una nueva transacción
exports.crear = async (req, res) => {
    try {
        const { tipo, monto, descripcion, categoria, categoria_id, entidad_id, proyecto_id, tarea_id, fecha_transaccion, comprobante } = req.body;

        if (!tipo || !monto || !descripcion || !fecha_transaccion) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        const transaccionData = {
            tipo,
            monto,
            descripcion,
            categoria: categoria || null,
            categoria_id: categoria_id || null,
            entidad_id: entidad_id || null,
            proyecto_id: proyecto_id || null,
            tarea_id: tarea_id || null,
            fecha_transaccion,
            comprobante: comprobante || null
        };

        const id = await Transaccion.crear(transaccionData);
        res.status(201).json({ id, ...transaccionData });
    } catch (error) {
        console.error('Error creando transacción:', error);
        res.status(500).json({ error: 'Error al crear transacción' });
    }
};

// Obtener una transacción por ID
exports.obtenerPorId = async (req, res) => {
    try {
        const transaccion = await Transaccion.obtenerPorId(req.params.id);
        if (!transaccion) {
            return res.status(404).json({ error: 'Transacción no encontrada' });
        }
        res.json(transaccion);
    } catch (error) {
        console.error('Error obteniendo transacción:', error);
        res.status(500).json({ error: 'Error al obtener transacción' });
    }
};

// Obtener resumen de transacciones
exports.obtenerResumen = async (req, res) => {
    try {
        const resumen = await Transaccion.obtenerResumen();
        res.json(resumen);
    } catch (error) {
        console.error('Error obteniendo resumen:', error);
        res.status(500).json({ error: 'Error al obtener resumen' });
    }
};
