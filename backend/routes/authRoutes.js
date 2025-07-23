;
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
// Logout
router.post('/logout', auth.logout); // clear JWT cookie
module.exports = router;

