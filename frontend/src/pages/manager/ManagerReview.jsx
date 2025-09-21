
// export default ManagerReview;

// coorect


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { 
//   FiFilter, 
//   FiCheckCircle, 
//   FiClock, 
//   FiXCircle, 
//   FiMessageSquare, 
   
//   FiPackage, 
//   FiUser
// } from "react-icons/fi";

// const socket = io("http://localhost:5000");

// const ManagerReview = () => {
//   const [requests, setRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [activeTab, setActiveTab] = useState("ALL");
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [comments, setComments] = useState({});

//   const categorizedRequests = {
//     ALL: requests,
//     PENDING: requests.filter(req => req.status === "PENDING"),
//     APPROVED: requests.filter(req => req.status === "APPROVED"),
//     REJECTED: requests.filter(req => req.status === "REJECTED")
//   };

//   const fetchRequests = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/requests");
//       setRequests(res.data);
//       setFilteredRequests(res.data);
//     } catch (err) {
//       console.error(err);
//       addMessage("❌ Failed to fetch requests", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => { fetchRequests(); }, []);

//   useEffect(() => {
//     const filtered = categorizedRequests[activeTab].filter(request =>
//       request.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lname.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredRequests(filtered);
//   }, [searchTerm, activeTab, requests]);

//   const addMessage = (msg, type = "info") => {
//     const newMessage = {
//       id: Date.now(),
//       text: msg,
//       type: type,
//       timestamp: new Date().toLocaleTimeString()
//     };
//     setMessages(prev => [newMessage, ...prev]);
//   };

//   useEffect(() => {
//     const handleNewRequest = (data) => {
//       setRequests(prev => [data, ...prev]);
//       addMessage(`New request from ${data.fname} ${data.lname}`, "info");
//     };
//     const handleUpdateRequest = (data) => {
//       setRequests(prev =>
//         prev.map(r =>
//           r.request_id === parseInt(data.request_id)
//             ? { ...r, status: data.status, manager_comment: data.manager_comment }
//             : r
//         )
//       );
//       addMessage(`Request updated to ${data.status}`, "update");
//     };

//     socket.on("new_request", handleNewRequest);
//     socket.on("update_request", handleUpdateRequest);

//     return () => {
//       socket.off("new_request", handleNewRequest);
//       socket.off("update_request", handleUpdateRequest);
//     };
//   }, []);

//   const handleUpdate = async (requestId, status) => {
//     const comment = comments[requestId] || "";
//     try {
//       await axios.put(`http://localhost:5000/api/requests/${requestId}`, { status, manager_comment: comment });
//       setRequests(prev =>
//         prev.map(r =>
//           r.request_id === requestId ? { ...r, status, manager_comment: comment } : r
//         )
//       );
//       addMessage(`Request ${status.toLowerCase()}`, "success");
//       setComments(prev => ({ ...prev, [requestId]: "" }));
//     } catch (err) {
//       console.error(err);
//       addMessage("❌ Failed to update request", "error");
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "APPROVED": return <FiCheckCircle className="text-[#2E8B57]" />;
//       case "PENDING": return <FiClock className="text-[#FFA500]" />;
//       case "REJECTED": return <FiXCircle className="text-[#DC143C]" />;
//       default: return null;
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "APPROVED": return "bg-[#E8F5E9] text-[#2E8B57] border-[#C8E6C9]";
//       case "PENDING": return "bg-[#FFF3E0] text-[#FFA500] border-[#FFE0B2]";
//       case "REJECTED": return "bg-[#FFEBEE] text-[#DC143C] border-[#FFCDD2]";
//       default: return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString(undefined, {
//       year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F9F7] py-6 px-4">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-[#E0F2E9]">
//         <div className="bg-gradient-to-r from-[#2E5E4E] to-[#3A7B68] text-white p-5">
//           <h1 className="text-xl font-bold">Manager Review Dashboard</h1>
//           <p className="text-[#A3F7BF] text-sm">Monitor and manage staff requests</p>
//         </div>

//         <div className="p-4">
//           {/* Tabs */}
//           <div className="mb-4 flex gap-2">
//             {["ALL", "PENDING", "APPROVED", "REJECTED"].map(tab => (
//               <button
//                 key={tab}
//                 className={`px-3 py-1 rounded-t-lg font-medium text-sm transition-colors ${
//                   activeTab === tab
//                     ? "bg-[#E8F5E9] text-[#2E5E4E] border-b-2 border-[#2E5E4E]"
//                     : "text-gray-600 hover:bg-[#F5F9F7]"
//                 }`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab} ({categorizedRequests[tab].length})
//               </button>
//             ))}
//           </div>

//           {/* Request Cards */}
//           {!isLoading && filteredRequests.length > 0 && (
//             <div className="grid gap-3">
//               {filteredRequests.map(req => (
//                 <div key={req.request_id} className="border border-[#E0F2E9] rounded-lg p-3 hover:shadow-sm bg-white">
//                   <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-lg text-[#2E5E4E]">{req.item_name}</h3>
//                       <div className="flex items-center mt-1 text-sm text-[#3A7B68]">
//                         <FiPackage className="mr-1" /> {req.quantity} {req.measurement}
//                       </div>
//                       <div className="flex items-center mt-1 text-sm text-gray-600">
//                         <FiUser className="mr-1 text-[#2E5E4E]" /> {req.fname} {req.lname}
//                       </div>
//                       {req.created_at && (
//                         <div className="text-xs text-gray-500 mt-1">
//                           Submitted: {formatDate(req.created_at)}
//                         </div>
//                       )}

//                       {req.manager_comment && (
//                         <div className="mt-2 p-2 bg-[#E3F2FD] rounded border border-[#BBDEFB] text-sm text-[#1976D2] flex items-center gap-1">
//                           <FiMessageSquare /> {req.manager_comment}
//                         </div>
//                       )}

//                       {req.status === "PENDING" && (
//                         <textarea
//                           value={comments[req.request_id] || ""}
//                           onChange={e => setComments(prev => ({ ...prev, [req.request_id]: e.target.value }))}
//                           placeholder="Add a comment (optional)"
//                           className="mt-2 w-full p-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3A7B68] text-sm"
//                         />
//                       )}
//                     </div>

//                     {req.status === "PENDING" && (
//                       <div className="flex flex-col gap-1 mt-2 md:mt-0 min-w-[100px]">
//                         <button
//                           onClick={() => handleUpdate(req.request_id, "APPROVED")}
//                           className="px-3 py-1 bg-[#2E8B57] text-white rounded hover:bg-[#3A7B68] text-sm"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => handleUpdate(req.request_id, "REJECTED")}
//                           className="px-3 py-1 bg-[#DC143C] text-white rounded hover:bg-[#B22222] text-sm"
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerReview;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import {
//   FiFilter,
//   FiCheckCircle,
//   FiClock,
//   FiXCircle,
//   FiMessageSquare,
//   FiPackage,
//   FiUser,
// } from "react-icons/fi";

// const socket = io("http://localhost:5000");

// const ManagerReview = () => {
//   const [requests, setRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [items, setItems] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [activeTab, setActiveTab] = useState("ALL");
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [comments, setComments] = useState({});

//   const categorizedRequests = {
//     ALL: requests,
//     PENDING: requests.filter((req) => req.status === "PENDING"),
//     APPROVED: requests.filter((req) => req.status === "APPROVED"),
//     REJECTED: requests.filter((req) => req.status === "REJECTED"),
//   };

//   const fetchRequests = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/requests");
//       setRequests(res.data);
//       setFilteredRequests(res.data);
//     } catch (err) {
//       console.error(err);
//       addMessage("❌ Failed to fetch requests", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/items/items");
//       setItems(res.data);
//     } catch (err) {
//       console.error(err);
//       addMessage("❌ Failed to fetch items", "error");
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//     fetchItems();
//   }, []);

//   useEffect(() => {
//     const filtered = categorizedRequests[activeTab].filter(
//       (request) =>
//         request.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         request.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         request.lname.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredRequests(filtered);
//   }, [searchTerm, activeTab, requests]);

//   const addMessage = (msg, type = "info") => {
//     const newMessage = {
//       id: Date.now(),
//       text: msg,
//       type: type,
//       timestamp: new Date().toLocaleTimeString(),
//     };
//     setMessages((prev) => [newMessage, ...prev]);
//   };

//   useEffect(() => {
//     const handleNewRequest = (data) => {
//       setRequests((prev) => [data, ...prev]);
//       addMessage(`New request from ${data.fname} ${data.lname}`, "info");
//     };
//     const handleUpdateRequest = (data) => {
//       setRequests((prev) =>
//         prev.map((r) =>
//           r.request_id === parseInt(data.request_id)
//             ? {
//                 ...r,
//                 status: data.status,
//                 manager_comment: data.manager_comment,
//               }
//             : r
//         )
//       );
//       addMessage(`Request updated to ${data.status}`, "update");
//     };

//     socket.on("new_request", handleNewRequest);
//     socket.on("update_request", handleUpdateRequest);

//     return () => {
//       socket.off("new_request", handleNewRequest);
//       socket.off("update_request", handleUpdateRequest);
//     };
//   }, []);

//   const handleUpdate = async (requestId, status) => {
//     const comment = comments[requestId] || "";
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
//       addMessage(`Request ${status.toLowerCase()}`, "success");
//       setComments((prev) => ({ ...prev, [requestId]: "" }));
//     } catch (err) {
//       console.error(err);
//       addMessage("❌ Failed to update request", "error");
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "APPROVED":
//         return <FiCheckCircle className="text-[#2E8B57]" />;
//       case "PENDING":
//         return <FiClock className="text-[#FFA500]" />;
//       case "REJECTED":
//         return <FiXCircle className="text-[#DC143C]" />;
//       default:
//         return null;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F9F7] py-6 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left side - Items */}
//         <div className="col-span-1 bg-white shadow-lg rounded-xl border border-[#E0F2E9] p-4 overflow-y-auto max-h-[85vh]">
//           <h2 className="text-lg font-bold text-[#2E5E4E] mb-3">Available Items</h2>
//           {items.length > 0 ? (
//             <div className="space-y-3">
//               {items.map((item) => (
//                 <div
//                   key={item.ItemID}
//                   className="border border-gray-200 rounded-lg p-3 hover:shadow-sm bg-white"
//                 >
//                   <h3 className="text-md font-semibold text-gray-800">
//                     {item.ItemName}
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Model: {item.Model || "N/A"}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Quantity: {item.TotalQty}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-sm">No items found.</p>
//           )}
//         </div>

//         {/* Right side - Requests */}
//         <div className="col-span-2 bg-white shadow-lg rounded-xl overflow-hidden border border-[#E0F2E9]">
//           <div className="bg-gradient-to-r from-[#2E5E4E] to-[#3A7B68] text-white p-5">
//             <h1 className="text-xl font-bold">Manager Review Dashboard</h1>
//             <p className="text-[#A3F7BF] text-sm">
//               Monitor and manage staff requests
//             </p>
//           </div>

//           <div className="p-4">
//             {/* Tabs */}
//             <div className="mb-4 flex gap-2">
//               {["ALL", "PENDING", "APPROVED", "REJECTED"].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`px-3 py-1 rounded-t-lg font-medium text-sm transition-colors ${
//                     activeTab === tab
//                       ? "bg-[#E8F5E9] text-[#2E5E4E] border-b-2 border-[#2E5E4E]"
//                       : "text-gray-600 hover:bg-[#F5F9F7]"
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab} ({categorizedRequests[tab].length})
//                 </button>
//               ))}
//             </div>

//             {/* Request Cards */}
//             {!isLoading && filteredRequests.length > 0 && (
//               <div className="grid gap-3">
//                 {filteredRequests.map((req) => (
//                   <div
//                     key={req.request_id}
//                     className="border border-[#E0F2E9] rounded-lg p-3 hover:shadow-sm bg-white"
//                   >
//                     <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg text-[#2E5E4E]">
//                           {req.item_name}
//                         </h3>
//                         <div className="flex items-center mt-1 text-sm text-[#3A7B68]">
//                           <FiPackage className="mr-1" /> {req.quantity}{" "}
//                           {req.measurement}
//                         </div>
//                         <div className="flex items-center mt-1 text-sm text-gray-600">
//                           <FiUser className="mr-1 text-[#2E5E4E]" /> {req.fname}{" "}
//                           {req.lname}
//                         </div>
//                         {req.created_at && (
//                           <div className="text-xs text-gray-500 mt-1">
//                             Submitted: {formatDate(req.created_at)}
//                           </div>
//                         )}

//                         {req.manager_comment && (
//                           <div className="mt-2 p-2 bg-[#E3F2FD] rounded border border-[#BBDEFB] text-sm text-[#1976D2] flex items-center gap-1">
//                             <FiMessageSquare /> {req.manager_comment}
//                           </div>
//                         )}

//                         {req.status === "PENDING" && (
//                           <textarea
//                             value={comments[req.request_id] || ""}
//                             onChange={(e) =>
//                               setComments((prev) => ({
//                                 ...prev,
//                                 [req.request_id]: e.target.value,
//                               }))
//                             }
//                             placeholder="Add a comment (optional)"
//                             className="mt-2 w-full p-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3A7B68] text-sm"
//                           />
//                         )}
//                       </div>

//                       {req.status === "PENDING" && (
//                         <div className="flex flex-col gap-1 mt-2 md:mt-0 min-w-[100px]">
//                           <button
//                             onClick={() =>
//                               handleUpdate(req.request_id, "APPROVED")
//                             }
//                             className="px-3 py-1 bg-[#2E8B57] text-white rounded hover:bg-[#3A7B68] text-sm"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() =>
//                               handleUpdate(req.request_id, "REJECTED")
//                             }
//                             className="px-3 py-1 bg-[#DC143C] text-white rounded hover:bg-[#B22222] text-sm"
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerReview;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import {
//   FiCheckCircle,
//   FiClock,
//   FiXCircle,
//   FiMessageSquare,
//   FiPackage,
//   FiUser,
//   FiChevronDown,
//   FiChevronRight,
// } from "react-icons/fi";

// const socket = io("http://localhost:5000");

// const ManagerReview = () => {
//   const [requests, setRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [items, setItems] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [activeTab, setActiveTab] = useState("ALL");
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [comments, setComments] = useState({});
//   const [expandedCategories, setExpandedCategories] = useState({});

//   const categorizedRequests = {
//     ALL: requests,
//     PENDING: requests.filter((req) => req.status === "PENDING"),
//     APPROVED: requests.filter((req) => req.status === "APPROVED"),
//     REJECTED: requests.filter((req) => req.status === "REJECTED"),
//   };

//   const fetchRequests = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/requests");
//       setRequests(res.data);
//       setFilteredRequests(res.data);
//     } catch (err) {
//       console.error(err);
//       addMessage("❌ Failed to fetch requests", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/items/items");
//       setItems(res.data);
//     } catch (err) {
//       console.error(err);
//       addMessage("❌ Failed to fetch items", "error");
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//     fetchItems();
//   }, []);

//   useEffect(() => {
//     const filtered = categorizedRequests[activeTab].filter(
//       (request) =>
//         request.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         request.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         request.lname.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredRequests(filtered);
//   }, [searchTerm, activeTab, requests]);

//   const addMessage = (msg, type = "info") => {
//     const newMessage = {
//       id: Date.now(),
//       text: msg,
//       type: type,
//       timestamp: new Date().toLocaleTimeString(),
//     };
//     setMessages((prev) => [newMessage, ...prev]);
//   };

//   useEffect(() => {
//     const handleNewRequest = (data) => {
//       setRequests((prev) => [data, ...prev]);
//       addMessage(`New request from ${data.fname} ${data.lname}`, "info");
//     };
//     const handleUpdateRequest = (data) => {
//       setRequests((prev) =>
//         prev.map((r) =>
//           r.request_id === parseInt(data.request_id)
//             ? {
//                 ...r,
//                 status: data.status,
//                 manager_comment: data.manager_comment,
//               }
//             : r
//         )
//       );
//       addMessage(`Request updated to ${data.status}`, "update");
//     };

//     socket.on("new_request", handleNewRequest);
//     socket.on("update_request", handleUpdateRequest);

//     return () => {
//       socket.off("new_request", handleNewRequest);
//       socket.off("update_request", handleUpdateRequest);
//     };
//   }, []);

//   const handleUpdate = async (requestId, status) => {
//     const comment = comments[requestId] || "";
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
//       addMessage(`Request ${status.toLowerCase()}`, "success");
//       setComments((prev) => ({ ...prev, [requestId]: "" }));
//     } catch (err) {
//       console.error(err);
//       addMessage("❌ Failed to update request", "error");
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Group items by category column
//   const groupedItems = items.reduce((acc, item) => {
//     const cat = item.Category || "Uncategorized";
//     if (!acc[cat]) acc[cat] = [];
//     acc[cat].push(item);
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-[#F5F9F7] py-6 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left side - Items grouped by category */}
//         <div className="col-span-1 bg-white shadow-lg rounded-xl border border-[#E0F2E9] p-4 overflow-y-auto max-h-[85vh]">
//           <h2 className="text-lg font-bold text-[#2E5E4E] mb-3">
//             Available Items
//           </h2>
//           {Object.keys(groupedItems).length > 0 ? (
//             <div className="space-y-4">
//               {Object.entries(groupedItems).map(([category, catItems]) => (
//                 <div key={category} className="border rounded-lg">
//                   <button
//                     className="w-full flex justify-between items-center px-3 py-2 bg-[#F5F9F7] text-[#2E5E4E] font-semibold text-sm rounded-t-lg"
//                     onClick={() =>
//                       setExpandedCategories((prev) => ({
//                         ...prev,
//                         [category]: !prev[category],
//                       }))
//                     }
//                   >
//                     <span>{category}</span>
//                     <span className="flex items-center gap-2 text-xs text-gray-500">
//                       {catItems.length} items
//                       {expandedCategories[category] ? (
//                         <FiChevronDown />
//                       ) : (
//                         <FiChevronRight />
//                       )}
//                     </span>
//                   </button>
//                   {expandedCategories[category] && (
//                     <div className="p-2 space-y-2">
//                       {catItems.map((item) => (
//                         <div
//                           key={item.ItemID}
//                           className="border border-gray-200 rounded-lg p-2 hover:shadow-sm bg-white"
//                         >
//                           <h3 className="text-sm font-semibold text-gray-800">
//                             {item.ItemName}
//                           </h3>
//                           <p className="text-xs text-gray-600">
//                             Model: {item.Model || "N/A"}
//                           </p>
//                           <p className="text-xs text-gray-600">
//                             Quantity: {item.TotalQty}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-sm">No items found.</p>
//           )}
//         </div>

//         {/* Right side - Requests */}
//         <div className="col-span-2 bg-white shadow-lg rounded-xl overflow-hidden border border-[#E0F2E9]">
//           <div className="bg-gradient-to-r from-[#2E5E4E] to-[#3A7B68] text-white p-5">
//             <h1 className="text-xl font-bold">Manager Review Dashboard</h1>
//             <p className="text-[#A3F7BF] text-sm">
//               Monitor and manage staff requests
//             </p>
//           </div>

//           <div className="p-4">
//             {/* Tabs */}
//             <div className="mb-4 flex gap-2">
//               {["ALL", "PENDING", "APPROVED", "REJECTED"].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`px-3 py-1 rounded-t-lg font-medium text-sm transition-colors ${
//                     activeTab === tab
//                       ? "bg-[#E8F5E9] text-[#2E5E4E] border-b-2 border-[#2E5E4E]"
//                       : "text-gray-600 hover:bg-[#F5F9F7]"
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab} ({categorizedRequests[tab].length})
//                 </button>
//               ))}
//             </div>

//             {/* Request Cards */}
//             {!isLoading && filteredRequests.length > 0 && (
//               <div className="grid gap-3">
//                 {filteredRequests.map((req) => (
//                   <div
//                     key={req.request_id}
//                     className="border border-[#E0F2E9] rounded-lg p-3 hover:shadow-sm bg-white"
//                   >
//                     <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg text-[#2E5E4E]">
//                           {req.item_name}
//                         </h3>
//                         <div className="flex items-center mt-1 text-sm text-[#3A7B68]">
//                           <FiPackage className="mr-1" /> {req.quantity}{" "}
//                           {req.measurement}
//                         </div>
//                         <div className="flex items-center mt-1 text-sm text-gray-600">
//                           <FiUser className="mr-1 text-[#2E5E4E]" /> {req.fname}{" "}
//                           {req.lname}
//                         </div>
//                         {req.created_at && (
//                           <div className="text-xs text-gray-500 mt-1">
//                             Submitted: {formatDate(req.created_at)}
//                           </div>
//                         )}

//                         {req.manager_comment && (
//                           <div className="mt-2 p-2 bg-[#E3F2FD] rounded border border-[#BBDEFB] text-sm text-[#1976D2] flex items-center gap-1">
//                             <FiMessageSquare /> {req.manager_comment}
//                           </div>
//                         )}

//                         {req.status === "PENDING" && (
//                           <textarea
//                             value={comments[req.request_id] || ""}
//                             onChange={(e) =>
//                               setComments((prev) => ({
//                                 ...prev,
//                                 [req.request_id]: e.target.value,
//                               }))
//                             }
//                             placeholder="Add a comment (optional)"
//                             className="mt-2 w-full p-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3A7B68] text-sm"
//                           />
//                         )}
//                       </div>

//                       {req.status === "PENDING" && (
//                         <div className="flex flex-col gap-1 mt-2 md:mt-0 min-w-[100px]">
//                           <button
//                             onClick={() =>
//                               handleUpdate(req.request_id, "APPROVED")
//                             }
//                             className="px-3 py-1 bg-[#2E8B57] text-white rounded hover:bg-[#3A7B68] text-sm"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() =>
//                               handleUpdate(req.request_id, "REJECTED")
//                             }
//                             className="px-3 py-1 bg-[#DC143C] text-white rounded hover:bg-[#B22222] text-sm"
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerReview;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiMessageSquare,
  FiPackage,
  FiUser,
  FiChevronDown,
  FiChevronRight,
  FiSearch,
  FiFilter,
  FiRefreshCw
} from "react-icons/fi";

const socket = io("http://localhost:5000");

const ManagerReview = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [comments, setComments] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Color palette
  const colors = {
    primary: {
      50: "#f0f9f5",
      100: "#dcf2e8",
      200: "#bce4d3",
      300: "#8ecfb5",
      400: "#59b392",
      500: "#2E8B57", // Primary green - SeaGreen
      600: "#217a4a",
      700: "#1c623c",
      800: "#194e32",
      900: "#15412a",
    },
    secondary: {
      50: "#f6f7f9",
      100: "#eceff2",
      200: "#d5dbe2",
      300: "#b0bbc8",
      400: "#8595a9",
      500: "#66788f",
      600: "#506176",
      700: "#424e60",
      800: "#3a4350",
      900: "#343a44",
    },
    status: {
      pending: "#F59E0B",
      approved: "#10B981",
      rejected: "#EF4444",
    }
  };

  const categorizedRequests = {
    ALL: requests,
    PENDING: requests.filter((req) => req.status === "PENDING"),
    APPROVED: requests.filter((req) => req.status === "APPROVED"),
    REJECTED: requests.filter((req) => req.status === "REJECTED"),
  };

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      setRequests(res.data);
      setFilteredRequests(res.data);
    } catch (err) {
      console.error(err);
      addMessage("Failed to fetch requests", "error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items/items");
      setItems(res.data);
    } catch (err) {
      console.error(err);
      addMessage("Failed to fetch items", "error");
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = categorizedRequests[activeTab].filter(
      (request) =>
        request.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.lname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchTerm, activeTab, requests]);

  const addMessage = (msg, type = "info") => {
    const newMessage = {
      id: Date.now(),
      text: msg,
      type: type,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [newMessage, ...prev.slice(0, 4)]); // Keep only 5 messages
  };

  useEffect(() => {
    const handleNewRequest = (data) => {
      setRequests((prev) => [data, ...prev]);
      addMessage(`New request from ${data.fname} ${data.lname}`, "info");
    };
    const handleUpdateRequest = (data) => {
      setRequests((prev) =>
        prev.map((r) =>
          r.request_id === parseInt(data.request_id)
            ? {
                ...r,
                status: data.status,
                manager_comment: data.manager_comment,
              }
            : r
        )
      );
      addMessage(`Request updated to ${data.status}`, "update");
    };

    socket.on("new_request", handleNewRequest);
    socket.on("update_request", handleUpdateRequest);

    return () => {
      socket.off("new_request", handleNewRequest);
      socket.off("update_request", handleUpdateRequest);
    };
  }, []);

  const handleUpdate = async (requestId, status) => {
    const comment = comments[requestId] || "";
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
      addMessage(`Request ${status.toLowerCase()}`, "success");
      setComments((prev) => ({ ...prev, [requestId]: "" }));
    } catch (err) {
      console.error(err);
      addMessage("Failed to update request", "error");
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchRequests();
    fetchItems();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Group items by category column
  const groupedItems = items.reduce((acc, item) => {
    const cat = item.Category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      PENDING: {
        color: colors.status.pending,
        icon: <FiClock className="mr-1" />,
        text: "Pending"
      },
      APPROVED: {
        color: colors.status.approved,
        icon: <FiCheckCircle className="mr-1" />,
        text: "Approved"
      },
      REJECTED: {
        color: colors.status.rejected,
        icon: <FiXCircle className="mr-1" />,
        text: "Rejected"
      }
    };

    const config = statusConfig[status] || statusConfig.PENDING;

    return (
      <span 
        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
        style={{ backgroundColor: `${config.color}20`, color: config.color }}
      >
        {config.icon}
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left side - Items grouped by category */}
        <div className="lg:col-span-1 bg-white shadow-sm rounded-lg border border-gray-200 p-4 overflow-y-auto max-h-[85vh] sticky top-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Available Items
            </h2>
            <button 
              onClick={handleRefresh}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
              disabled={isRefreshing}
            >
              <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {Object.keys(groupedItems).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(groupedItems).map(([category, catItems]) => (
                <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center px-3 py-2.5 bg-gray-50 text-gray-800 font-medium text-sm hover:bg-gray-100 transition-colors"
                    onClick={() =>
                      setExpandedCategories((prev) => ({
                        ...prev,
                        [category]: !prev[category],
                      }))
                    }
                  >
                    <span className="text-left">{category}</span>
                    <span className="flex items-center gap-2 text-xs text-gray-500">
                      {catItems.length}
                      {expandedCategories[category] ? (
                        <FiChevronDown className="w-4 h-4" />
                      ) : (
                        <FiChevronRight className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {expandedCategories[category] && (
                    <div className="p-2 space-y-2 bg-white">
                      {catItems.map((item) => (
                        <div
                          key={item.ItemID}
                          className="border border-gray-100 rounded-md p-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-sm font-medium text-gray-800">
                            {item.ItemName}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            Model: {item.Model || "N/A"}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-green-50 text-green-700">
                              Qty: {item.TotalQty}
                            </span>
                            {item.TotalQty > 0 ? (
                              <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No items found</p>
            </div>
          )}
        </div>

        {/* Right side - Requests */}
        <div className="lg:col-span-3 bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-5">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold">Request Management</h1>
                <p className="text-green-100 text-sm mt-1">
                  Review and manage staff inventory requests
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {messages.slice(0, 3).map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`px-2 py-1 rounded text-xs ${
                      msg.type === 'error' ? 'bg-red-500/20 text-red-100' : 
                      msg.type === 'success' ? 'bg-green-500/20 text-green-100' : 
                      'bg-blue-500/20 text-blue-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by item or staff name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div className="flex sm:w-auto">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  <FiFilter className="h-4 w-4" />
                </span>
                <select 
                  className="form-select block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-r-md"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  <option value="ALL">All Requests</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-6">
                {["ALL", "PENDING", "APPROVED", "REJECTED"].map((tab) => (
                  <button
                    key={tab}
                    className={`whitespace-nowrap pb-3 px-1 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab} 
                    <span className="ml-1.5 py-0.5 px-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {categorizedRequests[tab].length}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Request Cards */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : filteredRequests.length > 0 ? (
              <div className="grid gap-4">
                {filteredRequests.map((req) => (
                  <div
                    key={req.request_id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {req.item_name}
                          </h3>
                          <StatusBadge status={req.status} />
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mt-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <FiPackage className="mr-1.5 text-green-600" /> 
                            <span className="font-medium">{req.quantity}</span> {req.measurement}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FiUser className="mr-1.5 text-green-600" /> 
                            {req.fname} {req.lname}
                          </div>
                        </div>
                        
                        {req.created_at && (
                          <div className="text-xs text-gray-500 mt-2">
                            Submitted: {formatDate(req.created_at)}
                          </div>
                        )}

                        {req.manager_comment && (
                          <div className="mt-3 p-2.5 bg-blue-50 rounded-md border border-blue-100 text-sm text-blue-700 flex items-start gap-1.5">
                            <FiMessageSquare className="mt-0.5 flex-shrink-0" /> 
                            <span>{req.manager_comment}</span>
                          </div>
                        )}

                        {req.status === "PENDING" && (
                          <div className="mt-3">
                            <label htmlFor={`comment-${req.request_id}`} className="block text-sm font-medium text-gray-700 mb-1">
                              Add Comment (Optional)
                            </label>
                            <textarea
                              id={`comment-${req.request_id}`}
                              value={comments[req.request_id] || ""}
                              onChange={(e) =>
                                setComments((prev) => ({
                                  ...prev,
                                  [req.request_id]: e.target.value,
                                }))
                              }
                              placeholder="Enter your comments here..."
                              rows="2"
                              className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                        )}
                      </div>

                      {req.status === "PENDING" && (
                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <button
                            onClick={() => handleUpdate(req.request_id, "APPROVED")}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-sm font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdate(req.request_id, "REJECTED")}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No requests found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search term' : `There are no ${activeTab.toLowerCase()} requests at the moment`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerReview;