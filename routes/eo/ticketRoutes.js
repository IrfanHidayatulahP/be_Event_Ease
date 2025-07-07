const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const ticketCtrl = require('../../controllers/eo/ticketController');

router.get('/tickets', authMiddleware, ticketCtrl.getAllTickets);
router.get('/tickets/:id', authMiddleware, ticketCtrl.getTicketById);
router.post('/tickets', authMiddleware, ticketCtrl.createTicket);
router.put('/tickets/:id', authMiddleware, ticketCtrl.updateTicket);
router.delete('/tickets/:id', authMiddleware, ticketCtrl.deleteTicket);

module.exports = router;