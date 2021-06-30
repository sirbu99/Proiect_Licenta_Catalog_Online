const studentsRepository = require('../repository/students');
const usersRepository = require('../repository/user');
const bcrypt = require('bcrypt');
const mailer = require('../../utils/mailer');
const url = require('url');

exports.getStudents = async(req, res) => {
    try {
        students = await studentsRepository.getStudents(req.params.facultyId);
        res.send(students);
    } catch (error) {
        console.log(error);
    }
}

exports.getStudentsList = async(req, res) => {
    try {
        const subjectId = url.parse(req.url, true).query.subjectId;
        const year = url.parse(req.url, true).query.year;
        const halfYear = url.parse(req.url, true).query.halfYear;
        const group = url.parse(req.url, true).query.group;
        students = await studentsRepository.getStudentsBySubjectAndTeacher(req.params.facultyId, subjectId, year, halfYear, group, process.env.AUTH_ID);
        res.send(students);
    } catch (error) {
        console.log(error);
    }
}
exports.getStudentsBySubject = async(req, res) => {
    try {
        let reqInfo = req.body;
        students = await studentsRepository.getStudentsBySubject(req.params.facultyId, reqInfo.subject_id, reqInfo.teacher_id);
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
        const registrationNumber = Math.random().toString(26).slice(2).toUpperCase();
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
            registrationNumber,
            studentInfo.group,
        );
        await usersRepository.addFacultyMember(createUserQueryResult.insertId, studentInfo.facultyId);
        mailer.send(
            studentInfo.email,
            'Please finish the registration process',
            `Your registration code is ${invitationCode}: http://localhost:4000/register/${invitationCode}`
        )
        res.send("The student has been added");
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