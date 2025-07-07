const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const reviewCtrl = require('../../controllers/eo/reviewController');

// Get all reviews for an event
router.get('/reviews/:event_id', authMiddleware, reviewCtrl.getReviewsByEvent);
// Get a single review by ID
router.get('/reviews/:id', authMiddleware, reviewCtrl.getReviewById);
// Create a new review
router.post('/reviews', authMiddleware, reviewCtrl.createReview);
// Update a review by ID
router.put('/reviews/:id', authMiddleware, reviewCtrl.updateReview);
// Delete a review by ID
router.delete('/reviews/:id', authMiddleware, reviewCtrl.deleteReview);

module.exports = router;