// /src/pages/clerk/staffname.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function StaffName() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/requests");
      const data = await response.json();
      setRequests(data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Approved Staff Requests</h2>
      <ul className="space-y-3">
        {requests
          .filter((req) => req.status === "APPROVED")
          .map((req) => (
            <li key={req.request_id} className="p-3 border rounded bg-gray-50">
              <Link
                to="/manager/request/form"
                className="text-blue-600 font-bold hover:underline"
              >
                {req.fname} {req.lname}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
