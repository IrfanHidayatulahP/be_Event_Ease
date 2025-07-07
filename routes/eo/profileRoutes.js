const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const profileCtrl = require('../../controllers/eo/profileController');

router.get('/profile', authMiddleware, profileCtrl.getProfile);
router.put('/profile/edit', authMiddleware, profileCtrl.updateProfile);

module.exports = router;