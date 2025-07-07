const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const ordersCtrl = require('../../controllers/eo/ordersController');

router.get('/orders', authMiddleware, ordersCtrl.getAllOrders);
router.get('/orders/:id', authMiddleware, ordersCtrl.getOrderById);
router.post('/orders', authMiddleware, ordersCtrl.createOrder);
router.put('/orders/:id', authMiddleware, ordersCtrl.updateOrder);
router.delete('/orders/:id', authMiddleware, ordersCtrl.deleteOrder);

module.exports = router;