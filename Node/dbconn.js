const mysql = require("mysql2");


const conn = mysql.createPool({
    host: "127.0.0.1",
    user: "reviewer",
    password: "password",
    database: "reviews",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306
});

module.exports = conn;
