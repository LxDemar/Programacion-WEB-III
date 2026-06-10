import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const respuesta = await api.post("/auth/login", {
                correo,
                password,
                captcha
            });

            localStorage.setItem("token", respuesta.data.token);
            localStorage.setItem("usuario", respuesta.data.usuario);
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.mensaje || "Error al iniciar sesión");
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f0f2f5"
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "10px",
                boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                width: "100%",
                maxWidth: "400px"
            }}>
                <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#2c3e50" }}>
                    IKADENIN
                </h2>
                <p style={{ textAlign: "center", marginBottom: "30px", color: "#7f8c8d" }}>
                    Sistema de Gestión de Inventario
                </p>

                {error && (
                    <div style={{
                        backgroundColor: "#fee",
                        color: "#c33",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "20px",
                        textAlign: "center"
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={iniciarSesion}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Tu correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "16px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "16px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>
                            CAPTCHA: ¿Cuánto es 2 + 3?
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Respuesta"
                            value={captcha}
                            onChange={(e) => setCaptcha(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "16px"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "#2c3e50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;