const gradesRepository = require('../repository/grades');
const url = require('url');

exports.getGrades = async(req, res) => {
    try {
        grades = await gradesRepository.getAllGrades(req.params.facultyId);
        res.send(grades);
    } catch (error) {
        console.log(error);
    }
};

exports.getGradesByTeacher = async(req, res) => {
    try {
        const subjectId = url.parse(req.url, true).query.subjectId;
        const year = url.parse(req.url, true).query.year;
        const halfYear = url.parse(req.url, true).query.halfYear;
        const group = url.parse(req.url, true).query.group;
        grades = await gradesRepository.getGradesByTeacher(process.env.AUTH_ID, subjectId, year, halfYear, group);
        res.send(grades);
    } catch (error) {
        console.log(error);
    }
};

exports.getGradesAvg = async(req, res) => {
    try {
        grades = await gradesRepository.getGradesAvgForStudent(req.params.userId);
        res.send(grades);
    } catch (error) {
        console.log(error);
    }
};

exports.getStudentGrades = async(req, res) => {
    try {
        const subjectId = url.parse(req.url, true).query.subjectId;
        grades = await gradesRepository.getGradesByStudent(req.params.userId, subjectId);
        res.send(grades);
    } catch (error) {
        console.log(error);
    }
};

exports.changeGrade = async(req, res) => {
    try {
        gradeInfo = req.body;
        grades = await gradesRepository.changeGrade(gradeInfo.id, gradeInfo.grade);
        res.send("The grade has been changed!");
    } catch (error) {
        console.log(error);
    }
};

exports.changeGradeDate = async(req, res) => {
    try {
        gradeInfo = req.body;
        grades = await gradesRepository.changeGrade(gradeInfo.id, gradeInfo.date);
        res.send("The grade info has been changed!");
    } catch (error) {
        console.log(error);
    }
};

exports.addGrade = async(req, res) => {
    try {
        gradeInfo = req.body;
        grade = await gradesRepository.addGrade(gradeInfo.student_id, gradeInfo.teacher_id, gradeInfo.subject_id, gradeInfo.grade, gradeInfo.year, gradeInfo.half_year, gradeInfo.group, gradeInfo.type, gradeInfo.date);
        res.send(grade);
    } catch (error) {
        console.log(error);
    }
};