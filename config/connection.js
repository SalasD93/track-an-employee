const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    // mysql default port
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees'
});

module.exports = connection;