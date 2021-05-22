const studentsRepository = require('../repository/students');
const usersRepository = require('../repository/user');
const bcrypt = require('bcrypt');
const mailer = require('../../utils/mailer');

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
        const [student] = await studentsRepository.getStudentById(req.params.userId);
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

exports.createStudent = async(req, res) => {
    let hashedPassword = await bcrypt.hash(Math.random().toString(26).slice(2), 8);
    try {
        const studentInfo = req.body;
        const invitationCode = Math.random().toString(26).slice(2).toUpperCase();
        const createUserQueryResult = await usersRepository.insertIntoUsers(
            studentInfo.identification_number,
            studentInfo.first_name,
            studentInfo.last_name,
            hashedPassword,
            6,
            studentInfo.email,
            studentInfo.birthday,
            studentInfo.address,
            invitationCode,
        );
        await studentsRepository.createStudent(
            createUserQueryResult.insertId,
            studentInfo.funding,
            studentInfo.year,
            studentInfo.half_year,
            studentInfo.group,
        );
        await usersRepository.addFacultyMember(createUserQueryResult.insertId, studentInfo.facultyId);
        mailer.send(
            studentInfo.email,
            'Please finish the registration process',
            `Your registration code is ${invitationCode}`
        )
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