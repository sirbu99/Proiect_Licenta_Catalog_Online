const db = require("../../utils/database");

async function getSchedule(id) {
    return db.queryPromise(`
        SELECT 
            s.id,
            s.year,
            s.half_year,
            s.group,
            subjects.name,
            s.classroom,
            s.type,
            s.start_at,
            s.finish_at, 
            s.day
        FROM subjects 
        JOIN schedule as s ON subjects.id = s.subject_id 
        JOIN users ON s.user_id = users.id 
        JOIN faculty_members ON faculty_members.user_id = users.id 
        JOIN faculties ON faculty_members.faculty_id = faculties.id 
        WHERE faculties.id =?;
    `, [id]);
}

async function getScheduleById(id) {
    return db.queryPromise(`
        SELECT 
            user_id,
            subject_id
            year,
            half_year,
            \`group\`,
            classroom,
            start_at,
            finish_at, 
            day,
            type
        FROM schedule;
    `, [id]);
}

async function getScheduleByYear(id, year) {
    return db.queryPromise(`
        SELECT 
            s.id,
            s.year,
            s.half_year,
            s.group,
            subjects.name,
            s.classroom,
            s.type,
            s.start_at,
            s.finish_at 
        FROM subjects 
        JOIN schedule as s ON subjects.id = s.subject_id 
        JOIN users ON s.user_id = users.id 
        JOIN faculty_members ON faculty_members.user_id = users.id 
        JOIN faculties ON faculty_members.faculty_id = faculties.id 
        WHERE faculties.id =? 
        AND s.year =?;
    `, [id, year]);
}

async function getScheduleByGroup(id, year, group, halfYear) {
    return db.queryPromise(`
        SELECT 
            s.id,
            s.year,
            s.half_year,
            s.group,
            subjects.name,
            s.classroom,
            s.type,
            s.start_at,
            s.finish_at 
        FROM subjects 
        JOIN schedule as s ON subjects.id = s.subject_id 
        JOIN users ON s.user_id = users.id 
        JOIN faculty_members ON faculty_members.user_id = users.id 
        JOIN faculties ON faculty_members.faculty_id = faculties.id 
        WHERE faculties.id =? 
        AND s.year =? 
        AND s.group =? 
        AND s.half_year =?;
    `, [id, year, group, halfYear]);
}

async function getScheduleByHalfYear(id, year, halfYear) {
    return db.queryPromise(`
        SELECT 
            s.id,
            s.year,
            s.half_year,
            s.group,
            subjects.name,
            s.classroom,
            s.type,
            s.start_at,
            s.finish_at
        FROM subjects 
        JOIN schedule as s ON subjects.id = s.subject_id 
        JOIN users ON s.user_id = users.id 
        JOIN faculty_members ON faculty_members.user_id = users.id 
        JOIN faculties ON faculty_members.faculty_id = faculties.id 
        WHERE faculties.id =? 
        AND s.year =? 
        AND s.half_year =?;
    `, [id, year, halfYear]);
}

async function addScheduleEntry(userId, subjectId, year, halfYear, group, classroom, startAt, finishAt, day, type) {
    return db.queryPromise(`
        INSERT INTO schedule
        SET 
            user_id = ?,
            subject_id = ?,
            year = ?,
            half_year = ?,
            \`group\` = ?,
            classroom = ?,
            start_at = ?,
            finish_at = ?,
            day = ?,
            type = ?
    `, [userId, subjectId, year, halfYear, group, classroom, startAt, finishAt, day, type]);
}

async function updateSchedule(id, userId, subjectId, year, halfYear, group, classroom, startAt, finishAt, day, type) {
    return db.queryPromise(`
        UPDATE schedule
        SET 
            user_id = ?,
            subject_id = ?,
            year = ?,
            half_year = ?,
            \`group\` = ?,
            classroom = ?,
            start_at = ?,
            finish_at = ?,
            day = ?,
            type = ?
        WHERE id = ?;
    `, [userId, subjectId, year, halfYear, group, classroom, startAt, finishAt, day, type, id]);
}


async function deleteAllFromSchedule(facultyId) {
    return db.queryPromise(`
        DELETE schedule FROM schedule
        JOIN faculty_members as fm ON fm.user_id = schedule.user_id
        JOIN faculties as f ON fm.faculty_id = f.id
        WHERE f.id = ?;
    `, [facultyId]);
}

async function deleteFromScheduleById(id) {
    return db.queryPromise(`
        DELETE FROM schedule 
        WHERE id = ?;
    `, [id]);
}

async function deleteFromScheduleByYear(facultyId, year) {
    return db.queryPromise(`
        DELETE schedule FROM schedule as s
        JOIN faculty_members as fm ON fm.user_id = s.user_id
        JOIN faculties as f ON fm.faculty_id = f.id
        WHERE f.id =?
        AND s.year = ?;
    `, [facultyId, year]);
}

async function deleteFromScheduleBySubject(facultyId, subjectId) {
    return db.queryPromise(`
        DELETE schedule FROM schedule as s
        JOIN faculty_members as fm ON fm.user_id = s.user_id
        JOIN faculties as f ON fm.faculty_id = f.id
        WHERE f.id =?
        AND s.subject_id = ?;
    `, [facultyId, subjectId]);
}

module.exports = {
    getSchedule,
    getScheduleById,
    getScheduleByYear,
    getScheduleByGroup,
    getScheduleByHalfYear,
    addScheduleEntry,
    updateSchedule,
    deleteAllFromSchedule,
    deleteFromScheduleById,
    deleteFromScheduleByYear,
    deleteFromScheduleBySubject,
}