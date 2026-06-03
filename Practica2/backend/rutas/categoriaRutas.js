import express from 'express';
import {
    crearCategoria,
    listarCategorias,
    categoriaPorID,
    actualizarCategoria,
    borrarCategoria
} from '../controladores/categoriaControlador.js';

const rutas = express.Router();
rutas.post('/', crearCategoria);
rutas.get('/', listarCategorias);
rutas.get('/:id', categoriaPorID);
rutas.patch('/:id', actualizarCategoria);
rutas.delete('/:id', borrarCategoria);
export default rutas;