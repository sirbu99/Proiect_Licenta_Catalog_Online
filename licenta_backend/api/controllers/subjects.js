const subjectsRepository = require('../repository/subjects');

exports.getSubjectsList = async(req, res) => {
    try {
        subjects = await subjectsRepository.getSubjectsList(req.params.facultyId);
        res.send(subjects);
    } catch (error) {
        console.log(error);
    }
};