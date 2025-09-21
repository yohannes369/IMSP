
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

// // ✅ Register (default role is guest)
// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, gender, phone, staff_id } = req.body;

//     if (!firstName || !lastName || !email || !password || !gender || !phone || !staff_id) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     // Check staff_id
//     const existingStaffIdUser = await User.findByStaffId(staff_id);
//     if (existingStaffIdUser) {
//       return res.status(400).json({ message: 'Staff ID is taken, please use another' });
//     }

//     // Check email
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

//     const finalRole = 'guest'; // Default role is guest
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
//       staff_id,
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

// // ✅ Login with 2FA
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     if (!user.is_verified) return res.status(403).json({ message: 'Please verify your email first' });
//     if (!user.isActive) return res.status(403).json({ message: 'Your account is deactivated. Please contact admin.' });
//     if (!password || !user.password) return res.status(400).json({ message: 'This account does not have a password. Please use OAuth login.' });

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

// // ✅ Verify 2FA
// exports.verify2FA = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     if (!email || !code) return res.status(400).json({ message: 'Email and 2FA code are required' });

//     const user = await User.findByEmail(email);
//     if (!user || user.two_factor_code !== code || new Date(user.two_factor_expires) < new Date()) {
//       return res.status(400).json({ message: 'Invalid or expired 2FA code' });
//     }

//     await User.clearTwoFactor(email);

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     let redirectPage = '/guest'; // Default redirect page
//     if (user.role === 'admin') redirectPage = '/admin';
//     else if (user.role === 'manager') redirectPage = '/manager';
//     else if (user.role === 'stock-clerk') redirectPage = '/stock-clerk';
//     else if (user.role === 'staff') redirectPage = '/staff';

//     res.status(200).json({
//       message: '2FA verified. Login successful.',
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       },
//       redirectPage,
//     });
//   } catch (err) {
//     console.error('❌ Verify 2FA error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ OAuth Login
// exports.oauthLogin = async (req, res) => {
//   try {
//     const { email, firstName, lastName } = req.body;
//     if (!email) return res.status(400).json({ message: 'Email is required from OAuth provider' });

//     let user = await User.findByEmail(email);

//     if (!user) {
//       // New OAuth user → default guest role
//       user = await User.createUser({
//         firstName: firstName || 'OAuth',
//         lastName: lastName || 'User',
//         email,
//         password: null,
//         gender: 'N/A',
//         phone: 'N/A',
//         role: 'guest',
//         is_verified: true,
//         staff_id: `oauth_${Date.now()}`,
//       });
//     } else {
//       // User exists → just verify if not verified
//       if (!user.is_verified) await User.verifyUser(email);
//     }

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     let redirectPage = '/guest';
//     if (user.role === 'admin') redirectPage = '/admin';
//     else if (user.role === 'manager') redirectPage = '/manager';
//     else if (user.role === 'stock-clerk') redirectPage = '/stock-clerk';
//     else if (user.role === 'staff') redirectPage = '/staff';

//     res.status(200).json({
//       message: 'OAuth login successful',
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       },
//       redirectPage,
//     });
//   } catch (err) {
//     console.error('❌ OAuth login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Logout
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

// ✅ Register (default role is guest)
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, phone, staff_id, role } = req.body;

    if (!firstName || !lastName || !email || !password || !gender || !phone || !staff_id) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Check staff_id
    const existingStaffIdUser = await User.findByStaffId(staff_id);
    if (existingStaffIdUser) {
      return res.status(400).json({ message: 'Staff ID is taken, please use another' });
    }

    // Check email
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

    const finalRole = role && ['admin','manager','clerk','staff','guest','ict'].includes(role) ? role : 'guest'; 
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

// ✅ Login with 2FA
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.is_verified) return res.status(403).json({ message: 'Please verify your email first' });
    if (!user.isActive) return res.status(403).json({ message: 'Your account is deactivated. Please contact admin.' });
    if (!password || !user.password) return res.status(400).json({ message: 'This account does not have a password. Please use OAuth login.' });

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

// ✅ Verify 2FA
exports.verify2FA = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: 'Email and 2FA code are required' });

    const user = await User.findByEmail(email);
    if (!user || user.two_factor_code !== code || new Date(user.two_factor_expires) < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired 2FA code' });
    }

    await User.clearTwoFactor(email);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Determine redirect page including ict role
    let redirectPage = '/guest';
    if (user.role === 'admin') redirectPage = '/admin';
    else if (user.role === 'manager') redirectPage = '/manager';
    else if (user.role === 'clerk' || user.role === 'stock-clerk') redirectPage = '/stock-clerk';
    else if (user.role === 'staff') redirectPage = '/staff';
    else if (user.role === 'ict') redirectPage = '/ict';

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
      redirectPage,
    });
  } catch (err) {
    console.error('❌ Verify 2FA error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ OAuth Login
exports.oauthLogin = async (req, res) => {
  try {
    const { email, firstName, lastName, role } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required from OAuth provider' });

    let user = await User.findByEmail(email);

    if (!user) {
      // New OAuth user → default guest role (or use provided valid role)
      const finalRole = role && ['admin','manager','clerk','staff','guest','ict'].includes(role) ? role : 'guest';
      user = await User.createUser({
        firstName: firstName || 'OAuth',
        lastName: lastName || 'User',
        email,
        password: null,
        gender: 'N/A',
        phone: 'N/A',
        role: finalRole,
        is_verified: true,
        staff_id: `oauth_${Date.now()}`,
      });
    } else {
      // User exists → just verify if not verified
      if (!user.is_verified) await User.verifyUser(email);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    let redirectPage = '/guest';
    if (user.role === 'admin') redirectPage = '/admin';
    else if (user.role === 'manager') redirectPage = '/manager';
    else if (user.role === 'clerk' || user.role === 'stock-clerk') redirectPage = '/stock-clerk';
    else if (user.role === 'staff') redirectPage = '/staff';
    else if (user.role === 'ict') redirectPage = '/ict';

    res.status(200).json({
      message: 'OAuth login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      redirectPage,
    });
  } catch (err) {
    console.error('❌ OAuth login error:', err);
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
