


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   RefreshCw, 
//   User, 
//   Package, 
//   DollarSign, 
//   Calendar, 
//   ArrowUpCircle, 
//   ArrowDownCircle,
//   ClipboardList,
//   Hash,
//   FileText,
//   CheckCircle,
//   Clock,
//   Search,
//   Filter
// } from "lucide-react";

// export default function Model22FormList() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [returningItems, setReturningItems] = useState(new Set());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date");
//   const [sortOrder, setSortOrder] = useState("desc");

//   useEffect(() => {
//     fetchRecords(true);
//     const interval = setInterval(() => fetchRecords(false), 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchRecords = async (initial = false) => {
//     if (initial) setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/model22/form");
//       const rawRecords = res.data.records || [];

//       const grouped = {};
//       rawRecords.forEach((record) => {
//         const key = `${record.RequestID}-${record.StaffID}`;
//         if (!grouped[key]) {
//           grouped[key] = {
//             staff: record,
//             items: [],
//             issueCount: 0,
//           };
//         }
//         grouped[key].items.push(record);
//         if (record.ActionType === "ISSUE") {
//           grouped[key].issueCount++;
//         }
//       });

//       setRecords(Object.values(grouped));
//       setError("");
//     } catch (err) {
//       console.error("Error fetching Model22Form records:", err);
//       setError("Failed to fetch records. Please check your connection.");
//     }
//     if (initial) setLoading(false);
//   };

//   const handleReturn = async (formID) => {
//     setReturningItems((prev) => new Set([...prev, formID]));
//     try {
//       await axios.post(`http://localhost:5000/api/model22/return/${formID}`);
//       fetchRecords(false);
//     } catch (err) {
//       console.error("Error returning item:", err);
//       alert("Failed to return item");
//     }
//     setReturningItems((prev) => {
//       const newSet = new Set(prev);
//       newSet.delete(formID);
//       return newSet;
//     });
//   };

//   const formatPrice = (birr, cent) =>
//     `${birr}.${String(cent).padStart(2, "0")} ETB`;

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const formatDateShort = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });

//   // Filter and sort records
//   const filteredRecords = records
//     .map(group => {
//       const filteredItems = group.items.filter(item => {
//         const matchesSearch = 
//           item.ItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           `${item.FName} ${item.LName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.SerialNo?.toLowerCase().includes(searchTerm.toLowerCase());
        
//         const matchesStatus = 
//           statusFilter === "all" || 
//           (statusFilter === "issued" && item.ActionType === "ISSUE") ||
//           (statusFilter === "returned" && item.ActionType === "RETURN");
        
//         return matchesSearch && matchesStatus;
//       });
      
//       return { ...group, items: filteredItems };
//     })
//     .filter(group => group.items.length > 0)
//     .sort((a, b) => {
//       if (sortBy === "date") {
//         const dateA = new Date(a.items[0].ActionDate);
//         const dateB = new Date(b.items[0].ActionDate);
//         return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//       } else if (sortBy === "name") {
//         const nameA = `${a.staff.FName} ${a.staff.LName}`;
//         const nameB = `${b.staff.FName} ${b.staff.LName}`;
//         return sortOrder === "asc" 
//           ? nameA.localeCompare(nameB) 
//           : nameB.localeCompare(nameA);
//       }
//       return 0;
//     });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading inventory records...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
//             <p className="font-bold">Connection Error</p>
//             <p className="mt-2">{error}</p>
//             <button
//               onClick={() => fetchRecords(true)}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
//                 <ClipboardList className="h-8 w-8 text-blue-600" />
//                 Inventory Management System
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Track and manage all issued items with return functionality
//                 <span className="text-xs bg-blue-100 text-blue-700 ml-2 px-2 py-1 rounded-full">
//                   Auto-refresh every 5s
//                 </span>
//               </p>
//             </div>
//             <button
//               onClick={() => fetchRecords(true)}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <RefreshCw className="h-4 w-4" />
//               Refresh Data
//             </button>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Transactions</p>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {records.reduce((sum, g) => sum + g.items.length, 0)}
//                 </p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <ClipboardList className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Active Issues</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {records.reduce((sum, g) => sum + g.issueCount, 0)}
//                 </p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <ArrowUpCircle className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Returns Processed</p>
//                 <p className="text-2xl font-bold text-purple-600">
//                   {records.reduce((sum, g) => sum + (g.items.length - g.issueCount), 0)}
//                 </p>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-full">
//                 <ArrowDownCircle className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Staff Members</p>
//                 <p className="text-2xl font-bold text-orange-600">
//                   {records.length}
//                 </p>
//               </div>
//               <div className="bg-orange-100 p-3 rounded-full">
//                 <User className="h-6 w-6 text-orange-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by item, staff, or serial number..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//               <div className="relative">
//                 <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="issued">Issued Only</option>
//                   <option value="returned">Returned Only</option>
//                 </select>
//               </div>
              
