

// const db = require('../config/db');

// const ItemModel = {
//   async addItem(name, serial_no, description, quantity, is_available, barcode) {
//     let nameId;

//     // Check if the item name exists in item_names table
//     const [rows] = await db.query('SELECT id FROM item_names WHERE name = ?', [name]);
//     if (rows.length === 0) {
//       const [insertResult] = await db.query(
//         'INSERT INTO item_names (name) VALUES (?)',
//         [name]
//       );
//       nameId = insertResult.insertId;
//     } else {
//       nameId = rows[0].id;
//     }

//     // Insert into items table (with barcode)
//     const [itemResult] = await db.query(
//       'INSERT INTO items (serial_no, name_id, description, quantity, is_available, barcode) VALUES (?, ?, ?, ?, ?, ?)',
//       [serial_no, nameId, description, quantity, is_available, barcode]
//     );

//     const itemId = itemResult.insertId;

//     // Insert into give_items table (only with barcode for now)
//     await db.query(
//       `INSERT INTO give_items (barcode) VALUES (?)`,
//       [barcode]
//     );

//     return {
//       itemId,
//       barcodeInsertedInGiveItems: true
//     };
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

//     // If not found in items, check give_items table (no join here)
//     const [giveItemRows] = await db.query(`
//       SELECT id, item_serial, quantity, barcode
//       FROM give_items
//       WHERE item_serial = ?
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
//     const { name, serial_no, description, quantity, is_available, barcode } = fields;
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
//        SET serial_no = ?, name_id = ?, description = ?, quantity = ?, is_available = ?, barcode = ?, updated_at = NOW()
//        WHERE id = ?`,
//       [serial_no, nameId, description, quantity, is_available, barcode, id]
//     );

//     return result;
//   },

//   // Request & Approval Logic
//   async requestItem(itemId, staffId) {
//     const item = await this.getItemById(itemId);
//     if (!item) return null;

//     const [requestResult] = await db.query(
//       'INSERT INTO item_requests (item_id, staff_id, status) VALUES (?, ?, ?)',
//       [itemId, staffId, 'pending']
//     );

//     return requestResult;
//   },

//   async approveRequest(requestId, clerkId) {
//     const [requestRows] = await db.query(
//       'SELECT * FROM item_requests WHERE id = ? AND status = "pending"',
//       [requestId]
//     );
//     if (requestRows.length === 0) return null;

//     const request = requestRows[0];
//     const item = await this.getItemById(request.item_id);
//     if (!item) return null;

//     await db.query('START TRANSACTION');

//     try {
//       await db.query(
//         `INSERT INTO give_items 
//         (item_serial, quantity, barcode)
//         VALUES (?, ?, ?)`,
//         [
//           item.serial_no,
//           item.quantity,
//           item.barcode
//         ]
//       );

//       await db.query('DELETE FROM items WHERE id = ?', [item.id]);

//       await db.query(
//         'UPDATE item_requests SET status = "approved", approved_by = ?, approved_at = NOW() WHERE id = ?',
//         [clerkId, requestId]
//       );

//       await db.query('COMMIT');
//       return { success: true };
//     } catch (err) {
//       await db.query('ROLLBACK');
//       throw err;
//     }
//   },

//   async getAllGivenItems() {
//     const [items] = await db.query(`
//       SELECT id, item_serial, quantity, barcode
//       FROM give_items
//     `);
//     return items;
//   }
// };

// module.exports = ItemModel;









// const pool = require('../config/db'); // ✅ use the same variable name as in db.js

// const Item = {
//   add: async (itemData) => {
//     const {
//       Name,
//       Model,
//       TotalQty,
//       ShelfNumber,
//       UnitPriceBirr,
//       UnitPriceCent,
//       Remark,
//       Description = "" // optional, defaults to empty string
//     } = itemData;

//     // Ensure numeric fields are numbers
//     const totalQtyNum = Number(TotalQty) || 0;
//     const unitPriceBirrNum = Number(UnitPriceBirr) || 0;
//     const unitPriceCentNum = Number(UnitPriceCent) || 0;

//     const [result] = await pool.query(
//       `INSERT INTO Items 
//        (Name, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark, Description)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         Name,
//         Model,
//         totalQtyNum,
//         ShelfNumber,
//         unitPriceBirrNum,
//         unitPriceCentNum,
//         Remark || "",
//         Description
//       ]
//     );

//     return result.insertId; // Return new ItemID
//   }
// };

// module.exports = Item;


