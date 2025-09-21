const db = require('../config/db');

const ContactModel = {
  create: async ({ full_name, email, subject, message }) => {
    const sql = 'INSERT INTO contact_messages (full_name, email, subject, message) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [full_name, email, subject, message]);
    return result;
  },

  getAll: async () => {
    const sql = 'SELECT * FROM contact_messages ORDER BY created_at DESC';
    const [rows] = await db.execute(sql);
    return rows;
  }
};

module.exports = ContactModel;
