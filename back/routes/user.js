const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signupUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;