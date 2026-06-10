import conexion from "../config/conexion.js";

class UsuarioModelo {
    static async buscarPorCorreo(correo) {
        const [rows] = await conexion.query(
            `SELECT * FROM usuarios WHERE correo = ? AND estado = 1`,
            [correo]
        );
        return rows[0];
    }

    static async registrarLog(id_usuario, usuario, ip, browser, evento) {
        const [resultado] = await conexion.query(
            `INSERT INTO logs_acceso (id_usuario, usuario, ip, browser, evento) VALUES (?, ?, ?, ?, ?)`,
            [id_usuario, usuario, ip, browser, evento]
        );
        return resultado;
    }
}

export default UsuarioModelo;