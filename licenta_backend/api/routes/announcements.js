const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth');

const announcementsController = require('../controllers/announcements');

router.use(authMiddleware.checkAuth);
router.delete("/:id", announcementsController.deleteAnnouncement);

router.put("/:id", announcementsController.updateAnnouncement);

module.exports = router;