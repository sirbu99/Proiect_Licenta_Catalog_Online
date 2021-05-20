const studentsRepository = require('../repository/students')
exports.getStudents = async(req, res) => {
    try {
        students = await studentsRepository.getStudents(req.params.facultyId);
        res.send(students);
    } catch (error) {
        console.log(error);
    }
}

exports.getStudentById = async(req, res) => {
    try {
        student = await studentsRepository.getStudentById(req.params.userId);
        res.send(student);
    } catch (error) {
        console.log(error);
    }
}

exports.updateStudentInfo = async(req, res) => {
    try {
        let studentInfo = req.body;
        student = await studentsRepository.updateStudentInfo(req.params.userId, studentInfo.first_name, studentInfo.last_name, studentInfo.birthday, studentInfo.address, studentInfo.email, studentInfo.funding, studentInfo.year, studentInfo.half_year, studentInfo.group);
        res.send("The student info has been updated!");
    } catch (error) {
        console.log(error);
    }
}

exports.deleteStudent = async(req, res) => {
    try {
        student = await studentsRepository.deteleStudent(req.params.userId);
        res.send("The student has been deleted");
    } catch (error) {
        console.log(error);
    }
}