
// const db = require('../config/db'); // mysql2/promise pool

// const Model22 = {
//   /**
//    * Issue items with real-time notification
//    * @param {Object} data - { RequestID, ItemID, UnitIDs, Quantity, Remark }
//    * @param {Object} io - Socket.IO server instance
//    */
//   issueItem: async (data, io) => {
//     const { RequestID, ItemID, UnitIDs, Quantity, Remark } = data;

//     try {
//       // 1️⃣ Get request details (Staff info)
//       const [requestRows] = await db.query(
//         `SELECT staff_id AS StaffID, fname AS FName, lname AS LName
//          FROM requestform WHERE request_id = ?`,
//         [RequestID]
//       );
//       if (!requestRows.length) throw new Error("Request not found");
//       const { StaffID, FName, LName } = requestRows[0];

//       // 2️⃣ Get item details
//       const [itemRows] = await db.query(
//         `SELECT n.Name AS ItemName, i.TotalQty, i.UnitPriceBirr, i.UnitPriceCent
//          FROM items i
//          JOIN itemnames n ON i.NameID = n.NameID
//          WHERE i.ItemID = ?`,
//         [ItemID]
//       );
//       if (!itemRows.length) throw new Error("Item not found");
//       const { ItemName, TotalQty, UnitPriceBirr, UnitPriceCent } = itemRows[0];

//       if (TotalQty < Quantity) throw new Error(`Not enough stock. Available: ${TotalQty}, Requested: ${Quantity}`);

//       const insertedFormIDs = [];

//       // 3️⃣ Loop through units
//       for (const UnitID of UnitIDs) {
//         const [unitRows] = await db.query(
//           `SELECT SerialNo, Status FROM itemunits WHERE UnitID = ?`,
//           [UnitID]
//         );
//         if (!unitRows.length) throw new Error(`Unit ${UnitID} not found`);
//         if (unitRows[0].Status !== 'AVAILABLE') throw new Error(`Unit ${UnitID} is not available`);

//         const SerialNo = unitRows[0].SerialNo;

//         // ➡️ Insert into Model22Form
//         const [result] = await db.query(
//           `INSERT INTO Model22Form
//             (RequestID, StaffID, FName, LName, ItemID, ItemName, UnitID, SerialNo, ActionType, Quantity, UnitPriceBirr, UnitPriceCent, BalanceQty, Remark)
//            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ISSUE', ?, ?, ?, ?, ?)`,
//           [RequestID, StaffID, FName, LName, ItemID, ItemName, UnitID, SerialNo, Quantity, UnitPriceBirr, UnitPriceCent, Quantity, Remark]
//         );

//         insertedFormIDs.push(result.insertId);

//         // 4️⃣ Update itemunits → assign to staff & mark as ISSUED
//         await db.query(
//           `UPDATE itemunits SET Status = 'ISSUED', AssignedTo = ? WHERE UnitID = ?`,
//           [StaffID, UnitID]
//         );
//       }

//       // 5️⃣ Reduce quantity in items table
//       await db.query(
//         `UPDATE items SET TotalQty = TotalQty - ? WHERE ItemID = ?`,
//         [Quantity, ItemID]
//       );

//       // 6️⃣ Emit real-time notification
//       if (io) {
//         io.emit('itemIssued', {
//           RequestID, ItemID, ItemName, Quantity, UnitIDs, StaffID, FName, LName, Remark, Timestamp: new Date()
//         });
//       }

//       return { FormIDs: insertedFormIDs };
//     } catch (error) {
//       console.error('Error in issueItem:', error.message);
//       throw error;
//     }
//   },

//   /**
//    * Return issued item with real-time notification
//    * @param {Number} FormID - Model22Form ID of the issued item
//    * @param {Object} io - Socket.IO server instance
//    */
//   returnItem: async (FormID, io) => {
//     try {
//       // 1️⃣ Get issued item record
//       const [formRows] = await db.query(
//         `SELECT * FROM Model22Form WHERE FormID = ? AND ActionType = 'ISSUE'`,
//         [FormID]
//       );
//       if (!formRows.length) throw new Error('Issued item not found');

//       const form = formRows[0];

//       // 2️⃣ Update Model22Form → mark as RETURNED
//       await db.query(
//         `UPDATE Model22Form SET ActionType = 'RETURN', BalanceQty = 0 WHERE FormID = ?`,
//         [FormID]
//       );

