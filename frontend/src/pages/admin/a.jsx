import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const ADMIN_ID = "1221"; // Admin staff_id from DB

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users");
        if (Array.isArray(res.data)) setUsers(res.data);
        else if (res.data && Array.isArray(res.data.users)) setUsers(res.data.users);
        else setUsers([]);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (!selectedUser || !message.trim()) {
      setStatus("Please select a user and enter a message.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/chat", {
        sender_staff_id: ADMIN_ID,
        receiver_staff_id: selectedUser,
        content: message,
        chat_type: "private",
      });
      setMessage("");
      setStatus("Message sent successfully!");
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Send Message</h2>

      <label className="block mb-2 font-medium">Select User:</label>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      >
        <option value="">-- Select User --</option>
        {users.length > 0 ? (
          users.map((user) => (
            <option key={user.staff_id} value={user.staff_id}>
              {user.name} ({user.role})
            </option>
          ))
        ) : (
          <option disabled>No users available</option>
        )}
      </select>

      <label className="block mb-2 font-medium">Message:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
        rows={4}
        placeholder="Type your message here..."
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send
      </button>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
}
