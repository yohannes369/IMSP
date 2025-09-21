

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
//         i.Remark,
//         i.Description,
//         i.Category,
//         i.IsReturnable
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
//         i.Remark,
//         i.Description,
//         i.Category,
//         i.IsReturnable
//       FROM Items i
//       INNER JOIN ItemNames n ON i.NameID = n.NameID
//       WHERE i.ItemID = ?
//     `, [itemID]);
//     return rows[0];
//   },

//   // Add new item
//   add: async (itemData) => {
//     const {
//       Name,
//       Model,
//       TotalQty,
//       ShelfNumber,
//       UnitPriceBirr,
//       UnitPriceCent,
//       Remark,
//       Description,
//       Category,
//       IsReturnable
//     } = itemData;

//     // 1. Check if Name already exists
//     let [rows] = await pool.query(
//       `SELECT NameID FROM ItemNames WHERE Name = ? LIMIT 1`,
//       [Name]
//     );

//     let NameID;
//     if (rows.length > 0) {
//       NameID = rows[0].NameID;
//     } else {
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

//     // 3. Insert item
//     const [result] = await pool.query(
//       `INSERT INTO Items
//        (NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark, Description, Category, IsReturnable)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         NameID,
//         Model,
//         TotalQty ?? 1,
//         ShelfNumber ?? "",
//         UnitPriceBirr ?? 0,
//         UnitPriceCent ?? 0,
//         Remark ?? "",
//         Description ?? "",
//         Category !== undefined ? Category : "General",
//         IsReturnable !== undefined ? IsReturnable : 1
//       ]
//     );

//     return result.insertId;
//   },

//   // Update item by ID
//   update: async (itemID, itemData) => {
//     const {
//       Name,
//       Model,
//       TotalQty,
//       ShelfNumber,
//       UnitPriceBirr,
//       UnitPriceCent,
//       Remark,
//       Description,
//       Category,
//       IsReturnable
//     } = itemData;

//     let NameID;
//     if (Name) {
//       const [rows] = await pool.query(
//         `SELECT NameID FROM ItemNames WHERE Name = ? LIMIT 1`,
//         [Name]
//       );
//       if (rows.length > 0) {
//         NameID = rows[0].NameID;
//       } else {
//         const [nameResult] = await pool.query(
//           `INSERT INTO ItemNames (Name) VALUES (?)`,
//           [Name]
//         );
//         NameID = nameResult.insertId;
//       }
//     }

//     // Build dynamic update query
//     const fields = [];
//     const values = [];

//     if (NameID) {
//       fields.push("NameID = ?");
//       values.push(NameID);
//     }
//     if (Model !== undefined) {
//       fields.push("Model = ?");
//       values.push(Model);
//     }
//     if (TotalQty !== undefined) {
//       fields.push("TotalQty = ?");
//       values.push(TotalQty);
//     }
//     if (ShelfNumber !== undefined) {
//       fields.push("ShelfNumber = ?");
//       values.push(ShelfNumber);
//     }
//     if (UnitPriceBirr !== undefined) {
//       fields.push("UnitPriceBirr = ?");
//       values.push(UnitPriceBirr);
//     }
//     if (UnitPriceCent !== undefined) {
//       fields.push("UnitPriceCent = ?");
//       values.push(UnitPriceCent);
//     }
//     if (Remark !== undefined) {
//       fields.push("Remark = ?");
//       values.push(Remark);
//     }
//     if (Description !== undefined) {
//       fields.push("Description = ?");
//       values.push(Description);
//     }
//     if (Category !== undefined) {
//       fields.push("Category = ?");
//       values.push(Category);
//     }
//     if (IsReturnable !== undefined) {
//       fields.push("IsReturnable = ?");
//       values.push(IsReturnable);
//     }

//     values.push(itemID);

//     const [result] = await pool.query(
//       `UPDATE Items SET ${fields.join(", ")} WHERE ItemID = ?`,
//       values
//     );

//     return result.affectedRows;
//   },

