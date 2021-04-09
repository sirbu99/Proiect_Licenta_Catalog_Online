const express = require('express');
const registerController = require('../controllers/register');
const loginController = require('../controllers/login');
const logoutController = require('../controllers/logout');
const router = express.Router();

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/logout', logoutController.logout);

module.exports = router;