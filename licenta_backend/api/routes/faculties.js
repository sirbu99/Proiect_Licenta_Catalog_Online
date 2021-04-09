const express = require('express');
const router = express.Router({ mergeParams: true });

const facultiesController = require('../controllers/faculties');


router.get('/', facultiesController.getAllFaculties);

router.get("/:facultyId", facultiesController.getFacultyById);

router.post("/", facultiesController.postFaculty);

router.post("/:facultyId", facultiesController.postFacultyById);

router.put("/", facultiesController.putFaculty);

router.put("/:facultyId", facultiesController.putFacultyById);

router.delete("/:id", facultiesController.deleteFaculty);

module.exports = router;