//       // 3️⃣ Update itemunits → mark as AVAILABLE
//       await db.query(
//         `UPDATE itemunits SET Status = 'AVAILABLE', AssignedTo = NULL WHERE UnitID = ?`,
//         [form.UnitID]
//       );

//       // 4️⃣ Update items table → increase TotalQty
//       await db.query(
//         `UPDATE items SET TotalQty = TotalQty + ? WHERE ItemID = ?`,
//         [form.Quantity, form.ItemID]
//       );

//       // 5️⃣ Emit real-time notification
//       if (io) {
//         io.emit('itemReturned', {
//           FormID: form.FormID,
//           RequestID: form.RequestID,
//           ItemID: form.ItemID,
//           ItemName: form.ItemName,
//           Quantity: form.Quantity,
//           UnitID: form.UnitID,
//           StaffID: form.StaffID,
//           FName: form.FName,
//           LName: form.LName,
//           Remark: form.Remark,
//           Timestamp: new Date()
//         });
//       }

//       return { message: 'Item returned successfully' };
//     } catch (err) {
//       console.error('Error in returnItem:', err.message);
//       throw err;
//     }
//   },

//   // ✅ Fetch all Model22Form records
//   getAllRecords: async () => {
//     try {
//       const [rows] = await db.query(`SELECT * FROM Model22Form ORDER BY FormID DESC`);
//       return rows;
//     } catch (err) {
//       console.error('Error fetching Model22Form records:', err);
//       throw err;
//     }
//   }
// };

// module.exports = Model22;





const db = require('../config/db'); // mysql2/promise pool

