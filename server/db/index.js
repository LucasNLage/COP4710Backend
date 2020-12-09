const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: "password",
    user: 'root',
    database: 'databaseapp',
    host: 'localhost',
    port: '3306'
})

let usersdb = {};

usersdb.usersAll = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

usersdb.usersOne = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE id = ?`, [id], (err, results) => {
            if (err) {
                console.log("error:", err);
                return reject(err);
            }
            return resolve(results);
        });
    });
};

usersdb.eventsAll = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM events', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

usersdb.eventsOne = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM events WHERE event_id = ?`, [id], (err, results) => {
            if (err) {
                console.log("error:", err);
                return reject(err);
            }
            return resolve(results);
        });
    });
};


usersdb.eventsByAdmin = (adminID) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM events WHERE admin_username = ?`, [adminID], (err, results) => {
            if (err) {
                console.log("error:", err);
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = usersdb