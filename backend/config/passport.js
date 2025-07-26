
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config();

// // ✅ Google OAuth configuration using environment variables
// const {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_CALLBACK_URL,
// } = process.env;

// // ✅ Configure Google OAuth strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // 👉 Replace with actual DB logic (find or create user)
//         const user = {
//           googleId: profile.id,
//           name: profile.displayName,
//           email: profile.emails?.[0]?.value || null,
//           photo: profile.photos?.[0]?.value || null,
//         };
//         return done(null, user);
//       } catch (err) {
//         console.error("❌ Google strategy error:", err);
//         return done(err, null);
//       }
//     }
//   )
// );

// // ✅ Serialize user into session (can reduce to user ID)
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // ✅ Deserialize user from session
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// module.exports = passport;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('../models/userModel');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findByGoogleId(profile.id);

        if (!user) {
          user = await User.createGoogleUser({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || null,
            photo: profile.photos?.[0]?.value || null,
          });
          user = await User.findByGoogleId(profile.id);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id || user.googleId || user);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Try find user by ID (or googleId)
    let user = await User.findByEmail(id);
    if (!user) user = await User.findByGoogleId(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