const Model22 = {
  /**
   * Issue items with real-time notification
   * @param {Object} data - { RequestID, ItemID, UnitIDs, Quantity, Remark }
   * @param {Object} io - Socket.IO server instance
   */
  issueItem: async (data, io) => {
    const { RequestID, ItemID, UnitIDs, Quantity, Remark } = data;

    try {
      // 1️⃣ Get request details (Staff info)
      const [requestRows] = await db.query(
        `SELECT staff_id AS StaffID, fname AS FName, lname AS LName
         FROM requestform WHERE request_id = ?`,
        [RequestID]
      );
      if (!requestRows.length) throw new Error("Request not found");
      const { StaffID, FName, LName } = requestRows[0];

      // 2️⃣ Get item details
      const [itemRows] = await db.query(
        `SELECT n.Name AS ItemName, i.TotalQty, i.UnitPriceBirr, i.UnitPriceCent
         FROM items i
         JOIN itemnames n ON i.NameID = n.NameID
         WHERE i.ItemID = ?`,
        [ItemID]
      );
      if (!itemRows.length) throw new Error("Item not found");
      const { ItemName, TotalQty, UnitPriceBirr, UnitPriceCent } = itemRows[0];

      // 🚨 Stock validation
      if (TotalQty === 0) {
        throw new Error(`Item "${ItemName}" is out of stock`);
      }
      if (TotalQty < Quantity) {
        throw new Error(
          `Not enough stock for "${ItemName}". Available: ${TotalQty}, Requested: ${Quantity}`
        );
      }

      const insertedFormIDs = [];

      // 3️⃣ Loop through units
      for (const UnitID of UnitIDs) {
        const [unitRows] = await db.query(
          `SELECT SerialNo, Status FROM itemunits WHERE UnitID = ?`,
          [UnitID]
        );
        if (!unitRows.length) throw new Error(`Unit ${UnitID} not found`);
        if (unitRows[0].Status !== "AVAILABLE") {
          throw new Error(`Unit ${UnitID} is not available`);
        }

        const SerialNo = unitRows[0].SerialNo;

        // ➡️ Insert into Model22Form
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
            Remark,
          ]
        );

        insertedFormIDs.push(result.insertId);

        // 4️⃣ Update itemunits → assign to staff & mark as ISSUED
        await db.query(
          `UPDATE itemunits SET Status = 'ISSUED', AssignedTo = ? WHERE UnitID = ?`,
          [StaffID, UnitID]
        );
      }

      // 5️⃣ Reduce quantity in items table
      await db.query(
        `UPDATE items SET TotalQty = TotalQty - ? WHERE ItemID = ?`,
        [Quantity, ItemID]
      );

      // 6️⃣ Emit real-time notification
      if (io) {
        io.emit("itemIssued", {
          RequestID,
          ItemID,
          ItemName,
          Quantity,
          UnitIDs,
          StaffID,
          FName,
          LName,
          Remark,
          Timestamp: new Date(),
        });
      }

      return { FormIDs: insertedFormIDs };
    } catch (error) {
      console.error("Error in issueItem:", error.message);
      throw error;
    }
  },

  /**
   * Return issued item with real-time notification
   * @param {Number} FormID - Model22Form ID of the issued item
   * @param {Object} io - Socket.IO server instance
   */
  returnItem: async (FormID, io) => {
    try {
      // 1️⃣ Get issued item record
      const [formRows] = await db.query(
        `SELECT * FROM Model22Form WHERE FormID = ? AND ActionType = 'ISSUE'`,
        [FormID]
      );
      if (!formRows.length) throw new Error("Issued item not found");

      const form = formRows[0];

      // 2️⃣ Update Model22Form → mark as RETURNED
      await db.query(
        `UPDATE Model22Form SET ActionType = 'RETURN', BalanceQty = 0 WHERE FormID = ?`,
        [FormID]
      );

      // 3️⃣ Update itemunits → mark as AVAILABLE
      await db.query(
        `UPDATE itemunits SET Status = 'AVAILABLE', AssignedTo = NULL WHERE UnitID = ?`,
        [form.UnitID]
      );

      // 4️⃣ Update items table → increase TotalQty
      await db.query(
        `UPDATE items SET TotalQty = TotalQty + ? WHERE ItemID = ?`,
        [form.Quantity, form.ItemID]
      );

      // 5️⃣ Emit real-time notification
      if (io) {
        io.emit("itemReturned", {
          FormID: form.FormID,
          RequestID: form.RequestID,
          ItemID: form.ItemID,
          ItemName: form.ItemName,
          Quantity: form.Quantity,
          UnitID: form.UnitID,
          StaffID: form.StaffID,
          FName: form.FName,
          LName: form.LName,
          Remark: form.Remark,
          Timestamp: new Date(),
        });
      }

      return { message: "Item returned successfully" };
    } catch (err) {
      console.error("Error in returnItem:", err.message);
      throw err;
    }
  },

  // ✅ Fetch all Model22Form records
  getAllRecords: async () => {
    try {
      const [rows] = await db.query(
        `SELECT * FROM Model22Form ORDER BY FormID DESC`
      );
      return rows;
    } catch (err) {
      console.error("Error fetching Model22Form records:", err);
      throw err;
    }
  },
};

module.exports = Model22;








// const db = require('../config/db'); // mysql2/promise pool

// const Model22 = {
//   /**
//    * Issue items with real-time notification
//    * @param {Object} data - { RequestID, ItemID, UnitIDs, Quantity, Remark }
//    * @param {Object} io - Socket.IO server instance
//    */
//   issueItem: async (data, io) => {
//     const { RequestID, ItemID, UnitIDs, Remark } = data;
//     const Quantity = UnitIDs.length; // Number of units to issue

//     try {
//       // 1️⃣ Get request details (Staff info)
//       const [requestRows] = await db.query(
//         `SELECT staff_id AS StaffID, fname AS FName, lname AS LName
//          FROM requestform WHERE request_id = ?`,
//         [RequestID]
//       );
//       if (!requestRows.length) throw new Error("Request not found");
//       const { StaffID, FName, LName } = requestRows[0];

//       // 2️⃣ Get item details
//       const [itemRows] = await db.query(
//         `SELECT n.Name AS ItemName, i.TotalQty, i.UnitPriceBirr, i.UnitPriceCent
//          FROM items i
//          JOIN itemnames n ON i.NameID = n.NameID
//          WHERE i.ItemID = ?`,
//         [ItemID]
//       );
//       if (!itemRows.length) throw new Error("Item not found");
//       const { ItemName, TotalQty, UnitPriceBirr, UnitPriceCent } = itemRows[0];

//       if (TotalQty < Quantity) throw new Error(`Not enough stock. Available: ${TotalQty}, Requested: ${Quantity}`);

//       const insertedFormIDs = [];

