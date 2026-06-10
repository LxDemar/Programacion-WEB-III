import express from "express";
import { listarProductos, crearProducto, actualizarProducto, eliminarProducto } from "../controladores/productoControlador.js";
import verificarToken from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verificarToken, listarProductos);
router.post("/", verificarToken, crearProducto);
router.patch("/:id", verificarToken, actualizarProducto);
router.delete("/:id", verificarToken, eliminarProducto);

export default router;