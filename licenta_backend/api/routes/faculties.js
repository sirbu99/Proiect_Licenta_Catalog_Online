const express = require('express');
const router = express.Router({ mergeParams: true });

const facultiesController = require('../controllers/faculties');
const studentsController = require('../controllers/students');
const teachersController = require('../controllers/teachers');
const scheduleController = require('../controllers/schedule');
const subjectsController = require('../controllers/subjects');
const announcementsController = require('../controllers/announcements');


router.get('/', facultiesController.getAllFaculties);

router.get("/:facultyId", facultiesController.getFacultyById);
router.post("/", facultiesController.postFaculty);
router.put("/:facultyId", facultiesController.putFaculty);
router.delete("/:id", facultiesController.deleteFaculty);


router.get("/:facultyId/students", studentsController.getStudents);


router.get("/:facultyId/teachers", teachersController.getTeachers);


router.get("/:facultyId/schedule", scheduleController.getSchedule);
router.delete("/:facultyId/schedule", scheduleController.deleteAllFromSchedule);


router.get("/:facultyId/announcements", announcementsController.getAnnouncements);


router.get("/:facultyId/subjects", subjectsController.getSubjectsList);

module.exports = router;