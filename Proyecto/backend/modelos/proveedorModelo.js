import conexion from "../config/conexion.js";

class ProveedorModelo {
    static async obtenerTodos() {
        const [rows] = await conexion.query(
            `SELECT * FROM proveedores WHERE estado = 1`
        );
        return rows;
    }

    static async crear(nombre, telefono, correo) {
        const [resultado] = await conexion.query(
            `INSERT INTO proveedores (nombre, telefono, correo) VALUES (?, ?, ?)`,
            [nombre, telefono, correo]
        );
        return resultado;
    }

    static async actualizar(id, nombre, telefono, correo) {
        const [resultado] = await conexion.query(
            `UPDATE proveedores SET nombre = ?, telefono = ?, correo = ? WHERE id_proveedor = ?`,
            [nombre, telefono, correo, id]
        );
        return resultado;
    }

    static async eliminar(id) {
        const [resultado] = await conexion.query(
            `UPDATE proveedores SET estado = 0 WHERE id_proveedor = ?`,
            [id]
        );
        return resultado;
    }
}

export default ProveedorModelo;