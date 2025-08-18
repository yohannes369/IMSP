// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { FaBell } from "react-icons/fa";

// const ManagerReview = () => {
//   const [currentRequest, setCurrentRequest] = useState(null);
//   const currentRequestRef = useRef(null);
//   const [status, setStatus] = useState("pending_clerk");
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     currentRequestRef.current = currentRequest;
//   }, [currentRequest]);

//   useEffect(() => {
//     const socket = io("http://localhost:5000");

//     const fetchPendingRequests = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/requests/manager/pending");
//         setNotifications(res.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPendingRequests();

//     const handleNewRequest = (request) => {
//       setNotifications((prev) => [request, ...prev]);
//       if (!currentRequestRef.current) {
//         setCurrentRequest(request);
//         setStatus("pending_clerk");
//         setComment("");
//         setNotifications((prev) => prev.filter((n) => n.id !== request.id));
//       }
//     };

//     socket.on("new_request", handleNewRequest);

//     return () => {
//       socket.off("new_request", handleNewRequest);
//       socket.disconnect();
//     };
//   }, []);

//   const handleIconClick = () => {
//     if (notifications.length === 0) return;
//     const request = notifications[0];
//     setCurrentRequest(request);
//     setStatus("pending_clerk");
//     setComment("");
//     setNotifications((prev) => prev.filter((n) => n.id !== request.id));
//   };

//   const handleSubmit = async () => {
//     if (!currentRequest) return;
//     setLoading(true);
//     try {
//       await axios.put(
//         `http://localhost:5000/api/requests/manager/${currentRequest.id}`,
//         { status, manager_comment: comment }
//       );
//       setCurrentRequest(null);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 font-sans">
//       <h2 className="text-2xl font-bold mb-4">Manager Review</h2>

//       {/* Notification Bell */}
//       <div className="relative inline-block mb-6">
//         <FaBell size={28} className="cursor-pointer" onClick={handleIconClick} />
//         {notifications.length > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//             {notifications.length}
//           </span>
//         )}
//       </div>

//       {/* Request Form */}
//       {currentRequest ? (
//         <div className="border p-4 rounded shadow-md space-y-4">
//           <div>
//             <label className="block font-medium">Request ID:</label>
//             <input type="text" value={currentRequest.id} disabled className="border p-2 w-full rounded" />
//           </div>
//           <div>
//             <label className="block font-medium">Staff ID:</label>
//             <input type="text" value={currentRequest.staff_id} disabled className="border p-2 w-full rounded" />
//           </div>
//           <div>
//             <label className="block font-medium">Item Type:</label>
//             <input type="text" value={currentRequest.item_type} disabled className="border p-2 w-full rounded" />
//           </div>
//           <div>
//             <label className="block font-medium">Quantity:</label>
//             <input type="number" value={currentRequest.quantity} disabled className="border p-2 w-full rounded" />
//           </div>
//           <div>
//             <label className="block font-medium">Status:</label>
//             <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full rounded">
//               <option value="pending_clerk">Approve</option>
//               <option value="rejected_manager">Reject</option>
//             </select>
//           </div>
//           <div>
//             <label className="block font-medium">Comment:</label>
//             <input
//               type="text"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Add a comment (optional)"
//               className="border p-2 w-full rounded"
//             />
//           </div>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
//           >
//             {loading ? "Submitting..." : "Submit Review"}
//           </button>
//         </div>
//       ) : (
//         <p>No request selected. Click the bell to view the latest request.</p>
//       )}
//     </div>
//   );
// };

// export default ManagerReview;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Footer from "../../components/Footer/Footer";
// const ManagerReview = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [statusMap, setStatusMap] = useState({});
//   const [commentMap, setCommentMap] = useState({});

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
//       // Remove the request after successful submission
//       setRequests((prev) => prev.filter((req) => req.id !== requestId));
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
//     <div className="p-6 font-sans">
//       <h2 className="text-2xl font-bold mb-4">Manager Review</h2>

