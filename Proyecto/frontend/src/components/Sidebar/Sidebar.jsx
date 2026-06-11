import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>IKADENIN</h3>
                <p>Sistema de Gestión de Inventario</p>
            </div>
            
            <hr />
            
            <div className="sidebar-nav">
                <Link to="/" className="sidebar-link">Dashboard</Link>
                <Link to="/categorias" className="sidebar-link">Categorías</Link>
                <Link to="/productos" className="sidebar-link">Productos</Link>
                <Link to="/proveedores" className="sidebar-link">Proveedores</Link>
                
                <button onClick={handleLogout} className="btn-logout">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default Sidebar;