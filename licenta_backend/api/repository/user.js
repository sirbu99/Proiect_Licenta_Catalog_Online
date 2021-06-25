const db = require("../../utils/database");

async function getUserByEmail(email) {
    return db.queryPromise('SELECT * FROM users WHERE email = ?', [email]);
}

async function getUserByInvitationCode(invitationCode) {
    return db.queryPromise('SELECT * FROM users WHERE invitation_code = ?', [invitationCode]);
}

async function getPermissionsByUserId(userId) {
    return db.queryPromise('SELECT permissions.permission_name FROM permissions JOIN roles_permissions on roles_permissions.permission_id  = permissions.id join users ON users.role_id = roles_permissions.role_id WHERE users.id = ?;', userId);
}

async function insertIntoUsers(identification_number, first_name, last_name, password, role_id, email, birthday, address, invitation_code) {
    return db.queryPromise(`
    INSERT INTO users
    SET ?
    `, { identification_number, first_name, last_name, password, role_id, email, birthday, address, invitation_code });
}

async function updatePassword(invitationCode, password) {
    return db.queryPromise(`
    Update users
    SET password = ?
    WHERE invitation_code = ?
    `, [password, invitationCode]);
}

async function getUserInfo(userId) {
    return db.queryPromise(`
        SELECT
            first_name,
            last_name,
            email,
            birthday,
            address
        FROM users
        WHERE id = ?;
    `, [userId]);
}

async function changePassword(userId, password) {
    return db.queryPromise(`
        UPDATE users
        SET password = ?
        WHERE id = ?;
    `, [password, userId]);
}

async function getUserRole(userId) {
    return db.queryPromise(`
    SELECT
        role_id
    FROM users
    WHERE id = ?;
    `, [userId]);
}

async function addFacultyMember(userId, facultyId) {
    return db.queryPromise(`
        INSERT INTO faculty_members
        SET 
            user_id = ?, 
            faculty_id = ?
    `, [userId, facultyId]);
}


module.exports = {
    getUserByEmail,
    getPermissionsByUserId,
    insertIntoUsers,
    addFacultyMember,
    getUserInfo,
    getUserRole,
    changePassword,
    updatePassword,
    getUserByInvitationCode,
}