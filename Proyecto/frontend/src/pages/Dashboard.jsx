import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
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
    const [datos, setDatos] = useState({ productos: 0, categorias: 0, proveedores: 0 });
    const [grafico, setGrafico] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setLoading(true);
        try {
            const respuesta = await api.get("/dashboard");
            setDatos(respuesta.data);
            
            const respuestaGrafico = await api.get("/dashboard/grafico");
            setGrafico(respuestaGrafico.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const data = {
        labels: grafico.map(item => item.nombre),
        datasets: [{
            label: "Productos por Categoría",
            data: grafico.map(item => item.cantidad),
            backgroundColor: 'rgba(67, 97, 238, 0.6)',
            borderColor: 'rgba(67, 97, 238, 1)',
            borderWidth: 2,
            borderRadius: 10
        }]
    };

    const options = {
        responsive: true,
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

    if (loading) {
        return <div className="text-center mt-5">Cargando dashboard...</div>;
    }

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
            </div>
            
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="stat-card">
                        <i className="fas fa-box"></i>
                        <h5>Productos</h5>
                        <h1>{datos.productos}</h1>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="stat-card">
                        <i className="fas fa-tags"></i>
                        <h5>Categorías</h5>
                        <h1>{datos.categorias}</h1>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="stat-card">
                        <i className="fas fa-truck"></i>
                        <h5>Proveedores</h5>
                        <h1>{datos.proveedores}</h1>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12">
                    <div className="stat-card">
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;