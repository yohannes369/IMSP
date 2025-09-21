
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
