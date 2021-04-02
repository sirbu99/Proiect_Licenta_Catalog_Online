const express = require('express');
const router = express.Router();

const db = require("../../utils/database");


router.get("/", (req, res) => {
    db.query(
        "SELECT * FROM universities",
        (err, results, fields) => {
            if (!err) {
                res.send(results);
            } else {
                console.log(err);
            }
        }
    );
});


router.post("/", (req, res) => {
    let university = req.body;
    const sql = "SET @name = ?;SET @city = ?;SET @country = ?; CALL Add_Universities(@name, @city, @country);";
    db.query(
        sql, [
            university.name,
            university.city,
            university.country,
        ],
        (err, results, fields) => {
            if (!err) {
                results.forEach((element) => {
                    if (element.constructor == Array) res.send(element);
                });
            } else {
                console.log(err);
            }
        }
    );
});

router.post("/:universityId", (req, res) => {
    let university = req.body;
    const sql = "SET @id=?; SET @name = ?; SET @city = ?; SET @country = ?; CALL Update_Universities(@id, @name, @city, @country);";
    db.query(
        sql, [
            req.params.universityId,
            university.name,
            university.city,
            university.country,
        ],
        (err, results, fields) => {
            if (!err) {
                results.forEach((element) => {
                    if (element.constructor == Array) res.send(element);
                });
            } else {
                console.log(err);
            }
        }
    );
});

router.put("/", (req, res) => {
    let university = req.body;
    const sql = "SET @name = ?;SET @city = ?;SET @country = ?; CALL Add_Universities(@name, @city, @country);";
    db.query(
        sql, [
            university.name,
            university.city,
            university.country,
        ],
        (err, results, fields) => {
            if (!err) {
                res.send(
                    "The data for the selected university has been successfully updated."
                );
            } else {
                console.log(err);
            }
        }
    );
});

router.put("/:universityId", (req, res) => {
    let university = req.body;
    const sql = "SET @id=?; SET @name = ?; SET @city = ?; SET @country = ?; CALL Update_Universities(@id, @name, @city, @country);";
    db.query(
        sql, [
            req.params.universityId,
            university.name,
            university.city,
            university.country,
        ],
        (err, results, fields) => {
            if (!err) {
                res.send(
                    "The data for the selected university has been successfully updated."
                );
            } else {
                console.log(err);
            }
        }
    );
});

router.delete("/:universityId", (req, res) => {
    db.query(
        "DELETE FROM universities WHERE id= ? ", [req.params.universityId],
        (err, results, fields) => {
            if (!err) {
                res.send("The selected university has been successfully deleted.");
            } else {
                console.log(err);
            }
        }
    );
});


module.exports = router;