import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import conexion from "../config/conexion.js";

const llave = "6LfFTxgtAAAAAOYLZd2LVsXWsKn0JSy_okFJlUeN";

const login = async (req, res) => {
    try {
        const { correo, password, captchaToken } = req.body;

        if (!captchaToken) {
            return res.status(401).json({ mensaje: "CAPTCHA requerido" });
        }

        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${llave}&response=${captchaToken}`;
        const response = await fetch(verifyUrl, { method: 'POST' });
        const data = await response.json();

        if (!data.success) {
            return res.status(401).json({ mensaje: "CAPTCHA inválido" });
        }

        // Buscar usuario
        const [rows] = await conexion.query(
            `SELECT * FROM usuarios WHERE correo = ? AND estado = 1`,
            [correo]
        );
        
        const usuario = rows[0];

        if (!usuario) {
            return res.status(401).json({ mensaje: "Usuario no existe" });
        }

        // Verificar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            return res.status(401).json({ mensaje: "Password incorrecto" });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id_usuario, correo: usuario.correo, rol: usuario.rol },
            "CLAVE_SECRETA_SUPER_SEGURA",
            { expiresIn: "2h" }
        );

        // Registrar log de acceso
        try {
            await conexion.query(
                `INSERT INTO logs_acceso (id_usuario, usuario, ip, browser, evento) 
                 VALUES (?, ?, ?, ?, 'INGRESO')`,
                [usuario.id_usuario, usuario.nombre, req.ip, req.headers['user-agent'] || 'Desconocido']
            );
        } catch(logError) {
            console.log("Error en log:", logError.message);
        }

        res.json({ token, usuario: usuario.nombre, rol: usuario.rol });
        
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: error.message });
    }
};

export { login };