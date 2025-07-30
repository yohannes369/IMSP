

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const { 
//   sendVerificationEmail, 
//   sendVerificationSuccessEmail, 
//   sendTwoFactorCodeEmail, 
//   sendPasswordResetEmail 
// } = require('../utils/email');

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Helpers
// function genCode6() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }
// function addMinutes(ms) {
//   return new Date(Date.now() + ms);
// }

// // Register
// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, gender, phone } = req.body;
//     if (!firstName || !lastName || !email || !password || !gender || !phone) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     const existingUser = await User.findByEmail(email);
//     if (existingUser) {
//       if (existingUser.is_verified) {
//         return res.status(400).json({ message: 'Email already registered and verified' });
//       } else {
//         const code = genCode6();
//         await User.updateVerificationCode(email, code);
//         await sendVerificationEmail(email, code);
//         return res.status(200).json({ message: 'Verification code resent. Check your email.' });
//       }
//     }

//     const code = genCode6();
//     await User.createUser({ firstName, lastName, email, password, gender, phone, code });
//     await sendVerificationEmail(email, code);
//     res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
//   } catch (err) {
//     console.error('❌ Register error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // Verify Email
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user || user.verification_code !== code) {
//       return res.status(400).json({ message: 'Invalid or expired code' });
//     }

//     await User.verifyUser(email);
//     await sendVerificationSuccessEmail(email);
//     res.json({ message: 'Email verified successfully' });
//   } catch (err) {
//     console.error('❌ Verify email error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Login Step 1
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     if (!user.is_verified) {
//       return res.status(403).json({ message: 'Please verify your email first' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     const twoCode = genCode6();
//     await User.updateTwoFactor(email, twoCode, addMinutes(5 * 60 * 1000));
//     await sendTwoFactorCodeEmail(email, twoCode);
//     res.json({ message: '2FA code sent to your email. Please verify to complete login.' });
//   } catch (err) {
//     console.error('❌ Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Verify 2FA
// exports.verify2FA = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user || user.two_factor_code !== code || new Date(user.two_factor_expires) < new Date()) {
//       return res.status(400).json({ message: 'Invalid or expired 2FA code' });
//     }

//     await User.clearTwoFactor(email);
//     const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, message: '2FA verified. Logged in successfully.' });
//   } catch (err) {
//     console.error('❌ Verify 2FA error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Forgot Password
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(200).json({ message: 'If that email is registered, a reset code has been sent.' });

//     const resetCode = genCode6();
//     await User.setPasswordResetCode(email, resetCode, addMinutes(15 * 60 * 1000));
//     await sendPasswordResetEmail(email, resetCode);
//     res.json({ message: 'Password reset code sent if account exists.' });
//   } catch (err) {
//     console.error('❌ Forgot password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, code, newPassword } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user || user.password_reset_code !== code || new Date(user.password_reset_expires) < new Date()) {
//       return res.status(400).json({ message: 'Invalid or expired reset code' });
//     }

//     await User.resetPassword(email, newPassword);
//     res.json({ message: 'Password reset successful. You can now log in.' });
//   } catch (err) {
//     console.error('❌ Reset password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Logout
// exports.logout = (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     path: '/',
//   });
//   res.status(200).json({ message: 'Logged out successfully' });
// };


// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const { 
//   sendVerificationEmail, 
//   sendVerificationSuccessEmail, 
//   sendTwoFactorCodeEmail, 
//   sendPasswordResetEmail 
// } = require('../utils/email');

// const JWT_SECRET = process.env.JWT_SECRET || 'john';

// // Helpers
// function genCode6() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }
// function addMinutes(ms) {
//   return new Date(Date.now() + ms);
// }

// // Register
// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, gender, phone } = req.body;
//     if (!firstName || !lastName || !email || !password || !gender || !phone) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     const existingUser = await User.findByEmail(email);
//     if (existingUser) {
//       if (existingUser.is_verified) {
//         return res.status(400).json({ message: 'Email already registered and verified' });
//       } else {
//         const code = genCode6();
//         await User.updateVerificationCode(email, code);
//         await sendVerificationEmail(email, code);
//         return res.status(200).json({ message: 'Verification code resent. Check your email.' });
//       }
//     }

//     const code = genCode6();
//     await User.createUser({ firstName, lastName, email, password, gender, phone, code });
//     await sendVerificationEmail(email, code);
//     res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
//   } catch (err) {
//     console.error('❌ Register error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // Verify Email
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user || user.verification_code !== code) {
//       return res.status(400).json({ message: 'Invalid or expired code' });
//     }

//     await User.verifyUser(email);
//     await sendVerificationSuccessEmail(email);
//     res.json({ message: 'Email verified successfully' });
//   } catch (err) {
//     console.error('❌ Verify email error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Login Step 1 (email/password)
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     if (!user.is_verified) {
//       return res.status(403).json({ message: 'Please verify your email first' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate 2FA code, save, and send email
//     const twoCode = genCode6();
//     await User.updateTwoFactor(email, twoCode, addMinutes(5 * 60 * 1000));
//     await sendTwoFactorCodeEmail(email, twoCode);
//     res.json({ message: '2FA code sent to your email. Please verify to complete login.' });
//   } catch (err) {
//     console.error('❌ Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Verify 2FA and set cookie
// exports.verify2FA = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user || user.two_factor_code !== code || new Date(user.two_factor_expires) < new Date()) {
//       return res.status(400).json({ message: 'Invalid or expired 2FA code' });
//     }

//     await User.clearTwoFactor(email);

//     const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

//     // Set JWT in HttpOnly cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // use true only on HTTPS production
//       sameSite: 'strict',
//       path: '/',
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     res.json({ message: '2FA verified. Logged in successfully.' });
//   } catch (err) {
//     console.error('❌ Verify 2FA error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Forgot Password
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(200).json({ message: 'If that email is registered, a reset code has been sent.' });

//     const resetCode = genCode6();
//     await User.setPasswordResetCode(email, resetCode, addMinutes(15 * 60 * 1000));
//     await sendPasswordResetEmail(email, resetCode);
//     res.json({ message: 'Password reset code sent if account exists.' });
//   } catch (err) {
//     console.error('❌ Forgot password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, code, newPassword } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user || user.password_reset_code !== code || new Date(user.password_reset_expires) < new Date()) {
//       return res.status(400).json({ message: 'Invalid or expired reset code' });
//     }

//     await User.resetPassword(email, newPassword);
//     res.json({ message: 'Password reset successful. You can now log in.' });
//   } catch (err) {
//     console.error('❌ Reset password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Logout — clear the token cookie
// exports.logout = (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     path: '/',
//   });
//   res.status(200).json({ message: 'Logged out successfully' });
// };


// corect



// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const {
//   sendVerificationEmail,
//   sendVerificationSuccessEmail,
//   sendTwoFactorCodeEmail,
//   sendPasswordResetEmail
// } = require('../utils/email');

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Helpers
// function genCode6() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }
// function addMinutes(ms) {
//   return new Date(Date.now() + ms);
// }

// // ✅ Register
// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, gender, phone } = req.body;
//     if (!firstName || !lastName || !email || !password || !gender || !phone) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     const existingUser = await User.findByEmail(email);
//     if (existingUser) {
//       if (existingUser.is_verified) {
//         return res.status(400).json({ message: 'Email already registered and verified' });
//       } else {
//         const code = genCode6();
//         await User.updateVerificationCode(email, code);
//         await sendVerificationEmail(email, code);
//         return res.status(200).json({ message: 'Verification code resent. Check your email.' });
//       }
//     }

//     const code = genCode6();
//     await User.createUser({ firstName, lastName, email, password, gender, phone, code });
//     await sendVerificationEmail(email, code);
//     res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
//   } catch (err) {
//     console.error('❌ Register error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ✅ Verify Email
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user || user.verification_code !== code) {
//       return res.status(400).json({ message: 'Invalid or expired code' });
//     }

//     await User.verifyUser(email);
//     await sendVerificationSuccessEmail(email);
//     res.json({ message: 'Email verified successfully' });
//   } catch (err) {
//     console.error('❌ Verify email error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Login Step 1: Send 2FA
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     if (!user.is_verified) {
//       return res.status(403).json({ message: 'Please verify your email first' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     const twoCode = genCode6();
//     await User.updateTwoFactor(email, twoCode, addMinutes(5 * 60 * 1000));
//     await sendTwoFactorCodeEmail(email, twoCode);

//     res.status(200).json({ message: '2FA code sent to your email', requires2FA: true });
//   } catch (err) {
//     console.error('❌ Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Verify 2FA — returns token (for localStorage)
// exports.verify2FA = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const user = await User.findByEmail(email);

//     if (
//       !user ||
//       user.two_factor_code !== code ||
//       new Date(user.two_factor_expires) < new Date()
//     ) {
//       return res.status(400).json({ message: 'Invalid or expired 2FA code' });
//     }

//     await User.clearTwoFactor(email);

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({
//       message: '2FA verified. Login successful.',
//       token
//     });
//   } catch (err) {
//     console.error('❌ Verify 2FA error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Logout — frontend clears localStorage, no need to handle JWT cookie
// exports.logout = (req, res) => {
//   res.status(200).json({ message: 'Logged out. Please clear token on client.' });
// };

// // ✅ Forgot Password
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(200).json({ message: 'If that email is registered, a reset code has been sent.' });

//     const resetCode = genCode6();
//     await User.setPasswordResetCode(email, resetCode, addMinutes(15 * 60 * 1000));
//     await sendPasswordResetEmail(email, resetCode);
//     res.json({ message: 'Password reset code sent if account exists.' });
//   } catch (err) {
//     console.error('❌ Forgot password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, code, newPassword } = req.body;
//     const user = await User.findByEmail(email);
//     if (
//       !user ||
//       user.password_reset_code !== code ||
//       new Date(user.password_reset_expires) < new Date()
//     ) {
//       return res.status(400).json({ message: 'Invalid or expired reset code' });
//     }

//     await User.resetPassword(email, newPassword);
//     res.json({ message: 'Password reset successful. You can now log in.' });
//   } catch (err) {
//     console.error('❌ Reset password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const {
//   sendVerificationEmail,
//   sendVerificationSuccessEmail,
//   sendTwoFactorCodeEmail,
//   sendPasswordResetEmail
// } = require('../utils/email');

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Helpers
// function genCode6() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }
// function addMinutes(ms) {
//   return new Date(Date.now() + ms);
// }

// // ✅ Register with default role = "staff"
// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, gender, phone } = req.body;
//     if (!firstName || !lastName || !email || !password || !gender || !phone) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     const existingUser = await User.findByEmail(email);
//     if (existingUser) {
//       if (existingUser.is_verified) {
//         return res.status(400).json({ message: 'Email already registered and verified' });
//       } else {
//         const code = genCode6();
//         await User.updateVerificationCode(email, code);
//         await sendVerificationEmail(email, code);
//         return res.status(200).json({ message: 'Verification code resent. Check your email.' });
//       }
//     }

//     const code = genCode6();
//     const defaultRole = 'staff'; // ✅ Set default role to 'staff'
//     await User.createUser({
//       firstName,
//       lastName,
//       email,
//       password,
//       gender,
//       phone,
//       role: defaultRole,
//       code
//     });

//     await sendVerificationEmail(email, code);
//     res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
//   } catch (err) {
//     console.error('❌ Register error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ✅ Verify Email
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user || user.verification_code !== code) {
//       return res.status(400).json({ message: 'Invalid or expired code' });
//     }

//     await User.verifyUser(email);
//     await sendVerificationSuccessEmail(email);
//     res.json({ message: 'Email verified successfully' });
//   } catch (err) {
//     console.error('❌ Verify email error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Login Step 1: Send 2FA
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     if (!user.is_verified) {
//       return res.status(403).json({ message: 'Please verify your email first' });
//     }

//     // Check if both passwords are present
//     if (!password || !user.password) {
//       return res.status(400).json({ message: 'This account does not have a password. Please use Google login or contact admin.' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     const twoCode = genCode6();
//     await User.updateTwoFactor(email, twoCode, addMinutes(5 * 60 * 1000));
//     await sendTwoFactorCodeEmail(email, twoCode);

//     res.status(200).json({ message: '2FA code sent to your email', requires2FA: true });
//   } catch (err) {
//     console.error('❌ Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// // ✅ Verify 2FA — returns token (for localStorage)
// exports.verify2FA = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const user = await User.findByEmail(email);

//     if (
//       !user ||
//       user.two_factor_code !== code ||
//       new Date(user.two_factor_expires) < new Date()
//     ) {
//       return res.status(400).json({ message: 'Invalid or expired 2FA code' });
//     }

//     await User.clearTwoFactor(email);

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({
//       message: '2FA verified. Login successful.',
//       token
//     });
//   } catch (err) {
//     console.error('❌ Verify 2FA error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Logout — frontend clears localStorage, no need to handle JWT cookie
// exports.logout = (req, res) => {
//   res.status(200).json({ message: 'Logged out. Please clear token on client.' });
// };

// // ✅ Forgot Password
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(200).json({ message: 'If that email is registered, a reset code has been sent.' });

//     const resetCode = genCode6();
//     await User.setPasswordResetCode(email, resetCode, addMinutes(15 * 60 * 1000));
//     await sendPasswordResetEmail(email, resetCode);
//     res.json({ message: 'Password reset code sent if account exists.' });
//   } catch (err) {
//     console.error('❌ Forgot password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, code, newPassword } = req.body;
//     const user = await User.findByEmail(email);
//     if (
//       !user ||
//       user.password_reset_code !== code ||
//       new Date(user.password_reset_expires) < new Date()
//     ) {
//       return res.status(400).json({ message: 'Invalid or expired reset code' });
//     }

//     await User.resetPassword(email, newPassword);
//     res.json({ message: 'Password reset successful. You can now log in.' });
//   } catch (err) {
//     console.error('❌ Reset password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {
  sendVerificationEmail,
  sendVerificationSuccessEmail,
  sendTwoFactorCodeEmail,
  sendPasswordResetEmail
} = require('../utils/email');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Helpers
function genCode6() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
function addMinutes(ms) {
  return new Date(Date.now() + ms);
}

// ✅ Register with optional role
// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, gender, phone, role: inputRole } = req.body;

//     if (!firstName || !lastName || !email || !password || !gender || !phone) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     const existingUser = await User.findByEmail(email);
//     if (existingUser) {
//       if (existingUser.is_verified) {
//         return res.status(400).json({ message: 'Email already registered and verified' });
//       } else {
//         const code = genCode6();
//         await User.updateVerificationCode(email, code);
//         await sendVerificationEmail(email, code);
//         return res.status(200).json({ message: 'Verification code resent. Check your email.' });
//       }
//     }

//     const allowedRoles = ['staff', 'admin', 'manager', 'stock-clerk'];
//     const finalRole = allowedRoles.includes(inputRole) ? inputRole : 'staff';

//     const code = genCode6();

//     await User.createUser({
//       firstName,
//       lastName,
//       email,
//       password,
//       gender,
//       phone,
//       role: finalRole,
//       code
//     });

//     await sendVerificationEmail(email, code);
//     res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
//   } catch (err) {
//     console.error('❌ Register error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, gender, phone, role: inputRole, staff_id } = req.body;

//     if (!firstName || !lastName || !email || !password || !gender || !phone || !staff_id) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     const existingUser = await User.findByEmail(email);
//     if (existingUser) {
//       if (existingUser.is_verified) {
//         return res.status(400).json({ message: 'Email already registered and verified' });
//       } else {
//         const code = genCode6();
//         await User.updateVerificationCode(email, code);
//         await sendVerificationEmail(email, code);
//         return res.status(200).json({ message: 'Verification code resent. Check your email.' });
//       }
//     }

//     const allowedRoles = ['staff', 'admin', 'manager', 'stock-clerk'];
//     const finalRole = allowedRoles.includes(inputRole) ? inputRole : 'staff';

//     const code = genCode6();

//     await User.createUser({
//       firstName,
//       lastName,
//       email,
//       password,
//       gender,
//       phone,
//       role: finalRole,
//       code,
//       staff_id  // add staffId here
//     });

//     await sendVerificationEmail(email, code);
//     res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
//   } catch (err) {
//     console.error('❌ Register error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, phone, role: inputRole, staff_id } = req.body;

    if (!firstName || !lastName || !email || !password || !gender || !phone || !staff_id) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Check if staff_id already exists
    const existingStaffIdUser = await User.findByStaffId(staff_id);
    if (existingStaffIdUser) {
      return res.status(400).json({ message: 'Staff ID is taken, please use another' });
    }

    // Check if email already registered
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      if (existingUser.is_verified) {
        return res.status(400).json({ message: 'Email already registered and verified' });
      } else {
        const code = genCode6();
        await User.updateVerificationCode(email, code);
        await sendVerificationEmail(email, code);
        return res.status(200).json({ message: 'Verification code resent. Check your email.' });
      }
    }

    const allowedRoles = ['staff', 'admin', 'manager', 'stock-clerk'];
    const finalRole = allowedRoles.includes(inputRole) ? inputRole : 'staff';

    const code = genCode6();

    await User.createUser({
      firstName,
      lastName,
      email,
      password,
      gender,
      phone,
      role: finalRole,
      code,
      staff_id,
    });

    await sendVerificationEmail(email, code);
    res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Verify Email
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findByEmail(email);
    if (!user || user.verification_code !== code) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    await User.verifyUser(email);
    await sendVerificationSuccessEmail(email);
    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error('❌ Verify email error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Login Step 1: Send 2FA
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     if (!user.is_verified) {
//       return res.status(403).json({ message: 'Please verify your email first' });
//     }

//     if (!password || !user.password) {
//       return res.status(400).json({ message: 'This account does not have a password. Please use Google login or contact admin.' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     const twoCode = genCode6();
//     await User.updateTwoFactor(email, twoCode, addMinutes(5 * 60 * 1000));
//     await sendTwoFactorCodeEmail(email, twoCode);

//     res.status(200).json({ message: '2FA code sent to your email', requires2FA: true });
//   } catch (err) {
//     console.error('❌ Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };





exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.is_verified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }

    // === Add this check to block deactivated accounts ===
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account is deactivated. Please contact admin.' });
    }

    if (!password || !user.password) {
      return res.status(400).json({ message: 'This account does not have a password. Please use Google login or contact admin.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const twoCode = genCode6();
    await User.updateTwoFactor(email, twoCode, addMinutes(5 * 60 * 1000));
    await sendTwoFactorCodeEmail(email, twoCode);

    res.status(200).json({ message: '2FA code sent to your email', requires2FA: true });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// ✅ Verify 2FA — returns token
// exports.verify2FA = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const user = await User.findByEmail(email);

//     if (
//       !user ||
//       user.two_factor_code !== code ||
//       new Date(user.two_factor_expires) < new Date()
//     ) {
//       return res.status(400).json({ message: 'Invalid or expired 2FA code' });
//     }

//     await User.clearTwoFactor(email);

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({
//       message: '2FA verified. Login successful.',
//       token
//     });
//   } catch (err) {
//     console.error('❌ Verify 2FA error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
exports.verify2FA = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ message: 'Email and 2FA code are required' });
    }

    const user = await User.findByEmail(email);

    if (
      !user ||
      user.two_factor_code !== code ||
      new Date(user.two_factor_expires) < new Date()
    ) {
      return res.status(400).json({ message: 'Invalid or expired 2FA code' });
    }

    await User.clearTwoFactor(email);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data and token so frontend knows role
    res.status(200).json({
      message: '2FA verified. Login successful.',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error('❌ Verify 2FA error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// ✅ Logout
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logged out. Please clear token on client.' });
};

// ✅ Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(200).json({ message: 'If that email is registered, a reset code has been sent.' });

    const resetCode = genCode6();
    await User.setPasswordResetCode(email, resetCode, addMinutes(15 * 60 * 1000));
    await sendPasswordResetEmail(email, resetCode);
    res.json({ message: 'Password reset code sent if account exists.' });
  } catch (err) {
    console.error('❌ Forgot password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findByEmail(email);
    if (
      !user ||
      user.password_reset_code !== code ||
      new Date(user.password_reset_expires) < new Date()
    ) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    await User.resetPassword(email, newPassword);
    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    console.error('❌ Reset password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
