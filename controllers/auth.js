const db = require("../utils/database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { json } = require("body-parser");


exports.register = (req, res) => {
    const { identificationNr, firstName, lastName, password, passwordConfirm, email, birthday, address, invitationCode } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, result) => {
        if (error) {
            console.log(error);
        }
        if (result.length > 0) {
            return res.json({
                message: 'Email already in use!'
            });
        } else if (password !== passwordConfirm) {
            return res.json({
                message: 'Passwords do not match!'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
    });

};