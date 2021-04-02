const express = require('express');
const router = express.Router({ mergeParams: true });

const db = require("../../utils/database");


router.get('/', (req, res) => {
    db.query(
        "SELECT * FROM faculties WHERE university_id= ? ", [req.params.universityId],
        (err, results, fields) => {
            if (!err) {
                res.send(results);
            } else {
                console.log(err);
            }
        }
    );

});


router.get("/:facultyId", (req, res) => {
    db.query(
        "SELECT * FROM faculties WHERE id = ? AND university_id =?", [req.params.facultyId, req.params.universityId],
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
    let faculty = req.body;
    const sql = "SET @university_id = ?; SET @name = ?;SET @address = ?;SET @description = ?; CALL Add_Faculties(@university_id,@name, @address, @description);";
    db.query(
        sql, [
            req.params.universityId,
            faculty.name,
            faculty.address,
            faculty.description
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


router.post("/:facultyId", (req, res) => {
    let faculty = req.body;
    const sql = "SET @id= ?; SET @university_id = ?; SET @name = ?;SET @address = ?;SET @description = ?; CALL Update_Faculties(@id, @university_id,@name, @address, @description);";
    db.query(
        sql, [
            req.params.facultyId,
            req.params.universityId,
            faculty.name,
            faculty.address,
            faculty.description
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
    let faculty = req.body;
    const sql = "SET @university_id = ?; SET @name = ?;SET @address = ?;SET @description = ?; CALL Add_Faculties(@university_id,@name, @address, @description);";
    db.query(
        sql, [
            req.params.facultyId,
            faculty.name,
            faculty.address,
            faculty.description,
        ],
        (err, results, fields) => {
            if (!err) {
                res.send(
                    "The data for the selected faculty has been successfully updated."
                );
            } else {
                console.log(err);
            }
        }
    );
});

router.put("/:facultyId", (req, res) => {
    let faculty = req.body;
    const sql = "SET @id= ?; SET @university_id = ?; SET @name = ?;SET @address = ?;SET @description = ?; CALL Update_Faculties(@id, @university_id,@name, @address, @description);";
    db.query(
        sql, [
            req.params.facultyId,
            req.params.universityId,
            faculty.name,
            faculty.address,
            faculty.description
        ],
        (err, results, fields) => {
            if (!err) {
                res.send(
                    "The data for the selected faculty has been successfully updated."
                );
            } else {
                console.log(err);
            }
        }
    );
});

router.delete("/:id", (req, res) => {
    db.query(
        "DELETE FROM faculties WHERE id= ? ", [req.params.id],
        (err, results, fields) => {
            if (!err) {
                res.send("The selected faculty has been successfully deleted.");
            } else {
                console.log(err);
            }
        }
    );
});


module.exports = router;