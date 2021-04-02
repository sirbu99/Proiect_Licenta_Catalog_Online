const mysql = require('mysql');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "database",
    multipleStatements: true
});

db.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection Failed");
    }
});

module.exports = db;