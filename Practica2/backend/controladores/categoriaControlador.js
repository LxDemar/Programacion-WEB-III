import { insertaCategoria } from '../modelos/categoriaModelo.js';
import { obtCategorias } from '../modelos/categoriaModelo.js';
import { obtCategoriaPorID } from '../modelos/categoriaModelo.js';
import { actualizaCategoria } from '../modelos/categoriaModelo.js';
import { eliminaCategoria } from '../modelos/categoriaModelo.js';

//Ejercicio 1
export const crearCategoria = async (req,res) => {
    const categoria = await insertaCategoria(req.body);
    res.status(201).json(categoria);
}
//Ejercicio 2
export const listarCategorias = async (req,res) => {
    const categorias = await obtCategorias();
    res.status(200).json(categorias);
}
//Ejercicio 3
export const categoriaPorID = async (req,res) => {
    const categoria =
        await obtCategoriaPorID(req.params.id);
    res.status(200).json(categoria);
}
//Ejercicio 4
export const actualizarCategoria = async (req,res) => {
    const categoria =
        await actualizaCategoria(req.params.id, req.body);
    res.status(200).json(categoria);
}
//Ejercicio 5
export const borrarCategoria = async (req,res) => {
    const categoria =
        await eliminaCategoria(req.params.id);

    res.status(200).json(categoria);
}