// const pool = require('../config/db');

// const Item = {
//   getAll: async () => {
//     const [rows] = await pool.query(`SELECT * FROM Items`);
//     return rows;
//   },

//   getById: async (itemID) => {
//     const [rows] = await pool.query(`SELECT * FROM Items WHERE ItemID = ?`, [itemID]);
//     return rows[0];
//   },

//   add: async (itemData) => {
//     const {
//       Name,
//       Model,
//       TotalQty,
//       ShelfNumber,
//       UnitPriceBirr,
//       UnitPriceCent,
//       Remark,
//       Description = ""
//     } = itemData;

//     const [result] = await pool.query(
//       `INSERT INTO Items
//        (Name, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark, Description)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [Name, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark || "", Description]
//     );

//     return result.insertId;
//   }
// };

// module.exports = Item;


// const pool = require('../config/db');

// const Item = {
//   // Get all items
//   getAll: async () => {
//     const [rows] = await pool.query(`SELECT * FROM Items`);
//     return rows;
//   },

//   // Get item by ID
//   getById: async (itemID) => {
//     const [rows] = await pool.query(`SELECT * FROM Items WHERE ItemID = ?`, [itemID]);
//     return rows[0];
//   },

//   add: async (itemData) => {
//   const {
//     Name,             // goes into ItemNames
//     Model,            // goes into Items
//     TotalQty,
//     ShelfNumber,
//     UnitPriceBirr,
//     UnitPriceCent,
//     Remark,
//     Description = ""
//   } = itemData;

//   // 1. Check if Name already exists in ItemNames
//   let [rows] = await pool.query(
//     `SELECT NameID FROM ItemNames WHERE Name = ? LIMIT 1`,
//     [Name]
//   );

//   let NameID;
//   if (rows.length > 0) {
//     NameID = rows[0].NameID;
//   } else {
//     // Insert new Name if not exists
//     const [nameResult] = await pool.query(
//       `INSERT INTO ItemNames (Name) VALUES (?)`,
//       [Name]
//     );
//     NameID = nameResult.insertId;
//   }

//   // 2. Check if same NameID + Model exists
//   const [existing] = await pool.query(
//     `SELECT ItemID FROM Items WHERE NameID = ? AND Model = ? LIMIT 1`,
//     [NameID, Model]
//   );

//   if (existing.length > 0) {
//     throw new Error(`Item "${Name}" with model "${Model}" already exists.`);
//   }

//   // 3. Insert into Items
//   const [result] = await pool.query(
//     `INSERT INTO Items
//      (NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark, Description)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     [NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark || "", Description]
//   );

//   return result.insertId;
// }

// };

// module.exports = Item;

// const pool = require('../config/db');

// const Item = {
//   // Get all items
//   getAll: async () => {
//     const [rows] = await pool.query(`
//       SELECT 
//         i.ItemID,
//         n.Name AS ItemName,
//         i.Model,
//         i.TotalQty,
//         i.ShelfNumber,
//         i.UnitPriceBirr,
//         i.UnitPriceCent,
//         i.Remark
//       FROM Items i
//       INNER JOIN ItemNames n ON i.NameID = n.NameID
//       ORDER BY n.Name, i.Model
//     `);
//     return rows;
//   },

//   // Get item by ID
//   getById: async (itemID) => {
//     const [rows] = await pool.query(`
//       SELECT 
//         i.ItemID,
//         n.Name AS ItemName,
//         i.Model,
//         i.TotalQty,
//         i.ShelfNumber,
//         i.UnitPriceBirr,
//         i.UnitPriceCent,
//         i.Remark
//       FROM Items i
//       INNER JOIN ItemNames n ON i.NameID = n.NameID
//       WHERE i.ItemID = ?
//     `, [itemID]);
//     return rows[0];
//   },

//   // Add new item
//   add: async (itemData) => {
//     const {
//       Name,    // goes into ItemNames
//       Model,   // goes into Items
//       TotalQty,
//       ShelfNumber,
//       UnitPriceBirr,
//       UnitPriceCent,
//       Remark
//     } = itemData;

//     // 1. Check if Name already exists in ItemNames
//     let [rows] = await pool.query(
//       `SELECT NameID FROM ItemNames WHERE Name = ? LIMIT 1`,
//       [Name]
//     );

//     let NameID;
//     if (rows.length > 0) {
//       NameID = rows[0].NameID;
//     } else {
//       // Insert new Name if not exists
//       const [nameResult] = await pool.query(
//         `INSERT INTO ItemNames (Name) VALUES (?)`,
//         [Name]
//       );
//       NameID = nameResult.insertId;
//     }

