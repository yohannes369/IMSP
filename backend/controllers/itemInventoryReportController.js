// const ItemInventoryReport = require("../models/itemInventoryReportModel");

// const itemInventoryReportController = {
//   getAll: async (req, res) => {
//     try {
//       const reports = await ItemInventoryReport.getAll();
//       res.json(reports);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   },

//   getById: async (req, res) => {
//     try {
//       const { report_id } = req.params;
//       const report = await ItemInventoryReport.getById(report_id);
//       if (!report) return res.status(404).json({ error: "Report not found" });
//       res.json(report);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   },

//   create: async (req, res) => {
//     try {
//       const data = req.body;
//       const result = await ItemInventoryReport.create(data);
//       res.status(201).json({ message: "Report created", report_id: result.insertId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   },

//   update: async (req, res) => {
//     try {
//       const { report_id } = req.params;
//       const data = req.body;
//       await ItemInventoryReport.update(report_id, data);
//       res.json({ message: "Report updated" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   },

//   delete: async (req, res) => {
//     try {
//       const { report_id } = req.params;
//       await ItemInventoryReport.delete(report_id);
//       res.json({ message: "Report deleted" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// };

// module.exports = itemInventoryReportController;
const ItemInventoryReport = require("../models/itemInventoryReportModel");

const itemInventoryReportController = {
  getAll: async (req, res) => {
    try {
      const reports = await ItemInventoryReport.getAll();
      res.json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const { report_id } = req.params;
      const report = await ItemInventoryReport.getById(report_id);
      if (!report) return res.status(404).json({ error: "Report not found" });
      res.json(report);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { item_id, item_name, model, available_qty, counted_qty, counter_names } = req.body;

      // Validate required fields
      if (!item_id || !item_name || !model || available_qty === undefined) {
        return res.status(400).json({ error: "Missing required fields: item_id, item_name, model, available_qty" });
      }

      const data = { item_id, item_name, model, available_qty, counted_qty, counter_names };
      const result = await ItemInventoryReport.create(data);
      res.status(201).json({ message: "Report created", report_id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  update: async (req, res) => {
    try {
      const { report_id } = req.params;
      const data = req.body;
      await ItemInventoryReport.update(report_id, data);
      res.json({ message: "Report updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const { report_id } = req.params;
      await ItemInventoryReport.delete(report_id);
      res.json({ message: "Report deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = itemInventoryReportController;
