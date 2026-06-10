import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import conexion from "../config/conexion.js";

const evaluarFortaleza = (password) => {
    let nivel = "DÉBIL";
    
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        nivel = "INTERMEDIA";
    }
    
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
        nivel = "FUERTE";
    }
    
    return nivel;
};

const login = async (req, res) => {
    try {
        const { correo, password, captcha } = req.body;
        
        if (!captcha || captcha !== '5') {
            return res.status(401).json({ mensaje: "CAPTCHA incorrecto" });
        }

        const [rows] = await conexion.query(
            `SELECT * FROM usuarios WHERE correo = ? AND estado = 1`,
            [correo]
        );
        
        const usuario = rows[0];

        if (!usuario) {
            return res.status(401).json({ mensaje: "Usuario no existe" });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            return res.status(401).json({ mensaje: "Password incorrecto" });
        }

        const token = jwt.sign(
            { id: usuario.id_usuario, correo: usuario.correo, rol: usuario.rol },
            "CLAVE_SECRETA_SUPER_SEGURA",
            { expiresIn: "2h" }
        );

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

const registrar = async (req, res) => {
    try {
        const { nombre, correo, password, captcha } = req.body;
        
        if (!captcha || captcha !== '5') {
            return res.status(401).json({ mensaje: "CAPTCHA incorrecto" });
        }

        const fortaleza = evaluarFortaleza(password);
        if (fortaleza === 'DÉBIL') {
            return res.status(400).json({ mensaje: "Contraseña demasiado débil. Usa al menos 8 caracteres, mayúsculas y números" });
        }

        const [existe] = await conexion.query(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
        if (existe.length > 0) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await conexion.query(
            `INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, 'EMPLEADO')`,
            [nombre, correo, hashedPassword]
        );

        res.json({ mensaje: "Usuario registrado exitosamente", fortaleza });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ error: error.message });
    }
};

export { login, registrar, evaluarFortaleza };