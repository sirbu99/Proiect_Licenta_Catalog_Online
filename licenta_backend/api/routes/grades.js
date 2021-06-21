const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth');

const gradesController = require('../controllers/grades');

router.use(authMiddleware.checkAuth);
router.put("/:gradeId", gradesController.changeGrade);
router.post("/add-grade/:userId", gradesController.addGrade);

module.exports = router;