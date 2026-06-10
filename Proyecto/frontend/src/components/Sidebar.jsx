import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{ 
            width: "250px", 
            minHeight: "100vh", 
            backgroundColor: "#2c3e50", 
            color: "#ecf0f1", 
            padding: "20px"
        }}>
            <h3 style={{ 
                textAlign: "center", 
                marginBottom: "5px",
                fontSize: "20px",
                fontWeight: "normal"
            }}>
                IKADENIN
            </h3>
            
            <p style={{ 
                textAlign: "center", 
                fontSize: "12px", 
                color: "#95a5a9",
                marginBottom: "30px"
            }}>
                Sistema de Gestión de Inventario
            </p>
            
            <hr style={{ borderColor: "#34495e" }} />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <Link 
                    to="/" 
                    style={{ 
                        color: "#ecf0f1", 
                        textDecoration: "none", 
                        padding: "10px",
                        borderRadius: "5px",
                        display: "block"
                    }}
                >
                    Dashboard
                </Link>
                
                <Link 
                    to="/categorias" 
                    style={{ 
                        color: "#ecf0f1", 
                        textDecoration: "none", 
                        padding: "10px",
                        borderRadius: "5px",
                        display: "block"
                    }}
                >
                    Categorías
                </Link>
                
                <Link 
                    to="/productos" 
                    style={{ 
                        color: "#ecf0f1", 
                        textDecoration: "none", 
                        padding: "10px",
                        borderRadius: "5px",
                        display: "block"
                    }}
                >
                    Productos
                </Link>
                
                <Link 
                    to="/proveedores" 
                    style={{ 
                        color: "#ecf0f1", 
                        textDecoration: "none", 
                        padding: "10px",
                        borderRadius: "5px",
                        display: "block"
                    }}
                >
                    Proveedores
                </Link>
                
                <button 
                    onClick={handleLogout} 
                    style={{ 
                        marginTop: "30px", 
                        padding: "10px", 
                        backgroundColor: "#7f8c8d", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "5px", 
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default Sidebar;