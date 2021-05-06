const express = require('express');
const router = express.Router({ mergeParams: true });

const facultiesController = require('../controllers/faculties');
const usersController = require('../controllers/users');


router.get('/', facultiesController.getAllFaculties);

router.get("/:facultyId", facultiesController.getFacultyById);

router.get("/:facultyId/students", usersController.getStudents);

router.get("/:facultyId/teachers", usersController.getTeachers);

router.post("/", facultiesController.postFaculty);

router.put("/:facultyId", facultiesController.putFaculty);

router.delete("/:id", facultiesController.deleteFaculty);

module.exports = router;