//       {requests.length === 0 ? (
//         <p>No pending requests available.</p>
//       ) : (
//         requests.map((req) => (
//           <div key={req.id} className="border p-4 rounded shadow-md mb-4 space-y-4">
//             <div>
//               <label className="block font-medium">Request ID:</label>
//               <input type="text" value={req.id} disabled className="border p-2 w-full rounded" />
//             </div>
//             <div>
//               <label className="block font-medium">Staff ID:</label>
//               <input type="text" value={req.staff_id} disabled className="border p-2 w-full rounded" />
//             </div>
//             <div>
//               <label className="block font-medium">Item Type:</label>
//               <input type="text" value={req.item_type} disabled className="border p-2 w-full rounded" />
//             </div>
//             <div>
//               <label className="block font-medium">Quantity:</label>
//               <input type="number" value={req.quantity} disabled className="border p-2 w-full rounded" />
//             </div>
//             <div>
//               <label className="block font-medium">Status:</label>
//               <select
//                 value={statusMap[req.id]}
//                 onChange={(e) => handleStatusChange(req.id, e.target.value)}
//                 className="border p-2 w-full rounded"
//               >
//                 <option value="pending_clerk">Approve</option>
//                 <option value="rejected_manager">Reject</option>
//               </select>
//             </div>
//             <div>
//               <label className="block font-medium">Comment:</label>
//               <input
//                 type="text"
//                 value={commentMap[req.id]}
//                 onChange={(e) => handleCommentChange(req.id, e.target.value)}
//                 placeholder="Add a comment (optional)"
//                 className="border p-2 w-full rounded"
//               />
//             </div>
//             <button
//               onClick={() => handleSubmit(req.id)}
//               disabled={loading}
//               className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
//             >
//               {loading ? "Submitting..." : "Submit Review"}
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ManagerReview;












// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Footer from "../../components/Footer/Footer";
// import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

