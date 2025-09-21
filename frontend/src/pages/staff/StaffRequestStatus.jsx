

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // backend server URL

// const StaffRequestStatus = () => {
//   const [staffId, setStaffId] = useState(""); // manually entered staff ID
//   const [requests, setRequests] = useState([]);

//   // Fetch requests whenever staffId changes
//   useEffect(() => {
//     if (!staffId) return;

//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/requests/staff/${staffId}`
//         );
//         setRequests(res.data);
//       } catch (err) {
//         console.error("Error fetching requests", err);
//       }
//     };

//     fetchRequests();
//   }, [staffId]);

//   // Listen to real-time updates from manager
//   useEffect(() => {
//     const handleUpdate = (data) => {
//       if (data.staff_id === staffId || data.staff_id === undefined) {
//         setRequests((prev) =>
//           prev.map((r) =>
//             r.request_id === parseInt(data.request_id)
//               ? { ...r, status: data.status, manager_comment: data.manager_comment }
//               : r
//           )
//         );
//       }
//     };

//     socket.on("update_request", handleUpdate);

//     return () => {
//       socket.off("update_request", handleUpdate);
//     };
//   }, [staffId]);

//   // Clear requests (front-end only)
//   const handleClear = () => {
//     setRequests([]);
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
//       <h2 className="text-xl font-bold mb-4">My Request Status</h2>

//       {/* Staff ID input */}
//       <input
//         type="text"
//         placeholder="Enter your Staff ID"
//         value={staffId}
//         onChange={(e) => setStaffId(e.target.value)}
//         className="w-full border p-2 rounded mb-4"
//       />

//       {/* Clear button */}
//       {requests.length > 0 && (
//         <button
//           onClick={handleClear}
//           className="mb-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Clear Requests
//         </button>
//       )}

//       {/* Requests list */}
//       {requests.length > 0 ? (
//         <ul className="space-y-2">
//           {requests.map((req) => (
//             <li
//               key={req.request_id}
//               className="p-3 border rounded bg-gray-50 flex flex-col"
//             >
//               <span>
//                 <strong>{req.item_name}</strong> ({req.quantity} {req.measurement})
//               </span>
//               <span>
//                 Status: <b>{req.status}</b>
//               </span>
//               {req.manager_comment && (
//                 <span className="text-sm text-gray-600">
//                   Manager: {req.manager_comment}
//                 </span>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         staffId && <p>No requests found.</p>
//       )}
//     </div>
//   );
// };

// export default StaffRequestStatus;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend server URL

const StaffRequestStatus = () => {
  const [staffId, setStaffId] = useState(""); // manually entered staff ID
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState({
    APPROVED: [],
    PENDING: [],
    REJECTED: []
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL"); // ALL, APPROVED, PENDING, REJECTED

  // Categorize requests by status
  const categorizeRequests = (reqs) => {
    const categorized = {
      APPROVED: [],
      PENDING: [],
      REJECTED: []
    };
    
    reqs.forEach(req => {
      if (categorized[req.status]) {
        categorized[req.status].push(req);
      }
    });
    
    return categorized;
  };

  // Fetch requests whenever staffId changes
  useEffect(() => {
    if (!staffId) {
      setRequests([]);
      setFilteredRequests({ APPROVED: [], PENDING: [], REJECTED: [] });
      setMessage("Please enter your Staff ID to view requests");
      return;
    }

    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/requests/staff/${staffId}`
        );
        setRequests(res.data);
        setFilteredRequests(categorizeRequests(res.data));
        if (res.data.length === 0) {
          setMessage("No requests found for this Staff ID");
        } else {
          setMessage("");
        }
      } catch (err) {
        console.error("Error fetching requests", err);
        setMessage("Failed to fetch requests. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [staffId]);

  // Listen to real-time updates from manager
  useEffect(() => {
    const handleUpdate = (data) => {
      if (data.staff_id === staffId || data.staff_id === undefined) {
        setRequests((prev) =>
          prev.map((r) =>
            r.request_id === parseInt(data.request_id)
              ? { ...r, status: data.status, manager_comment: data.manager_comment }
              : r
          )
        );
      }
    };

    socket.on("update_request", handleUpdate);

    return () => {
      socket.off("update_request", handleUpdate);
    };
  }, [staffId]);

  // Update categorized requests when requests change
  useEffect(() => {
    setFilteredRequests(categorizeRequests(requests));
  }, [requests]);

  // Clear requests (front-end only)
  const handleClear = () => {
    setStaffId("");
    setRequests([]);
    setFilteredRequests({ APPROVED: [], PENDING: [], REJECTED: [] });
    setMessage("Please enter your Staff ID to view requests");
  };

  // Function to determine status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Function to get requests based on active tab
  const getDisplayRequests = () => {
    if (activeTab === "ALL") return requests;
    return filteredRequests[activeTab] || [];
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-green-200">
        {/* Header */}
        <div className="bg-green-700 text-white p-6">
          <h2 className="text-2xl font-bold">Request Status Tracker</h2>
          <p className="text-green-100 mt-1">Track your requests in real-time</p>
        </div>

        <div className="p-6">
          {/* Staff ID Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your Staff ID to view requests
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Staff ID"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="flex-1 border border-green-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {staffId && (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Status Tabs */}
          {requests.length > 0 && (
            <div className="mb-6 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                    activeTab === "ALL"
                      ? "bg-green-100 text-green-800 border-b-2 border-green-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("ALL")}
                >
                  All ({requests.length})
                </button>
                <button
                  className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                    activeTab === "APPROVED"
                      ? "bg-green-100 text-green-800 border-b-2 border-green-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("APPROVED")}
                >
                  Approved ({filteredRequests.APPROVED.length})
                </button>
                <button
                  className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                    activeTab === "PENDING"
                      ? "bg-yellow-100 text-yellow-800 border-b-2 border-yellow-500"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("PENDING")}
                >
                  Pending ({filteredRequests.PENDING.length})
                </button>
                <button
                  className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                    activeTab === "REJECTED"
                      ? "bg-red-100 text-red-800 border-b-2 border-red-500"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("REJECTED")}
                >
                  Rejected ({filteredRequests.REJECTED.length})
                </button>
              </div>
            </div>
          )}

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg text-center mb-6 ${
              message.includes("Failed") 
                ? "bg-red-100 text-red-700" 
                : "bg-green-100 text-green-700"
            }`}>
              {message}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          )}

          {/* Requests List */}
          {!isLoading && getDisplayRequests().length > 0 ? (
            <div className="space-y-4">
              {getDisplayRequests().map((req) => (
                <div
                  key={req.request_id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{req.item_name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        {req.quantity} {req.measurement} • Request ID: {req.request_id}
                      </div>
                      {req.created_at && (
                        <div className="text-xs text-gray-500 mt-2">
                          Submitted: {formatDate(req.created_at)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                      
                      {req.updated_at && req.status !== "PENDING" && (
                        <div className="text-xs text-gray-500">
                          Updated: {formatDate(req.updated_at)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {req.manager_comment && (
                    <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-100">
                      <div className="text-sm font-medium text-blue-800">Manager Comment:</div>
                      <div className="text-blue-700">{req.manager_comment}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : !isLoading && staffId && requests.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="text-gray-500 mb-2">No requests found</div>
              <div className="text-sm text-gray-400">Submit a request using the request form</div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Company Name • Real-time request tracking</p>
        </div>
      </div>
    </div>
  );
};

export default StaffRequestStatus;