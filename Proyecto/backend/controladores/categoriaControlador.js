import CategoriaModelo from "../modelos/categoriaModelo.js";

export const listarCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaModelo.obtenerTodas();
        res.status(200).json(categorias);
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        await CategoriaModelo.crear(nombre, descripcion);
        res.status(201).json({ mensaje: "Categoria creada" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const actualizarCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        await CategoriaModelo.actualizar(req.params.id, nombre, descripcion);
        res.json({ mensaje: "Categoria actualizada" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        await CategoriaModelo.eliminar(req.params.id);
        res.json({ mensaje: "Categoria eliminada" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};