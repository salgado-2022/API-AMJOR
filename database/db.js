const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    database: 'amjor',
    user: 'root',
    password: '',
    port: 3306,
})


module.exports = db