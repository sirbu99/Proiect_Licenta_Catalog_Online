const db = require("../../utils/database");

async function getUserByEmail(email) {
    return db.queryPromise('SELECT * FROM users WHERE email = ?', [email]);
}

async function getPermissionsByUserId(userId) {
    return db.queryPromise('SELECT permissions.permission_name FROM permissions JOIN roles_permissions on roles_permissions.permission_id  = permissions.id join users ON users.role_id = roles_permissions.role_id WHERE users.id = ?;', userId);
    // return ['faculty'];
}

async function insertIntoUsers(identification_number, first_name, last_name, password, role_id, email, birthday, address, invitation_code) {
    return db.query('INSERT INTO users SET ? ', { identification_number, first_name, last_name, password, role_id, email, birthday, address, invitation_code });
}

module.exports = {
    getUserByEmail,
    getPermissionsByUserId,
    insertIntoUsers,
}