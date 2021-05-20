const announcementsRepository = require('../repository/announcements');

exports.getAnnouncements = async(req, res) => {
    try {
        announcements = await announcementsRepository.getAnnouncements(req.params.facultyId);
        res.send(announcements);
    } catch (error) {
        console.log(error);
    }
};

exports.deleteAnnouncement = async(req, res) => {
    try {
        announcement = await announcementsRepository.deleteAnnouncement(req.params.id);
        res.send("The selected announcement has been successfully deleted.");
    } catch (error) {
        console.log(error);
    }
};

exports.updateAnnouncement = async(req, res) => {
    try {
        let announcementInfo = req.body
        announcement = await announcementsRepository.updateAnnouncement(req.params.id, announcementInfo.name, announcementInfo.text);
        res.send("The selected announcement has been updated.");
    } catch (error) {
        console.log(error);
    }
};