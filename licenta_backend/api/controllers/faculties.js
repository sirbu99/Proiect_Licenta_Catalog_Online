const facultyRepository = require('../repository/faculties');


exports.getAllFaculties = async(req, res) => {
    try {
        faculties = await facultyRepository.getAllFaculties(req.params.universityId);
        res.send(faculties);
    } catch (error) {
        console.log(error);

    }
};

exports.getFacultyById = async(req, res) => {
    try {
        faculty = await facultyRepository.getFacultyById(req.params.facultyId, req.params.universityId);
        res.send(faculty);
    } catch (error) {
        console.log(error);
    }
};

exports.getGroupsFromFaculty = async(req, res) => {
    try {
        groups = await facultyRepository.getGroupsFromFaculty(req.params.facultyId);
        res.send(groups);
    } catch (error) {
        console.log(error);

    }
};

exports.postFaculty = async(req, res) => {
    try {
        let facultyInfo = req.body;
        faculty = await facultyRepository.postFaculty(req.params.universityId, facultyInfo.name, facultyInfo.address, facultyInfo.description);
        faculty.forEach((element) => {
            if (element.constructor == Array) res.send(element);
        });
    } catch (error) {
        console.log(error);
    }
};

exports.putFaculty = async(req, res) => {
    try {
        let facultyInfo = req.body;
        faculty = await facultyRepository.putFaculty(req.params.facultyId, req.params.universityId, facultyInfo.name, facultyInfo.address, facultyInfo.description);
        res.send(
            "The data for the selected faculty has been successfully updated."
        );
    } catch (error) {
        console.log(error);
    }
};

exports.deleteFaculty = async(req, res) => {
    try {
        faculty = await facultyRepository.deleteFaculty(req.params.id);
        res.send("The selected faculty has been successfully deleted.");
    } catch (error) {
        console.log(error);
    }
};