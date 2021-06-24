const db = require("../../utils/database");

async function getAllUniversities() {
    return db.queryPromise('SELECT * FROM universities');
}

async function getUniversityById(id) {
    return db.queryPromise('SELECT * FROM universities WHERE id = ?', [id]);
}

async function postUniversity(name, city, country) {
    return db.queryPromise('SET @name = ?;SET @city = ?;SET @country = ?; CALL Add_Universities(@name, @city, @country);', [name, city, country]);
}

async function putUniversity(id, name, city, country) {
    return db.queryPromise('SET @id=?; SET @name = ?; SET @city = ?; SET @country = ?; CALL Update_Universities(@id, @name, @city, @country);', [id, name, city, country]);
}

async function deleteUniversity(id) {
    return db.queryPromise('DELETE FROM universities WHERE id= ? ', id)
}

module.exports = {
    getAllUniversities,
    postUniversity,
    putUniversity,
    deleteUniversity,
    getUniversityById,

}