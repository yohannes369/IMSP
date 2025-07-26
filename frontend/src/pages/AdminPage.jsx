import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role update
  const handleRoleChange = async (e) => {
    e.preventDefault();
    if (!selectedUserId || !role) {
      setMessage("Please select a user and a role.");
      return;
    }
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/users/${selectedUserId}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setSelectedUserId("");
      setRole("");
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error changing role", error);
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Change User Role</h2>

      <form onSubmit={handleRoleChange} className="mb-6">
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border p-2 mr-2"
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mr-2"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
          <option value="clerk">Clerk</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Change Role
        </button>
      </form>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Active</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.isActive ? "Active" : "Inactive"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">
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