import mysql from 'mysql2/promise';

const conexion = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'IKADENIN',
    waitForConnections: true,
    connectionLimit: 10
});

export default conexion;