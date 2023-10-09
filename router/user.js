const express = require('express');
const router = express.Router()
const userController = require('../controller/user')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require ('../middleware/authentication');

router.put('/:id',verifyTokenAndAuthorization,userController.updateUser);
router.delete('/:id',verifyTokenAndAuthorization,userController.deleteUser);
router.get('/find/:id',verifyTokenAndAdmin,userController.getUser);
router.get('/',verifyTokenAndAdmin,userController.getUsers);
router.get('/stats',verifyTokenAndAdmin,userController.getStats);

module.exports = router;