const express = require("express");
const router = express.Router();
const itemInventoryReportController = require("../controllers/itemInventoryReportController");

// CRUD routes
router.get("/", itemInventoryReportController.getAll);           // Get all reports
router.get("/:report_id", itemInventoryReportController.getById); // Get report by ID
router.post("/", itemInventoryReportController.create);          // Create new report
router.put("/:report_id", itemInventoryReportController.update); // Update report
router.delete("/:report_id", itemInventoryReportController.delete); // Delete report

module.exports = router;
