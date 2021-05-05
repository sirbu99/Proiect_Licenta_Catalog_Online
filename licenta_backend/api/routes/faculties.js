const express = require('express');
const router = express.Router({ mergeParams: true });

const facultiesController = require('../controllers/faculties');


router.get('/', facultiesController.getAllFaculties);

router.get("/:facultyId", facultiesController.getFacultyById);

router.post("/", facultiesController.postFaculty);

router.put("/:facultyId", facultiesController.putFaculty);

router.delete("/:id", facultiesController.deleteFaculty);

module.exports = router;