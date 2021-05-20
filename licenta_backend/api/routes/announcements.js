const express = require('express');
const router = express.Router({ mergeParams: true });

const announcementsController = require('../controllers/announcements');

router.delete("/:id", announcementsController.deleteAnnouncement);

router.put("/:id", announcementsController.updateAnnouncement);

module.exports = router;