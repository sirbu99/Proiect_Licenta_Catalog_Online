const db = require("../../utils/database");
const uniRepository = require('../repository/universities');

exports.getAllUniversities = async(req, res) => {
    try {
        universities = await uniRepository.getAllUniversities();
        res.send(universities);
    } catch (error) {
        console.log(error);
    }
};

exports.postUniversity = async(req, res) => {
    try {
        let universityInfo = req.body;
        university = await uniRepository.postUniversity(universityInfo.name, universityInfo.city, universityInfo.country);
        university.forEach((element) => {
            if (element.constructor == Array) res.send(element);
        });
    } catch (error) {
        console.log(error);
    }
};

exports.putUniversity = async(req, res) => {
    try {
        let universityInfo = req.body;
        university = await uniRepository.putUniversity(req.params.universityId, universityInfo.name, universityInfo.city, universityInfo.country)
        res.send(
            "The data for the selected university has been successfully updated."
        );
    } catch (error) {
        console.log(error);
    }
}

exports.deleteUniversity = async(req, res) => {
    try {
        university = await uniRepository.deleteUniversity(req.params.universityId);
        res.send("The selected university has been successfully deleted.");

    } catch (error) {
        console.log(error);
    }
}