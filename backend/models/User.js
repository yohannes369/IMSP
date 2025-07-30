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
  
 







  async activateUser(id) {
    const [result] = await db.query(
      'UPDATE users SET isActive = true WHERE id = ?',
      [id]
    );
    return result;
  },

  // Deactivate user by id
  async deactivateUser(id) {
    const [result] = await db.query(
      'UPDATE users SET isActive = false WHERE id = ?',
      [id]
    );
    return result;
  },


  // Create user with staff ID only
async assignStaffId(staff_id) {
  const query = 'INSERT INTO users (staff_id) VALUES (?)';
  const [result] = await db.query(query, [staff_id]);
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