// const db = require('../config/db'); // Your MySQL connection
// const bcrypt = require('bcrypt');

// const UserModel = {
//   // Create new user
//   async createUser({ firstName, lastName, email, password, gender, phone, code }) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const query = `
//       INSERT INTO users (firstName, lastName, email, password, gender, phone, is_verified, verification_code, role)
//       VALUES (?, ?, ?, ?, ?, ?, 0, ?, 'user')
//     `;
//     const [result] = await db.query(query, [firstName, lastName, email, hashedPassword, gender, phone, code]);
//     return result.insertId;
//   },

//   // Find user by email
//   async findByEmail(email) {
//     const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//     return rows[0];
//   },

//   // Update verification code
//   async updateVerificationCode(email, code) {
//     const query = `UPDATE users SET verification_code = ? WHERE email = ?`;
//     await db.query(query, [code, email]);
//   },

//   // Mark user as verified
//   async verifyUser(email) {
//     const query = `UPDATE users SET is_verified = 1, verification_code = NULL WHERE email = ?`;
//     await db.query(query, [email]);
//   },

//   // Update 2FA code
//   async updateTwoFactor(email, code, expiresAt) {
//     const query = `UPDATE users SET two_factor_code = ?, two_factor_expires = ? WHERE email = ?`;
//     await db.query(query, [code, expiresAt, email]);
//   },

//   // Clear 2FA
//   async clearTwoFactor(email) {
//     const query = `UPDATE users SET two_factor_code = NULL, two_factor_expires = NULL WHERE email = ?`;
//     await db.query(query, [email]);
//   },

//   // Set password reset code
//   async setPasswordResetCode(email, code, expiresAt) {
//     const query = `UPDATE users SET password_reset_code = ?, password_reset_expires = ? WHERE email = ?`;
//     await db.query(query, [code, expiresAt, email]);
//   },

//   // Reset password
//   async resetPassword(email, newPassword) {
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     const query = `UPDATE users SET password = ?, password_reset_code = NULL, password_reset_expires = NULL WHERE email = ?`;
//     await db.query(query, [hashedPassword, email]);
//   }
// };

// module.exports = UserModel;



//correct one

// const db = require('../config/db'); // Your MySQL connection
// const bcrypt = require('bcrypt');

// const UserModel = {
//   // Create new user (regular signup)
//   async createUser({ firstName, lastName, email, password, gender, phone, code }) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const query = `
//       INSERT INTO users (firstName, lastName, email, password, gender, phone, is_verified, verification_code, role)
//       VALUES (?, ?, ?, ?, ?, ?, 0, ?, 'user')
//     `;
//     const [result] = await db.query(query, [firstName, lastName, email, hashedPassword, gender, phone, code]);
//     return result.insertId;
//   },

//   // Create new user (Google OAuth signup)
//   async createGoogleUser({ googleId, name, email, photo }) {
//     // Split name into first and last name if possible
//     const [firstName, ...lastNameParts] = name ? name.split(' ') : [''];
//     const lastName = lastNameParts.join(' ') || '';

//     const query = `
//       INSERT INTO users (googleId, firstName, lastName, email, photo, is_verified, role)
//       VALUES (?, ?, ?, ?, ?, 1, 'user')
//     `;
//     const [result] = await db.query(query, [googleId, firstName, lastName, email, photo]);
//     return result.insertId;
//   },

//   // Find user by email OR googleId
//   async findByEmailOrGoogleId(identifier) {
//     const query = `
//       SELECT * FROM users WHERE email = ? OR googleId = ?
//     `;
//     const [rows] = await db.query(query, [identifier, identifier]);
//     return rows[0];
//   },

//   // Find user by email
//   async findByEmail(email) {
//     const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//     return rows[0];
//   },

//   // Find user by Google ID
//   async findByGoogleId(googleId) {
//     const [rows] = await db.query('SELECT * FROM users WHERE googleId = ?', [googleId]);
//     return rows[0];
//   },

//   // Update verification code
//   async updateVerificationCode(email, code) {
//     const query = `UPDATE users SET verification_code = ? WHERE email = ?`;
//     await db.query(query, [code, email]);
//   },

//   // Mark user as verified
//   async verifyUser(email) {
//     const query = `UPDATE users SET is_verified = 1, verification_code = NULL WHERE email = ?`;
//     await db.query(query, [email]);
//   },

//   // Update 2FA code
//   async updateTwoFactor(email, code, expiresAt) {
//     const query = `UPDATE users SET two_factor_code = ?, two_factor_expires = ? WHERE email = ?`;
//     await db.query(query, [code, expiresAt, email]);
//   },

//   // Clear 2FA
//   async clearTwoFactor(email) {
//     const query = `UPDATE users SET two_factor_code = NULL, two_factor_expires = NULL WHERE email = ?`;
//     await db.query(query, [email]);
//   },

