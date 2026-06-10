import express from "express";
import { login, registrar } from "../controladores/authControlador.js";

const router = express.Router();

router.post("/login", login);
router.post("/registrar", registrar);

export default router;