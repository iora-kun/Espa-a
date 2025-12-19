const Tarea = require('../model/tarea');

// Obtener todas las tareas
exports.obtenerTodas = async (req, res) => {
    try {
        const filtros = {
            proyecto_id: req.query.proyecto_id || null,
            estado: req.query.estado || null
        };
        const tareas = await Tarea.obtenerTodas(filtros);
        res.json(tareas);
    } catch (error) {
        console.error('Error obteniendo tareas:', error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
};

// Crear una nueva tarea
exports.crear = async (req, res) => {
    try {
        const { titulo, descripcion, proyecto_id, estado, prioridad, fecha_vencimiento } = req.body;

        if (!titulo) {
            return res.status(400).json({ error: 'El título es requerido' });
        }

        const tareaData = {
            titulo,
            descripcion: descripcion || null,
            proyecto_id: proyecto_id || null,
            estado: estado || 'pendiente',
            prioridad: prioridad || 'media',
            fecha_vencimiento: fecha_vencimiento || null
        };

        const id = await Tarea.crear(tareaData);
        res.status(201).json({ id, ...tareaData });
    } catch (error) {
        console.error('Error creando tarea:', error);
        res.status(500).json({ error: 'Error al crear tarea' });
    }
};

// Obtener una tarea por ID
exports.obtenerPorId = async (req, res) => {
    try {
        const tarea = await Tarea.obtenerPorId(req.params.id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        console.error('Error obteniendo tarea:', error);
        res.status(500).json({ error: 'Error al obtener tarea' });
    }
};

// Actualizar una tarea
exports.actualizar = async (req, res) => {
    try {
        const { titulo, descripcion, proyecto_id, estado, prioridad, fecha_vencimiento } = req.body;

        const tareaData = {
            titulo,
            descripcion: descripcion || null,
            proyecto_id: proyecto_id || null,
            estado: estado || 'pendiente',
            prioridad: prioridad || 'media',
            fecha_vencimiento: fecha_vencimiento || null
        };

        await Tarea.actualizar(req.params.id, tareaData);
        res.json({ id: req.params.id, ...tareaData });
    } catch (error) {
        console.error('Error actualizando tarea:', error);
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
};

// Eliminar una tarea
exports.eliminar = async (req, res) => {
    try {
        await Tarea.eliminar(req.params.id);
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error('Error eliminando tarea:', error);
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
};

// Obtener tareas por estado (útil para Kanban)
exports.obtenerPorEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        const tareas = await Tarea.obtenerPorEstado(estado);
        res.json(tareas);
    } catch (error) {
        console.error('Error obteniendo tareas por estado:', error);
        res.status(500).json({ error: 'Error al obtener tareas por estado' });
    }
};