//     // 2. Check if same NameID + Model exists
//     const [existing] = await pool.query(
//       `SELECT ItemID FROM Items WHERE NameID = ? AND Model = ? LIMIT 1`,
//       [NameID, Model]
//     );

//     if (existing.length > 0) {
//       throw new Error(`Item "${Name}" with model "${Model}" already exists.`);
//     }

//     // 3. Insert into Items
//     const [result] = await pool.query(
//       `INSERT INTO Items
//        (NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark || ""]
//     );

//     return result.insertId;
//   }

//   // Update and Delete methods can be added here as needed


// };

// module.exports = Item;
const pool = require('../config/db');

const Item = {
  // Get all items
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT 
        i.ItemID,
        n.Name AS ItemName,
        i.Model,
        i.TotalQty,
        i.ShelfNumber,
        i.UnitPriceBirr,
        i.UnitPriceCent,
        i.Remark
      FROM Items i
      INNER JOIN ItemNames n ON i.NameID = n.NameID
      ORDER BY n.Name, i.Model
    `);
    return rows;
  },

  // Get item by ID
  getById: async (itemID) => {
    const [rows] = await pool.query(`
      SELECT 
        i.ItemID,
        n.Name AS ItemName,
        i.Model,
        i.TotalQty,
        i.ShelfNumber,
        i.UnitPriceBirr,
        i.UnitPriceCent,
        i.Remark
      FROM Items i
      INNER JOIN ItemNames n ON i.NameID = n.NameID
      WHERE i.ItemID = ?
    `, [itemID]);
    return rows[0];
  },

  // Add new item
  add: async (itemData) => {
    const {
      Name,    // goes into ItemNames
      Model,   // goes into Items
      TotalQty,
      ShelfNumber,
      UnitPriceBirr,
      UnitPriceCent,
      Remark
    } = itemData;

    // 1. Check if Name already exists in ItemNames
    let [rows] = await pool.query(
      `SELECT NameID FROM ItemNames WHERE Name = ? LIMIT 1`,
      [Name]
    );

    let NameID;
    if (rows.length > 0) {
      NameID = rows[0].NameID;
    } else {
      // Insert new Name if not exists
      const [nameResult] = await pool.query(
        `INSERT INTO ItemNames (Name) VALUES (?)`,
        [Name]
      );
      NameID = nameResult.insertId;
    }

    // 2. Check if same NameID + Model exists
    const [existing] = await pool.query(
      `SELECT ItemID FROM Items WHERE NameID = ? AND Model = ? LIMIT 1`,
      [NameID, Model]
    );

    if (existing.length > 0) {
      throw new Error(`Item "${Name}" with model "${Model}" already exists.`);
    }

    // 3. Insert into Items
    const [result] = await pool.query(
      `INSERT INTO Items
       (NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark || ""]
    );

    return result.insertId;
  },

  // Update item by ID
  update: async (itemID, itemData) => {
    const {
      Name,   // optional
      Model,  // optional
      TotalQty,
      ShelfNumber,
      UnitPriceBirr,
      UnitPriceCent,
      Remark
    } = itemData;

    let NameID;
    if (Name) {
      // Ensure Name exists in ItemNames
      const [rows] = await pool.query(
        `SELECT NameID FROM ItemNames WHERE Name = ? LIMIT 1`,
        [Name]
      );
      if (rows.length > 0) {
        NameID = rows[0].NameID;
      } else {
        const [nameResult] = await pool.query(
          `INSERT INTO ItemNames (Name) VALUES (?)`,
          [Name]
        );
        NameID = nameResult.insertId;
      }
    }

    // Update Items table
    const [result] = await pool.query(
      `UPDATE Items
       SET ${NameID ? "NameID = ?, " : ""} Model = ?, TotalQty = ?, ShelfNumber = ?, UnitPriceBirr = ?, UnitPriceCent = ?, Remark = ?
       WHERE ItemID = ?`,
      NameID
        ? [NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark || "", itemID]
        : [Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark || "", itemID]
    );

    return result.affectedRows; // number of rows updated
  },

  // Delete item by ID
  delete: async (itemID) => {
    const [result] = await pool.query(
      `DELETE FROM Items WHERE ItemID = ?`,
      [itemID]
    );
    return result.affectedRows; // number of rows deleted
  }
};

module.exports = Item;
