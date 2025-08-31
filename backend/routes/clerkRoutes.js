const express = require('express');
const router = express.Router();
const clerkController = require('../controllers/clerkController'); // Make sure path is correct

// Issue item
router.post('/issue', clerkController.issueItem);

// Return item
router.post('/return', clerkController.returnItem);

// Get all records
router.get('/records', clerkController.getRecords);

module.exports = router;
