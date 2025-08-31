
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Footer from "../../components/Footer/Footer";

// const ManagerReview = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [statusMap, setStatusMap] = useState({});
//   const [commentMap, setCommentMap] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);

//   // Fetch all manager requests on page load
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/requests/manager/pending");
//         setRequests(res.data || []);

//         // Initialize status and comment for each request
//         const statusInit = {};
//         const commentInit = {};
//         (res.data || []).forEach((req) => {
//           statusInit[req.id] = "pending_clerk";
//           commentInit[req.id] = "";
//         });
//         setStatusMap(statusInit);
//         setCommentMap(commentInit);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchRequests();
//   }, []);

//   const handleSubmit = async (requestId) => {
//     setLoading(true);
//     try {
//       await axios.put(
//         `http://localhost:5000/api/requests/manager/${requestId}`,
//         {
//           status: statusMap[requestId],
//           manager_comment: commentMap[requestId],
//         }
//       );
      
//       // Show success message
//       setSuccessMessage(
//         statusMap[requestId] === "pending_clerk" 
//           ? "Request approved successfully!" 
//           : "Request rejected successfully!"
//       );
      
//       // Remove the request after successful submission
//       setRequests((prev) => prev.filter((req) => req.id !== requestId));
      
//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = (id, value) => {
//     setStatusMap((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleCommentChange = (id, value) => {
//     setCommentMap((prev) => ({ ...prev, [id]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <div className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Manager Review</h2>

//         {/* Success Message */}
//         {successMessage && (
//           <div className={`mb-6 p-4 rounded-md ${successMessage.includes("approved") ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
//             <div className="flex items-center">
//               {successMessage.includes("approved") ? (
//                 <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               ) : (
//                 <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               )}
//               <span>{successMessage}</span>
//             </div>
//           </div>
//         )}

//         {requests.length === 0 ? (
//           <div className="bg-white border rounded-lg shadow-sm p-8 text-center">
//             <p className="text-gray-600">No pending requests available.</p>
//           </div>
//         ) : (
//           requests.map((req) => (
//             <div
//               key={req.id}
//               className="bg-white border rounded-lg shadow-sm mb-6 overflow-hidden"
//             >
//               <div className="p-6 space-y-4">
//                 {/* Item Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Item Serial
//                     </label>
//                     <div className="p-2 bg-gray-50 rounded text-gray-800">
//                       {req.item_serial || "N/A"}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Item Type
//                     </label>
//                     <div className="p-2 bg-gray-50 rounded text-gray-800">
//                       {req.item_type}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Quantity
//                     </label>
//                     <div className="p-2 bg-gray-50 rounded text-gray-800">
//                       {req.quantity}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Decision Form */}
//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Decision
//                       </label>
//                       <select
//                         value={statusMap[req.id]}
//                         onChange={(e) => handleStatusChange(req.id, e.target.value)}
//                         className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
//                       >
//                         <option value="pending_clerk">Approve</option>
//                         <option value="rejected_manager">Reject</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Manager Comments
//                       </label>
//                       <textarea
//                         value={commentMap[req.id]}
//                         onChange={(e) => handleCommentChange(req.id, e.target.value)}
//                         placeholder="Add your comments here..."
//                         rows={3}
//                         className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
//                       />
//                     </div>

//                     <div className="flex justify-end">
//                       <button
//                         onClick={() => handleSubmit(req.id)}
//                         disabled={loading}
//                         className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${statusMap[req.id] === "pending_clerk" ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors`}
//                       >
//                         {loading ? (
//                           <>
//                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Processing...
//                           </>
//                         ) : statusMap[req.id] === "pending_clerk" ? (
//                           "Approve Request"
//                         ) : (
//                           "Reject Request"
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default ManagerReview;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // backend server URL

// const ManagerReview = () => {
//   const [requests, setRequests] = useState([]);
//   const [messages, setMessages] = useState([]); // store multiple messages

//   // Fetch all requests on component load
//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/requests");
//       setRequests(res.data);
//     } catch (err) {
//       console.error("Error fetching requests", err);
//       addMessage("❌ Failed to fetch requests");
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // Function to add a message
//   const addMessage = (msg) => {
//     setMessages((prev) => [...prev, msg]);
//   };

//   // Listen for real-time new requests and updates
//   useEffect(() => {
//     const handleNewRequest = (data) => {
//       setRequests((prev) => [data, ...prev]);
//       addMessage(`New request received from Staff #${data.staff_id}`);
//     };

//     const handleUpdateRequest = (data) => {
//       setRequests((prev) =>
//         prev.map((r) =>
//           r.request_id === parseInt(data.request_id)
//             ? { ...r, status: data.status, manager_comment: data.manager_comment }
//             : r
//         )
//       );
//       addMessage(`Request #${data.request_id} updated to ${data.status}`);
//     };

//     socket.on("new_request", handleNewRequest);
//     socket.on("update_request", handleUpdateRequest);

//     return () => {
//       socket.off("new_request", handleNewRequest);
//       socket.off("update_request", handleUpdateRequest);
//     };
//   }, []);

//   // Handle approve/reject
//   const handleUpdate = async (requestId, status) => {
//     const comment = prompt("Enter a comment (optional):") || "";
//     try {
//       await axios.put(`http://localhost:5000/api/requests/${requestId}`, {
//         status,
//         manager_comment: comment,
//       });