//               <div className="relative">
//                 <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="date">Sort by Date</option>
//                   <option value="name">Sort by Name</option>
//                 </select>
//               </div>
              
//               <button
//                 onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//                 className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
//               >
//                 {sortOrder === "asc" ? "A→Z" : "Z→A"}
//                 <RefreshCw className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Records List */}
//         {filteredRecords.length === 0 ? (
//           <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
//             <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-700">No records found</h3>
//             <p className="text-gray-500 mt-2">
//               {searchTerm || statusFilter !== "all" 
//                 ? "Try adjusting your search or filter criteria" 
//                 : "No inventory transactions have been recorded yet"}
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {filteredRecords.map((group) => {
//               const { staff, items } = group;
//               return (
//                 <div key={`${staff.RequestID}-${staff.StaffID}`} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                   {/* Staff Header */}
//                   <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                       <div className="flex items-center gap-3">
//                         <div className="bg-blue-100 p-2 rounded-full">
//                           <User className="h-5 w-5 text-blue-600" />
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">
//                             {staff.FName} {staff.LName}
//                           </h3>
//                           <p className="text-sm text-gray-500">Request #{staff.RequestID}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-4 text-sm">
//                         <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
//                           {items.length} item{items.length !== 1 ? 's' : ''}
//                         </span>
//                         <span className="text-gray-500">
//                           {formatDateShort(items[0].ActionDate)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Items List */}
//                   <div className="divide-y divide-gray-100">
//                     {items.map((item) => (
//                       <div key={item.FormID} className="p-6">
//                         <div className="flex flex-col lg:flex-row gap-6">
//                           {/* Item Details */}
//                           <div className="flex-1">
//                             <div className="flex items-start gap-4">
//                               <div className="bg-green-100 p-3 rounded-lg">
//                                 <Package className="h-5 w-5 text-green-600" />
//                               </div>
//                               <div className="flex-1">
//                                 <h4 className="font-medium text-gray-800 text-lg">{item.ItemName}</h4>
//                                 <div className="flex flex-wrap gap-3 mt-2">
//                                   <span className="flex items-center gap-1 text-sm text-gray-600">
//                                     <Hash className="h-4 w-4" />
//                                     Qty: {item.Quantity}
//                                   </span>
//                                   {item.SerialNo && (
//                                     <span className="flex items-center gap-1 text-sm text-gray-600">
//                                       <FileText className="h-4 w-4" />
//                                       S/N: {item.SerialNo}
//                                     </span>
//                                   )}
//                                   <span className="flex items-center gap-1 text-sm text-gray-600">
//                                     <DollarSign className="h-4 w-4" />
//                                     {formatPrice(item.UnitPriceBirr, item.UnitPriceCent)}
//                                   </span>
//                                 </div>
//                                 {item.Remark && (
//                                   <div className="mt-2 text-sm bg-blue-50 p-2 rounded-lg">
//                                     <p className="text-blue-700 italic">"{item.Remark}"</p>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
                          
//                           {/* Status and Actions */}
//                           <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-between lg:items-end">
//                             <div className="flex items-center gap-3">
//                               <div className={`p-2 rounded-full ${item.ActionType === "ISSUE" ? "bg-blue-100" : "bg-gray-100"}`}>
//                                 {item.ActionType === "ISSUE" ? (
//                                   <ArrowUpCircle className="h-5 w-5 text-blue-600" />
//                                 ) : (
//                                   <ArrowDownCircle className="h-5 w-5 text-gray-600" />
//                                 )}
//                               </div>
//                               <div>
//                                 <span className={`text-sm font-medium ${item.ActionType === "ISSUE" ? "text-blue-700" : "text-gray-700"}`}>
//                                   {item.ActionType}
//                                 </span>
//                                 <p className="text-xs text-gray-500 flex items-center gap-1">
//                                   <Calendar className="h-3 w-3" />
//                                   {formatDate(item.ActionDate)}
//                                 </p>
//                               </div>
//                             </div>
                            
//                             {item.ActionType === "ISSUE" ? (
//                               <button
//                                 onClick={() => handleReturn(item.FormID)}
//                                 disabled={returningItems.has(item.FormID)}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
//                               >
//                                 {returningItems.has(item.FormID) ? (
//                                   <>
//                                     <Clock className="h-4 w-4 animate-pulse" />
//                                     Processing...
//                                   </>
//                                 ) : (
//                                   <>
//                                     <ArrowDownCircle className="h-4 w-4" />
//                                     Return Item
//                                   </>
//                                 )}
//                               </button>
//                             ) : (
//                               <div className="flex items-center gap-2 text-green-600">
//                                 <CheckCircle className="h-5 w-5" />
//                                 <span className="text-sm font-medium">Return Completed</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   RefreshCw, 
//   User, 
//   Package, 
//   DollarSign, 
//   Calendar, 
//   ArrowUpCircle, 
//   ArrowDownCircle,
//   ClipboardList,
//   Hash,
//   FileText,
//   CheckCircle,
//   Clock,
//   Search,
//   Filter
// } from "lucide-react";

// export default function Model22FormList() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [returningItems, setReturningItems] = useState(new Set());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date");
//   const [sortOrder, setSortOrder] = useState("desc");

//   useEffect(() => {
//     fetchRecords(true);
//     const interval = setInterval(() => fetchRecords(false), 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchRecords = async (initial = false) => {
//     if (initial) setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/model22/form");
//       const rawRecords = res.data.records || [];

//       const grouped = {};
//       rawRecords.forEach((record) => {
//         const key = `${record.RequestID}-${record.StaffID}`;
//         if (!grouped[key]) {
//           grouped[key] = {
//             staff: record,
//             items: [],
//             issueCount: 0,
//           };
//         }
//         grouped[key].items.push(record);
//         if (record.ActionType === "ISSUE") {
//           grouped[key].issueCount++;
//         }
//       });

//       setRecords(Object.values(grouped));
//       setError("");
//     } catch (err) {
//       console.error("Error fetching Model22Form records:", err);
//       setError("Failed to fetch records. Please check your connection.");
//     }
//     if (initial) setLoading(false);
//   };

//   const handleReturn = async (formID) => {
//     setReturningItems((prev) => new Set([...prev, formID]));
//     try {
//       await axios.post(`http://localhost:5000/api/model22/return/${formID}`);
//       fetchRecords(false);
//     } catch (err) {
//       console.error("Error returning item:", err);
//       alert("Failed to return item");
//     }
//     setReturningItems((prev) => {
//       const newSet = new Set(prev);
//       newSet.delete(formID);
//       return newSet;
//     });
//   };

//   const formatPrice = (birr, cent) =>
//     `${birr}.${String(cent).padStart(2, "0")} ETB`;

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const formatDateShort = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });

//   // Filter + sort
//   const filteredRecords = records
//     .map(group => {
//       const filteredItems = group.items.filter(item => {
//         const matchesSearch = 
//           item.ItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           `${item.FName} ${item.LName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.SerialNo?.toLowerCase().includes(searchTerm.toLowerCase());
        
//         const matchesStatus = 
//           statusFilter === "all" || 
//           (statusFilter === "issued" && item.ActionType === "ISSUE") ||
//           (statusFilter === "returned" && item.ActionType === "RETURN");
        
//         return matchesSearch && matchesStatus;
//       });
      
//       return { ...group, items: filteredItems };
//     })
//     .filter(group => group.items.length > 0)
//     .sort((a, b) => {
//       if (sortBy === "date") {
//         const dateA = new Date(a.items[0].ActionDate);
//         const dateB = new Date(b.items[0].ActionDate);
//         return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//       } else if (sortBy === "name") {
//         const nameA = `${a.staff.FName} ${a.staff.LName}`;
//         const nameB = `${b.staff.FName} ${b.staff.LName}`;
//         return sortOrder === "asc" 
//           ? nameA.localeCompare(nameB) 
//           : nameB.localeCompare(nameA);
//       }
//       return 0;
//     });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
//         <p className="ml-2 text-gray-600">Loading records...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
//           <p className="font-bold text-red-700">Error</p>
//           <p className="text-red-600">{error}</p>
//           <button
//             onClick={() => fetchRecords(true)}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold flex items-center gap-2">
//             <ClipboardList className="h-6 w-6 text-blue-600" />
//             Inventory Transactions
//           </h1>
//           <button
//             onClick={() => fetchRecords(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             <RefreshCw className="h-4 w-4" />
//             Refresh
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by item, staff, or serial number..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border rounded-lg w-full"
//             />
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-3 py-2 border rounded-lg"
//           >
//             <option value="all">All Status</option>
//             <option value="issued">Issued Only</option>
//             <option value="returned">Returned Only</option>
//           </select>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-3 py-2 border rounded-lg"
//           >
//             <option value="date">Sort by Date</option>
//             <option value="name">Sort by Name</option>
//           </select>
//         </div>

//         {/* Table */}
//         {filteredRecords.length === 0 ? (
//           <div className="bg-white p-6 rounded-lg text-center text-gray-500">
//             No records found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
//             <table className="w-full text-sm text-left border-collapse">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   <th className="px-4 py-3">Request #</th>
//                   <th className="px-4 py-3">Requested By</th>
//                   <th className="px-4 py-3">Item Name</th>
//                   <th className="px-4 py-3">Serial / Model</th>
//                   <th className="px-4 py-3">Quantity</th>
//                   <th className="px-4 py-3">Price</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Date</th>
//                   <th className="px-4 py-3 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {filteredRecords.map(group => 
//                   group.items.map(item => (
//                     <tr key={item.FormID} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 font-medium text-gray-800">
//                         #{item.RequestID}
//                       </td>
//                       <td className="px-4 py-3">
//                         {item.FName} {item.LName}
//                       </td>
//                       <td className="px-4 py-3">{item.ItemName}</td>
//                       <td className="px-4 py-3">{item.SerialNo || "-"}</td>
//                       <td className="px-4 py-3">{item.Quantity}</td>
//                       <td className="px-4 py-3">
//                         {formatPrice(item.UnitPriceBirr, item.UnitPriceCent)}
//                       </td>
//                       <td className="px-4 py-3">
//                         {item.ActionType === "ISSUE" ? (
//                           <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
//                             ISSUED
//                           </span>
//                         ) : (
//                           <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
//                             RETURNED
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-4 py-3">{formatDate(item.ActionDate)}</td>
//                       <td className="px-4 py-3 text-center">
//                         {item.ActionType === "ISSUE" ? (
//                           <button
//                             onClick={() => handleReturn(item.FormID)}
//                             disabled={returningItems.has(item.FormID)}
//                             className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:bg-blue-400"
//                           >
//                             {returningItems.has(item.FormID) ? "Processing..." : "Return"}
//                           </button>
//                         ) : (
//                           <span className="flex items-center justify-center gap-1 text-green-600 text-xs">
//                             <CheckCircle className="h-4 w-4" />
//                             Completed
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// cort 


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   RefreshCw, 
//   ClipboardList, 
//   CheckCircle, 
//   Search
// } from "lucide-react";

// export default function Model22FormList() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [returningItems, setReturningItems] = useState(new Set());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date");
//   const [sortOrder, setSortOrder] = useState("desc");

//   useEffect(() => {
//     fetchRecords(true);
//     const interval = setInterval(() => fetchRecords(false), 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchRecords = async (initial = false) => {
//     if (initial) setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/model22/form");
//       const rawRecords = res.data.records || [];

//       // Group records by RequestID + StaffID + ItemName
//       const grouped = {};
//       rawRecords.forEach((record) => {
//         const key = `${record.RequestID}-${record.StaffID}-${record.ItemName}`;
//         if (!grouped[key]) {
//           grouped[key] = {
//             staff: record,
//             items: [],
//             issueCount: 0,
//           };
//         }
//         grouped[key].items.push(record);
//         if (record.ActionType === "ISSUE") {
//           grouped[key].issueCount++;
//         }
//       });

//       setRecords(Object.values(grouped));
//       setError("");
//     } catch (err) {
//       console.error("Error fetching Model22Form records:", err);
//       setError("Failed to fetch records. Please check your connection.");
//     }
//     if (initial) setLoading(false);
//   };

//   const handleReturn = async (formID) => {
//     setReturningItems((prev) => new Set([...prev, formID]));
//     try {
//       await axios.post(`http://localhost:5000/api/model22/return/${formID}`);
//       fetchRecords(false);
//     } catch (err) {
//       console.error("Error returning item:", err);
//       alert("Failed to return item");
//     }
//     setReturningItems((prev) => {
//       const newSet = new Set(prev);
//       newSet.delete(formID);
//       return newSet;
//     });
//   };

//   const formatPrice = (birr, cent) =>
//     `${birr}.${String(cent).padStart(2, "0")} ETB`;

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   // Filter + sort
//   const filteredRecords = records
//     .map(group => {
//       const filteredItems = group.items.filter(item => {
//         const matchesSearch = 
//           item.ItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           `${item.FName} ${item.LName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.SerialNo?.toLowerCase().includes(searchTerm.toLowerCase());
        
//         const matchesStatus = 
//           statusFilter === "all" || 
//           (statusFilter === "issued" && item.ActionType === "ISSUE") ||
//           (statusFilter === "returned" && item.ActionType === "RETURN");
        
//         return matchesSearch && matchesStatus;
//       });
      
//       return { ...group, items: filteredItems };
//     })
//     .filter(group => group.items.length > 0)
//     .sort((a, b) => {
//       if (sortBy === "date") {
//         const dateA = new Date(a.items[0].ActionDate);
//         const dateB = new Date(b.items[0].ActionDate);
//         return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//       } else if (sortBy === "name") {
//         const nameA = `${a.staff.FName} ${a.staff.LName}`;
//         const nameB = `${b.staff.FName} ${b.staff.LName}`;
//         return sortOrder === "asc" 
//           ? nameA.localeCompare(nameB) 
//           : nameB.localeCompare(nameA);
//       }
//       return 0;
//     });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
//         <p className="ml-2 text-gray-600">Loading records...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
//           <p className="font-bold text-red-700">Error</p>
//           <p className="text-red-600">{error}</p>
//           <button
//             onClick={() => fetchRecords(true)}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold flex items-center gap-2">
//             <ClipboardList className="h-6 w-6 text-blue-600" />
//             Inventory Transactions
//           </h1>
//           <button
//             onClick={() => fetchRecords(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             <RefreshCw className="h-4 w-4" />
//             Refresh
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by item, staff, or serial number..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border rounded-lg w-full"
//             />
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-3 py-2 border rounded-lg"
//           >
//             <option value="all">All Status</option>
//             <option value="issued">Issued Only</option>
//             <option value="returned">Returned Only</option>
//           </select>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-3 py-2 border rounded-lg"
//           >
//             <option value="date">Sort by Date</option>
//             <option value="name">Sort by Name</option>
//           </select>
//         </div>

//         {/* Table */}
//         {filteredRecords.length === 0 ? (
//           <div className="bg-white p-6 rounded-lg text-center text-gray-500">
//             No records found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
//             <table className="w-full text-sm text-left border-collapse">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   <th className="px-4 py-3">Request #</th>
//                   <th className="px-4 py-3">Requested By</th>
//                   <th className="px-4 py-3">Item Name</th>
//                   <th className="px-4 py-3">Serial / Model</th>
//                   <th className="px-4 py-3">Quantity</th>
//                   <th className="px-4 py-3">Price</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Date</th>
//                   <th className="px-4 py-3 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {filteredRecords.map(group => {
//                   const rowSpan = group.items.length;
//                   return group.items.map((item, index) => (
//                     <tr key={item.FormID} className="hover:bg-gray-50">
//                       {index === 0 && (
//                         <>
//                           <td rowSpan={rowSpan} className="px-4 py-3 font-medium text-gray-800">
//                             #{item.RequestID}
//                           </td>
//                           <td rowSpan={rowSpan} className="px-4 py-3">
//                             {item.FName} {item.LName}
//                           </td>
//                           <td rowSpan={rowSpan} className="px-4 py-3">{item.ItemName}</td>
//                         </>
//                       )}
//                       <td className="px-4 py-3">{item.SerialNo || "-"}</td>
//                       <td className="px-4 py-3">{item.Quantity}</td>
//                       <td className="px-4 py-3">
//                         {formatPrice(item.UnitPriceBirr, item.UnitPriceCent)}
//                       </td>
//                       <td className="px-4 py-3">
//                         {item.ActionType === "ISSUE" ? (
//                           <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
//                             ISSUED
//                           </span>
//                         ) : (
//                           <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
//                             RETURNED
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-4 py-3">{formatDate(item.ActionDate)}</td>
//                       <td className="px-4 py-3 text-center">
//                         {item.ActionType === "ISSUE" ? (
//                           <button
//                             onClick={() => handleReturn(item.FormID)}
//                             disabled={returningItems.has(item.FormID)}
//                             className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:bg-blue-400"
//                           >
//                             {returningItems.has(item.FormID) ? "Processing..." : "Return"}
//                           </button>
//                         ) : (
//                           <span className="flex items-center justify-center gap-1 text-green-600 text-xs">
//                             <CheckCircle className="h-4 w-4" />
//                             Completed
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  RefreshCw, 
  ClipboardList, 
  CheckCircle, 
  Search
} from "lucide-react";

