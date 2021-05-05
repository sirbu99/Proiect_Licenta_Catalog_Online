const express = require('express');
const router = express.Router();

const universitiesController = require('../controllers/universities');

router.get("/", universitiesController.getAllUniversities);

router.post("/", universitiesController.postUniversity);

router.put("/:universityId", universitiesController.putUniversity);

router.delete("/:universityId", universitiesController.deleteUniversity);

module.exports = router;