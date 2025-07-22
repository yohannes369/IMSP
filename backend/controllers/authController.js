
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');
// const { 
//   sendVerificationEmail, 
//   sendVerificationSuccessEmail, 
//   sendTwoFactorCodeEmail 
// } = require('../utils/email');

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// function generateVerificationCode() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // ==================== REGISTER ====================
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Name, email, and password are required' });
//     }

//     // Check if user exists
//     const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

//     if (existingUsers.length > 0) {
//       const existingUser = existingUsers[0];
//       if (existingUser.is_verified) {
//         return res.status(400).json({ message: 'Email already registered and verified' });
//       } else {
//         // Resend code for unverified user
//         const code = generateVerificationCode();
//         const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

//         await db.query(
//           'UPDATE users SET verification_code = ?, verification_expires = ? WHERE email = ?',
//           [code, expiresAt, email]
//         );

//         await sendVerificationEmail(email, code);
//         return res.status(200).json({ message: 'Verification code resent. Please check your email.' });
//       }
//     }

//     // New user registration
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const code = generateVerificationCode();
//     const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

//     await db.query(
//       'INSERT INTO users (name, email, password, is_verified, verification_code, verification_expires) VALUES (?, ?, ?, ?, ?, ?)',
//       [name, email, hashedPassword, 0, code, expiresAt]
//     );

//     await sendVerificationEmail(email, code);
//     res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
//   } catch (error) {
//     console.error('❌ Register error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // ==================== VERIFY EMAIL ====================
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const [rows] = await db.query(
//       'SELECT * FROM users WHERE email = ? AND verification_code = ? AND verification_expires > NOW()',
//       [email, code]
//     );

//     if (rows.length === 0) return res.status(400).json({ message: 'Invalid or expired code' });

//     await db.query(
//       'UPDATE users SET is_verified = 1, verification_code = NULL, verification_expires = NULL WHERE email = ?',
//       [email]
//     );

//     await sendVerificationSuccessEmail(email);
//     res.json({ message: 'Email verified successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ==================== LOGIN (STEP 1) ====================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

//     if (rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });
//     const user = rows[0];

//     if (!user.is_verified) return res.status(403).json({ message: 'Please verify your email first' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate 2FA code
//     const twoFactorCode = generateVerificationCode();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

//     // Store 2FA code temporarily in DB
//     await db.query(
//       'UPDATE users SET two_factor_code = ?, two_factor_expires = ? WHERE email = ?',
//       [twoFactorCode, expiresAt, email]
//     );

//     // Send 2FA code via email
//     await sendTwoFactorCodeEmail(email, twoFactorCode);

//     res.json({ message: '2FA code sent to your email. Please verify to complete login.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ==================== VERIFY 2FA (STEP 2) ====================
// exports.verify2FA = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const [rows] = await db.query(
//       'SELECT * FROM users WHERE email = ? AND two_factor_code = ? AND two_factor_expires > NOW()',
//       [email, code]
//     );

//     if (rows.length === 0) return res.status(400).json({ message: 'Invalid or expired 2FA code' });

//     // Clear 2FA code
//     await db.query(
//       'UPDATE users SET two_factor_code = NULL, two_factor_expires = NULL WHERE email = ?',
//       [email]
//     );

//     const user = rows[0];
//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

//     res.json({ token, message: '2FA verified. Logged in successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { 
  sendVerificationEmail, 
  sendVerificationSuccessEmail, 
  sendTwoFactorCodeEmail,
  sendPasswordResetEmail
} = require('../utils/email');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/* ---------- Helpers ---------- */
function genCode6() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
function addMinutes(ms) { return new Date(Date.now() + ms); }

/* ==================== REGISTER ==================== */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email, and password are required' });

    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existing.length > 0) {
      const u = existing[0];
      if (u.is_verified) {
        return res.status(400).json({ message: 'Email already registered and verified' });
      } else {
        const code = genCode6();
        const expiresAt = addMinutes(24 * 60 * 60 * 1000);
        await db.query(
          'UPDATE users SET verification_code = ?, verification_expires = ? WHERE email = ?',
          [code, expiresAt, email]
        );
        await sendVerificationEmail(email, code);
        return res.status(200).json({ message: 'Verification code resent. Please check your email.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const code = genCode6();
    const expiresAt = addMinutes(24 * 60 * 60 * 1000);

    await db.query(
      'INSERT INTO users (name, email, password, is_verified, verification_code, verification_expires) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, 0, code, expiresAt]
    );

    await sendVerificationEmail(email, code);
    res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/* ==================== VERIFY EMAIL ==================== */
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ? AND verification_code = ? AND verification_expires > NOW()',
      [email, code]
    );
    if (rows.length === 0)
      return res.status(400).json({ message: 'Invalid or expired code' });

    await db.query(
      'UPDATE users SET is_verified = 1, verification_code = NULL, verification_expires = NULL WHERE email = ?',
      [email]
    );

    await sendVerificationSuccessEmail(email);
    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error('❌ Verify email error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ==================== LOGIN (STEP 1: email+password -> send 2FA) ==================== */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0)
      return res.status(400).json({ message: 'Invalid credentials' });

    const user = rows[0];

    if (!user.is_verified)
      return res.status(403).json({ message: 'Please verify your email first' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Generate 2FA code
    const twoCode = genCode6();
    const twoExp = addMinutes(5 * 60 * 1000); // 5 mins
    await db.query(
      'UPDATE users SET two_factor_code = ?, two_factor_expires = ? WHERE email = ?',
      [twoCode, twoExp, email]
    );

    await sendTwoFactorCodeEmail(email, twoCode);
    res.json({ message: '2FA code sent to your email. Please verify to complete login.' });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ==================== VERIFY 2FA (STEP 2) ==================== */
exports.verify2FA = async (req, res) => {
  try {
    const { email, code } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ? AND two_factor_code = ? AND two_factor_expires > NOW()',
      [email, code]
    );
    if (rows.length === 0)
      return res.status(400).json({ message: 'Invalid or expired 2FA code' });

    // Clear used 2FA
    await db.query(
      'UPDATE users SET two_factor_code = NULL, two_factor_expires = NULL WHERE email = ?',
      [email]
    );

    const user = rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, message: '2FA verified. Logged in successfully.' });
  } catch (err) {
    console.error('❌ Verify 2FA error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ==================== FORGOT PASSWORD (send reset code) ==================== */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: 'Email is required' });

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0)
      return res.status(200).json({ message: 'If that email is registered, a reset code has been sent.' }); 
      // do not reveal registration status

    const resetCode = genCode6();
    const resetExp = addMinutes(15 * 60 * 1000); // 15 mins

    await db.query(
      'UPDATE users SET password_reset_code = ?, password_reset_expires = ? WHERE email = ?',
      [resetCode, resetExp, email]
    );

    await sendPasswordResetEmail(email, resetCode);
    res.json({ message: 'Password reset code sent if account exists.' });
  } catch (err) {
    console.error('❌ Forgot password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ==================== RESET PASSWORD (verify code & set new) ==================== */
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword)
      return res.status(400).json({ message: 'Email, code, and newPassword are required' });

    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ? AND password_reset_code = ? AND password_reset_expires > NOW()',
      [email, code]
    );
    if (rows.length === 0)
      return res.status(400).json({ message: 'Invalid or expired reset code' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query(
      'UPDATE users SET password = ?, password_reset_code = NULL, password_reset_expires = NULL WHERE email = ?',
      [hashed, email]
    );

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    console.error('❌ Reset password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
