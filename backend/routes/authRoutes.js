
// const express = require('express');
// const { register, verifyEmail, loginStep1, loginStep2 } = require('../controllers/authController');
// const router = express.Router();

// router.post('/register', register);
// router.post('/verify-email', verifyEmail);
// router.post('/login-step1', loginStep1); // Email & Password
// router.post('/login-step2', loginStep2); // 2FA OTP

// module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration route
router.post('/register', authController.register);

// Email verification route
router.post('/verify-email', authController.verifyEmail);

// Login route (step 1: email & password)
router.post('/login', authController.login);

// 2FA verification route (step 2: verify 2FA code)
router.post('/verify-2fa', authController.verify2FA);

module.exports = router;
