

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');
// const User = require("../models/User");
// const { 
//   sendVerificationEmail, 
//   sendVerificationSuccessEmail, 
//   sendTwoFactorCodeEmail,
//   sendPasswordResetEmail,
//   logout
// } = require('../utils/email');

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// /* ---------- Helpers ---------- */
// function genCode6() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }
// function addMinutes(ms) { return new Date(Date.now() + ms); }

// /* ==================== REGISTER ==================== */
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ message: 'Name, email, and password are required' });

//     const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

//     if (existing.length > 0) {
//       const u = existing[0];
//       if (u.is_verified) {
//         return res.status(400).json({ message: 'Email already registered and verified' });
//       } else {
//         const code = genCode6();
//         const expiresAt = addMinutes(24 * 60 * 60 * 1000);
//         await db.query(
//           'UPDATE users SET verification_code = ?, verification_expires = ? WHERE email = ?',
//           [code, expiresAt, email]
//         );
//         await sendVerificationEmail(email, code);
//         return res.status(200).json({ message: 'Verification code resent. Please check your email.' });
//       }
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const code = genCode6();
//     const expiresAt = addMinutes(24 * 60 * 60 * 1000);

//     await db.query(
//       'INSERT INTO users (name, email, password, is_verified, verification_code, verification_expires) VALUES (?, ?, ?, ?, ?, ?)',
//       [name, email, hashedPassword, 0, code, expiresAt]
//     );

//     await sendVerificationEmail(email, code);
//     res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
//   } catch (err) {
//     console.error('❌ Register error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// /* ==================== VERIFY EMAIL ==================== */
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { email, code } = req.body;

//     const [rows] = await db.query(
//       'SELECT * FROM users WHERE email = ? AND verification_code = ? AND verification_expires > NOW()',
//       [email, code]
//     );
//     if (rows.length === 0)
//       return res.status(400).json({ message: 'Invalid or expired code' });

//     await db.query(
//       'UPDATE users SET is_verified = 1, verification_code = NULL, verification_expires = NULL WHERE email = ?',
//       [email]
//     );

//     await sendVerificationSuccessEmail(email);
//     res.json({ message: 'Email verified successfully' });
//   } catch (err) {
//     console.error('❌ Verify email error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /* ==================== LOGIN (STEP 1: email+password -> send 2FA) ==================== */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (rows.length === 0)
//       return res.status(400).json({ message: 'Invalid credentials' });

//     const user = rows[0];

//     if (!user.is_verified)
//       return res.status(403).json({ message: 'Please verify your email first' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match)
//       return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate 2FA code
//     const twoCode = genCode6();
//     const twoExp = addMinutes(5 * 60 * 1000); // 5 mins
//     await db.query(
//       'UPDATE users SET two_factor_code = ?, two_factor_expires = ? WHERE email = ?',
//       [twoCode, twoExp, email]
//     );

//     await sendTwoFactorCodeEmail(email, twoCode);
//     res.json({ message: '2FA code sent to your email. Please verify to complete login.' });
//   } catch (err) {
//     console.error('❌ Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /* ==================== VERIFY 2FA (STEP 2) ==================== */
// exports.verify2FA = async (req, res) => {
//   try {
//     const { email, code } = req.body;

//     const [rows] = await db.query(
//       'SELECT * FROM users WHERE email = ? AND two_factor_code = ? AND two_factor_expires > NOW()',
//       [email, code]
//     );
//     if (rows.length === 0)
//       return res.status(400).json({ message: 'Invalid or expired 2FA code' });

//     // Clear used 2FA
//     await db.query(
//       'UPDATE users SET two_factor_code = NULL, two_factor_expires = NULL WHERE email = ?',
//       [email]
//     );

//     const user = rows[0];
//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

//     res.json({ token, message: '2FA verified. Logged in successfully.' });
//   } catch (err) {
//     console.error('❌ Verify 2FA error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /* ==================== FORGOT PASSWORD (send reset code) ==================== */
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email)
//       return res.status(400).json({ message: 'Email is required' });

//     const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (rows.length === 0)
//       return res.status(200).json({ message: 'If that email is registered, a reset code has been sent.' }); 
//       // do not reveal registration status

//     const resetCode = genCode6();
//     const resetExp = addMinutes(15 * 60 * 1000); // 15 mins

//     await db.query(
//       'UPDATE users SET password_reset_code = ?, password_reset_expires = ? WHERE email = ?',
//       [resetCode, resetExp, email]
//     );

//     await sendPasswordResetEmail(email, resetCode);
//     res.json({ message: 'Password reset code sent if account exists.' });
//   } catch (err) {
//     console.error('❌ Forgot password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /* ==================== RESET PASSWORD (verify code & set new) ==================== */
// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, code, newPassword } = req.body;

//     if (!email || !code || !newPassword)
//       return res.status(400).json({ message: 'Email, code, and newPassword are required' });

//     const [rows] = await db.query(
//       'SELECT * FROM users WHERE email = ? AND password_reset_code = ? AND password_reset_expires > NOW()',
//       [email, code]
//     );
//     if (rows.length === 0)
//       return res.status(400).json({ message: 'Invalid or expired reset code' });

//     const hashed = await bcrypt.hash(newPassword, 10);
//     await db.query(
//       'UPDATE users SET password = ?, password_reset_code = NULL, password_reset_expires = NULL WHERE email = ?',
//       [hashed, email]
//     );

//     res.json({ message: 'Password reset successful. You can now log in.' });
//   } catch (err) {
//     console.error('❌ Reset password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// // Logout Controller
// exports.logout = (req, res) => {
//   res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
//   return res.status(200).json({ message: 'Logged out successfully' });
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

// Register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, phone } = req.body;
    if (!firstName || !lastName || !email || !password || !gender || !phone) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

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

    const code = genCode6();
    await User.createUser({ firstName, lastName, email, password, gender, phone, code });
    await sendVerificationEmail(email, code);
    res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Verify Email
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

// Login Step 1
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.is_verified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const twoCode = genCode6();
    await User.updateTwoFactor(email, twoCode, addMinutes(5 * 60 * 1000));
    await sendTwoFactorCodeEmail(email, twoCode);
    res.json({ message: '2FA code sent to your email. Please verify to complete login.' });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify 2FA
exports.verify2FA = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findByEmail(email);
    if (!user || user.two_factor_code !== code || new Date(user.two_factor_expires) < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired 2FA code' });
    }

    await User.clearTwoFactor(email);
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, message: '2FA verified. Logged in successfully.' });
  } catch (err) {
    console.error('❌ Verify 2FA error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Forgot Password
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

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findByEmail(email);
    if (!user || user.password_reset_code !== code || new Date(user.password_reset_expires) < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    await User.resetPassword(email, newPassword);
    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    console.error('❌ Reset password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
  return res.status(200).json({ message: 'Logged out successfully' });
};
