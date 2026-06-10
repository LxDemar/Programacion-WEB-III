import conexion from "../config/conexion.js";

class ProductoModelo {
    static async obtenerTodos() {
        const [rows] = await conexion.query(`
            SELECT p.*, c.nombre as categoria 
            FROM productos p
            LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
            WHERE p.estado = 1
        `);
        return rows;
    }

    static async crear(producto) {
        const { nombre, descripcion, precio, stock, imagen, id_categoria, id_proveedor } = producto;
        const [resultado] = await conexion.query(
            `INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria, id_proveedor)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombre, descripcion, precio, stock, imagen, id_categoria || 1, id_proveedor || 1]
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
        const { nombre, descripcion, precio, stock } = producto;
        const [resultado] = await conexion.query(
            `UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?`,
            [nombre, descripcion, precio, stock, id]
        );
        return resultado;
    }
}

export default ProductoModelo;