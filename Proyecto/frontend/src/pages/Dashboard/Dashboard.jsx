import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const navigate = useNavigate();
    const [datos, setDatos] = useState({ 
        productos: 0, 
        categorias: 0, 
        proveedores: 0 
    });
    const [grafico, setGrafico] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const respuesta = await api.get("/dashboard");
            setDatos(respuesta.data);
            
            const respuestaGrafico = await api.get("/dashboard/grafico");
            setGrafico(respuestaGrafico.data);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    const data = {
        labels: grafico.map(item => item.nombre),
        datasets: [{
            label: "Productos por Categoría",
            data: grafico.map(item => item.cantidad),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            borderRadius: 5
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distribución de Productos',
                font: { size: 16 }
            }
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
            </div>
            
            <div className="stats-grid">
                <div className="stat-card stat-card-primary">
                    <div className="stat-info">
                        <h3>Productos</h3>
                        <p className="stat-number">{datos.productos}</p>
                    </div>
                </div>
                
                <div className="stat-card stat-card-success">
                    <div className="stat-info">
                        <h3>Categorías</h3>
                        <p className="stat-number">{datos.categorias}</p>
                    </div>
                </div>
                
                <div className="stat-card stat-card-warning">
                    <div className="stat-info">
                        <h3>Proveedores</h3>
                        <p className="stat-number">{datos.proveedores}</p>
                    </div>
                </div>
            </div>
            
            <div className="chart-container">
                <div className="chart-wrapper">
                    {grafico.length > 0 ? (
                        <Bar data={data} options={options} />
                    ) : (
                        <div className="chart-empty">
                            <p>No hay datos para mostrar</p>
                            <button className="btn-primary" onClick={() => navigate("/productos")}>
                                Agregar Productos
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;