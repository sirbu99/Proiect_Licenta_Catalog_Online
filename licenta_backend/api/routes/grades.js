const express = require('express');
const router = express.Router({ mergeParams: true });

const gradesController = require('../controllers/grades');

router.put("/:gradeId", gradesController.changeGrade);

module.exports = router;