export default function Model22FormList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningItems, setReturningItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchRecords(true);
    const interval = setInterval(() => fetchRecords(false), 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecords = async (initial = false) => {
    if (initial) setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/model22/form");
      const rawRecords = res.data.records || [];

      // Group records by StaffID + ItemName
      const grouped = {};
      rawRecords.forEach((record) => {
        const key = `${record.StaffID}-${record.ItemName}`;
        if (!grouped[key]) {
          grouped[key] = {
            staff: record,
            items: [],
            issueCount: 0,
          };
        }
        grouped[key].items.push(record);
        if (record.ActionType === "ISSUE") {
          grouped[key].issueCount++;
        }
      });

      setRecords(Object.values(grouped));
      setError("");
    } catch (err) {
      console.error("Error fetching Model22Form records:", err);
      setError("Failed to fetch records. Please check your connection.");
    }
    if (initial) setLoading(false);
  };

  const handleReturn = async (formID) => {
    setReturningItems((prev) => new Set([...prev, formID]));
    try {
      await axios.post(`http://localhost:5000/api/model22/return/${formID}`);
      fetchRecords(false);
    } catch (err) {
      console.error("Error returning item:", err);
      alert("Failed to return item");
    }
    setReturningItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(formID);
      return newSet;
    });
  };

  const formatPrice = (birr, cent) =>
    `${birr}.${String(cent).padStart(2, "0")} ETB`;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Filter + sort
  const filteredRecords = records
    .map(group => {
      const filteredItems = group.items.filter(item => {
        const matchesSearch = 
          item.ItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${item.FName} ${item.LName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.SerialNo?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
          statusFilter === "all" || 
          (statusFilter === "issued" && item.ActionType === "ISSUE") ||
          (statusFilter === "returned" && item.ActionType === "RETURN");
        
        return matchesSearch && matchesStatus;
      });
      
      return { ...group, items: filteredItems };
    })
    .filter(group => group.items.length > 0)
    .sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.items[0].ActionDate);
        const dateB = new Date(b.items[0].ActionDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "name") {
        const nameA = `${a.staff.FName} ${a.staff.LName}`;
        const nameB = `${b.staff.FName} ${b.staff.LName}`;
        return sortOrder === "asc" 
          ? nameA.localeCompare(nameB) 
          : nameB.localeCompare(nameA);
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-2 text-gray-600">Loading records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
          <p className="font-bold text-red-700">Error</p>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => fetchRecords(true)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-600" />
            Inventory Transactions
          </h1>
          <button
            onClick={() => fetchRecords(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by item, staff, or serial number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="issued">Issued Only</option>
            <option value="returned">Returned Only</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Table */}
        {filteredRecords.length === 0 ? (
          <div className="bg-white p-6 rounded-lg text-center text-gray-500">
            No records found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Requested By</th>
                  <th className="px-4 py-3">Item Name</th>
                  <th className="px-4 py-3">Serial / Model</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecords.map(group => {
                  const rowSpan = group.items.length;
                  return group.items.map((item, index) => (
                    <tr key={item.FormID} className="hover:bg-gray-50">
                      {index === 0 && (
                        <>
                          <td rowSpan={rowSpan} className="px-4 py-3">
                            {item.FName} {item.LName}
                          </td>
                          <td rowSpan={rowSpan} className="px-4 py-3">{item.ItemName}</td>
                        </>
                      )}
                      <td className="px-4 py-3">{item.SerialNo || "-"}</td>
                      <td className="px-4 py-3">{item.Quantity}</td>
                      <td className="px-4 py-3">
                        {formatPrice(item.UnitPriceBirr, item.UnitPriceCent)}
                      </td>
                      <td className="px-4 py-3">
                        {item.ActionType === "ISSUE" ? (
                          <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                            ISSUED
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                            RETURNED
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">{formatDate(item.ActionDate)}</td>
                      <td className="px-4 py-3 text-center">
                        {item.ActionType === "ISSUE" ? (
                          <button
                            onClick={() => handleReturn(item.FormID)}
                            disabled={returningItems.has(item.FormID)}
                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:bg-blue-400"
                          >
                            {returningItems.has(item.FormID) ? "Processing..." : "Return"}
                          </button>
                        ) : (
                          <span className="flex items-center justify-center gap-1 text-green-600 text-xs">
                            <CheckCircle className="h-4 w-4" />
                            Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
