const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: 3306,
    connectionLimit: 10, // Establecer el número máximo de conexiones en el pool

    // Opciones de configuración para la reconexión automática
    acquireTimeout: 10000, // Tiempo de espera para adquirir la conexión en milisegundos
    connectionLimit: 10,   // Número máximo de conexiones en el pool
    waitForConnections: true, // Esperar si no hay conexiones disponibles en el pool
    queueLimit: 0, // Sin límite en la cola de conexiones pendientes
});

module.exports = db;

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error al obtener la conexión del pool:', err);
        return;
    }
    
    console.log('Conexión obtenida del pool:', connection.threadId);
    
    // Aquí se pueden realizar otras operaciones en la base de datos.

    // Libera la conexión después de su uso.
    connection.release();
    console.log('Conexión liberada:', connection.threadId);
});