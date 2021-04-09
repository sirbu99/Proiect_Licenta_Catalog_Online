const db = require("../../utils/database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.login = (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide an email and password!'
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async(error, results) => {
            if (results.length === 0 || !(await bcrypt.compareSync(password, results[0].password))) {
                return res.status(401).json({
                    message: 'Invalid credentials!'
                });
            } else {
                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                //console.log("The token is = " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                };
                res.cookie('jwt', token, cookieOptions);
                res.status(200).json({
                    data: {
                        id: results[0].id,
                        api_token: token
                    }
                })
            }
        });

    } catch (error) {
        console.log(error);
    }

};