const db = require("../../utils/database");

async function getAllUniversities() {
    return db.queryPromise('SELECT * FROM universities');
}

async function postUniversity(name, city, country) {
    return db.queryPromise('SET @name = ?;SET @city = ?;SET @country = ?; CALL Add_Universities(@name, @city, @country);', [name, city, country]);
    // return ['faculty'];
}

async function putUniversities(id, name, city, country) {
    return db.queryPromise('SET @id=?; SET @name = ?; SET @city = ?; SET @country = ?; CALL Update_Universities(@id, @name, @city, @country);', [id, name, city, country]);
}

async function deleteUniversity(id) {
    return db.queryPromise('DELETE FROM universities WHERE id= ? ', id)
}

module.exports = {
    getAllUniversities,
    postUniversity,
    putUniversities,
    deleteUniversity,

}