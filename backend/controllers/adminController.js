// const User= require('../models/User');

// // Middleware: Change user role
// exports.changeUserRole = async (req, res) => {
//   try {
//     const { userId, newRole } = req.body;

//     // Optional: validate roles
//    // Example
// const allowedRoles = ['admin', 'manager', 'staff', 'stockClerk'];
// if (!allowedRoles.includes(role)) {
//   return res.status(400).json({ message: 'Invalid role specified' });
// }


//     // Optional: Only allow admins to perform this (assumes admin check middleware exists)
//     if (req.user?.role !== 'admin') {
//       return res.status(403).json({ message: 'Unauthorized. Admins only.' });
//     }

//     const user = await UserModel.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     await UserModel.updateUserRole(userId, newRole);
//     res.status(200).json({ message: 'User role updated successfully' });

//   } catch (error) {
//     console.error('Error updating role:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// controllers/adminController.js




// const User = require('../models/User'); // Your raw SQL model


// exports.changeUserRole = async (req, res) => {
//   try {
//     const { email, role } = req.body;

//     const allowedRoles = ['admin', 'manager', 'staff', 'clerk'];
//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({ message: 'Invalid role specified' });
//     }

//     const user = await User.findByEmail(email);  // Use findByEmail, NOT findOne
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update user role with raw SQL query
//     await User.updateRole(email, role);

//     res.status(200).json({ message: `Role updated to ${role} for user ${email}` });
//   } catch (error) {
//     console.error('Error updating role:', error);
//     res.status(500).json({ message: 'Server error while updating role' });
//   }
// };


const User = require('../models/User'); // Import your User model

// ✅ Change user role
exports.changeUserRole = async (req, res) => {
  const { email, role } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.updateRole(email, role);
    res.json({ message: `Role updated to ${role} for ${email}` });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ message: "Server error while updating role" });
  }
};

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};