//   // Delete item by ID
//   delete: async (itemID) => {
//     const [result] = await pool.query(
//       `DELETE FROM Items WHERE ItemID = ?`,
//       [itemID]
//     );
//     return result.affectedRows;
//   }
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
//         i.Remark,
//         i.Description,
//         i.Category,
//         i.IsReturnable,
//         i.unit_type
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
//         i.Remark,
//         i.Description,
//         i.Category,
//         i.IsReturnable,
//         i.unit_type
//       FROM Items i
//       INNER JOIN ItemNames n ON i.NameID = n.NameID
//       WHERE i.ItemID = ?
//     `, [itemID]);
//     return rows[0];
//   },

//   // Add new item
//   add: async (itemData) => {
//     const {
//       Name,
//       Model,
//       TotalQty,
//       ShelfNumber,
//       UnitPriceBirr,
//       UnitPriceCent,
//       Remark,
//       Description,
//       Category,
//       IsReturnable,
//       unit_type
//     } = itemData;

//     // 1. Check if Name already exists
//     let [rows] = await pool.query(
//       `SELECT NameID FROM ItemNames WHERE Name = ? LIMIT 1`,
//       [Name]
//     );

//     let NameID;
//     if (rows.length > 0) {
//       NameID = rows[0].NameID;
//     } else {
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

//     // 3. Insert item
//     const [result] = await pool.query(
//       `INSERT INTO Items
//        (NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark, Description, Category, IsReturnable, unit_type)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         NameID,
//         Model,
//         TotalQty ?? 1,
//         ShelfNumber ?? "",
//         UnitPriceBirr ?? 0,
//         UnitPriceCent ?? 0,
//         Remark ?? "",
//         Description ?? "",
//         Category !== undefined ? Category : "General",
//         IsReturnable !== undefined ? IsReturnable : 1,
//         unit_type ?? "piece"
//       ]
//     );

//     return result.insertId;
//   },

//   // Update item by ID
//   update: async (itemID, itemData) => {
//     const {
//       Name,
//       Model,
//       TotalQty,
//       ShelfNumber,
//       UnitPriceBirr,
//       UnitPriceCent,
//       Remark,
//       Description,
//       Category,
//       IsReturnable,
//       unit_type
//     } = itemData;

//     let NameID;
//     if (Name) {
//       const [rows] = await pool.query(
//         `SELECT NameID FROM ItemNames WHERE Name = ? LIMIT 1`,
//         [Name]
//       );
//       if (rows.length > 0) {
//         NameID = rows[0].NameID;
//       } else {
//         const [nameResult] = await pool.query(
//           `INSERT INTO ItemNames (Name) VALUES (?)`,
//           [Name]
//         );
//         NameID = nameResult.insertId;
//       }
//     }

//     // Build dynamic update query
//     const fields = [];
//     const values = [];

//     if (NameID) {
//       fields.push("NameID = ?");
//       values.push(NameID);
//     }
//     if (Model !== undefined) {
//       fields.push("Model = ?");
//       values.push(Model);
//     }
//     if (TotalQty !== undefined) {
//       fields.push("TotalQty = ?");
//       values.push(TotalQty);
//     }
//     if (ShelfNumber !== undefined) {
//       fields.push("ShelfNumber = ?");
//       values.push(ShelfNumber);
//     }
//     if (UnitPriceBirr !== undefined) {
//       fields.push("UnitPriceBirr = ?");
//       values.push(UnitPriceBirr);
//     }
//     if (UnitPriceCent !== undefined) {
//       fields.push("UnitPriceCent = ?");
//       values.push(UnitPriceCent);
//     }
//     if (Remark !== undefined) {
//       fields.push("Remark = ?");
//       values.push(Remark);
//     }
//     if (Description !== undefined) {
//       fields.push("Description = ?");
//       values.push(Description);
//     }
//     if (Category !== undefined) {
//       fields.push("Category = ?");
//       values.push(Category);
//     }
//     if (IsReturnable !== undefined) {
//       fields.push("IsReturnable = ?");
//       values.push(IsReturnable);
//     }
//     if (unit_type !== undefined) {
//       fields.push("unit_type = ?");
//       values.push(unit_type);
//     }

//     values.push(itemID);

