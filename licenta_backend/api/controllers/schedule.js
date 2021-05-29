const scheduleRepository = require('../repository/schedule');

exports.getSchedule = async(req, res) => {
    try {
        schedule = await scheduleRepository.getSchedule(req.params.facultyId);
        res.send(schedule);
    } catch (error) {
        console.log(error);
    }
};

exports.getScheduleById = async(req, res) => {
    try {
        const [schedule] = await scheduleRepository.getScheduleById(req.params.scheduleId);
        res.send(schedule);
    } catch (error) {
        console.log(error);
    }
};

exports.addScheduleEntry = async(req, res) => {
    try {
        let scheduleInfo = req.body;
        await scheduleRepository.addScheduleEntry(
            scheduleInfo.user_id,
            scheduleInfo.subject_id,
            scheduleInfo.year,
            scheduleInfo.halfYear,
            scheduleInfo.group,
            scheduleInfo.classroom,
            scheduleInfo.startAt,
            scheduleInfo.finishAt,
            scheduleInfo.day,
            scheduleInfo.type,
        );
        res.send("Succes.");
    } catch (error) {
        console.log(error);
    }
};

exports.updateSchedule = async(req, res) => {
    try {
        let scheduleInfo = req.body;
        schedule = await scheduleRepository.updateSchedule(
            req.params.scheduleId,
            scheduleInfo.user_id,
            scheduleInfo.subject_id,
            scheduleInfo.year,
            scheduleInfo.half_year,
            scheduleInfo.group,
            scheduleInfo.classroom,
            scheduleInfo.start_at,
            scheduleInfo.finish_at,
            scheduleInfo.day,
            scheduleInfo.type,
        );
        res.send("Schedule successfully updated!");
    } catch (error) {
        console.log(error);
    }
};

exports.getScheduleByYear = async(req, res) => {
    try {
        schedule = await scheduleRepository.getScheduleByYear(req.params.facultyId, req.body.year);
        res.send(schedule);
    } catch (error) {
        console.log(error);
    }
};

exports.getScheduleByGroup = async(req, res) => {
    try {
        let scehduleInfo = req.body;
        schedule = await scheduleRepository.getScheduleByGroup(req.params.facultyId, scehduleInfo.year, scehduleInfo.group, scehduleInfo.halfYear);
        res.send(schedule);
    } catch (error) {
        console.log(error);
    }
};

exports.getScheduleByHalfYear = async(req, res) => {
    try {
        let scehduleInfo = req.body;
        schedule = await scheduleRepository.getScheduleByHalfYear(req.params.facultyId, scehduleInfo.year, scehduleInfo.halfYear);
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

exports.deleteFromScheduleById = async(req, res) => {
    try {
        schedule = await scheduleRepository.deleteFromScheduleById(req.params.scheduleId);
        res.send("The schedule has been cleared!");
    } catch (error) {
        console.log(error);
    }
};

exports.deleteFromScheduleBySubject = async(req, res) => {
    try {
        schedule = await scheduleRepository.deleteFromScheduleBySubject(req.params.facultyId, req.body.subjectId);
        res.send("The schedule has been cleared!");
    } catch (error) {
        console.log(error);
    }
};