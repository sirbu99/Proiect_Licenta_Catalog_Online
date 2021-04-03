const express = require('express');
const registerController = require('../controllers/register');
const loginController = require('../controllers/login');
const router = express.Router();

router.post('/register', registerController.register);
router.post('/login', loginController.login);

module.exports = router;