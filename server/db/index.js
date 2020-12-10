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
usersdb.login = (username) => {
    return new Promise((resolve, reject) => {
        returnObj = {}
        pool.query(`SELECT * FROM users WHERE user_name = ?`, [username], (err, results) => {
            if (err) {
                console.log("error:", err);
                return reject(err);
            }
            returnObj["data"] = results
            return resolve(returnObj);
        });
    });
};

usersdb.addUser = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT into users(user_name,password,email,first_name,last_name,phone_number)values(?,?,?,?,?,?) `, [data.username, data.password, data.email, data.firstname, data.lastname, data.phonenum], (err, results) => {
            if (err) {
                console.log("error:", err);
                return reject(err);
            }
            console.log("added row successfully")
            console.log("results", results)
            return resolve(results);
        });
    });
};


usersdb.addEvent = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO events (event_title, admin_username, admin_id, event_description, homepage_url, location, start_date, end_date)values(?,?,?,?,?,?,?,?)`,
            [data.eventTitle, data.adminname, data.adminid, data.eventDesc, data.eventUrl, data.eventCity, data.startdate, data.enddate], (err, results) => {
                if (err) {
                    console.log("error:", err);
                    return reject(err);
                }
                console.log("added event successfully")
                console.log("results", results)
                return resolve(results);
            });
    });
};


usersdb.joinEvent = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO user_events(admin_id, event_id, user_id)values(?,?,?)`,
            [data.adminid, data.eventid, data.userid], (err, results) => {
                if (err) {
                    console.log("error:", err);
                    return reject(err);
                }
                console.log("added event successfully")
                console.log("results", results)
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


usersdb.eventsByLocation = (location) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM events WHERE location = ?`, [location], (err, results) => {
            if (err) {
                console.log("error:", err);
                return reject(err);
            }
            return resolve(results);
        });
    });
};



usersdb.eventsByUser = (userID) => {
    return new Promise((resolve, reject) => {
        pool.query(`Select * from events e, user_events ue, users u where e.event_id = ue.event_id and ue.user_id = u.id and u.user_name = ?`, [userID], (err, results) => {
            if (err) {
                console.log("error:", err);
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = usersdb