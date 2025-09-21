
// const db = require('../config/db');
// const bwipjs = require('bwip-js');

// const ItemUnit = {
//   // Add multiple units
//   addUnits: async (itemID, units) => {
//     if (!Array.isArray(units) || units.length === 0) return null;

//     const values = [];

//     for (const [index, unit] of units.entries()) {
//       let barcodeBase64 = null;
//       let textToEncode = unit.SerialNo || `ITEM${itemID}-${index + 1}`;

//       try {
//         const barcodePng = await bwipjs.toBuffer({
//           bcid: 'code128',
//           text: textToEncode,
//           scale: 3,
//           height: 10,
//           includetext: true,
//           textxalign: 'center',
//         });
//         barcodeBase64 = `data:image/png;base64,${barcodePng.toString('base64')}`;
//       } catch (err) {
//         console.warn(`Barcode generation failed for ${textToEncode}:`, err.message);
//         barcodeBase64 = null;
//       }

//       values.push([
//         itemID,
//         unit.SerialNo || null,          // SerialNo can be null
//         barcodeBase64,
//         unit.Status || 'AVAILABLE',
//         unit.AssignedTo || null,
//         unit.UnitPriceBirr || 0,
//         unit.UnitPriceCent || 0
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

//   // Fetch units by itemID
//   getByItemId: async (itemID) => {
//     const [rows] = await db.query(
//       `SELECT * FROM ItemUnits WHERE ItemID = ? ORDER BY UnitID`,
//       [itemID]
//     );
//     return rows;
//   },

//   // Update unit
//   updateUnit: async (unitID, data) => {
//     const fields = [];
//     const values = [];

//     for (const key in data) {
//       fields.push(`${key} = ?`);
//       values.push(data[key]);
//     }
//     values.push(unitID);

//     const [result] = await db.query(
//       `UPDATE ItemUnits SET ${fields.join(', ')} WHERE UnitID = ?`,
//       values
//     );
//     return result.affectedRows;
//   },

//   // Delete unit
//   deleteUnit: async (unitID) => {
//     const [result] = await db.query(
//       `DELETE FROM ItemUnits WHERE UnitID = ?`,
//       [unitID]
//     );
//     return result.affectedRows;
//   },
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
      // Generate a unique barcode text to avoid duplicates
      const barcodeText = unit.SerialNo 
        ? `${unit.SerialNo}-${Date.now()}`
        : `ITEM${itemID}-${index + 1}-${Date.now()}`;

      // Optional: generate base64 image for display or printing
      try {
        await bwipjs.toBuffer({
          bcid: 'code128',
          text: barcodeText,
          scale: 3,
          height: 10,
          includetext: true,
          textxalign: 'center',
        });
      } catch (err) {
        console.warn(`Barcode generation failed for ${barcodeText}:`, err.message);
      }

      values.push([
        itemID,
        unit.SerialNo || null,
        barcodeText,           // Store unique text in Barcode column
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