//     const [result] = await pool.query(
//       `UPDATE Items SET ${fields.join(", ")} WHERE ItemID = ?`,
//       values
//     );

//     return result.affectedRows;
//   },

//   // Delete item by ID
//   delete: async (itemID) => {
//     const [result] = await pool.query(
//       `DELETE FROM Items WHERE ItemID = ?`,
//       [itemID]
//     );
//     return result.affectedRows;
//   }
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
        i.Remark,
        i.Description,
        i.Category,
        i.IsReturnable,
        i.unit_type
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
        i.Remark,
        i.Description,
        i.Category,
        i.IsReturnable,
        i.unit_type
      FROM Items i
      INNER JOIN ItemNames n ON i.NameID = n.NameID
      WHERE i.ItemID = ?
    `, [itemID]);
    return rows[0];
  },

  // Add new item
  add: async (itemData) => {
    const {
      Name,
      Model,
      TotalQty,
      ShelfNumber,
      UnitPriceBirr,
      UnitPriceCent,
      Remark,
      Description,
      Category,
      IsReturnable,
      unit_type
    } = itemData;

    // 1. Check if Name already exists
    let [rows] = await pool.query(
      `SELECT NameID FROM ItemNames WHERE Name = ? LIMIT 1`,
      [Name]
    );

    let NameID;
    if (rows.length > 0) {
      NameID = rows[0].NameID;
    } else {
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

    // 3. Insert item → use the provided unit_type (default only if missing)
    const [result] = await pool.query(
      `INSERT INTO Items
       (NameID, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark, Description, Category, IsReturnable, unit_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        NameID,
        Model,
        TotalQty ?? 1,
        ShelfNumber ?? "",
        UnitPriceBirr ?? 0,
        UnitPriceCent ?? 0,
        Remark ?? "",
        Description ?? "",
        Category !== undefined ? Category : "General",
        IsReturnable !== undefined ? IsReturnable : 1,
        unit_type ?? null   // ❌ FIX: don’t force "piece"
      ]
    );

    return result.insertId;
  },

  // Update item by ID
  update: async (itemID, itemData) => {
    const {
      Name,
      Model,
      TotalQty,
      ShelfNumber,
      UnitPriceBirr,
      UnitPriceCent,
      Remark,
      Description,
      Category,
      IsReturnable,
      unit_type
    } = itemData;

    let NameID;
    if (Name) {
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

    // Build dynamic update query
    const fields = [];
    const values = [];

    if (NameID) {
      fields.push("NameID = ?");
      values.push(NameID);
    }
    if (Model !== undefined) {
      fields.push("Model = ?");
      values.push(Model);
    }
    if (TotalQty !== undefined) {
      fields.push("TotalQty = ?");
      values.push(TotalQty);
    }
    if (ShelfNumber !== undefined) {
      fields.push("ShelfNumber = ?");
      values.push(ShelfNumber);
    }
    if (UnitPriceBirr !== undefined) {
      fields.push("UnitPriceBirr = ?");
      values.push(UnitPriceBirr);
    }
    if (UnitPriceCent !== undefined) {
      fields.push("UnitPriceCent = ?");
      values.push(UnitPriceCent);
    }
    if (Remark !== undefined) {
      fields.push("Remark = ?");
      values.push(Remark);
    }
    if (Description !== undefined) {
      fields.push("Description = ?");
      values.push(Description);
    }
    if (Category !== undefined) {
      fields.push("Category = ?");
      values.push(Category);
    }
    if (IsReturnable !== undefined) {
      fields.push("IsReturnable = ?");
      values.push(IsReturnable);
    }
    if (unit_type !== undefined) {
      fields.push("unit_type = ?"); // ✅ update unit_type properly
      values.push(unit_type);
    }

    values.push(itemID);

    const [result] = await pool.query(
      `UPDATE Items SET ${fields.join(", ")} WHERE ItemID = ?`,
      values
    );

    return result.affectedRows;
  },

  // Delete item by ID
  delete: async (itemID) => {
    const [result] = await pool.query(
      `DELETE FROM Items WHERE ItemID = ?`,
      [itemID]
    );
    return result.affectedRows;
  }
};

module.exports = Item;
