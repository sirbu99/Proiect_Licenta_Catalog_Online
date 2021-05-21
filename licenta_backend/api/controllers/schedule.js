const scheduleRepository = require('../repository/schedule');

exports.getSchedule = async(req, res) => {
    try {
        schedule = await scheduleRepository.getSchedule(req.params.facultyId);
        res.send(schedule);
    } catch (error) {
        console.log(error);
    }
};

exports.deleteAllFromSchedule = async(req, res) => {
    try {
        schedule = await scheduleRepository.deleteAllFromSchedule(req.params.facultyId);
        res.send("The schedule has been cleared!");
    } catch (error) {
        console.log(error);
    }
};