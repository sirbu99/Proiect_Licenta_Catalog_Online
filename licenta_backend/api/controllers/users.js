const userRepository = require('../repository/user');

exports.getStudents = async(req, res) => {
    try {
        students = await userRepository.getStudents(req.params.facultyId);
        res.send(students);
    } catch (error) {
        console.log(error);
    }
}

exports.getTeachers = async(req, res) => {
    try {
        teachers = await userRepository.getTeachers(req.params.facultyId);
        res.send(teachers);
    } catch (error) {
        console.log(error);
    }
}