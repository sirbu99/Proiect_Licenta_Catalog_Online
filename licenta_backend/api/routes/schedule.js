const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth');

const scheduleController = require('../controllers/schedule');

router.use(authMiddleware.checkAuth);
router.put("/:scheduleId", scheduleController.updateSchedule);
router.get("/:scheduleId", scheduleController.getScheduleById);
router.delete("/:scheduleId", scheduleController.deleteFromScheduleById);

module.exports = router;