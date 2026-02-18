const express = require('express');
const { checkLogin } = require('../midlleware/checkLogin');
const { employerLogin, employerVerify, employerlogout } = require('../controllers/employerAuthController');
const router = express.Router();

router.post('/login', employerLogin);
router.get('/verify', checkLogin, employerVerify);
router.get('/logout', checkLogin, employerlogout);

module.exports = router