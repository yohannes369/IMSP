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

const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  // ✅ Get all users
  async getAll() {
    const [rows] = await db.query('SELECT id, email, role, isActive FROM users');
    return rows;
  },

  // ✅ Find user by ID
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  // ✅ Find user by email
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // ✅ Update user role by email
  async updateRole(email, newRole) {
    const [result] = await db.query('UPDATE users SET role = ? WHERE email = ?', [newRole, email]);
    return result;
  },

  // ✅ Create Staff User
  async createStaff(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
      INSERT INTO users (email, password, role, isActive)
      VALUES (?, ?, 'staff', true)
    `;
    const [result] = await db.execute(sql, [email, hashedPassword]);
    return result;
  }
};

module.exports = User;