const subjectsRepository = require('../repository/subjects');

exports.getSubjectsList = async(req, res) => {
    try {
        subjects = await subjectsRepository.getSubjectsList(req.params.facultyId);
        res.send(subjects);
    } catch (error) {
        console.log(error);
    }
};

exports.getSubjects = async(req, res) => {
    try {
        subjects = await subjectsRepository.getSubjects(req.params.facultyId);
        res.send(subjects);
    } catch (error) {
        console.log(error);
    }
};

exports.getSubjectsByStudent = async(req, res) => {
    try {
        subjects = await subjectsRepository.getSubjectsByStudent(req.params.userId);
        res.send(subjects);
    } catch (error) {
        console.log(error);
    }
};

exports.getSubjectsByTeacher = async(req, res) => {
    try {
        subjects = await subjectsRepository.getSubjectsByTeacher(process.env.AUTH_ID);
        res.send(subjects);
    } catch (error) {
        console.log(error);
    }
};