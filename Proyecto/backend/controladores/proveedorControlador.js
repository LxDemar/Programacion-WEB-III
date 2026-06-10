import ProveedorModelo from "../modelos/proveedorModelo.js";

export const listarProveedores = async (req, res) => {
    try {
        const proveedores = await ProveedorModelo.obtenerTodos();
        res.status(200).json(proveedores);
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const crearProveedor = async (req, res) => {
    try {
        const { nombre, telefono, correo } = req.body;
        await ProveedorModelo.crear(nombre, telefono, correo);
        res.status(201).json({ mensaje: "Proveedor creado" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const actualizarProveedor = async (req, res) => {
    try {
        const { nombre, telefono, correo } = req.body;
        await ProveedorModelo.actualizar(req.params.id, nombre, telefono, correo);
        res.json({ mensaje: "Proveedor actualizado" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const eliminarProveedor = async (req, res) => {
    try {
        await ProveedorModelo.eliminar(req.params.id);
        res.json({ mensaje: "Proveedor eliminado" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};