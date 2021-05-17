const announcementsRepository = require('../repository/announcements');

exports.getAnnouncements = async(req, res) => {
    try {
        announcements = await announcementsRepository.getAnnouncements(req.params.facultyId);
        res.send(announcements);
    } catch (error) {
        console.log(error);
    }
};