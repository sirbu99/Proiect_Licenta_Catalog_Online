const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers');
const studentsController = require('../controllers/students')

router.get("/", studentsController.getStudents);

router.get("/", teachersController.getTeachers);

router.get("/students/:userId", studentsController.getStudentById);
router.post("/students", studentsController.createStudent);
router.put("/students/:userId", studentsController.updateStudentInfo);
router.delete("/students/:userId", studentsController.deleteStudent);


router.get("/teachers/:userId", teachersController.getTeacherById);
router.put("/teachers/:userId", teachersController.updateTeacherInfo);
router.delete("/teachers/:userId", teachersController.deleteTeacher);


module.exports = router;