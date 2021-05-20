const teachersRepository = require('../repository/teachers')
exports.getTeachers = async(req, res) => {
    try {
        teachers = await teachersRepository.getTeachers(req.params.facultyId);
        res.send(teachers);
    } catch (error) {
        console.log(error);
    }
}

exports.getTeacherById = async(req, res) => {
    try {
        teacher = await teachersRepository.getTeacherById(req.params.userId);
        res.send(teacher);
    } catch (error) {
        console.log(error);
    }
}

exports.updateTeacherInfo = async(req, res) => {
    try {
        let teacherInfo = req.body;
        teacher = await teachersRepository.updateTeacherInfo(teacherInfo.first_name, teacherInfo.last_name, teacherInfo.birthday, teacherInfo.address, teacherInfo.email, teacherInfo.didactic_degree, req.params.userId);
        res.send("The teacher info has been updated");
    } catch (error) {
        console.log(error);
    }
}

exports.deleteTeacher = async(req, res) => {
    try {
        teacher = await teachersRepository.deleteTeacher(req.params.userId);
        res.send("The teacher has been deleted");
    } catch (error) {
        console.log(error);
    }
}