import { useEffect, useState } from "react";
import api from "../../services/api";

function Proveedores() {
    const [proveedores, setProveedores] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nuevoProveedor, setNuevoProveedor] = useState({
        nombre: "",
        telefono: "",
        correo: ""
    });

    useEffect(() => {
        cargarProveedores();
    }, []);

    const cargarProveedores = async () => {
        try {
            const respuesta = await api.get("/proveedores");
            setProveedores(respuesta.data);
        } catch(error) {
            console.log(error);
            alert("Error al cargar proveedores");
        }
    };

    const guardarProveedor = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await api.patch(`/proveedores/${editando}`, nuevoProveedor);
            } else {
                await api.post("/proveedores", nuevoProveedor);
            }
            cargarProveedores();
            setEditando(null);
            setNuevoProveedor({ nombre: "", telefono: "", correo: "" });
            alert("Proveedor guardado");
        } catch(error) {
            console.log(error);
            alert("Error al guardar");
        }
    };

    const eliminarProveedor = async (id) => {
        if (window.confirm("¿Eliminar proveedor?")) {
            try {
                await api.delete(`/proveedores/${id}`);
                cargarProveedores();
            } catch(error) {
                console.log(error);
                alert("Error al eliminar");
            }
        }
    };

    const cargarEdicion = (proveedor) => {
        setNuevoProveedor({
            nombre: proveedor.nombre,
            telefono: proveedor.telefono,
            correo: proveedor.correo
        });
        setEditando(proveedor.id_proveedor);
    };

    return (
        <div>
            <h2>Proveedores</h2>
            
            <form onSubmit={guardarProveedor} className="mb-4">
                <input
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={nuevoProveedor.nombre}
                    onChange={(e) => setNuevoProveedor({...nuevoProveedor, nombre: e.target.value})}
                    required
                />
                <input
                    className="form-control mb-2"
                    placeholder="Teléfono"
                    value={nuevoProveedor.telefono}
                    onChange={(e) => setNuevoProveedor({...nuevoProveedor, telefono: e.target.value})}
                />
                <input
                    className="form-control mb-2"
                    placeholder="Correo"
                    type="email"
                    value={nuevoProveedor.correo}
                    onChange={(e) => setNuevoProveedor({...nuevoProveedor, correo: e.target.value})}
                />
                <button className="btn btn-success">
                    {editando ? "Actualizar" : "Guardar"}
                </button>
                {editando && (
                    <button 
                        type="button" 
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setEditando(null);
                            setNuevoProveedor({ nombre: "", telefono: "", correo: "" });
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map(proveedor => (
                        <tr key={proveedor.id_proveedor}>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.telefono}</td>
                            <td>{proveedor.correo}</td>
                            <td>
                                <button 
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => cargarEdicion(proveedor)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => eliminarProveedor(proveedor.id_proveedor)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Proveedores;