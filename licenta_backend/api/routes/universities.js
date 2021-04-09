const express = require('express');
const router = express.Router();

const universitiesController = require('../controllers/universities');

router.get("/", universitiesController.getAllUniversities);

router.post("/", universitiesController.postUniversity);

router.post("/:universityId", universitiesController.postUniversityById);

router.put("/", universitiesController.putUniversity);

router.put("/:universityId", universitiesController.putUniversityById);

router.delete("/:universityId", universitiesController.deleteUniversity);

module.exports = router;