const userRepository = require('../repository/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide an email and password!'
            });
        }
        const user = await userRepository.getUserByEmail(email);
        if (user.length === 0 || !(await bcrypt.compareSync(password, user[0].password))) {
            return res.status(401).json({
                message: 'Invalid credentials!'
            });
        }

        const id = user[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        let permissions = await userRepository.getPermissionsByUserId(id);
        permissions = permissions.map((p) => p.permission_name);

        res.status(200).json({
            data: {
                id,
                api_token: token,
                permissions: permissions,
            }
        })

    } catch (error) {
        console.log(error);
    }

};

exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({});
};


exports.register = async(req, res) => {
    try {
        const { identification_number, first_name, last_name, role_id, email, birthday, address, invitation_code, password, password_confirmation } = req.body;
        const user = await userRepository.getUserByEmail(email);
        if (user.length > 0) {
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
        await userRepository.insertIntoUsers(identification_number, first_name, last_name, hashedPassword, role_id, email, birthday, address, invitation_code);
        return res.json({
            message: 'User registered!'
        });

    } catch (error) {
        console.log(error);
    };
};