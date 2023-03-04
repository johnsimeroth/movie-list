const mysql = require('mysql2');

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'movie_list'
});

db.connect();

module.exports = db;