
// const db = require('../config/db');

// const ItemModel = {
//   async addItem(name, serial_no, description, quantity, is_available) {
//     let nameId;
//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

//     const [itemResult] = await db.query(
//       'INSERT INTO items (serial_no, name_id, description, quantity, is_available) VALUES (?, ?, ?, ?, ?)',
//       [serial_no, nameId, description, quantity, is_available]
//     );

//     return itemResult;
//   },

//   async getAllItems() {
//     const [items] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description, items.quantity, items.is_available, items.created_at
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//     `);
//     return items;
//   },

//   async getItemById(id) {
//     const [rows] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description, items.quantity, items.is_available, items.created_at
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//       WHERE items.id = ?
//     `, [id]);

//     return rows.length ? rows[0] : null;
//   },

//   async deleteItem(id) {
//     const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
//     return result;
//   },

//   async updateItem(id, fields) {
//     const { name, serial_no, description, quantity, is_available } = fields;
//     let nameId;

//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

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











// const db = require('../config/db');

// const ItemModel = {
//   async addItem(name, serial_no, description, quantity, is_available, barcode) {
//     let nameId;
//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

//     const [itemResult] = await db.query(
//       'INSERT INTO items (serial_no, name_id, description, quantity, is_available, barcode) VALUES (?, ?, ?, ?, ?, ?)',
//       [serial_no, nameId, description, quantity, is_available, barcode]
//     );

//     return itemResult;
//   },

//   async getAllItems() {
//     const [items] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description,
//              items.quantity, items.is_available, items.created_at, items.barcode
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//     `);
//     return items;
//   },

//   async getItemById(id) {
//     const [rows] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description,
//              items.quantity, items.is_available, items.created_at, items.barcode
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//       WHERE items.id = ?
//     `, [id]);

//     return rows.length ? rows[0] : null;
//   },

//   async deleteItem(id) {
//     const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
//     return result;
//   },

//   async updateItem(id, fields) {
//     const { name, serial_no, description, quantity, is_available } = fields;
//     let nameId;

//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

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



// corect one

// const db = require('../config/db');

// const ItemModel = {
//   async addItem(name, serial_no, description, quantity, is_available, barcode) {
//     let nameId;
//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

//     const [itemResult] = await db.query(
//       'INSERT INTO items (serial_no, name_id, description, quantity, is_available, barcode) VALUES (?, ?, ?, ?, ?, ?)',
//       [serial_no, nameId, description, quantity, is_available, barcode]
//     );

//     return itemResult;
//   },

//   async getAllItems() {
//     const [items] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description,
//              items.quantity, items.is_available, items.created_at, items.barcode
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//     `);
//     return items;
//   },

//   async getItemById(id) {
//     const [rows] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description,
//              items.quantity, items.is_available, items.created_at, items.barcode
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//       WHERE items.id = ?
//     `, [id]);
//     return rows.length ? rows[0] : null;
//   },

//   async getItemBySerial(serial_no) {
//     const [rows] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description,
//              items.quantity, items.is_available, items.created_at, items.barcode
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//       WHERE items.serial_no = ?
//     `, [serial_no]);
//     return rows.length ? rows[0] : null;
//   },

//   async deleteItem(id) {
//     const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
//     return result;
//   },

//   async updateItem(id, fields) {
//     const { name, serial_no, description, quantity, is_available } = fields;
//     let nameId;
//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

//     const [result] = await db.query(
//       `UPDATE items
//        SET serial_no = ?, name_id = ?, description = ?, quantity = ?, is_available = ?, updated_at = NOW()
//        WHERE id = ?`,
//       [serial_no, nameId, description, quantity, is_available, id]
//     );

//     return result;
//   }
// };





//correct code the clerk add bar code during add item code



// // module.exports = ItemModel;
// const db = require('../config/db');

// const ItemModel = {
//   async addItem(name, serial_no, description, quantity, is_available, barcode) {
//     let nameId;
//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

//     const [itemResult] = await db.query(
//       'INSERT INTO items (serial_no, name_id, description, quantity, is_available, barcode) VALUES (?, ?, ?, ?, ?, ?)',
//       [serial_no, nameId, description, quantity, is_available, barcode]
//     );

//     return itemResult;
//   },

//   async getAllItems() {
//     const [items] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description,
//              items.quantity, items.is_available, items.created_at, items.barcode
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//     `);
//     return items;
//   },

