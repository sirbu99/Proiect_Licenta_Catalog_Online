const scheduleRepository = require('../repository/schedule');
exports.getSchedule = async(req, res) => {
    try {
        schedule = await scheduleRepository.getSchedule(req.params.facultyId);
        res.send(schedule);
    } catch (error) {
        console.log(error);
    }
};