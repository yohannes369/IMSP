// const bcrypt = require('bcrypt');
// const db = require('../config/db');

// const User = {
//   // ➕ Create Staff
//   createStaff: async (email, password) => {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = `
//       INSERT INTO users (email, password, role, isActive)
//       VALUES (?, ?, 'staff', true)
//     `;
//     const [result] = await db.execute(sql, [email, hashedPassword]);
//     return result;
//   },

//   // 🔍 Find user by email
//   findByEmail: async (email) => {
//     const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
//     const [rows] = await db.execute(sql, [email]);
//     return rows[0]; // return single user
//   }
// };

// module.exports = User;
const db = require('../config/db'); // your MySQL connection
const bcrypt = require('bcrypt');

const UserModel = {
  // Find user by email
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // Update user role
  async updateRole(email, role) {
    const query = 'UPDATE users SET role = ? WHERE email = ?';
    await db.query(query, [role, email]);
  },

  // Other methods (createUser, etc.) can go here...
};

module.exports = UserModel;
