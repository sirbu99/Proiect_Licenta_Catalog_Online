const express = require('express');
const router = express.Router({ mergeParams: true });

const scheduleController = require('../controllers/schedule');


router.get('/', scheduleController.getSchedule);

module.exports = router;