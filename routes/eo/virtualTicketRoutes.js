const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const virtualTicketCtrl = require('../../controllers/eo/virtualTicketController');

router.get('/virtual-tickets', authMiddleware, virtualTicketCtrl.getVirtualTicketsByEvent);
router.get('/virtual-tickets/:id', authMiddleware, virtualTicketCtrl.getVirtualTicketById);
router.post('/virtual-tickets', authMiddleware, virtualTicketCtrl.createVirtualTicket);
router.put('/virtual-tickets/:id', authMiddleware, virtualTicketCtrl.updateVirtualTicket);
router.delete('/virtual-tickets/:id', authMiddleware, virtualTicketCtrl.deleteVirtualTicket);

module.exports = router;