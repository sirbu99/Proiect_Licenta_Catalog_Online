const db = require("../../utils/database");

async function getAnnouncements(id) {
    return db.queryPromise('SELECT a.id,a.name,a.text FROM announcements as a JOIN faculties as f ON a.faculty_id = f.id WHERE f.id =?;', [id]);
}

module.exports = {
    getAnnouncements,
}