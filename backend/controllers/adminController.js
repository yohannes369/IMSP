const User = require('../models/User');

// Fetch all users - this was missing
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    const { email, role } = req.body;

    const allowedRoles = ['admin', 'manager', 'staff', 'clerk'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.updateRole(email, role);

    res.status(200).json({ message: `Role updated to ${role} for user ${email}` });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Server error while updating role' });
  }
};
// Activate user
exports.activateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.activateUser(id);
    res.status(200).json({ message: 'User activated successfully' });
  } catch (error) {
    console.error('Error activating user:', error);
    res.status(500).json({ message: 'Server error while activating user' });
  }
};

// Deactivate user
exports.deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.deactivateUser(id);
    res.status(200).json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating user:', error);
    res.status(500).json({ message: 'Server error while deactivating user' });
  }
};
exports.getPersonalInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Requires authentication middleware to set req.user

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      status: user.isActive ? 'Active' : 'Deactivated'
    });
  } catch (error) {
    console.error('Error fetching personal info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





// Assign staff ID to a new user
exports.assignStaffId = async (req, res) => {
  const { staffid } = req.body;

  if (!staffid) {
    return res.status(400).json({ message: 'staffid is required' });
  }

  try {
    const result = await User.assignStaffId(staffid);
    res.status(201).json({ message: 'Staff ID assigned successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error assigning staff ID:', error);
    res.status(500).json({ message: 'Server error while assigning staff ID' });
  }
};