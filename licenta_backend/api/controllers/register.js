const userRepository = require('../repository/user');
const bcrypt = require('bcryptjs');

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