//   // Set password reset code
//   async setPasswordResetCode(email, code, expiresAt) {
//     const query = `UPDATE users SET password_reset_code = ?, password_reset_expires = ? WHERE email = ?`;
//     await db.query(query, [code, expiresAt, email]);
//   },

//   // Reset password
//   async resetPassword(email, newPassword) {
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     const query = `UPDATE users SET password = ?, password_reset_code = NULL, password_reset_expires = NULL WHERE email = ?`;
//     await db.query(query, [hashedPassword, email]);
//   }
// };

// module.exports = UserModel;
const db = require('../config/db'); // Your MySQL connection
const bcrypt = require('bcrypt');

const UserModel = {
  // Create new user (regular signup) with manual role
  // async createUser({ firstName, lastName, email, password, gender, phone, code, role }) {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const query = `
  //     INSERT INTO users (firstName, lastName, email, password, gender, phone, is_verified, verification_code, role)
  //     VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)
  //   `;
  //   const [result] = await db.query(query, [firstName, lastName, email, hashedPassword, gender, phone, code, role]);
  //   return result.insertId;
  // },
  
// async createUser({ firstName, lastName, email, password, gender, phone, code, role, staff_id }) {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const query = `
//     INSERT INTO users (firstName, lastName, email, password, gender, phone, is_verified, verification_code, role, staff_id)
//     VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?)
//   `;
//   const [result] = await db.query(query, [firstName, lastName, email, hashedPassword, gender, phone, code, role, staff_id]);
//   return result.staff_id; 
// },
async createUser({ firstName, lastName, email, password, gender, phone, code, role, staff_id }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (firstName, lastName, email, password, gender, phone, is_verified, verification_code, role, staff_id)
    VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?)
  `;

  const [result] = await db.query(query, [firstName, lastName, email, hashedPassword, gender, phone, code, role, staff_id]);

  // Return the inserted primary key id (assuming 'id' is auto-increment PK in your users table)
  // OR return submitted staff_id if that's what you prefer 
  // Here returning both for example:

  return {
    insertId: result.insertId,  // numeric PK auto-generated
    staff_id: staff_id          // provided staff_id string
  };
}
,
async findByStaffId(staff_id) {
  const query = 'SELECT * FROM users WHERE staff_id = ? LIMIT 1';
  const [rows] = await db.query(query, [staff_id]);
  return rows[0]; // returns user object if found, else undefined
},

  // Create new user (Google OAuth signup) with manual role
  async createGoogleUser({ googleId, name, email, photo, role }) {
    const [firstName, ...lastNameParts] = name ? name.split(' ') : [''];
    const lastName = lastNameParts.join(' ') || '';

    const query = `
      INSERT INTO users (googleId, firstName, lastName, email, photo, is_verified, role)
      VALUES (?, ?, ?, ?, ?, 1, ?)
    `;
    const [result] = await db.query(query, [googleId, firstName, lastName, email, photo, role]);
    return result.insertId;
  },

  // Find user by email OR googleId
  async findByEmailOrGoogleId(identifier) {
    const query = `SELECT * FROM users WHERE email = ? OR googleId = ?`;
    const [rows] = await db.query(query, [identifier, identifier]);
    return rows[0];
  },

  // Find user by email
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // Find user by Google ID
  async findByGoogleId(googleId) {
    const [rows] = await db.query('SELECT * FROM users WHERE googleId = ?', [googleId]);
    return rows[0];
  },

  // Update verification code
  async updateVerificationCode(email, code) {
    await db.query(`UPDATE users SET verification_code = ? WHERE email = ?`, [code, email]);
  },

  // Mark user as verified
  async verifyUser(email) {
    await db.query(`UPDATE users SET is_verified = 1, verification_code = NULL WHERE email = ?`, [email]);
  },

  // Update 2FA code
  async updateTwoFactor(email, code, expiresAt) {
    await db.query(`UPDATE users SET two_factor_code = ?, two_factor_expires = ? WHERE email = ?`, [code, expiresAt, email]);
  },

  // Clear 2FA
  async clearTwoFactor(email) {
    await db.query(`UPDATE users SET two_factor_code = NULL, two_factor_expires = NULL WHERE email = ?`, [email]);
  },

  // Set password reset code
  async setPasswordResetCode(email, code, expiresAt) {
    await db.query(`UPDATE users SET password_reset_code = ?, password_reset_expires = ? WHERE email = ?`, [code, expiresAt, email]);
  },

  // Reset password
  async resetPassword(email, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      `UPDATE users SET password = ?, password_reset_code = NULL, password_reset_expires = NULL WHERE email = ?`,
      [hashedPassword, email]
    );
  }
};

module.exports = UserModel;
