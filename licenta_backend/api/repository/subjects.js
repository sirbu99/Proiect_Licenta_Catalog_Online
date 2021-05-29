const db = require("../../utils/database");
const { use } = require("../routes/db");

async function getSubjectsList(id) {
    return db.queryPromise('SELECT sub.name,sub.year,sub.semester,sub.nr_credits FROM subjects as sub JOIN schedule as s ON sub.id = s.subject_id JOIN users ON s.user_id = users.id JOIN faculty_members ON faculty_members.user_id = users.id JOIN faculties ON faculty_members.faculty_id = faculties.id WHERE faculties.id =?;', [id]);
}

async function getSubjectsByYear(id, year) {
    return db.queryPromise('SELECT sub.name,sub.semester,sub.nr_credits FROM subjects as sub JOIN schedule as s ON sub.id = s.subject_id JOIN users ON s.user_id = users.id JOIN faculty_members ON faculty_members.user_id = users.id JOIN faculties ON faculty_members.faculty_id = faculties.id WHERE faculties.id =? AND sub.year =?;', [id, year]);
}

async function getSubjectsBySemester(id, year, semester) {
    return db.queryPromise('SELECT sub.name,sub.year,sub.semester,sub.nr_credits FROM subjects as sub JOIN schedule as s ON sub.id = s.subject_id JOIN users ON s.user_id = users.id JOIN faculty_members ON faculty_members.user_id = users.id JOIN faculties ON faculty_members.faculty_id = faculties.id WHERE faculties.id =? AND sub.year =? AND sub.semester =?;', [id, year, semester]);
}

async function getSubjectsByStudent(userId) {
    return db.queryPromise(`
        SELECT 
            subjects.id,
            name
        FROM subjects 
        JOIN subjects_students as ss ON subjects.id = ss.subject_id
        JOIN students ON ss.student_id = students.id
        WHERE students.user_id = ?;
    `, [userId])
}


module.exports = {
    getSubjectsList,
    getSubjectsByYear,
    getSubjectsBySemester,
    getSubjectsByStudent,
}