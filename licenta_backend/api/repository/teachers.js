const db = require("../../utils/database");


async function getTeachers(id) {
    return db.queryPromise(`
        SELECT 
            users.id,
            first_name,
            last_name,
            didactic_degree,
            email 
        FROM teachers 
        JOIN users ON users.id = teachers.user_id 
        JOIN faculty_members ON users.id = faculty_members.user_id 
        JOIN faculties ON faculty_members.faculty_id = faculties.id 
        WHERE users.role_id = 5 
        AND teachers.is_deleted = 0 
        AND faculties.id = ?;
    `, [id]);
}

async function getTeacherById(id) {
    return db.queryPromise(`
        SELECT 
            users.identification_number,
            first_name,
            last_name,
            birthday,
            users.address,
            email,
            didactic_degree
        FROM teachers 
        JOIN users ON users.id = teachers.user_id 
        JOIN faculty_members ON users.id = faculty_members.user_id 
        JOIN faculties ON faculty_members.faculty_id = faculties.id 
        WHERE users.role_id = 5 
        AND teachers.is_deleted = 0 
        AND users.id = ?;
    `, [id]);
}


async function deleteTeacher(id) {
    return db.queryPromise(`
        UPDATE teachers 
        JOIN users ON users.id = teachers.user_id  
        SET 
            teachers.is_deleted = 1, 
            users.is_deleted = 1 
        WHERE users.role_id = 5
        AND users.id = ?;
    `, [id]);
}


async function updateTeacherInfo(fName, lName, birthday, address, email, didacticDegree, id) {
    return db.queryPromise(`
        UPDATE teachers as t 
        JOIN users as u ON t.user_id = u.id 
        SET 
            u.first_name = ?, 
            u.last_name = ?, 
            u.birthday = ?, 
            u.address = ?, 
            u.email = ?, 
            t.didactic_degree =?          
        WHERE u.role_id = 5 
        AND u.id = ?;
    `, [fName, lName, birthday, address, email, didacticDegree, id]);
}

async function createTeacher(userId, didacticDegree) {
    return db.queryPromise(`
        INSERT INTO teachers
        SET 
            user_id = ?, 
            didactic_degree = ?;
    `, [userId, didacticDegree]);
}

module.exports = {
    getTeachers,
    getTeacherById,
    deleteTeacher,
    updateTeacherInfo,
    createTeacher,
}