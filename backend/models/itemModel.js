
// const db = require('../config/db'); // MySQL connection

// const ItemModel = {
//   // Add item with dynamic category (item_names table)
//   async addItem(name, serial_no, description, quantity, is_available) {
//     let nameId;

//     // Check if the category (name) exists
//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

//     // Insert the item using the name_id
//     const [itemResult] = await db.query(
//       'INSERT INTO items (serial_no, name_id, description, quantity, is_available) VALUES (?, ?, ?, ?, ?)',
//       [serial_no, nameId, description, quantity, is_available]
//     );

//     return itemResult;
//   },

//   // Get all items (with name join)
//   async getAllItems() {
//     const [items] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description, items.quantity, items.is_available, items.created_at
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//     `);
//     return items;
//   },

//   // Delete item by ID
//   async deleteItem(id) {
//     const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
//     return result;
//   },

//   // Update item by ID (supports category/name update)
//   async updateItem(id, fields) {
//     const { name, serial_no, description, quantity, is_available } = fields;
//     let nameId;

//     // Check if category already exists or insert new
//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

//     // Update item
//     const [result] = await db.query(
//       `UPDATE items
//        SET serial_no = ?, name_id = ?, description = ?, quantity = ?, is_available = ?, updated_at = NOW()
//        WHERE id = ?`,
//       [serial_no, nameId, description, quantity, is_available, id]
//     );

//     return result;
//   }
// };

// module.exports = ItemModel;
const db = require('../config/db');

const ItemModel = {
  async addItem(name, serial_no, description, quantity, is_available) {
    let nameId;
    const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

    if (rows.length === 0) {
      const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
      nameId = insertResult.insertId;
    } else {
      nameId = rows[0].id;
    }

    const [itemResult] = await db.query(
      'INSERT INTO items (serial_no, name_id, description, quantity, is_available) VALUES (?, ?, ?, ?, ?)',
      [serial_no, nameId, description, quantity, is_available]
    );

    return itemResult;
  },

  async getAllItems() {
    const [items] = await db.query(`
      SELECT items.id, items.serial_no, item_names.name, items.description, items.quantity, items.is_available, items.created_at
      FROM items
      JOIN item_names ON items.name_id = item_names.id
    `);
    return items;
  },

  async getItemById(id) {
    const [rows] = await db.query(`
      SELECT items.id, items.serial_no, item_names.name, items.description, items.quantity, items.is_available, items.created_at
      FROM items
      JOIN item_names ON items.name_id = item_names.id
      WHERE items.id = ?
    `, [id]);

    return rows.length ? rows[0] : null;
  },

  async deleteItem(id) {
    const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
    return result;
  },

  async updateItem(id, fields) {
    const { name, serial_no, description, quantity, is_available } = fields;
    let nameId;

    const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

    if (rows.length === 0) {
      const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
      nameId = insertResult.insertId;
    } else {
      nameId = rows[0].id;
    }

    const [result] = await db.query(
      `UPDATE items
       SET serial_no = ?, name_id = ?, description = ?, quantity = ?, is_available = ?, updated_at = NOW()
       WHERE id = ?`,
      [serial_no, nameId, description, quantity, is_available, id]
    );

    return result;
  }
};

module.exports = ItemModel;


