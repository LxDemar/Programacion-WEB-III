import { pool } from '../config/bd.js';
//Ejercicio 1
export const insertaCategoria = async (categoria) => {
    const { nombre, descripcion } = categoria;
    await pool.query(
        'INSERT INTO categorias(nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
    );
    return { mensaje: 'Categoria insertada' };
}
//Ejercicio 2
export const obtCategorias = async () => {
    const [resultado] =
        await pool.query('SELECT * FROM categorias');
    return resultado;
}
//Ejercicio 3
export const obtCategoriaPorID = async (id) => {
    const [categoria] =
        await pool.query(
            'SELECT * FROM categorias WHERE id = ?',
            [id]
        );
    const [productos] =
        await pool.query(
            'SELECT * FROM productos WHERE categoria_id = ?',
            [id]
        );
    return {...categoria[0],productos
    };
}
//Ejercicio 4
export const actualizaCategoria = async (id, categoria) => {
    const { nombre, descripcion } = categoria;
    await pool.query(
        'UPDATE categorias SET nombre=?, descripcion=? WHERE id=?',
        [nombre, descripcion, id]
    );
    return { mensaje: 'Categoria actualizada' };
}
//Ejercicio 5
export const eliminaCategoria = async (id) => {
    await pool.query(
        'DELETE FROM categorias WHERE id = ?',
        [id]
    );
    return { mensaje: 'Categoria eliminada' };
}