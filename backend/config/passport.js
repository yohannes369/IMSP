

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config();
// const User = require('../models/userModel');

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findByGoogleId(profile.id);

//         if (!user) {
//           user = await User.createGoogleUser({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails?.[0]?.value || null,
//             photo: profile.photos?.[0]?.value || null,
//           });
//           user = await User.findByGoogleId(profile.id);
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id || user.googleId || user);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     // Try find user by ID (or googleId)
//     let user = await User.findByEmail(id);
//     if (!user) user = await User.findByGoogleId(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// module.exports = passport;


// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config();
// const User = require('../models/userModel');

// // Google OAuth Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value || null;

//         // Check if a user with this email already exists
//         let user = await User.findByEmail(email);

//         if (!user) {
//           // Create a new user with default guest role
//           await User.createGoogleUser({
//             googleId: profile.id,
//             name: profile.displayName,
//             email,
//             photo: profile.photos?.[0]?.value || null,
//             role: "guest" // Default role
//           });

//           // Fetch the newly created user
//           user = await User.findByGoogleId(profile.id);
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// // Serialize user to session
// passport.serializeUser((user, done) => {
//   done(null, user.id || user.googleId);
// });

// // Deserialize user from session
// passport.deserializeUser(async (identifier, done) => {
//   try {
//     let user;

//     // Try to find by numeric ID (create findById method in your model)
//     if (typeof identifier === 'number') {
//       user = await User.findById(identifier);
//     }

//     // Fallback to Google ID lookup
//     if (!user) user = await User.findByGoogleId(identifier);

//     // Fallback to email lookup
//     if (!user) user = await User.findByEmail(identifier);

//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// module.exports = passport;






// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config();
// const User = require('../models/userModel');

// // Google OAuth Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value || null;

//         // Check if a user with this email already exists
//         let user = await User.findByEmail(email);

//         if (!user) {
//           // Create a new user with default guest role
//           await User.createGoogleUser({
//             googleId: profile.id,
//             name: profile.displayName,
//             email,
//             photo: profile.photos?.[0]?.value || null,
//             role: "guest", // Default role
//           });

//           // Fetch the newly created user
//           user = await User.findByGoogleId(profile.id);
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// // Serialize user to session
// passport.serializeUser((user, done) => {
//   done(null, user.id || user.googleId);
// });

// // Deserialize user from session
// passport.deserializeUser(async (identifier, done) => {
//   try {
//     let user;

//     // MongoDB _id is a string, so findById works with identifier as string
//     user = await User.findById(identifier);

//     // Fallback to Google ID lookup
//     if (!user) user = await User.findByGoogleId(identifier);

//     // Fallback to email lookup
//     if (!user) user = await User.findByEmail(identifier);

//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// module.exports = passport;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('../models/userModel'); // MySQL UserModel

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || null;

        // Find existing user by email
        let user = await User.findByEmail(email);

        if (!user) {
          // Create a new user if none exists
          user = await User.createGoogleUser({
            googleId: profile.id,
            name: profile.displayName,
            email,
            photo: profile.photos?.[0]?.value || null,
          });
        }

        return done(null, user);
      } catch (err) {
        console.error("Error in GoogleStrategy:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  if (!user) return done(new Error("No user to serialize"));
  // Always use MySQL primary key (id)
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    if (!id) {
      return done(new Error("No identifier found in session"), null);
    }

    const user = await User.findById(id);

    if (!user) {
      return done(new Error("User not found during deserialization"), null);
    }

    done(null, user);
  } catch (err) {
    console.error("Error in deserializeUser:", err);
    done(err, null);
  }
});

module.exports = passport;
