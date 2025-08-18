// const express = require('express');
// const router = express.Router();
// const requestController = require('../controllers/requestController');

// // Staff routes
// router.post('/requests', requestController.createRequest);
// router.get('/requests/:staffId', requestController.getRequestsByStaffId);

// // Manager routes
// router.put('/requests/manager/:id', requestController.managerReview);
// router.get('/requests/manager/pending', requestController.getNextPendingRequest);

// // Clerk routes
// // router.put('/requests/clerk/:id', requestController.clerkReview);
// // // Clerk: get next pending request
// // router.get('/requests/clerk/pending', requestController.getNextPendingClerkRequest);

// module.exports = router;
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Staff
router.post('/requests', requestController.createRequest);
router.get('/requests/:staffId', requestController.getRequestsByStaffId);

// Manager
router.put('/requests/manager/:id', requestController.managerReview);
router.get('/requests/manager/pending', requestController.getNextPendingRequest);
router.get('/requests/manager/all', requestController.getAllRequests);
router.delete('/requests/:id', requestController.deleteRequest);

// Clerk
router.put('/requests/clerk/:id', requestController.clerkReview);
router.get('/requests/clerk/pending', requestController.getNextPendingClerkRequest);

module.exports = router;
