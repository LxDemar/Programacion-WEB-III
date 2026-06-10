import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias";
import Productos from "./pages/Productos";
import Proveedores from "./pages/Proveedores";
import Login from "./pages/Login";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
                <ProtectedRoute>
                    <div style={{ display: "flex" }}>
                        <Sidebar />
                        <div style={{ flex: 1, padding: "20px" }}>
                            <Dashboard />
                        </div>
                    </div>
                </ProtectedRoute>
            } />
            
            <Route path="/categorias" element={
                <ProtectedRoute>
                    <div style={{ display: "flex" }}>
                        <Sidebar />
                        <div style={{ flex: 1, padding: "20px" }}>
                            <Categorias />
                        </div>
                    </div>
                </ProtectedRoute>
            } />
            
            <Route path="/productos" element={
                <ProtectedRoute>
                    <div style={{ display: "flex" }}>
                        <Sidebar />
                        <div style={{ flex: 1, padding: "20px" }}>
                            <Productos />
                        </div>
                    </div>
                </ProtectedRoute>
            } />
            
            <Route path="/proveedores" element={
                <ProtectedRoute>
                    <div style={{ display: "flex" }}>
                        <Sidebar />
                        <div style={{ flex: 1, padding: "20px" }}>
                            <Proveedores />
                        </div>
                    </div>
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;