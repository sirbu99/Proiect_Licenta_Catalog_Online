const express = require('express');
const router = express.Router({ mergeParams: true });

const scheduleController = require('../controllers/schedule');


router.put("/:scheduleId", scheduleController.updateSchedule);
router.get("/:scheduleId", scheduleController.getScheduleById);
router.delete("/:scheduleId", scheduleController.deleteFromScheduleById);

module.exports = router;