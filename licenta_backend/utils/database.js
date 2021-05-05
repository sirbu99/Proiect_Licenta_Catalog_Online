const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    multipleStatements: true
});

db.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection Failed");
    }
});

db.queryPromise = function(query, params) {
    return (new Promise((resolve, reject) => {
        db.query(query, params, async(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    }));

}

module.exports = db;