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
        let userRole = await userRepository.getUserRole(id);
        permissions = permissions.map((p) => p.permission_name);

        res.status(200).json({
            data: {
                id,
                api_token: token,
                permissions: permissions,
                role_id: userRole[0].role_id,
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
        const userInfo = req.body;
        const user = await userRepository.getUserByInvitationCode(userInfo.invitation_code);
        if (user.length <= 0) {
            return res.json({
                message: 'There is no such user!'
            });
        } else if (userInfo.password !== userInfo.password_confirmation) {
            return res.json({
                message: 'Passwords do not match!'
            });
        }
        console.log(userInfo.invitation_code);
        let hashedPassword = await bcrypt.hash(userInfo.password, 8);
        await userRepository.updatePassword(
            userInfo.invitation_code,
            hashedPassword
        );
        return res.json({
            message: 'User registered!'
        });

    } catch (error) {
        console.log(error);
    };
};