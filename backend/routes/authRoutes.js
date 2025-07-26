//corect one

// const express = require('express');
// const router = express.Router();
// const auth = require('../controllers/authController');

// // Registration + email verification
// router.post('/register', auth.register);
// router.post('/verify-email', auth.verifyEmail);

// // Login + 2FA
// router.post('/login', auth.login);          // step 1: email+password → send 2FA
// router.post('/verify-2fa', auth.verify2FA); // step 2: submit 2FA code → get JWT

// // Password reset
// router.post('/forgot-password', auth.forgotPassword); // send reset code
// router.post('/reset-password', auth.resetPassword);   // verify code + set new pw
// // Logout
// router.post('/logout', auth.logout); // clear JWT cookie
// module.exports = router;
// ✅ FILE: /routes/authRoutes.js


// corect


const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Your existing routes...
router.post('/register', authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/verify-2fa', authController.verify2FA);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/logout', authController.logout);

// Google OAuth routes with forced account/email selection
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',  // << This forces Google to show email chooser every time
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    successRedirect: 'http://localhost:5173/dashboard',
    session: false,
  })
);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const authController = require('../controllers/authController');

// // Auth routes
// router.post('/register', authController.register);
// router.post('/verify-email', authController.verifyEmail);
// router.post('/login', authController.login);
// router.post('/verify-2fa', authController.verify2FA);
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);
// router.post('/logout', authController.logout);

// // Manually create default admin (call this once)
// router.post('/create-admin', authController.createAdminManually);

// // Google OAuth routes (force account/email chooser)
// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'],
//     prompt: 'select_account', // forces account chooser every login
//   })
// );

// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: 'http://localhost:5173/login',
//     session: false,
//   }),
//   (req, res) => {
//     // On successful OAuth login, redirect to frontend dashboard
//     res.redirect('http://localhost:5173/dashboard');
//   }
// );

// module.exports = router;

