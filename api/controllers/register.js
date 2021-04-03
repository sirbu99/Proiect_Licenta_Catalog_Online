const db = require("../../utils/database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { json } = require("body-parser");


exports.register = (req, res) => {
    const { identificationNr, firstName, lastName, password, passwordConfirm, roleId, userEmail, birthday, address, invitationCode } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [userEmail], async(error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.json({
                message: 'Email already in use!'
            });
        } else if (password !== passwordConfirm) {
            return res.json({
                message: 'Passwords do not match!'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        // console.log(hashedPassword);

        db.query('INSERT INTO users SET ? ', { identification_number: identificationNr, first_name: firstName, last_name: lastName, password: hashedPassword, role_id: roleId, email: userEmail, birthday: birthday, address: address, invitation_code: invitationCode }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                return res.json({
                    message: 'User registered!'
                });
            }
        });
    });
};