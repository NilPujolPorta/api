const mysql = require('mysql2');

const config = require('../Config/config.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    timezone: config.timezone
});

module.exports = pool.promise();