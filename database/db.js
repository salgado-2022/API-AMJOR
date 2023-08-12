const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'sql9.freemysqlhosting.net',
    database: 'sql9639312',
    user: 'sql9639312',
    password: 'gMJmQfY5s8',
    port: 3306,
})

module.exports = db

// const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: 'localhost',
//     database: 'amjor',
//     user: 'root',
//     password: '',
//     port: 3306,
// })

// module.exports = db