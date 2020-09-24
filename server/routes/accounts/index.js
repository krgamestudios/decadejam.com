const express = require('express');
const router = express.Router();

router.post('/signup', require('./signup'));
//router.get('/verify', require('./verify'));

module.exports = router;
