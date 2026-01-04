const mysql = require('mysql2');

// Veritabanı Bağlantı Havuzu
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ege_lojistik',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promise wrapper kullanmak için
const promisePool = pool.promise();

module.exports = promisePool;
