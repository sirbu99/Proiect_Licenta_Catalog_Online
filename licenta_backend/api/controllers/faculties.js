const db = require("../../utils/database");

exports.getAllFaculties = (req, res) => {
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

};

exports.getFacultyById = (req, res) => {
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
};

exports.postFaculty = (req, res) => {
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
};

exports.postFacultyById = (req, res) => {
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
};

exports.putFaculty = (req, res) => {
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
};

exports.putFacultyById = (req, res) => {
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
};

exports.deleteFaculty = (req, res) => {
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
};