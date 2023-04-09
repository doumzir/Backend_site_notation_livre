const express = require('express');

const router = express.Router();

const Usercrtl = require('../controllers/consumer');

router.post('/signup', Usercrtl.signup);
router.post('/login', Usercrtl.login);
module.exports = router;