//       setRequests((prev) =>
//         prev.map((r) =>
//           r.request_id === requestId
//             ? { ...r, status, manager_comment: comment }
//             : r
//         )
//       );

//       addMessage(`Request #${requestId} ${status}`);
//     } catch (err) {
//       console.error("Error updating request", err);
//       addMessage("❌ Failed to update request");
//     }
//   };

//   // Clear all notifications
//   const clearAllMessages = () => {
//     setMessages([]);
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto bg-white shadow-xl rounded-xl">
//       <h2 className="text-xl font-bold mb-4">Manager Review Dashboard</h2>

//       {/* Clear All Notifications Button */}
//       {messages.length > 0 && (
//         <div className="mb-3 flex justify-between items-center p-2 bg-yellow-100 border border-yellow-300 rounded">
//           <span className="text-yellow-800 font-medium">You have {messages.length} notifications</span>
//           <button
//             onClick={clearAllMessages}
//             className="ml-4 px-3 py-1 bg-yellow-300 text-yellow-900 font-bold rounded hover:bg-yellow-400"
//           >
//             Clear All
//           </button>
//         </div>
//       )}

//       {/* Notification messages */}
//       {messages.length > 0 && (
//         <ul className="mb-3 space-y-1">
//           {messages.map((msg, index) => (
//             <li key={index} className="text-sm text-yellow-800">
//               {msg}
//             </li>
//           ))}
//         </ul>
//       )}

//       <ul className="space-y-3">
//         {requests.map((req) => (
//           <li
//             key={req.request_id}
//             className="p-3 border rounded flex flex-col bg-gray-50"
//           >
//             <span>
//               <strong>{req.item_name}</strong> ({req.quantity} {req.measurement})
//             </span>
//             <span>Staff ID: <b>{req.staff_id}</b></span>
//             <span>Status: <b>{req.status}</b></span>
//             {req.manager_comment && (
//               <span className="text-sm text-gray-600">
//                 Comment: {req.manager_comment}
//               </span>
//             )}

//             {req.status === "PENDING" && (
//               <div className="mt-2 space-x-2">
//                 <button
//                   onClick={() => handleUpdate(req.request_id, "APPROVED")}
//                   className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => handleUpdate(req.request_id, "REJECTED")}
//                   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManagerReview;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend server URL

const ManagerReview = () => {
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);

  // Fetch all requests on component load
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      // Now requests include fname and lname
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests", err);
      addMessage("❌ Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Real-time updates
  useEffect(() => {
    const handleNewRequest = (data) => {
      setRequests((prev) => [data, ...prev]);
      addMessage(`New request from Staff #${data.staff_id} (${data.fname} ${data.lname})`);
    };

    const handleUpdateRequest = (data) => {
      setRequests((prev) =>
        prev.map((r) =>
          r.request_id === parseInt(data.request_id)
            ? { ...r, status: data.status, manager_comment: data.manager_comment }
            : r
        )
      );
      addMessage(`Request #${data.request_id} updated to ${data.status}`);
    };

    socket.on("new_request", handleNewRequest);
    socket.on("update_request", handleUpdateRequest);

    return () => {
      socket.off("new_request", handleNewRequest);
      socket.off("update_request", handleUpdateRequest);
    };
  }, []);

  const handleUpdate = async (requestId, status) => {
    const comment = prompt("Enter a comment (optional):") || "";
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}`, {
        status,
        manager_comment: comment,
      });

      setRequests((prev) =>
        prev.map((r) =>
          r.request_id === requestId
            ? { ...r, status, manager_comment: comment }
            : r
        )
      );

      addMessage(`Request #${requestId} ${status}`);
    } catch (err) {
      console.error("Error updating request", err);
      addMessage("❌ Failed to update request");
    }
  };

  const clearAllMessages = () => setMessages([]);

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-xl rounded-xl">
      <h2 className="text-xl font-bold mb-4">Manager Review Dashboard</h2>

      {/* Notifications */}
      {messages.length > 0 && (
        <div className="mb-3 flex justify-between items-center p-2 bg-yellow-100 border border-yellow-300 rounded">
          <span className="text-yellow-800 font-medium">
            You have {messages.length} notifications
          </span>
          <button
            onClick={clearAllMessages}
            className="ml-4 px-3 py-1 bg-yellow-300 text-yellow-900 font-bold rounded hover:bg-yellow-400"
          >
            Clear All
          </button>
        </div>
      )}

      {messages.length > 0 && (
        <ul className="mb-3 space-y-1">
          {messages.map((msg, index) => (
            <li key={index} className="text-sm text-yellow-800">
              {msg}
            </li>
          ))}
        </ul>
      )}

      {/* Request List */}
      <ul className="space-y-3">
        {requests.map((req) => (
          <li
            key={req.request_id}
            className="p-3 border rounded flex flex-col bg-gray-50"
          >
            <span>
              <strong>{req.item_name}</strong> ({req.quantity} {req.measurement})
            </span>
            <span>
              Staff ID: <b>{req.staff_id}</b>
            </span>
            <span>
              Name: <b>{req.fname} {req.lname}</b>
            </span>
            <span>Status: <b>{req.status}</b></span>
            {req.manager_comment && (
              <span className="text-sm text-gray-600">
                Comment: {req.manager_comment}
              </span>
            )}

            {req.status === "PENDING" && (
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleUpdate(req.request_id, "APPROVED")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdate(req.request_id, "REJECTED")}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerReview;
