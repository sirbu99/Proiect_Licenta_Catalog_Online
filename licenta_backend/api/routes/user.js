const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers');
const studentsController = require('../controllers/students');
const gradesController = require('../controllers/grades');
const subjectsController = require('../controllers/subjects');
const usersController = require('../controllers/users');

router.get("/", studentsController.getStudents);

router.get("/", teachersController.getTeachers);

router.get("/students/:userId", studentsController.getStudentById);
router.get("/students/:userId/grades-average", gradesController.getGradesAvg);
router.get("/students/:userId/grades", gradesController.getStudentGrades);
router.get("/students/:userId/subjects", subjectsController.getSubjectsByStudent);
router.post("/students", studentsController.createStudent);
router.put("/students/:userId", studentsController.updateStudentInfo);
router.put("/:userId/change-password", usersController.changePassword);
router.delete("/students/:userId", studentsController.deleteStudent);

router.get("/:userId/profile-info", usersController.getUserInfo);

router.get("/teachers/:userId", teachersController.getTeacherById);
router.post("/teachers", teachersController.createTeacher);
router.put("/teachers/:userId", teachersController.updateTeacherInfo);
router.delete("/teachers/:userId", teachersController.deleteTeacher);


module.exports = router;