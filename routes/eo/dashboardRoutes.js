// routes/eo/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/eo/dashboardController');

// Pastikan dashboardController.dashboard adalah function
router.get('/', dashboardController.dashboard);

module.exports = router;
