import ProductoModelo from "../modelos/productoModelo.js";

export const listarProductos = async (req, res) => {
    try {
        const productos = await ProductoModelo.obtenerTodos();
        res.status(200).json(productos);
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const crearProducto = async (req, res) => {
    try {
        await ProductoModelo.crear(req.body);
        res.status(201).json({ mensaje: "Producto creado" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        await ProductoModelo.eliminar(req.params.id);
        res.json({ mensaje: "Producto eliminado" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        await ProductoModelo.actualizar(req.params.id, req.body);
        res.json({ mensaje: "Producto actualizado" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const editar = actualizarProducto;
export const listar = listarProductos;