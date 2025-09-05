
// const db = require('../config/db'); // same as pool if using pool
// const bwipjs = require('bwip-js');

// const ItemUnit = {
//   // 1️⃣ Add multiple units
//   addUnits: async (itemID, units) => {
//     const values = [];

//     for (const unit of units) {
//       // Generate barcode using SerialNo
//       const barcodePng = await bwipjs.toBuffer({
//         bcid: 'code128',       // Barcode type
//         text: unit.SerialNo,   // Text to encode
//         scale: 3,              // 3x scaling factor
//         height: 10,            // Bar height in mm
//         includetext: true,     // Show human-readable text
//         textxalign: 'center',  // Align text
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
//       `INSERT INTO ItemUnits 
//        (ItemID, SerialNo, Barcode, Status, AssignedTo, UnitPriceBirr, UnitPriceCent)
//        VALUES ?`,
//       [values]
//     );

//     return result;
//   },

//   // 2️⃣ Fetch units by item ID
//   getByItemId: async (itemID) => {
//     const [rows] = await db.query(
//       `SELECT * FROM ItemUnits WHERE ItemID = ? ORDER BY SerialNo`,
//       [itemID]
//     );
//     return rows;
//   },

//   // 3️⃣ Fetch unit by SerialNo
//   getBySerialNo: async (serialNo) => {
//     const [rows] = await db.query(
//       `SELECT * FROM ItemUnits WHERE SerialNo = ?`,
//       [serialNo]
//     );
//     return rows[0];
//   },

//   // 4️⃣ Update unit
//   updateUnit: async (unitID, updateData) => {
//     const fields = [];
//     const values = [];

//     for (const key in updateData) {
//       fields.push(`${key} = ?`);
//       values.push(updateData[key]);
//     }
//     values.push(unitID);

//     const [result] = await db.query(
//       `UPDATE ItemUnits SET ${fields.join(', ')} WHERE UnitID = ?`,
//       values
//     );

//     return result.affectedRows;
//   },

//   // 5️⃣ Delete unit
//   deleteUnit: async (unitID) => {
//     const [result] = await db.query(
//       `DELETE FROM ItemUnits WHERE UnitID = ?`,
//       [unitID]
//     );
//     return result.affectedRows;
//   }
// };

// module.exports = ItemUnit;
// const db = require('../config/db');
// const bwipjs = require('bwip-js');

// const ItemUnit = {
//   addUnits: async (itemID, units) => {
//     const values = [];

//     for (const [index, unit] of units.entries()) {
//       let barcodeBase64 = null;

//       if (unit.SerialNo) {
//         // Only generate barcode if SerialNo exists
//         const barcodePng = await bwipjs.toBuffer({
//           bcid: 'code128',
//           text: unit.SerialNo,
//           scale: 3,
//           height: 10,
//           includetext: true,
//           textxalign: 'center',
//         });
//         barcodeBase64 = `data:image/png;base64,${barcodePng.toString('base64')}`;
//       } else {
//         // Optional: generate a barcode from ItemID + index
//         const placeholderText = `ITEM${itemID}-${index + 1}`;
//         const barcodePng = await bwipjs.toBuffer({
//           bcid: 'code128',
//           text: placeholderText,
//           scale: 3,
//           height: 10,
//           includetext: true,
//           textxalign: 'center',
//         });
//         barcodeBase64 = `data:image/png;base64,${barcodePng.toString('base64')}`;
//       }

//       values.push([
//         itemID,
//         unit.SerialNo || null,
//         barcodeBase64,
//         unit.Status || 'AVAILABLE',
//         unit.AssignedTo || null,
//         unit.UnitPriceBirr,
//         unit.UnitPriceCent
//       ]);
//     }

//     const [result] = await db.query(
//       `INSERT INTO ItemUnits 
//        (ItemID, SerialNo, Barcode, Status, AssignedTo, UnitPriceBirr, UnitPriceCent)
//        VALUES ?`,
//       [values]
//     );

//     return result;
//   },
//   // ... other functions unchanged
// };

// module.exports = ItemUnit;
const db = require('../config/db');
const bwipjs = require('bwip-js');

const ItemUnit = {
  // Add multiple units
  addUnits: async (itemID, units) => {
    if (!Array.isArray(units) || units.length === 0) return null;

    const values = [];

    for (const [index, unit] of units.entries()) {
      let barcodeBase64 = null;
      let textToEncode = unit.SerialNo || `ITEM${itemID}-${index + 1}`;

      try {
        const barcodePng = await bwipjs.toBuffer({
          bcid: 'code128',
          text: textToEncode,
          scale: 3,
          height: 10,
          includetext: true,
          textxalign: 'center',
        });
        barcodeBase64 = `data:image/png;base64,${barcodePng.toString('base64')}`;
      } catch (err) {
        console.warn(`Barcode generation failed for ${textToEncode}:`, err.message);
        barcodeBase64 = null;
      }

      values.push([
        itemID,
        unit.SerialNo || null,          // SerialNo can be null
        barcodeBase64,
        unit.Status || 'AVAILABLE',
        unit.AssignedTo || null,
        unit.UnitPriceBirr || 0,
        unit.UnitPriceCent || 0
      ]);
    }

    const [result] = await db.query(
      `INSERT INTO ItemUnits 
       (ItemID, SerialNo, Barcode, Status, AssignedTo, UnitPriceBirr, UnitPriceCent)
       VALUES ?`,
      [values]
    );

    return result;
  },

  // Fetch units by itemID
  getByItemId: async (itemID) => {
    const [rows] = await db.query(
      `SELECT * FROM ItemUnits WHERE ItemID = ? ORDER BY UnitID`,
      [itemID]
    );
    return rows;
  },

  // Update unit
  updateUnit: async (unitID, data) => {
    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
    values.push(unitID);

    const [result] = await db.query(
      `UPDATE ItemUnits SET ${fields.join(', ')} WHERE UnitID = ?`,
      values
    );
    return result.affectedRows;
  },

  // Delete unit
  deleteUnit: async (unitID) => {
    const [result] = await db.query(
      `DELETE FROM ItemUnits WHERE UnitID = ?`,
      [unitID]
    );
    return result.affectedRows;
  },
};

module.exports = ItemUnit;
