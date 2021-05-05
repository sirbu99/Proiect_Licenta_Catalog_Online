const db = require("../../utils/database");

async function getAllFaculties(uniId) {
    return db.queryPromise('SELECT * FROM faculties WHERE university_id= ?', uniId);
}

async function getFacultyById(id, uniId) {
    return db.queryPromise('SELECT * FROM faculties WHERE id = ? AND university_id =?', [id, uniId]);
}

async function postFaculty(uniId, name, address, description) {
    return db.queryPromise('SET @university_id = ?; SET @name = ?;SET @address = ?;SET @description = ?; CALL Add_Faculties(@university_id,@name, @address, @description);', [uniId, name, address, description]);
}

async function putFaculty(id, uniId, name, address, description) {
    return db.queryPromise('SET @id= ?; SET @university_id = ?; SET @name = ?;SET @address = ?;SET @description = ?; CALL Update_Faculties(@id, @university_id,@name, @address, @description);', [id, uniId, name, address, description]);
}

async function deleteFaculty(id) {
    return db.queryPromise('DELETE FROM faculties WHERE id= ?;', id)
}

module.exports = {
    getAllFaculties,
    getFacultyById,
    postFaculty,
    putFaculty,
    deleteFaculty,

}