// index.js
import express from 'express';
import productoRutas from './rutas/productoRutas.js';
import categoriaRutas from './rutas/categoriaRutas.js';
const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/productos', productoRutas);
app.use('/categorias', categoriaRutas);

// Iniciar servidor
const PUERTO = 3001;
app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});
