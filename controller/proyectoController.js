const Proyecto = require('../model/proyecto');

// Obtener todos los proyectos
exports.obtenerTodos = async (req, res) => {
    try {
        const proyectos = await Proyecto.obtenerTodos();
        res.json(proyectos);
    } catch (error) {
        console.error('Error obteniendo proyectos:', error);
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
};

// Crear un nuevo proyecto
exports.crear = async (req, res) => {
    try {
        const { nombre, descripcion, estado, fecha_inicio, fecha_fin, presupuesto } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }

        const proyectoData = {
            nombre,
            descripcion: descripcion || null,
            estado: estado || 'activo',
            fecha_inicio: fecha_inicio || null,
            fecha_fin: fecha_fin || null,
            presupuesto: presupuesto || null
        };

        const id = await Proyecto.crear(proyectoData);
        res.status(201).json({ id, ...proyectoData });
    } catch (error) {
        console.error('Error creando proyecto:', error);
        res.status(500).json({ error: 'Error al crear proyecto' });
    }
};

// Obtener un proyecto por ID
exports.obtenerPorId = async (req, res) => {
    try {
        const proyecto = await Proyecto.obtenerPorId(req.params.id);
        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.json(proyecto);
    } catch (error) {
        console.error('Error obteniendo proyecto:', error);
        res.status(500).json({ error: 'Error al obtener proyecto' });
    }
};

// Actualizar un proyecto
exports.actualizar = async (req, res) => {
    try {
        const { nombre, descripcion, estado, fecha_inicio, fecha_fin, presupuesto } = req.body;
        
        const proyectoData = {
            nombre,
            descripcion: descripcion || null,
            estado: estado || 'activo',
            fecha_inicio: fecha_inicio || null,
            fecha_fin: fecha_fin || null,
            presupuesto: presupuesto || null
        };

        await Proyecto.actualizar(req.params.id, proyectoData);
        res.json({ id: req.params.id, ...proyectoData });
    } catch (error) {
        console.error('Error actualizando proyecto:', error);
        res.status(500).json({ error: 'Error al actualizar proyecto' });
    }
};

// Eliminar un proyecto
exports.eliminar = async (req, res) => {
    try {
        await Proyecto.eliminar(req.params.id);
        res.json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando proyecto:', error);
        res.status(500).json({ error: 'Error al eliminar proyecto' });
    }
};
