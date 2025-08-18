const db = require('../config/db');

const GivenItem = {
  async create({ staff_id, item_serial, quantity, item_name }) {
    const [result] = await db.query(
      `INSERT INTO given_items (staff_id, item_serial, quantity, item_name, given_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [staff_id, item_serial, quantity, item_name]
    );
    return result;
  }
};

module.exports = GivenItem;
