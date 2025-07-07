const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/eo/eventController');

// Aktifkan middleware autentikasi JWT
const auth = require('../../middleware/authMiddleware');
router.use(auth);

// CREATE event
router.post('/event/add', eventController.createEvent);

// READ all events for this EO
router.get('/event', eventController.getAllEvents);

// READ single event by id
router.get('/event/:id', eventController.getEventById);

// UPDATE event
router.put('/event/edit/:id', eventController.updateEvent);

// DELETE event
router.delete('/event/:id', eventController.deleteEvent);

module.exports = router;