import conexion from "../config/conexion.js";

class CategoriaModelo {
    static async obtenerTodas() {
        const [rows] = await conexion.query(
            `SELECT * FROM categorias WHERE estado = 1`
        );
        return rows;
    }

    static async crear(nombre, descripcion) {
        const [resultado] = await conexion.query(
            `INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)`,
            [nombre, descripcion]
        );
        return resultado;
    }

    static async actualizar(id, nombre, descripcion) {
        const [resultado] = await conexion.query(
            `UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?`,
            [nombre, descripcion, id]
        );
        return resultado;
    }

    static async eliminar(id) {
        const [resultado] = await conexion.query(
            `UPDATE categorias SET estado = 0 WHERE id_categoria = ?`,
            [id]
        );
        return resultado;
    }
}

export default CategoriaModelo;