// const ManagerReview = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [statusMap, setStatusMap] = useState({});
//   const [commentMap, setCommentMap] = useState({});
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const fetchRequests = async () => {
//     try {
//       setError(null);
//       const res = await axios.get("http://localhost:5000/api/requests/manager/pending");
//       const data = res.data || [];
//       setRequests(data);

//       const statusInit = {};
//       const commentInit = {};
//       data.forEach((req) => {
//         statusInit[req.id] = req.status || "pending_clerk";
//         commentInit[req.id] = req.manager_comment || "";
//       });
//       setStatusMap(statusInit);
//       setCommentMap(commentInit);
//     } catch (err) {
//       setError("Failed to fetch requests. Please try again.");
//       console.error("Error fetching requests:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const handleSubmit = async (requestId) => {
//     if (!statusMap[requestId]) {
//       setError("Please select a status");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       await axios.put(
//        `http://localhost:5000/api/requests/manager/${currentRequest.id}`,
//         {
//           status: statusMap[requestId],
//           manager_comment: commentMap[requestId],
//         }
//       );
//       setSuccess("Request updated successfully");
//       setTimeout(() => fetchRequests(), 1000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update request");
//       console.error("Error updating request:", err);
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

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "approved_manager":
//         return (
//           <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
//             <CheckCircle className="w-3 h-3 mr-1" /> Approved
//           </span>
//         );
//       case "rejected_manager":
//         return (
//           <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
//             <XCircle className="w-3 h-3 mr-1" /> Rejected
//           </span>
//         );
//       default:
//         return (
//           <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
//             <Clock className="w-3 h-3 mr-1" /> Pending
//           </span>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           {/* Header */}
//           <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-800">Review Inventory Requests</h2>
//             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//               {requests.length} Pending
//             </span>
//           </div>

//           {/* Alerts */}
//           <div className="px-6 pt-4">
//             {error && (
//               <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-center">
//                 <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
//                 <p className="text-red-700">{error}</p>
//               </div>
//             )}
//             {success && (
//               <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded flex items-center">
//                 <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
//                 <p className="text-green-700">{success}</p>
//               </div>
//             )}
//           </div>

//           {/* Requests List */}
//           <div className="px-6 py-4">
//             {requests.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
//                   <CheckCircle className="h-6 w-6 text-gray-400" />
//                 </div>
//                 <h3 className="mt-2 text-sm font-medium text-gray-900">No pending requests</h3>
//                 <p className="mt-1 text-sm text-gray-500">All requests have been processed.</p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {requests.map((req) => (
//                   <div key={req.id} className="border border-gray-200 rounded-lg divide-y divide-gray-200">
//                     <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
//                       <div>
//                         <span className="text-sm font-medium text-gray-500">Request #{req.id}</span>
//                         <span className="ml-2 text-sm text-gray-500">• {new Date(req.created_at).toLocaleDateString()}</span>
//                       </div>
//                       {getStatusBadge(req.status)}
//                     </div>

//                     <div className="px-4 py-5 sm:p-6">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Item Details</label>
//                           <div className="bg-gray-50 rounded-md p-3 grid grid-cols-2 gap-4">
//                             <div>
//                               <p className="text-xs text-gray-500">Serial</p>
//                               <p className="text-sm font-medium">{req.item_serial || "N/A"}</p>
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500">Type</p>
//                               <p className="text-sm font-medium">{req.item_type}</p>
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500">Quantity</p>
//                               <p className="text-sm font-medium">{req.quantity}</p>
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500">Requested By</p>
//                               <p className="text-sm font-medium">{req.requested_by || "N/A"}</p>
//                             </div>
//                           </div>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Clerk Comments</label>
//                           <div className="bg-gray-50 rounded-md p-3 min-h-full">
//                             <p className="text-sm text-gray-700">{req.clerk_comment || "No comments provided"}</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Review Form */}
//                       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label htmlFor={`status-${req.id}`} className="block text-sm font-medium text-gray-700 mb-1">Decision</label>
//                           <select
//                             id={`status-${req.id}`}
//                             value={statusMap[req.id]}
//                             onChange={(e) => handleStatusChange(req.id, e.target.value)}
//                             className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
//                           >
//                             <option value="pending_clerk">Approve</option>
//                             <option value="rejected_manager">Reject</option>
//                           </select>
//                         </div>

//                         <div>
//                           <label htmlFor={`comment-${req.id}`} className="block text-sm font-medium text-gray-700 mb-1">Your Comments</label>
//                           <textarea
//                             id={`comment-${req.id}`}
//                             rows={2}
//                             value={commentMap[req.id]}
//                             onChange={(e) => handleCommentChange(req.id, e.target.value)}
//                             className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
//                             placeholder="Add your comments here..."
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-6 flex justify-end">
//                         <button
//                           type="button"
//                           onClick={() => handleSubmit(req.id)}
//                           disabled={loading}
//                           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           {loading ? "Processing..." : "Submit Decision"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ManagerReview;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

const ManagerReview = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMap, setStatusMap] = useState({});
  const [commentMap, setCommentMap] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch all manager requests on page load
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/requests/manager/pending");
        setRequests(res.data || []);

        // Initialize status and comment for each request
        const statusInit = {};
        const commentInit = {};
        (res.data || []).forEach((req) => {
          statusInit[req.id] = "pending_clerk";
          commentInit[req.id] = "";
        });
        setStatusMap(statusInit);
        setCommentMap(commentInit);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, []);

  const handleSubmit = async (requestId) => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/requests/manager/${requestId}`,
        {
          status: statusMap[requestId],
          manager_comment: commentMap[requestId],
        }
      );
      
      // Show success message
      setSuccessMessage(
        statusMap[requestId] === "pending_clerk" 
          ? "Request approved successfully!" 
          : "Request rejected successfully!"
      );
      
      // Remove the request after successful submission
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, value) => {
    setStatusMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommentChange = (id, value) => {
    setCommentMap((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Manager Review</h2>

        {/* Success Message */}
        {successMessage && (
          <div className={`mb-6 p-4 rounded-md ${successMessage.includes("approved") ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <div className="flex items-center">
              {successMessage.includes("approved") ? (
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {requests.length === 0 ? (
          <div className="bg-white border rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600">No pending requests available.</p>
          </div>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="bg-white border rounded-lg shadow-sm mb-6 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {/* Item Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Serial
                    </label>
                    <div className="p-2 bg-gray-50 rounded text-gray-800">
                      {req.item_serial || "N/A"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Type
                    </label>
                    <div className="p-2 bg-gray-50 rounded text-gray-800">
                      {req.item_type}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <div className="p-2 bg-gray-50 rounded text-gray-800">
                      {req.quantity}
                    </div>
                  </div>
                </div>

                {/* Decision Form */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Decision
                      </label>
                      <select
                        value={statusMap[req.id]}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="pending_clerk">Approve</option>
                        <option value="rejected_manager">Reject</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manager Comments
                      </label>
                      <textarea
                        value={commentMap[req.id]}
                        onChange={(e) => handleCommentChange(req.id, e.target.value)}
                        placeholder="Add your comments here..."
                        rows={3}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSubmit(req.id)}
                        disabled={loading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${statusMap[req.id] === "pending_clerk" ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors`}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : statusMap[req.id] === "pending_clerk" ? (
                          "Approve Request"
                        ) : (
                          "Reject Request"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManagerReview;