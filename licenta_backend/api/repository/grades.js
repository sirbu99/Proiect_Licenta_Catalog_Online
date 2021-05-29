const db = require("../../utils/database");

async function getAllGrades(facultyId) {
    return db.queryPromise(`
        SELECT 
            u.first_name,
            u.last_name,
            subjects.name,
            grade,
            grades.year,
            grades.half_year,
            grades.group,
            grades.date,
            type
        FROM grades 
        JOIN students ON grades.student_id = students.id
        JOIN users AS u ON students.user_id = u.id
        JOIN faculty_members AS fm ON fm.user_id = u.id
        JOIN subjects ON grades.subject_id = subjects.id
        WHERE faculty_id = ?;
    `, [facultyId]);
}
async function getGradesByStudent(userId, subjectId) {
    const bindings = [userId];
    let query = `
        SELECT 
            subjects.name,
            grade,
            grades.date,
            type
        FROM grades 
        JOIN subjects ON grades.subject_id = subjects.id
        JOIN students ON grades.student_id = students.id
        WHERE students.user_id = ?
    `;
    if (subjectId) {
        query += "AND subject_id = ?";
        bindings.push(subjectId);
    }
    return db.queryPromise(query, bindings);
}

async function getGradesByTeacher(teacherId) {
    return db.queryPromise(`
        SELECT 
            u.first_name,
            u.last_name,
            subjects.name,
            grade, 
            grades.year,
            grades.half_year,
            grades.group,
            grades.date,
            type
        FROM grades 
        JOIN students ON grades.student_id = students.id
        JOIN users AS u ON students.user_id = u.id
        JOIN subjects ON grades.subject_id = subjects.id
        WHERE teacher_id = ?;
    `, [teacherId]);
}

async function getGradesByYear(year) {
    return db.queryPromise(`
        SELECT 
            u.first_name,
            u.last_name,
            subjects.name,
            grade, 
            grades.year,
            grades.half_year,
            grades.group,
            grades.date,
            type
        FROM grades 
        JOIN students ON grades.student_id = students.id
        JOIN users AS u ON students.user_id = u.id
        JOIN subjects ON grades.subject_id = subjects.id
        WHERE grades.year = ?;
    `, [year]);
}

async function getGradesBySubject(subjectId) {
    return db.queryPromise(`
        SELECT 
            u.first_name,
            u.last_name,
            grade, 
            grades.year,
            grades.half_year,
            grades.group,
            grades.date,
            type
        FROM grades 
        JOIN students ON grades.student_id = students.id
        JOIN users AS u ON students.user_id = u.id
        WHERE subject_id = ?;
    `, [subjectId]);
}

async function getGradesAvgForStudent(studentId) {
    return db.queryPromise(`
        SELECT 
            student_id,
            AVG(grade)
        FROM grades 
        WHERE student_id = ?
        GROUP BY student_id;
    `, [studentId]);
}

async function addGrade(studentId, teacherId, subjectId, grade, year, halfYear, group, type, date) {
    return db.queryPromise(`
        INSERT INTO grades
        SET   
            student_id = ?,
            teacher_id = ?,
            subject_id = ?,
            grade = ?,
            year = ?,
            half_year = ?,
            \`group\` = ?,
            type = ?,
            date = ?;
    `, [studentId, teacherId, subjectId, grade, year, halfYear, group, type, date]);
}


async function changeGrade(id, grade) {
    return db.queryPromise(`
        UPDATE grades
        SET   
            grade = ?
        WHERE id = ?;
    `, [grade, id]);
}

async function changeGradeDate(id, date) {
    return db.queryPromise(`
        UPDATE grades
        SET   
            date = ?
        WHERE id = ?;
    `, [date, id]);
}

module.exports = {
    getAllGrades,
    getGradesByStudent,
    getGradesByTeacher,
    getGradesByYear,
    getGradesAvgForStudent,
    addGrade,
    changeGrade,
    changeGradeDate,
    getGradesBySubject,
}