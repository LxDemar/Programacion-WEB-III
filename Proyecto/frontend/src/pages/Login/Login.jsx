import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import api from "../../services/api";
import "./Login.css";

const llave = "6LfFTxgtAAAAACx4dux7tYxite9U9gTPyOOuH_g9";

function Login() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setError("");
        if (!captchaToken) {
            setError("Por favor, completa el CAPTCHA");
            return;
        }
        
        try {
            const respuesta = await api.post("/auth/login", {
                correo,
                password,
                captchaToken 
            });

            localStorage.setItem("token", respuesta.data.token);
            localStorage.setItem("usuario", respuesta.data.usuario);
            
            navigate("/", { replace: true });
            
        } catch (error) {
            setError(error.response?.data?.mensaje || "Error al iniciar sesión");
            setCaptchaToken(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>IKADENIN</h2>
                    <p>Sistema de Gestión de Inventario</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={iniciarSesion}>
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo electronico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <ReCAPTCHA
                            sitekey={llave}
                            onChange={handleCaptchaChange}
                            theme="light"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;