//   async getItemById(id) {
//     const [rows] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description,
//              items.quantity, items.is_available, items.created_at, items.barcode
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//       WHERE items.id = ?
//     `, [id]);
//     return rows.length ? rows[0] : null;
//   },

//   async getItemBySerial(serial_no) {
//     // Check in items table first
//     const [itemRows] = await db.query(`
//       SELECT items.id, items.serial_no, item_names.name, items.description,
//              items.quantity, items.is_available, items.created_at, items.barcode
//       FROM items
//       JOIN item_names ON items.name_id = item_names.id
//       WHERE items.serial_no = ?
//     `, [serial_no]);

//     if (itemRows.length > 0) {
//       return { ...itemRows[0], status: 'in_stock' };
//     }

//     // If not found in items, check give_items table
//     const [giveItemRows] = await db.query(`
//       SELECT give_items.id, give_items.serial_no, item_names.name, give_items.description,
//              give_items.quantity, give_items.assigned_to, give_items.given_at, give_items.barcode
//       FROM give_items
//       JOIN item_names ON give_items.name_id = item_names.id
//       WHERE give_items.serial_no = ?
//     `, [serial_no]);

//     if (giveItemRows.length > 0) {
//       return { ...giveItemRows[0], status: 'assigned' };
//     }

//     return null;
//   },

//   async deleteItem(id) {
//     const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
//     return result;
//   },

//   async updateItem(id, fields) {
//     const { name, serial_no, description, quantity, is_available } = fields;
//     let nameId;
//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);

//     if (rows.length === 0) {
//       const [insertResult] = await db.query('INSERT INTO item_names (name) VALUES (?)', [name]);
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

//     const [result] = await db.query(
//       `UPDATE items
//        SET serial_no = ?, name_id = ?, description = ?, quantity = ?, is_available = ?, updated_at = NOW()
//        WHERE id = ?`,
//       [serial_no, nameId, description, quantity, is_available, id]
//     );

//     return result;
//   },

//   // New methods for give_items table
//   async requestItem(itemId, staffId) {
//     // First get the item details
//     const item = await this.getItemById(itemId);
//     if (!item) return null;

//     // Insert into requests table (you'll need to create this)
//     const [requestResult] = await db.query(
//       'INSERT INTO item_requests (item_id, staff_id, status) VALUES (?, ?, ?)',
//       [itemId, staffId, 'pending']
//     );

//     return requestResult;
//   },

//   async approveRequest(requestId, clerkId) {
//     // Get the request details
//     const [requestRows] = await db.query(
//       'SELECT * FROM item_requests WHERE id = ? AND status = "pending"',
//       [requestId]
//     );
//     if (requestRows.length === 0) return null;

//     const request = requestRows[0];
    
//     // Get the item details
//     const item = await this.getItemById(request.item_id);
//     if (!item) return null;

//     // Begin transaction
//     await db.query('START TRANSACTION');

//     try {
//       // 1. Move item to give_items table
//       const [giveItemResult] = await db.query(
//         `INSERT INTO give_items 
//         (serial_no, name_id, description, quantity, barcode, assinged_to, given_by, given_at)
//         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
//         [
//           item.serial_no,
//           item.name_id,
//           item.description,
//           item.quantity,
//           item.barcode,
//           request.staff_id,
//           clerkId
//         ]
//       );

//       // 2. Delete from items table
//       await db.query('DELETE FROM items WHERE id = ?', [item.id]);

//       // 3. Update request status
//       await db.query(
//         'UPDATE item_requests SET status = "approved", approved_by = ?, approved_at = NOW() WHERE id = ?',
//         [clerkId, requestId]
//       );

//       await db.query('COMMIT');
//       return giveItemResult;
//     } catch (err) {
//       await db.query('ROLLBACK');
//       throw err;
//     }
//   },

//   async getAllGivenItems() {
//     const [items] = await db.query(`
//       SELECT give_items.id, give_items.serial_no, item_names.name, give_items.description,
//              give_items.quantity, give_items.assigned_to, give_items.given_at, give_items.barcode
//       FROM give_items
//       JOIN item_names ON give_items.name_id = item_names.id
//     `);
//     return items;
//   }
// };

// module.exports = ItemModel;




// module.exports = ItemModel;


const db = require('../config/db');

