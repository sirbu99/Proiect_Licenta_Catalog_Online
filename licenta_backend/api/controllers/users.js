const bcrypt = require('bcrypt');
const userRepository = require('../repository/user');
const studentsRepository = require('../repository/students');
const teachersRepository = require('../repository/teachers');

exports.getUserInfo = async(req, res) => {
    try {
        let userId = req.params.userId;
        userInfo = await userRepository.getUserRole(userId);
        switch (userInfo[0].role_id) {
            case 6:
                studentInfo = await studentsRepository.getStudentById(userId);
                res.send(studentInfo);
                break;
            case 5:
                teacherInfo = await teachersRepository.getTeacherById(userId);
                res.send(teacherInfo);
                break;
            default:
                userInfo = await userRepository.getUserInfo(userId);
                res.send(userInfo);
                break;
        }

    } catch (error) {
        console.log(error);
    }
}

exports.changePassword = async(req, res) => {
    try {
        const userInfo = req.body;
        if (userInfo.password !== userInfo.password_confirmation) {
            return res.json({
                message: 'Passwords do not match!'
            });
        }

        let hashedPassword = await bcrypt.hash(userInfo.password, 8);
        user = await userRepository.changePassword(req.params.userId, hashedPassword);
        res.send("The user password has been changed!");

    } catch (error) {
        console.log(error);
    }
}