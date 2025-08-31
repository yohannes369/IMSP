const express = require("express");
const router = express.Router();
const requestFormController = require("../controllers/requestFormController");

// Staff creates a request
router.post("/", requestFormController.createRequest);

// Manager gets all requests
router.get("/", requestFormController.getAllRequests);

// Staff gets their own requests
router.get("/staff/:staff_id", requestFormController.getMyRequests);

// Manager updates request
router.put("/:request_id", requestFormController.updateRequest);
//delete request

// Manager deletes request
router.delete("/:request_id", requestFormController.deleteRequest);

module.exports = router;
