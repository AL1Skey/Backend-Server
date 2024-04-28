const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/UserControllers')
const UserAuth = require('../middleware/UserAuth')
// User Endpoints
router.post('/register',Controllers.register)
router.post('/login',Controllers.login)

module.exports = router;