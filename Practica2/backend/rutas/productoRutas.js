import {
    obtProductos,
    obtProductoPorID, 
    insertaProducto,
    actualizaProducto,
    eliminaProducto,
    productosVencidos
} from "../controladores/productoControlador.js";

import express from 'express';

const rutas = express.Router();
rutas.get('/', obtProductos);
rutas.get('/productosvencidos', productosVencidos);
rutas.get('/:id', obtProductoPorID);
rutas.post('/', insertaProducto);
rutas.patch('/:id', actualizaProducto);
rutas.delete('/:id', eliminaProducto);

export default rutas;
