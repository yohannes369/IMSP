


// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// // Registration route
// router.post('/register', authController.register);

// // Email verification routea
// router.post('/verify-email', authController.verifyEmail);

// // Login route (step 1: email & password)
// router.post('/login', authController.login);

// // 2FA verification route (step 2: verify 2FA code)
// router.post('/verify-2fa', authController.verify2FA);

// module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// Registration + email verification
router.post('/register', auth.register);
router.post('/verify-email', auth.verifyEmail);

// Login + 2FA
router.post('/login', auth.login);          // step 1: email+password → send 2FA
router.post('/verify-2fa', auth.verify2FA); // step 2: submit 2FA code → get JWT

// Password reset
router.post('/forgot-password', auth.forgotPassword); // send reset code
router.post('/reset-password', auth.resetPassword);   // verify code + set new pw

module.exports = router;

