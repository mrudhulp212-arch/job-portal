const express = require('express');
const { userVerify, userLogin, userlogout } = require('../controllers/userAuthController');
const { checkLogin } = require('../midlleware/checkLogin');
const router = express.Router();

router.post('/login', userLogin);
router.get('/verify', checkLogin, userVerify);
router.get('/logout', checkLogin, userlogout);

module.exports = router