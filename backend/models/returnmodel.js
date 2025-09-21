const db = require("../config/db");

const Return = {
  // Create a new return request
  async create(data) {
    const sql = `
      INSERT INTO returns (user_id, first_name, last_name, item_name, serial_number, quantity, status, return_date)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW())
    `;
    const [result] = await db.query(sql, [
      data.user_id,
      data.first_name,
      data.last_name,
      data.item_name,
      data.serial_number,
      data.quantity,
    ]);
    return result.insertId;
  },

  // Update status of a return request
  async updateStatus(return_id, status) {
    const sql = `UPDATE returns SET status = ? WHERE return_id = ?`;
    const [result] = await db.query(sql, [status, return_id]);
    return result.affectedRows;
  },

  // Get all return requests
  async getAll() {
    const sql = `SELECT * FROM returns ORDER BY return_date DESC`;
    const [rows] = await db.query(sql);
    return rows;
  },
};

module.exports = Return;
