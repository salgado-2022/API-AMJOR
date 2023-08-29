const mysql = require('mysql');
require('dotenv').config();

const dbConfig = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: 3306,
    connectionLimit: 10,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
};

let db;

function createConnectionPool() {
    db = mysql.createPool(dbConfig);

    db.on('connection', (connection) => {
        console.log('Nueva conexión establecida:', connection.threadId);

        connection.on('error', (err) => {
            if (
                err.code === 'PROTOCOL_CONNECTION_LOST' ||
                err.code === 'PROTOCOL_SEQUENCE_TIMEOUT'
            ) {
                console.log('Error de conexión. Intentando reconectar...');
                createConnectionPool();
            }
        });
    });

    db.on('acquire', (connection) => {
        console.log('Conexión obtenida del pool:', connection.threadId);
    });

    db.on('release', (connection) => {
        console.log('Conexión liberada:', connection.threadId);
    });
}

createConnectionPool();

module.exports = db;
