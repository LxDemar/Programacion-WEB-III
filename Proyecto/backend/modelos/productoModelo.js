import conexion from "../config/conexion.js";

class ProductoModelo {
    static async obtenerTodos() {
        const [rows] = await conexion.query(`
            SELECT 
                p.*, 
                c.nombre as categoria,
                pr.nombre as proveedor_nombre
            FROM productos p
            LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
            LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
            WHERE p.estado = 1
        `);
        return rows;
    }
    
    static async obtenerPorId(id) {
        const [rows] = await conexion.query(
            `SELECT * FROM productos WHERE id_producto = ?`,
            [id]
        );
        return rows[0];
    }

    static async crear(producto) {
        const { nombre, descripcion, precio, stock, id_categoria, id_proveedor } = producto;
        const [resultado] = await conexion.query(
            `INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, id_proveedor)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, descripcion, precio, stock, id_categoria || 1, id_proveedor || 1]
        );
        return resultado;
    }

    static async eliminar(id) {
        const [resultado] = await conexion.query(
            `UPDATE productos SET estado = 0 WHERE id_producto = ?`,
            [id]
        );
        return resultado;
    }

    static async actualizar(id, producto) {
        const { nombre, descripcion, precio, stock, id_categoria, id_proveedor } = producto;
        const [resultado] = await conexion.query(
            `UPDATE productos SET 
                nombre = ?, 
                descripcion = ?, 
                precio = ?, 
                stock = ?,
                id_categoria = ?,
                id_proveedor = ?
             WHERE id_producto = ?`,
            [nombre, descripcion, precio, stock, id_categoria, id_proveedor, id]
        );
        return resultado;
    }
}

export default ProductoModelo;