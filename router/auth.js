const express = require('express');
const router = express.Router();
const loginAndRegister = require('../controller/auth')

router.post('/register',loginAndRegister.register);
router.post('/login',loginAndRegister.login);

module.exports = router;