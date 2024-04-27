const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/controllers')

// User Endpoints
router.post('/register',Controllers.register)
router.post('/login',Controllers.login)

module.exports = router;