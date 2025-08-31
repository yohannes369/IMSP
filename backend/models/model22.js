// const db = require('../config/db');

// const Model22 = {
//     issueItem: async (data) => {
//         const { RequestID, ItemID, UnitID, Quantity, UnitPriceBirr, UnitPriceCent, Remark } = data;

//         // Get staff info from Requests table
//         const [requestRows] = await db.promise().query(
//             `SELECT StaffID, 
//                     (SELECT FName FROM Staff WHERE StaffID = r.StaffID) AS FName,
//                     (SELECT LName FROM Staff WHERE StaffID = r.StaffID) AS LName
//              FROM Requests r
//              WHERE RequestID = ?`,
//             [RequestID]
//         );

//         if (requestRows.length === 0) throw new Error("Request not found");

//         const { StaffID, FName, LName } = requestRows[0];

//         // Insert into Model22Form
//         const [result] = await db.promise().query(
//             `INSERT INTO Model22Form
//             (RequestID, StaffID, FName, LName, ItemID, UnitID, ActionType, Quantity, UnitPriceBirr, UnitPriceCent, BalanceQty, Remark)
//             VALUES (?, ?, ?, ?, ?, ?, 'ISSUE', ?, ?, ?, ?, ?)`,
//             [RequestID, StaffID, FName, LName, ItemID, UnitID, Quantity, UnitPriceBirr, UnitPriceCent, Quantity, Remark]
//         );

//         return result;
//     }
// };

// module.exports = Model22;
const db = require('../config/db'); // mysql2/promise pool

const Model22 = {
  // Existing issueItem function
  issueItem: async (data) => {
    const { RequestID, ItemID, UnitIDs, Quantity, Remark } = data;

    try {
      const [requestRows] = await db.query(
        `SELECT staff_id AS StaffID, fname AS FName, lname AS LName
         FROM requestform WHERE request_id = ?`,
        [RequestID]
      );
      if (!requestRows.length) throw new Error("Request not found");
      const { StaffID, FName, LName } = requestRows[0];

      const [itemRows] = await db.query(
        `SELECT n.Name AS ItemName, i.UnitPriceBirr, i.UnitPriceCent
         FROM items i
         JOIN itemnames n ON i.NameID = n.NameID
         WHERE i.ItemID = ?`,
        [ItemID]
      );
      if (!itemRows.length) throw new Error("Item not found");
      const { ItemName, UnitPriceBirr, UnitPriceCent } = itemRows[0];

      const insertedFormIDs = [];

      for (const UnitID of UnitIDs) {
        const [unitRows] = await db.query(
          `SELECT SerialNo FROM itemunits WHERE UnitID = ?`,
          [UnitID]
        );
        const SerialNo = unitRows.length ? unitRows[0].SerialNo : null;

        const [result] = await db.query(
          `INSERT INTO Model22Form
            (RequestID, StaffID, FName, LName, ItemID, ItemName, UnitID, SerialNo, ActionType, Quantity, UnitPriceBirr, UnitPriceCent, BalanceQty, Remark)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ISSUE', ?, ?, ?, ?, ?)`,
          [
            RequestID,
            StaffID,
            FName,
            LName,
            ItemID,
            ItemName,
            UnitID,
            SerialNo,
            Quantity,
            UnitPriceBirr,
            UnitPriceCent,
            Quantity,
            Remark
          ]
        );

        insertedFormIDs.push(result.insertId);
      }

      return { FormIDs: insertedFormIDs };

    } catch (error) {
      console.error('Error in issueItem:', error.message);
      throw error;
    }
  },

  // ✅ Add this function to fetch all Model22Form records
  getAllRecords: async () => {
    try {
      const [rows] = await db.query(`SELECT * FROM Model22Form ORDER BY FormID DESC`);
      return rows;
    } catch (err) {
      console.error('Error fetching Model22Form records:', err);
      throw err;
    }
  }
};

module.exports = Model22;
