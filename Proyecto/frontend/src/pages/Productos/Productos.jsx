import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Productos.css";

function Productos() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        id_categoria: "",
        id_proveedor: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
        cargarProductos();
        cargarCategorias();
        cargarProveedores();
    }, []);

    const cargarProductos = async () => {
        try {
            const respuesta = await api.get("/productos");
            setProductos(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    const cargarCategorias = async () => {
        try {
            const respuesta = await api.get("/categorias");
            setCategorias(respuesta.data);
            if (respuesta.data.length > 0 && !nuevoProducto.id_categoria) {
                setNuevoProducto(prev => ({ ...prev, id_categoria: respuesta.data[0].id_categoria }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cargarProveedores = async () => {
        try {
            const respuesta = await api.get("/proveedores");
            setProveedores(respuesta.data);
            if (respuesta.data.length > 0 && !nuevoProducto.id_proveedor) {
                setNuevoProducto(prev => ({ ...prev, id_proveedor: respuesta.data[0].id_proveedor }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const guardarProducto = async (e) => {
        e.preventDefault();
        
        if (!nuevoProducto.nombre || nuevoProducto.nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres");
            return;
        }
        if (!nuevoProducto.precio || nuevoProducto.precio <= 0) {
            alert("El precio debe ser mayor a 0");
            return;
        }
        if (nuevoProducto.stock < 0) {
            alert("El stock no puede ser negativo");
            return;
        }

        try {
            if (editando) {
                await api.patch(`/productos/${editando}`, nuevoProducto);
            } else {
                await api.post("/productos", nuevoProducto);
            }
            cargarProductos();
            setEditando(null);
            limpiarFormulario();
            alert("Producto guardado");
        } catch (error) {
            console.log(error);
            alert("Error al guardar producto");
        }
    };

    const limpiarFormulario = () => {
        setNuevoProducto({
            nombre: "",
            descripcion: "",
            precio: "",
            stock: "",
            id_categoria: categorias[0]?.id_categoria || "",
            id_proveedor: proveedores[0]?.id_proveedor || ""
        });
    };

    const eliminarProducto = async (id) => {
        if (window.confirm("¿Eliminar producto?")) {
            try {
                await api.delete(`/productos/${id}`);
                cargarProductos();
            } catch (error) {
                console.log(error);
                alert("Error al eliminar");
            }
        }
    };

    const cargarEdicion = (producto) => {
        setNuevoProducto({
            nombre: producto.nombre,
            descripcion: producto.descripcion || "",
            precio: producto.precio,
            stock: producto.stock,
            id_categoria: producto.id_categoria,
            id_proveedor: producto.id_proveedor
        });
        setEditando(producto.id_producto);
    };
    const generarPDF = async () => {
        try {
            const response = await api.get('/reportes/productos', {
                responseType: 'blob',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte_productos.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Error al generar el reporte');
        }
    };
    return (
        <div>
            <h2>Productos</h2>
            <button onClick={generarPDF} className="btn btn-danger mb-3">
                Reporte PDF
            </button>
            <form onSubmit={guardarProducto} className="mb-4 border p-3">
                <h4>{editando ? "Editar Producto" : "Nuevo Producto"}</h4>
                <input
                    className="form-control mb-2"
                    placeholder="Nombre *"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                    required
                />

                <textarea
                    className="form-control mb-2"
                    placeholder="Descripción"
                    value={nuevoProducto.descripcion}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                    rows="2"
                />

                <div className="row">
                    <div className="col-md-6">
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Precio *"
                            value={nuevoProducto.precio}
                            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Stock"
                            value={nuevoProducto.stock}
                            onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <select
                            className="form-control mb-2"
                            value={nuevoProducto.id_categoria}
                            onChange={(e) => setNuevoProducto({ ...nuevoProducto, id_categoria: e.target.value })}
                            required
                        >
                            <option value="">Seleccione Categoría</option>
                            {categorias.map(cat => (
                                <option key={cat.id_categoria} value={cat.id_categoria}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <select
                            className="form-control mb-2"
                            value={nuevoProducto.id_proveedor}
                            onChange={(e) => setNuevoProducto({ ...nuevoProducto, id_proveedor: e.target.value })}
                            required
                        >
                            <option value="">Seleccione Proveedor</option>
                            {proveedores.map(prov => (
                                <option key={prov.id_proveedor} value={prov.id_proveedor}>
                                    {prov.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-success">
                    {editando ? "Actualizar" : "Guardar"}
                </button>
                {editando && (
                    <button type="button" className="btn btn-secondary ms-2" onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Proveedor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id_producto}>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.categoria || "Sin categoría"}</td>
                            <td>{producto.proveedor_nombre || "Sin proveedor"}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => cargarEdicion(producto)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(producto.id_producto)}>
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

export default Productos;