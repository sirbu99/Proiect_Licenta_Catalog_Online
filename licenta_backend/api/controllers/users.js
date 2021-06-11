const userRepository = require('../repository/user');
const studentsRepository = require('../repository/students');
const teachersRepository = require('../repository/teachers');

exports.getUserInfo = async(req, res) => {
    try {
        userInfo = await userRepository.getUserRole(req.params.userId);
        switch (userInfo[0].role_id) {
            case 6:
                studentInfo = await studentsRepository.getStudentById(req.params.userId);
                res.send(studentInfo);
                break;
            case 5:
                teacherInfo = await teachersRepository.getTeacherById(req.params.userId);
                res.send(teacherInfo);
                break;
            default:
                userInfo = await userRepository.getUserInfo(req.params.userId);
                res.send(userInfo);
                break;
        }

    } catch (error) {
        console.log(error);
    }
}