// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');

// // Example: Middleware to check if user is logged in & admin (adjust as needed)
// // const verifyToken = require('../middleware/verifyToken');
// const isAdmin = require('../middleware/isAdmin'); // Create this if needed

// // POST /api/admin/change-role
// router.post('/change-role', isAdmin, adminController.changeUserRole);

// module.exports = router;
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

router.post('/change-role', verifyToken, isAdmin, adminController.changeUserRole);

module.exports = router;


