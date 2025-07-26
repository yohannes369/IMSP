// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// // Step 1: Redirect to Google login page
// router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Step 2: Google callback URL
// router.get('/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful login → redirect to your frontend dashboard
//     res.redirect('http://localhost:5173/dashboard');
//   }
// );

// // Route to get current logged-in user
// router.get('/user', (req, res) => {
//   res.json(req.user || null);
// });

// // Logout route for Google OAuth users
// router.get('/logout', (req, res) => {
//   req.logout(() => res.redirect('/'));
// });

// module.exports = router;
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth start route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect to frontend after successful login
    res.redirect('http://localhost:5173/dashboard');
  }
);

module.exports = router;
