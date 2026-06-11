import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categorias from "./pages/Categorias/Categorias";
import Productos from "./pages/Productos/Productos";
import Proveedores from "./pages/Proveedores/Proveedores";
import Login from "./pages/Login/Login";
import "./styles/global.css";
import "./styles/buttons.css";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
                <ProtectedRoute>
                    <div className="app-layout">
                        <Sidebar />
                        <div className="main-content">
                            <Dashboard />
                        </div>
                    </div>
                </ProtectedRoute>
            } />
            
            <Route path="/categorias" element={
                <ProtectedRoute>
                    <div className="app-layout">
                        <Sidebar />
                        <div className="main-content">
                            <Categorias />
                        </div>
                    </div>
                </ProtectedRoute>
            } />
            
            <Route path="/productos" element={
                <ProtectedRoute>
                    <div className="app-layout">
                        <Sidebar />
                        <div className="main-content">
                            <Productos />
                        </div>
                        
                    </div>
                </ProtectedRoute>
            } />
            
            <Route path="/proveedores" element={
                <ProtectedRoute>
                    <div className="app-layout">
                        <Sidebar />
                        <div className="main-content">
                            <Proveedores />
                        </div>
                    </div>
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;