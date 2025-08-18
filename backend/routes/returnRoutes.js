


// const express = require('express');
// const router = express.Router();
// const returnController = require('../controllers/returnController');

// // Fetch all given items for a staff
// router.get('/give-items/:staffId', returnController.getStaffGivenItems);

// // Staff requests a return
// router.post('/request-return', returnController.requestReturn);

// // Clerk fetch pending return requests
// router.get('/pending-returns', returnController.getPendingReturns);

// // Clerk approves return request
// router.post('/approve-return/:requestId', returnController.approveReturn);

// module.exports = router;
const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');

// Fetch all given items for a staff
router.get('/give-items/:staffId', returnController.getStaffGivenItems);

// Staff requests a return
router.post('/request-return', returnController.requestReturn);

// Clerk fetch pending return requests
router.get('/pending-returns', returnController.getPendingReturns);

// Clerk approves return request
router.post('/approve-return/:requestId', returnController.approveReturn);

module.exports = router;
