const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

// Register
router.post('/register', authCtrl.register);

// Login, membaca role (EO/User) dari hasil login
router.post('/login', authCtrl.login);

// Logout
router.post('/logout', authCtrl.logout);

module.exports = router;
