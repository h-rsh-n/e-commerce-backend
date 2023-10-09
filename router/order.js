const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middleware/authentication');

router.post('/',verifyToken,orderController.createOrder);
router.put('/:id',verifyTokenAndAdmin,orderController.updateOrder);
router.delete('/:id',verifyTokenAndAdmin,orderController.deleteOrder);
router.get('/find/:userId',verifyTokenAndAuthorization,orderController.getOrder);
router.get('/',verifyTokenAndAdmin,orderController.getOrders);
router.get('/income',verifyTokenAndAdmin,orderController.getIncome);

module.exports = router;