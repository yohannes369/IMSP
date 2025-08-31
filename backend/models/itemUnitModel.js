// const db = require('../config/db'); // use same variable
// const bwipjs = require('bwip-js');

// const ItemUnit = {
//   addUnits: async (itemID, units) => {
//     const values = [];

//     for (const unit of units) {
//       // Generate barcode using SerialNo as text
//       const barcodePng = await bwipjs.toBuffer({
//         bcid: 'code128',       // Barcode type
//         text: unit.SerialNo,   // REQUIRED: text to encode
//         scale: 3,              // 3x scaling
//         height: 10,            // Bar height, in millimeters
//         includetext: true,     // Show text under barcode
//         textxalign: 'center',  // Align text
//       });

//       // Convert barcode PNG buffer to base64 string
//       const barcodeBase64 = `data:image/png;base64,${barcodePng.toString('base64')}`;

//       values.push([
//         itemID,
//         unit.SerialNo,
//         barcodeBase64,             // Store barcode image string
//         unit.Status || 'AVAILABLE',
//         unit.AssignedTo || null,
//         unit.UnitPriceBirr,
//         unit.UnitPriceCent
//       ]);
//     }

//     // Use db.query instead of pool.query
//     const [result] = await db.query(
//       `INSERT INTO ItemUnits (ItemID, SerialNo, Barcode, Status, AssignedTo, UnitPriceBirr, UnitPriceCent)
//        VALUES ?`,
//       [values]
//     );

//     return result;
//   }
// };

// module.exports = ItemUnit;


// const db = require('../config/db'); // same as pool if using pool, adjust
// const bwipjs = require('bwip-js');

// const ItemUnit = {
//   // Add multiple units
//   addUnits: async (itemID, units) => {
//     const values = [];

//     for (const unit of units) {
//       // Generate barcode using SerialNo
//       const barcodePng = await bwipjs.toBuffer({
//         bcid: 'code128',       
//         text: unit.SerialNo,   
//         scale: 3,              
//         height: 10,            
//         includetext: true,     
//         textxalign: 'center',  
//       });

//       const barcodeBase64 = `data:image/png;base64,${barcodePng.toString('base64')}`;

//       values.push([
//         itemID,
//         unit.SerialNo,
//         barcodeBase64,
//         unit.Status || 'AVAILABLE',
//         unit.AssignedTo || null,
//         unit.UnitPriceBirr,
//         unit.UnitPriceCent
//       ]);
//     }

//     // Insert units into database
//     const [result] = await db.query(
//       `INSERT INTO ItemUnits (ItemID, SerialNo, Barcode, Status, AssignedTo, UnitPriceBirr, UnitPriceCent)
//        VALUES ?`,
//       [values]
//     );

//     return result;
//   },

//   // Fetch units by item ID
//   getByItemId: async (itemID) => {
//     const [rows] = await db.query(
//       `SELECT * FROM ItemUnits WHERE ItemID = ?`,
//       [itemID]
//     );
//     return rows;
//   }
// };

// module.exports = ItemUnit;
const db = require('../config/db'); // same as pool if using pool
const bwipjs = require('bwip-js');

const ItemUnit = {
  // 1️⃣ Add multiple units
  addUnits: async (itemID, units) => {
    const values = [];

    for (const unit of units) {
      // Generate barcode using SerialNo
      const barcodePng = await bwipjs.toBuffer({
        bcid: 'code128',       // Barcode type
        text: unit.SerialNo,   // Text to encode
        scale: 3,              // 3x scaling factor
        height: 10,            // Bar height in mm
        includetext: true,     // Show human-readable text
        textxalign: 'center',  // Align text
      });

      const barcodeBase64 = `data:image/png;base64,${barcodePng.toString('base64')}`;

      values.push([
        itemID,
        unit.SerialNo,
        barcodeBase64,
        unit.Status || 'AVAILABLE',
        unit.AssignedTo || null,
        unit.UnitPriceBirr,
        unit.UnitPriceCent
      ]);
    }

    // Insert units into database
    const [result] = await db.query(
      `INSERT INTO ItemUnits 
       (ItemID, SerialNo, Barcode, Status, AssignedTo, UnitPriceBirr, UnitPriceCent)
       VALUES ?`,
      [values]
    );

    return result;
  },

  // 2️⃣ Fetch units by item ID
  getByItemId: async (itemID) => {
    const [rows] = await db.query(
      `SELECT * FROM ItemUnits WHERE ItemID = ? ORDER BY SerialNo`,
      [itemID]
    );
    return rows;
  },

  // 3️⃣ Fetch unit by SerialNo
  getBySerialNo: async (serialNo) => {
    const [rows] = await db.query(
      `SELECT * FROM ItemUnits WHERE SerialNo = ?`,
      [serialNo]
    );
    return rows[0];
  },

  // 4️⃣ Update unit
  updateUnit: async (unitID, updateData) => {
    const fields = [];
    const values = [];

    for (const key in updateData) {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    }
    values.push(unitID);

    const [result] = await db.query(
      `UPDATE ItemUnits SET ${fields.join(', ')} WHERE UnitID = ?`,
      values
    );

    return result.affectedRows;
  },

  // 5️⃣ Delete unit
  deleteUnit: async (unitID) => {
    const [result] = await db.query(
      `DELETE FROM ItemUnits WHERE UnitID = ?`,
      [unitID]
    );
    return result.affectedRows;
  }
};

module.exports = ItemUnit;
