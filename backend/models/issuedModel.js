const db = require('../config/db');

const IssuedModel = {
  insertIssuedItem: async ({ request_id, item_type, staff_id, quantity, given_by }) => {
    return await db.query(
      "INSERT INTO item_issued (request_id, item_type, staff_id, quantity, given_by) VALUES (?, ?, ?, ?, ?)",
      [request_id, item_type, staff_id, quantity, given_by]
    );
  }
};

module.exports = IssuedModel;
