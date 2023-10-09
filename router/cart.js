const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/authentication');

router.post('/',verifyToken,cartController.createCart);
router.put('/:id',verifyTokenAndAuthorization,cartController.updateCart);
router.delete('/:id',verifyTokenAndAuthorization,cartController.deleteCart);
router.get('/find/:userId',verifyTokenAndAuthorization,cartController.getCart);
router.get('/',verifyTokenAndAdmin,cartController.getCarts);

module.exports = router;