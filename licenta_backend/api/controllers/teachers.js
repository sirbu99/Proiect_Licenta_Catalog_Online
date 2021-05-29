const teachersRepository = require('../repository/teachers');
const usersRepository = require('../repository/user');
const bcrypt = require('bcrypt');
const mailer = require('../../utils/mailer');
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
        const [teacher] = await teachersRepository.getTeacherById(req.params.userId);
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

exports.createTeacher = async(req, res) => {
    let hashedPassword = await bcrypt.hash(Math.random().toString(26).slice(2), 8);
    try {
        const teacherInfo = req.body;
        const invitationCode = Math.random().toString(26).slice(2).toUpperCase();
        const createUserQueryResult = await usersRepository.insertIntoUsers(
            teacherInfo.identification_number,
            teacherInfo.first_name,
            teacherInfo.last_name,
            hashedPassword,
            5,
            teacherInfo.email,
            teacherInfo.birthday,
            teacherInfo.address,
            invitationCode,
        );
        await teachersRepository.createTeacher(
            createUserQueryResult.insertId,
            teacherInfo.didactic_degree,
        );
        await usersRepository.addFacultyMember(createUserQueryResult.insertId, teacherInfo.facultyId);
        mailer.send(
            teacherInfo.email,
            'Please finish the registration process',
            `Your registration code is ${invitationCode}`
        )
        res.send("The teacher has been added");
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