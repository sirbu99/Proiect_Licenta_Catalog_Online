const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const universitiesController = require('../controllers/universities');

router.get("/", universitiesController.getAllUniversities);

// router.use(authMiddleware.checkAuth);

router.post("/", universitiesController.postUniversity);

router.put("/:universityId", universitiesController.putUniversity);

router.delete("/:universityId", universitiesController.deleteUniversity);

module.exports = router;