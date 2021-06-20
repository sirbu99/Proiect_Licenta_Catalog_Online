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
        WHERE a.faculty_id =?
        AND due_date >= (SELECT NOW());
    `, [facultyId]);
}

async function getAnnouncementById(announcementId) {
    return db.queryPromise(`
        SELECT 
            name,
            text,
            due_date 
        FROM announcements
        WHERE id = ?;
    `, [announcementId]);
}
async function addAnnouncement(facultyId, userId, title, message, dueDate) {
    return db.queryPromise(`
        INSERT INTO announcements
        SET 
            user_id = ?,
            faculty_id = ?,
            name = ?,
            text = ?,
            due_date = ?
    `, [userId, facultyId, title, message, dueDate])
}
async function updateAnnouncement(id, name, text, dueDate) {
    return db.queryPromise(`
        UPDATE announcements 
        SET 
            name = ?, 
            text = ?,
            due_date = ? 
        WHERE id =?;
    `, [name, text, dueDate, id]);
}

async function deleteAnnouncement(id) {
    return db.queryPromise('DELETE FROM announcements WHERE id=?', [id]);
}


module.exports = {
    getAnnouncements,
    deleteAnnouncement,
    updateAnnouncement,
    addAnnouncement,
    getAnnouncementById,
}