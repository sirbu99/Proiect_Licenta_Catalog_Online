const db = require("../../utils/database");

async function getAnnouncements(facultyId) {
    return db.queryPromise(`
        SELECT 
            a.id,
            u.first_name,
            u.last_name,
            a.name,
            a.text 
        FROM announcements as a 
        JOIN users as u ON u.id = a.user_id 
        WHERE a.faculty_id =?;
    `, [facultyId]);
}
async function deleteAnnouncement(id) {
    return db.queryPromise('DELETE FROM announcements WHERE id=?', [id]);
}
async function updateAnnouncement(id, name, text) {
    return db.queryPromise(`
        UPDATE announcements 
        SET 
            name = ?, 
            text = ? 
        WHERE id =?;
    `, [name, text, id]);
}

module.exports = {
    getAnnouncements,
    deleteAnnouncement,
    updateAnnouncement,
}