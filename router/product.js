const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const { verifyTokenAndAdmin } = require('../middleware/authentication');

router.post('/',verifyTokenAndAdmin,productController.createProduct);
router.put('/:id',verifyTokenAndAdmin,productController.updateProduct);
router.delete('/:id',verifyTokenAndAdmin,productController.deleteProduct);
router.get('/find/:id',productController.getProduct);
router.get('/',productController.getAllProducts);

module.exports = router;