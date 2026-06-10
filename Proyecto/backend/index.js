import express from 'express';
import cors from 'cors';
import productoRutas from "./rutas/productoRutas.js";
import categoriaRutas from './rutas/categoriaRutas.js';
import proveedorRutas from "./rutas/proveedorRutas.js";
import authRutas from "./rutas/authRutas.js";
import dashboardRutas from "./rutas/dashboardRutas.js";
import reporteRutas from "./rutas/reporteRutas.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categorias', categoriaRutas);
app.use("/productos", productoRutas);
app.use("/proveedores", proveedorRutas);
app.use("/auth", authRutas);
app.use("/dashboard", dashboardRutas);
app.use("/reportes", reporteRutas);

const PUERTO = 3001;

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});