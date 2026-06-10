import { useEffect, useState } from "react";
import api from "../services/api";

function Categorias() {

    const [categorias, setCategorias] =
        useState([]);

    const [editando, setEditando] =
        useState(null);

    const [nuevaCategoria,
        setNuevaCategoria] =
        useState({
            nombre: "",
            descripcion: ""
        });

    useEffect(() => {

        cargarCategorias();

    }, []);

    const cargarCategorias =
    async () => {

        try {

            const respuesta =
                await api.get(
                    "/categorias"
                );

            setCategorias(
                respuesta.data
            );

        } catch(error){

            console.log(error);

        }

    };

    const guardarCategoria =
    async (e) => {

        e.preventDefault();

        try {

            if(editando){

                await api.patch(
                    `/categorias/${editando}`,
                    nuevaCategoria
                );

            } else {

                await api.post(
                    "/categorias",
                    nuevaCategoria
                );

            }

            cargarCategorias();

            setEditando(null);

            setNuevaCategoria({
                nombre:"",
                descripcion:""
            });

        } catch(error){

            console.log(error);

        }

    };

    const eliminarCategoria =
    async (id) => {

        try {

            await api.delete(
                `/categorias/${id}`
            );

            cargarCategorias();

        } catch(error){

            console.log(error);

        }

    };

    const cargarEdicion =
    (categoria) => {

        setNuevaCategoria({

            nombre:
                categoria.nombre,

            descripcion:
                categoria.descripcion

        });

        setEditando(
            categoria.id_categoria
        );

    };

    return (

        <div>

            <h2>
                Categorías
            </h2>

            <form
                onSubmit={
                    guardarCategoria
                }
                className="mb-4"
            >

                <input
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={
                        nuevaCategoria.nombre
                    }
                    onChange={(e)=>
                        setNuevaCategoria({
                            ...nuevaCategoria,
                            nombre:e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-2"
                    placeholder="Descripción"
                    value={
                        nuevaCategoria.descripcion
                    }
                    onChange={(e)=>
                        setNuevaCategoria({
                            ...nuevaCategoria,
                            descripcion:e.target.value
                        })
                    }
                />

                <button
                    className="btn btn-success"
                >
                    Guardar
                </button>

            </form>

            <table
                className="table"
            >

                <thead>

                    <tr>

                        <th>
                            Nombre
                        </th>

                        <th>
                            Descripción
                        </th>

                        <th>
                            Acciones
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        categorias.map(
                            (categoria)=>(
                                <tr
                                    key={
                                        categoria.id_categoria
                                    }
                                >

                                    <td>
                                        {
                                            categoria.nombre
                                        }
                                    </td>

                                    <td>
                                        {
                                            categoria.descripcion
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={()=>
                                                cargarEdicion(categoria)
                                            }
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={()=>
                                                eliminarCategoria(
                                                    categoria.id_categoria
                                                )
                                            }
                                        >
                                            Eliminar
                                        </button>

                                    </td>

                                </tr>
                            )
                        )
                    }

                </tbody>

            </table>

        </div>

    );

}

export default Categorias;