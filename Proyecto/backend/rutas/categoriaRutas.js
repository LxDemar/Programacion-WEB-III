import express from "express";
import {
    listarCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} from "../controladores/categoriaControlador.js";
import verificarToken from "../middlewares/auth.js";

const rutas = express.Router();

rutas.get("/", verificarToken, listarCategorias);
rutas.post("/", verificarToken, crearCategoria);
rutas.patch("/:id", verificarToken, actualizarCategoria);
rutas.delete("/:id", verificarToken, eliminarCategoria);

export default rutas;