//       // 3️⃣ Loop through units
//       for (const UnitID of UnitIDs) {
//         const [unitRows] = await db.query(
//           `SELECT SerialNo, Status FROM itemunits WHERE UnitID = ?`,
//           [UnitID]
//         );
//         if (!unitRows.length) throw new Error(`Unit ${UnitID} not found`);
//         if (unitRows[0].Status !== 'AVAILABLE') throw new Error(`Unit ${UnitID} is not available`);

//         const SerialNo = unitRows[0].SerialNo;

//         // ➡️ Insert into Model22Form
//         const [result] = await db.query(
//           `INSERT INTO Model22Form
//             (RequestID, StaffID, FName, LName, ItemID, ItemName, UnitID, SerialNo, ActionType, Quantity, UnitPriceBirr, UnitPriceCent, BalanceQty, Remark)
//            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ISSUE', 1, ?, ?, 1, ?)`,
//           [RequestID, StaffID, FName, LName, ItemID, ItemName, UnitID, SerialNo, UnitPriceBirr, UnitPriceCent, Remark]
//         );

//         insertedFormIDs.push(result.insertId);

//         // 4️⃣ Update itemunits → assign to staff & mark as ISSUED
//         await db.query(
//           `UPDATE itemunits SET Status = 'ISSUED', AssignedTo = ? WHERE UnitID = ?`,
//           [StaffID, UnitID]
//         );
//       }

//       // 5️⃣ Reduce quantity in items table only once
//       await db.query(
//         `UPDATE items SET TotalQty = TotalQty - ? WHERE ItemID = ?`,
//         [Quantity, ItemID]
//       );

//       // 6️⃣ Emit real-time notification
//       if (io) {
//         io.emit('itemIssued', {
//           RequestID, ItemID, ItemName, Quantity, UnitIDs, StaffID, FName, LName, Remark, Timestamp: new Date()
//         });
//       }

//       return { FormIDs: insertedFormIDs };
//     } catch (error) {
//       console.error('Error in issueItem:', error.message);
//       throw error;
//     }
//   },

//   /**
//    * Return issued item with correct quantity handling
//    * @param {Number} FormID - Model22Form ID of the issued item
//    * @param {Object} io - Socket.IO server instance
//    */
//   returnItem: async (FormID, io) => {
//     try {
//       // 1️⃣ Get issued item record
//       const [formRows] = await db.query(
//         `SELECT * FROM Model22Form WHERE FormID = ? AND ActionType = 'ISSUE'`,
//         [FormID]
//       );
//       if (!formRows.length) throw new Error('Issued item not found');

//       const form = formRows[0];

//       // 2️⃣ Update Model22Form → mark as RETURNED
//       await db.query(
//         `UPDATE Model22Form SET ActionType = 'RETURN', BalanceQty = 0 WHERE FormID = ?`,
//         [FormID]
//       );

//       // 3️⃣ Update itemunits → mark as AVAILABLE
//       await db.query(
//         `UPDATE itemunits SET Status = 'AVAILABLE', AssignedTo = NULL WHERE UnitID = ?`,
//         [form.UnitID]
//       );

//       // 4️⃣ Correctly update items table → only add 1 per returned unit
//       await db.query(
//         `UPDATE items SET TotalQty = TotalQty + 1 WHERE ItemID = ?`,
//         [form.ItemID]
//       );

//       // 5️⃣ Emit real-time notification
//       if (io) {
//         io.emit('itemReturned', {
//           FormID: form.FormID,
//           RequestID: form.RequestID,
//           ItemID: form.ItemID,
//           ItemName: form.ItemName,
//           Quantity: 1,
//           UnitID: form.UnitID,
//           StaffID: form.StaffID,
//           FName: form.FName,
//           LName: form.LName,
//           Remark: form.Remark,
//           Timestamp: new Date()
//         });
//       }

//       return { message: 'Item returned successfully' };
//     } catch (err) {
//       console.error('Error in returnItem:', err.message);
//       throw err;
//     }
//   },

//   // ✅ Fetch all Model22Form records
//   getAllRecords: async () => {
//     try {
//       const [rows] = await db.query(`SELECT * FROM Model22Form ORDER BY FormID DESC`);
//       return rows;
//     } catch (err) {
//       console.error('Error fetching Model22Form records:', err);
//       throw err;
//     }
//   }
// };

// module.exports = Model22;
