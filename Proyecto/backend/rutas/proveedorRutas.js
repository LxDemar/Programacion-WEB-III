import express from "express";
import {
    listarProveedores,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
} from "../controladores/proveedorControlador.js";
import verificarToken from "../middlewares/auth.js";

const rutas = express.Router();

rutas.get("/", verificarToken, listarProveedores);
rutas.post("/", verificarToken, crearProveedor);
rutas.patch("/:id", verificarToken, actualizarProveedor);
rutas.delete("/:id", verificarToken, eliminarProveedor);

export default rutas;