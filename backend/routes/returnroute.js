
// const express = require("express");
// const router = express.Router();
// const returnController = require("../controllers/returnController");

// // Staff creates a return request
// router.post("/", returnController.createReturn);

// // ICT decision
// router.put("/:return_id/ict", returnController.ictDecision);

// // Get all returns
// router.get("/", returnController.getAllReturns);

// module.exports = router;
const express = require("express");
const router = express.Router();
const returnController = require("../controllers/returnController");

// Staff creates a return request
router.post("/", returnController.createReturn);

// ICT decision
router.put("/:return_id/ict", returnController.ictDecision);

// Manager decision
router.put("/:return_id/manager", returnController.managerDecision);

// Get all returns
router.get("/", returnController.getAllReturns);

module.exports = router;
