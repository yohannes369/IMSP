

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Change role handler
  const handleRoleChange = async (email) => {
    try {
      const role = selectedRole[email];
      if (!role) return alert('Please select a role before updating.');

      await axios.post('http://localhost:5000/api/admin/change-role', { email, role });
      alert('Role updated successfully');
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  // Activate user handler
  const handleActivateUser = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/users/${id}/activate`);
      alert('User activated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error activating user:', error);
      alert('Failed to activate user');
    }
  };

  // Deactivate user handler
  const handleDeactivateUser = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/users/${id}/deactivate`);
      alert('User deactivated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deactivating user:', error);
      alert('Failed to deactivate user');
    }
  };
  

  // viwu user info code

  return (
    <div>
      <h2>User Management</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Email</th>
            <th>Current Role</th>
            <th>Status</th>
            <th>Change Role</th>
            <th>Activate / Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <select
                  value={selectedRole[user.email] || ''}
                  onChange={(e) =>
                    setSelectedRole({ ...selectedRole, [user.email]: e.target.value })
                  }
                >
                  <option value="">-- Select Role --</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                  <option value="clerk">Clerk</option>
                </select>
                <button onClick={() => handleRoleChange(user.email)}>Update</button>
              </td>
              <td>
                {user.isActive ? (
                  <button onClick={() => handleDeactivateUser(user.id)}>Deactivate</button>
                ) : (
                  <button onClick={() => handleActivateUser(user.id)}>Activate</button>
                )}
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
