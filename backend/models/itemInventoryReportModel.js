// const db = require("../config/db"); // Make sure you have a db.js exporting mysql2/promise connection

// const ItemInventoryReport = {
//   // Get all reports
//   async getAll() {
//     const [rows] = await db.query("SELECT * FROM item_inventory_report_simple");
//     return rows;
//   },

//   // Get a report by ID
//   async getById(report_id) {
//     const [rows] = await db.query("SELECT * FROM item_inventory_report_simple WHERE report_id = ?", [report_id]);
//     return rows[0];
//   },

//   // Create new report
//   async create(data) {
//     const sql = `
//       INSERT INTO item_inventory_report_simple 
//       (item_id, item_name, model, available_qty, counted_qty, counter_names)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;
//     const [result] = await db.query(sql, [
//       data.item_id,
//       data.item_name,
//       data.model,
//       data.available_qty,
//       data.counted_qty,
//       data.counter_names || "Qababe,Kebed,John"
//     ]);
//     return result;
//   },

//   // Update existing report
//   async update(report_id, data) {
//     const sql = `
//       UPDATE item_inventory_report_simple 
//       SET item_id = ?, item_name = ?, model = ?, available_qty = ?, counted_qty = ?, counter_names = ?
//       WHERE report_id = ?
//     `;
//     const [result] = await db.query(sql, [
//       data.item_id,
//       data.item_name,
//       data.model,
//       data.available_qty,
//       data.counted_qty,
//       data.counter_names,
//       report_id
//     ]);
//     return result;
//   },

//   // Delete report
//   async delete(report_id) {
//     const [result] = await db.query("DELETE FROM item_inventory_report_simple WHERE report_id = ?", [report_id]);
//     return result;
//   }
// };

// module.exports = ItemInventoryReport;
const db = require("../config/db"); // Make sure db.js exports mysql2/promise connection

const ItemInventoryReport = {
  // Get all reports
  async getAll() {
    try {
      const [rows] = await db.query("SELECT * FROM item_inventory_report_simple");
      return rows;
    } catch (err) {
      console.error("Error fetching reports:", err);
      throw err;
    }
  },

  // Get report by ID
  async getById(report_id) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM item_inventory_report_simple WHERE report_id = ?",
        [report_id]
      );
      return rows[0];
    } catch (err) {
      console.error(`Error fetching report ${report_id}:`, err);
      throw err;
    }
  },

  // Create new report
  async create(data) {
    try {
      // Set defaults
      const counted_qty = data.counted_qty || 0;
      const counter_names = data.counter_names || "Qababe,Kebed,John";

      // Validate required fields
      if (!data.item_id || !data.item_name || !data.model || data.available_qty === undefined) {
        throw new Error("Missing required fields: item_id, item_name, model, available_qty");
      }

      const sql = `
        INSERT INTO item_inventory_report_simple 
        (item_id, item_name, model, available_qty, counted_qty, counter_names)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.query(sql, [
        data.item_id,
        data.item_name,
        data.model,
        data.available_qty,
        counted_qty,
        counter_names
      ]);
      return result;
    } catch (err) {
      console.error("Error creating report:", err);
      throw err;
    }
  },

  // Update existing report
  async update(report_id, data) {
    try {
      const sql = `
        UPDATE item_inventory_report_simple 
        SET item_id = ?, item_name = ?, model = ?, available_qty = ?, counted_qty = ?, counter_names = ?
        WHERE report_id = ?
      `;
      const [result] = await db.query(sql, [
        data.item_id,
        data.item_name,
        data.model,
        data.available_qty,
        data.counted_qty || 0,
        data.counter_names || "Qababe,Kebed,John",
        report_id
      ]);
      return result;
    } catch (err) {
      console.error(`Error updating report ${report_id}:`, err);
      throw err;
    }
  },

  // Delete report
  async delete(report_id) {
    try {
      const [result] = await db.query(
        "DELETE FROM item_inventory_report_simple WHERE report_id = ?",
        [report_id]
      );
      return result;
    } catch (err) {
      console.error(`Error deleting report ${report_id}:`, err);
      throw err;
    }
  }
};

module.exports = ItemInventoryReport;
