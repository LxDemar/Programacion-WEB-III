import express from "express";
import {
    obtenerEstadisticas,
    productosPorCategoria
} from "../controladores/dashboardControlador.js";
import verificarToken from "../middlewares/auth.js";

const rutas = express.Router();

rutas.get("/", verificarToken, obtenerEstadisticas);
rutas.get("/grafico", verificarToken, productosPorCategoria);

export default rutas;