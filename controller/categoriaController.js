const Categoria = require('../model/categoria');

exports.getAll = async (req, res) => {
    try {
        const categorias = await Categoria.obtenerTodas();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const categoria = await Categoria.obtenerPorId(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { nombre, tipo, descripcion } = req.body;
        if (!nombre || !tipo) {
            return res.status(400).json({ message: 'Nombre y tipo son requeridos' });
        }

        const id = await Categoria.crear({ nombre, tipo, descripcion });
        const nuevaCategoria = await Categoria.obtenerPorId(id);

        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { nombre, tipo, descripcion } = req.body;
        if (!nombre || !tipo) {
            return res.status(400).json({ message: 'Nombre y tipo son requeridos' });
        }

        // Verificar si existe
        const categoria = await Categoria.obtenerPorId(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        await Categoria.actualizar(req.params.id, { nombre, tipo, descripcion });
        const categoriaActualizada = await Categoria.obtenerPorId(req.params.id);

        res.json(categoriaActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        // Verificar si existe
        const categoria = await Categoria.obtenerPorId(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        await Categoria.eliminar(req.params.id);
        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
