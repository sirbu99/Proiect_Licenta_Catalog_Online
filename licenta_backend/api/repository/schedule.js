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

async function getScheduleByHalfYear(id, year, group, halfYear) {
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

async function deleteAllFromSchedule(facultyId) {
    return db.queryPromise(`
        DELETE schedule FROM schedule
        JOIN faculty_members as fm ON fm.user_id = schedule.user_id
        JOIN faculties as f ON fm.faculty_id = f.id
        WHERE f.id = ?;
    `, [facultyId]);
}

async function deleteFromSchedule(facultyId, id) {
    return db.queryPromise(`
        DELETE schedule FROM schedule as s
        JOIN faculty_members as fm ON fm.user_id = s.user_id
        JOIN faculties as f ON fm.faculty_id = f.id
        WHERE f.id =?
        AND s.id = ?;
    `, [facultyId, id]);
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
    getScheduleByYear,
    getScheduleByGroup,
    getScheduleByHalfYear,
    deleteAllFromSchedule,
    deleteFromSchedule,
    deleteFromScheduleByYear,
    deleteFromScheduleBySubject,
}