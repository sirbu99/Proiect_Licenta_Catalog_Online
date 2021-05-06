const express = require('express');
const router = express.Router({ mergeParams: true });

const facultiesController = require('../controllers/faculties');
const usersController = require('../controllers/users');
const scheduleController = require('../controllers/schedule');
const subjectsController = require('../controllers/subjects');


router.get('/', facultiesController.getAllFaculties);

router.get("/:facultyId", facultiesController.getFacultyById);

router.get("/:facultyId/students", usersController.getStudents);

router.get("/:facultyId/teachers", usersController.getTeachers);

router.get("/:facultyId/schedule", scheduleController.getSchedule);

router.get("/:facultyId/subjects", subjectsController.getSubjectsList);

router.post("/", facultiesController.postFaculty);

router.put("/:facultyId", facultiesController.putFaculty);

router.delete("/:id", facultiesController.deleteFaculty);

module.exports = router;