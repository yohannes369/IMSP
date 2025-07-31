const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Staff routes
router.post('/requests', requestController.createRequest);
router.get('/requests/:staffId', requestController.getRequestsByStaffId);

// Manager routes
router.put('/requests/manager/:id', requestController.managerReview);
router.get('/requests/manager/pending', requestController.getNextPendingRequest);

// Clerk routes
router.put('/requests/clerk/:id', requestController.clerkReview);
// Clerk: get next pending request
router.get('/requests/clerk/pending', requestController.getNextPendingClerkRequest);

module.exports = router;
