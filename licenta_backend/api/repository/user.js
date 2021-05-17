const db = require("../../utils/database");

async function getUserByEmail(email) {
    return db.queryPromise('SELECT * FROM users WHERE email = ?', [email]);
}

async function getPermissionsByUserId(userId) {
    return db.queryPromise('SELECT permissions.permission_name FROM permissions JOIN roles_permissions on roles_permissions.permission_id  = permissions.id join users ON users.role_id = roles_permissions.role_id WHERE users.id = ?;', userId);
}

async function insertIntoUsers(identification_number, first_name, last_name, password, role_id, email, birthday, address, invitation_code) {
    return db.query('INSERT INTO users SET ? ', { identification_number, first_name, last_name, password, role_id, email, birthday, address, invitation_code });
}

async function getStudents(id) {
    return db.queryPromise('SELECT users.id,first_name,last_name,registration_number,identification_number,users.address,birthday,email FROM students JOIN users ON students.user_id = users.id JOIN faculty_members ON users.id = faculty_members.user_id JOIN faculties ON faculty_members.faculty_id = faculties.id WHERE users.role_id = 6 AND faculties.id = ?;', [id]);
}

async function getTeachers(id) {
    return db.queryPromise('SELECT users.id,first_name,last_name,didactic_degree,email FROM teachers JOIN users ON users.id = teachers.user_id JOIN faculty_members ON users.id = faculty_members.user_id JOIN faculties ON faculty_members.faculty_id = faculties.id WHERE users.role_id = 5 AND faculties.id = ?;', [id]);
}
module.exports = {
    getUserByEmail,
    getPermissionsByUserId,
    insertIntoUsers,
    getStudents,
    getTeachers,
}