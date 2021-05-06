const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')

router.get("/", usersController.getStudents);
router.get("/", usersController.getTeachers);

module.exports = router;