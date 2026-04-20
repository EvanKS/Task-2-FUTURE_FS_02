const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin } = require('../controllers/authController');

router.post('/login', authAdmin);
// Removing register in production typically, but we'll leave it for initial setup
router.post('/register', registerAdmin);

module.exports = router;
