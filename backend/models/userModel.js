const db = require('../config/db'); // Your MySQL connection
const bcrypt = require('bcrypt');

const UserModel = {
  // Create new user
  async createUser({ firstName, lastName, email, password, gender, phone, code }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (firstName, lastName, email, password, gender, phone, is_verified, verification_code, role)
      VALUES (?, ?, ?, ?, ?, ?, 0, ?, 'user')
    `;
    const [result] = await db.query(query, [firstName, lastName, email, hashedPassword, gender, phone, code]);
    return result.insertId;
  },

  // Find user by email
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // Update verification code
  async updateVerificationCode(email, code) {
    const query = `UPDATE users SET verification_code = ? WHERE email = ?`;
    await db.query(query, [code, email]);
  },

  // Mark user as verified
  async verifyUser(email) {
    const query = `UPDATE users SET is_verified = 1, verification_code = NULL WHERE email = ?`;
    await db.query(query, [email]);
  },

  // Update 2FA code
  async updateTwoFactor(email, code, expiresAt) {
    const query = `UPDATE users SET two_factor_code = ?, two_factor_expires = ? WHERE email = ?`;
    await db.query(query, [code, expiresAt, email]);
  },

  // Clear 2FA
  async clearTwoFactor(email) {
    const query = `UPDATE users SET two_factor_code = NULL, two_factor_expires = NULL WHERE email = ?`;
    await db.query(query, [email]);
  },

  // Set password reset code
  async setPasswordResetCode(email, code, expiresAt) {
    const query = `UPDATE users SET password_reset_code = ?, password_reset_expires = ? WHERE email = ?`;
    await db.query(query, [code, expiresAt, email]);
  },

  // Reset password
  async resetPassword(email, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = `UPDATE users SET password = ?, password_reset_code = NULL, password_reset_expires = NULL WHERE email = ?`;
    await db.query(query, [hashedPassword, email]);
  }
};

module.exports = UserModel;
