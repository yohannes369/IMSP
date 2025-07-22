// const pool = require('../config/db');

// const User = {
//   async createUser(name, email, passwordHash, verificationToken) {
//     const [result] = await pool.query(
//       `INSERT INTO users (name, email, password, verification_token, is_verified) VALUES (?, ?, ?, ?, ?)`,
//       [name, email, passwordHash, verificationToken, false]
//     );
//     return result;
//   },

//   async findByEmail(email) {
//     const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
//     return rows[0];
//   },

//   async verifyUser(token) {
//     const [result] = await pool.query(
//       `UPDATE users SET is_verified = ? WHERE verification_token = ?`,
//       [true, token]
//     );
//     return result;
//   }
// };

// module.exports = User;
