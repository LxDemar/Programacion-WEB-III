import express from 'express';
import { generarReporteProductos } from '../controladores/reporteControlador.js';
import verificarToken from '../middlewares/auth.js';

const router = express.Router();
router.get('/productos', verificarToken, generarReporteProductos);

export default router;