const ItemModel = {
  async addItem(name, serial_no, description, quantity, is_available, barcode) {
    let nameId;

    // Check if the item name exists in item_names table
    const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);
    if (rows.length === 0) {
      const [insertResult] = await db.query(
        'INSERT INTO item_names (name) VALUES (?)',
        [name]
      );
      nameId = insertResult.insertId;
    } else {
      nameId = rows[0].id;
    }

    // Insert into items table (with barcode)
    const [itemResult] = await db.query(
      'INSERT INTO items (serial_no, name_id, description, quantity, is_available, barcode) VALUES (?, ?, ?, ?, ?, ?)',
      [serial_no, nameId, description, quantity, is_available, barcode]
    );

    const itemId = itemResult.insertId;

    // Insert into give_items table (only with barcode for now)
    await db.query(
      `INSERT INTO give_items (barcode) VALUES (?)`,
      [barcode]
    );

    return {
      itemId,
      barcodeInsertedInGiveItems: true
    };
  },

  async getAllItems() {
    const [items] = await db.query(`
      SELECT items.id, items.serial_no, item_names.name, items.description,
             items.quantity, items.is_available, items.created_at, items.barcode
      FROM items
      JOIN item_names ON items.name_id = item_names.id
    `);
    return items;
  },

  async getItemById(id) {
    const [rows] = await db.query(`
      SELECT items.id, items.serial_no, item_names.name, items.description,
             items.quantity, items.is_available, items.created_at, items.barcode
      FROM items
      JOIN item_names ON items.name_id = item_names.id
      WHERE items.id = ?
    `, [id]);
    return rows.length ? rows[0] : null;
  },

  async getItemBySerial(serial_no) {
    // Check in items table first
    const [itemRows] = await db.query(`
      SELECT items.id, items.serial_no, item_names.name, items.description,
             items.quantity, items.is_available, items.created_at, items.barcode
      FROM items
      JOIN item_names ON items.name_id = item_names.id
      WHERE items.serial_no = ?
    `, [serial_no]);

    if (itemRows.length > 0) {
      return { ...itemRows[0], status: 'in_stock' };
    }

    // If not found in items, check give_items table (no join here)
    const [giveItemRows] = await db.query(`
      SELECT id, item_serial, quantity, barcode
      FROM give_items
      WHERE item_serial = ?
    `, [serial_no]);

    if (giveItemRows.length > 0) {
      return { ...giveItemRows[0], status: 'assigned' };
    }

    return null;
  },

  async deleteItem(id) {
    const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
    return result;
  },

  async updateItem(id, fields) {
    const { name, serial_no, description, quantity, is_available, barcode } = fields;
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
       SET serial_no = ?, name_id = ?, description = ?, quantity = ?, is_available = ?, barcode = ?, updated_at = NOW()
       WHERE id = ?`,
      [serial_no, nameId, description, quantity, is_available, barcode, id]
    );

    return result;
  },

  // Request & Approval Logic
  async requestItem(itemId, staffId) {
    const item = await this.getItemById(itemId);
    if (!item) return null;

    const [requestResult] = await db.query(
      'INSERT INTO item_requests (item_id, staff_id, status) VALUES (?, ?, ?)',
      [itemId, staffId, 'pending']
    );

    return requestResult;
  },

  async approveRequest(requestId, clerkId) {
    const [requestRows] = await db.query(
      'SELECT * FROM item_requests WHERE id = ? AND status = "pending"',
      [requestId]
    );
    if (requestRows.length === 0) return null;

    const request = requestRows[0];
    const item = await this.getItemById(request.item_id);
    if (!item) return null;

    await db.query('START TRANSACTION');

    try {
      await db.query(
        `INSERT INTO give_items 
        (item_serial, quantity, barcode)
        VALUES (?, ?, ?)`,
        [
          item.serial_no,
          item.quantity,
          item.barcode
        ]
      );

      await db.query('DELETE FROM items WHERE id = ?', [item.id]);

      await db.query(
        'UPDATE item_requests SET status = "approved", approved_by = ?, approved_at = NOW() WHERE id = ?',
        [clerkId, requestId]
      );

      await db.query('COMMIT');
      return { success: true };
    } catch (err) {
      await db.query('ROLLBACK');
      throw err;
    }
  },

  async getAllGivenItems() {
    const [items] = await db.query(`
      SELECT id, item_serial, quantity, barcode
      FROM give_items
    `);
    return items;
  }
};

module.exports = ItemModel;
