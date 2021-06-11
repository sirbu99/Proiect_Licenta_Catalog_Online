const db = require("../../utils/database");

async function getStudents(id) {
    return db.queryPromise(`
        SELECT 
            users.id,
            first_name,
            last_name,
            registration_number,
            identification_number,
            users.address,
            birthday,
            email 
        FROM students 
        JOIN users ON students.user_id = users.id 
        JOIN faculty_members ON users.id = faculty_members.user_id 
        JOIN faculties ON faculty_members.faculty_id = faculties.id 
        WHERE users.role_id = 6 
        AND students.is_deleted = 0 
        AND faculties.id = ?;
    `, [id]);
}

async function getStudentById(id) {
    return db.queryPromise(`
        SELECT 
            users.id,
            first_name,
            last_name,
            registration_number,
            identification_number,
            users.address,
            birthday,
            email,
            funding,
            year,
            half_year,
            \`group\` 
        FROM students 
        JOIN users ON students.user_id = users.id
        WHERE users.role_id = 6 
        AND students.is_deleted = 0 
        AND users.id = ?;
    `, [id]);
}

async function deteleStudent(id) {
    return db.queryPromise(`
        UPDATE students 
        JOIN users ON students.user_id = users.id 
        SET 
            students.is_deleted = 1, 
            users.is_deleted = 1 
        WHERE users.role_id = 6 
        AND users.id = ?;
    `, [id]);
}

async function updateStudentInfo(id, fName, lName, birthday, address, email, funding, year, halfYear, group) {
    return db.queryPromise(`
        UPDATE students as s 
        JOIN users as u ON s.user_id = u.id 
        SET
            u.first_name = ?, 
            u.last_name = ?, 
            u.birthday = ?, 
            u.address = ?, 
            u.email = ?, 
            s.funding = ?, 
            s.year = ?, 
            half_year = ?, 
            \`group\` = ?
        WHERE u.role_id = 6 
        AND u.id = ?;
    `, [fName, lName, birthday, address, email, funding, year, halfYear, group, id]);
}

async function createStudent(userId, funding, year, halfYear, group) {
    return db.queryPromise(`
        INSERT INTO students 
        SET 
            user_id = ?, 
            funding = ?, 
            year = ?, 
            half_year = ?, 
            \`group\` = ?;
    `, [userId, funding, year, halfYear, group]);
}

async function getStudentsBySubject(id, subjectId, teacherId) {
    return db.queryPromise(`
        SELECT 
            users.id,
            first_name,
            last_name
        FROM students 
        JOIN faculty_members ON students.user_id = faculty_members.user_id 
        JOIN faculties ON faculty_members.faculty_id = faculties.id 
        JOIN subjects_students AS ss ON ss.student_id = students.id
        JOIN subjects_teachers AS st ON st.subject_id = ss.subject_id
        WHERE users.role_id = 6 
        AND ss.subject_id = ?
        AND st.teacher_id = ?
        AND students.is_deleted = 0 
        AND faculties.id = ?;
    `, [subjectId, teacherId, id]);
}

async function getStudentsList(id) {
    return db.queryPromise(`
        SELECT 
            registration_number,
            first_name,
            last_name
            FROM students 
            JOIN users ON students.user_id = users.id 
            JOIN faculty_members ON users.id = faculty_members.user_id 
            JOIN faculties ON faculty_members.faculty_id = faculties.id 
            WHERE users.role_id = 6 
            AND students.is_deleted = 0 
            AND faculties.id = ?;
    `, [id]);
}

module.exports = {
    getStudents,
    getStudentById,
    deteleStudent,
    createStudent,
    updateStudentInfo,
    getStudentsList,
    getStudentsBySubject,
}