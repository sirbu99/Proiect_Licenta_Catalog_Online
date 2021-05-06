const db = require("../../utils/database");

async function getSubjectsList(id) {
    return db.queryPromise('SELECT sub.name,sub.year,sub.semester,sub.nr_credits FROM subjects as sub JOIN schedule as s ON sub.id = s.subject_id JOIN users ON s.user_id = users.id JOIN faculty_members ON faculty_members.user_id = users.id JOIN faculties ON faculty_members.faculty_id = faculties.id WHERE faculties.id =?;', [id]);
}

async function getSubjectsByYear(id, year) {
    return db.queryPromise('SELECT sub.name,sub.semester,sub.nr_credits FROM subjects as sub JOIN schedule as s ON sub.id = s.subject_id JOIN users ON s.user_id = users.id JOIN faculty_members ON faculty_members.user_id = users.id JOIN faculties ON faculty_members.faculty_id = faculties.id WHERE faculties.id =? AND sub.year =?;', [id, year]);
}

async function getSubjectsBySemester(id, year, semester) {
    return db.queryPromise('SELECT sub.name,sub.year,sub.semester,sub.nr_credits FROM subjects as sub JOIN schedule as s ON sub.id = s.subject_id JOIN users ON s.user_id = users.id JOIN faculty_members ON faculty_members.user_id = users.id JOIN faculties ON faculty_members.faculty_id = faculties.id WHERE faculties.id =? AND sub.year =? AND sub.semester =?;', [id, year, semester]);
}


module.exports = {
    getSubjectsList,
    getSubjectsByYear,
    getSubjectsBySemester,
}