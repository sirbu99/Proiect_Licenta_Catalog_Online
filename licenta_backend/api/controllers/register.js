const db = require("../../utils/database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { json } = require("body-parser");


exports.register = (req, res) => {
    const { identification_number, first_name, last_name, role_id, email, birthday, address, invitation_code, password, password_confirmation } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.json({
                message: 'Email already in use!'
            });
        } else if (password !== password_confirmation) {
            console.log(password, password_confirmation)
            return res.json({
                message: 'Passwords do not match!'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);


        db.query('INSERT INTO users SET ? ', { identification_number, first_name, last_name, password: hashedPassword, role_id, email, birthday, address, invitation_code }, (error, results) => {
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