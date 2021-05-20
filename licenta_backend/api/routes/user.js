const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers');
const studentsController = require('../controllers/students')

router.get("/", studentsController.getStudents);

router.get("/", teachersController.getTeachers);

router.get("/students/:userId", studentsController.getStudentById);

router.get("/teachers/:userId", teachersController.getTeacherById);

router.delete("/students/:userId", studentsController.deleteStudent);

router.put("/students/:userId", studentsController.updateStudentInfo);

router.delete("/teachers/:userId", teachersController.deleteTeacher);

router.put("/teachers/:userId", teachersController.updateTeacherInfo);


module.exports = router;