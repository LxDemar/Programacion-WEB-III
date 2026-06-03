import { pool } from '../config/bd.js';
export const obtTodo = async () => {
  const [resultado] = await pool.query('SELECT * FROM productos');
  return resultado;
}
export const obtProducto = async (id) => {
  const [resultado] = 
    await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return resultado[0];
}
export const inserta = async (producto) => {
  const { nombre, precio, fecha_vencimiento } = producto;
  const [resultado] = 
    await pool.query('INSERT INTO productos(nombre, precio, fecha_vencimiento) VALUES (?,?,?)',
    [nombre, precio, fecha_vencimiento]);
  return { mensaje: "Inserta producto"};
}
export const actualiza = async (id, producto) => {
  const { nombre, precio, fecha_vencimiento } = producto;
  await pool.query(
    'UPDATE productos SET nombre = ?, precio = ?, fecha_vencimiento = ? WHERE id = ?',
    [nombre, precio, fecha_vencimiento, id]);
  return { mensaje: "Actualiza producto"};
}
export const elimina = async (id) => {
  const [resultado] = 
    await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  return { mensaje: "Producto eliminado"};
}
export const obtProductosVencidos = async () => {
  const [resultado] = await pool.query(
    'SELECT * FROM productos WHERE fecha_vencimiento < CURDATE()'
  );
  return resultado;
}
