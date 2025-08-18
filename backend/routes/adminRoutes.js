// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');

// // Example: Middleware to check if user is logged in & admin (adjust as needed)
// // const verifyToken = require('../middleware/verifyToken');
// const isAdmin = require('../middleware/isAdmin'); // Create this if needed

// // POST /api/admin/change-role
// router.post('/change-role', isAdmin, adminController.changeUserRole);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');

// const verifyToken = require('../middlewares/verifyToken');
// const isAdmin = require('../middlewares/isAdmin');



// // Route to get all users
// router.post('/change-role', verifyToken, isAdmin, adminController.changeUserRole);

// module.exports = router;




const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST /api/admin/change-role
router.post('/change-role', adminController.changeUserRole);

// GET /api/admin/users
router.get('/users', adminController.getAllUsers);


router.patch('/users/:id/activate', adminController.activateUser);

// Deactivate user (PATCH /api/admin/users/:id/deactivate)
router.patch('/users/:id/deactivate', adminController.deactivateUser);

router.delete('/users/:id', adminController.deleteUser);
// router.get('/pending-users-count', adminController.getPendingUsersCount);

// router.get('/me',  adminController.getPersonalInfo);

// Assign staff_id to a staff user

// Assign staff ID
// router.post('/users/staffid', adminController.assignStaffId);

module.exports = router;
