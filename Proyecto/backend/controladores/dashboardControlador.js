import conexion from "../config/conexion.js";

export const obtenerEstadisticas = async (req, res) => {
    try {
        const [productos] = await conexion.query(
            `SELECT COUNT(*) as total FROM productos WHERE estado = 1`
        );
        const [categorias] = await conexion.query(
            `SELECT COUNT(*) as total FROM categorias WHERE estado = 1`
        );
        const [proveedores] = await conexion.query(
            `SELECT COUNT(*) as total FROM proveedores WHERE estado = 1`
        );
        res.json({
            productos: productos[0].total,
            categorias: categorias[0].total,
            proveedores: proveedores[0].total
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

export const productosPorCategoria = async (req, res) => {
    try {
        const [datos] = await conexion.query(
            `SELECT 
                c.nombre, 
                COUNT(p.id_producto) as cantidad
             FROM categorias c
             LEFT JOIN productos p 
                ON c.id_categoria = p.id_categoria 
                AND p.estado = 1
             WHERE c.estado = 1
             GROUP BY c.id_categoria, c.nombre
             ORDER BY c.nombre`
        );
        res.json(datos);
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};