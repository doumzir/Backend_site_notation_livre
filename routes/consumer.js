const express = require('express');


const router = express.Router();
// eslint-disable-next-line import/extensions
const Usercrtl = require('../controllers/consumer')

router.post('/signup', Usercrtl.signup);
router.post('/login',Usercrtl.login);
module.exports = router;
