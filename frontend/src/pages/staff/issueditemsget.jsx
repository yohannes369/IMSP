// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   RefreshCw, User, Package, DollarSign, Calendar,
//   ArrowUpCircle, ArrowDownCircle, ClipboardList,
//   Hash, FileText, CheckCircle, Clock, Search
// } from "lucide-react";

// export default function IssuedItemGet() {
//   const [staffId, setStaffId] = useState("");
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [returningItems, setReturningItems] = useState(new Set());

//   const fetchRecords = async () => {
//     if (!staffId.trim()) {
//       setRecords([]);
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/model22/form");
//       const allRecords = res.data.records || [];
//       const filtered = allRecords.filter(r => r.StaffID === staffId);
//       setRecords(filtered);
//       setError("");
//     } catch (err) {
//       console.error("Error fetching records:", err);
//       setError("Failed to fetch records");
//     }
//     setLoading(false);
//   };

//   const handleReturn = async (formID) => {
//     setReturningItems(prev => new Set([...prev, formID]));
//     try {
//       await axios.post(`http://localhost:5000/api/model22/return/${formID}`);
//       fetchRecords();
//     } catch (err) {
//       console.error("Error returning item:", err);
//       alert("Failed to return item");
//     }
//     setReturningItems(prev => {
//       const newSet = new Set(prev);
//       newSet.delete(formID);
//       return newSet;
//     });
//   };

//   const formatPrice = (birr, cent) =>
//     `${birr}.${String(cent).padStart(2, "0")} ETB`;
//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleString("en-US");

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-5xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
//           <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800">
//             <ClipboardList className="h-6 w-6 text-blue-600" />
//             Issued & Returned Items
//           </h1>
//           <button
//             onClick={fetchRecords}
//             className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <RefreshCw className="h-4 w-4" />
//             Refresh
//           </button>
//         </div>

//         {/* Staff ID Input */}
//         <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
//           <Search className="h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Enter Staff ID..."
//             value={staffId}
//             onChange={(e) => setStaffId(e.target.value)}
//             className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={fetchRecords}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//           >
//             Load Records
//           </button>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
//         )}

//         {/* Loading */}
//         {loading && (
//           <div className="text-center py-6 text-gray-500">Loading...</div>
//         )}

//         {/* Records */}
//         {!loading && records.length > 0 && (
//           <div className="space-y-4">
//             {records.map((item) => (
//               <div
//                 key={item.FormID}
//                 className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
//               >
//                 <div>
//                   <h3 className="font-medium text-gray-800">{item.ItemName}</h3>
//                   <p className="text-sm text-gray-600 flex items-center gap-2">
//                     <Hash className="h-4 w-4" /> Qty: {item.Quantity}
//                     {item.SerialNo && (
//                       <>
//                         <FileText className="h-4 w-4" /> S/N: {item.SerialNo}
//                       </>
//                     )}
//                     <DollarSign className="h-4 w-4" />
//                     {formatPrice(item.UnitPriceBirr, item.UnitPriceCent)}
//                   </p>
//                   <p className="text-xs text-gray-500 flex items-center gap-1">
//                     <Calendar className="h-3 w-3" />
//                     {formatDate(item.ActionDate)}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   {item.ActionType === "ISSUE" ? (
//                     <button
//                       onClick={() => handleReturn(item.FormID)}
//                       disabled={returningItems.has(item.FormID)}
//                       className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
//                     >
//                       {returningItems.has(item.FormID) ? (
//                         <span className="flex items-center gap-2">
//                           <Clock className="h-4 w-4 animate-spin" /> Returning...
//                         </span>
//                       ) : (
//                         <span className="flex items-center gap-2">
//                           <ArrowDownCircle className="h-4 w-4" /> Return
//                         </span>
//                       )}
//                     </button>
//                   ) : (
//                     <div className="flex items-center gap-2 text-green-600">
//                       <CheckCircle className="h-5 w-5" />
//                       Returned
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!loading && !error && records.length === 0 && staffId && (
//           <div className="text-center text-gray-500">
//             No records found for Staff ID: {staffId}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import {
  RefreshCw,
  ClipboardList,
  Hash,
  DollarSign,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle,
  CheckCircle,
  Clock,
  Search,
  Filter
} from "lucide-react";

export default function IssuedItemGet() {
  const [staffId, setStaffId] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | issued | returned

  const fetchRecords = async () => {
    if (!staffId.trim()) {
      setRecords([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/model22/form");
      const allRecords = res.data.records || [];
      let filtered = allRecords.filter(r => r.StaffID === staffId);

      if (filter === "issued") {
        filtered = filtered.filter(r => r.ActionType === "ISSUE");
      } else if (filter === "returned") {
        filtered = filtered.filter(r => r.ActionType === "RETURN");
      }

      setRecords(filtered);
      setError("");
    } catch (err) {
      console.error("Error fetching records:", err);
      setError("Failed to fetch records");
    }
    setLoading(false);
  };

  const formatPrice = (birr, cent) =>
    `${birr}.${String(cent).padStart(2, "0")} ETB`;
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <ClipboardList className="h-6 w-6 text-blue-600" />
            Issued & Returned Items
          </h1>
          <button
            onClick={fetchRecords}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Staff ID Input & Filter */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-3 items-center">
          <div className="flex flex-1 items-center gap-3 w-full">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Staff ID..."
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchRecords}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Load Records
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="issued">Issued Only</option>
              <option value="returned">Returned Only</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        )}

        {/* Records Table */}
        {!loading && records.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border">First Name</th>
                  <th className="p-3 border">Last Name</th>
                  <th className="p-3 border">Item Name</th>
                  <th className="p-3 border">Quantity</th>
                  <th className="p-3 border">Serial No</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item) => (
                  <tr key={item.FormID} className="hover:bg-gray-50">
                    <td className="p-3 border">{item.FName}</td>
                    <td className="p-3 border">{item.LName}</td>
                    <td className="p-3 border">{item.ItemName}</td>
                    <td className="p-3 border flex items-center gap-1">
                      <Hash className="h-4 w-4 text-gray-400" /> {item.Quantity}
                    </td>
                    <td className="p-3 border">{item.SerialNo || "-"}</td>
                    <td className="p-3 border">
                      <DollarSign className="h-4 w-4 inline text-gray-400" />
                      {formatPrice(item.UnitPriceBirr, item.UnitPriceCent)}
                    </td>
                    <td className="p-3 border">
                      <Calendar className="h-4 w-4 inline text-gray-400 mr-1" />
                      {formatDate(item.ActionDate)}
                    </td>
                    <td className="p-3 border">
                      {item.ActionType === "ISSUE" ? (
                        <span className="flex items-center gap-1 text-blue-600">
                          <ArrowUpCircle className="h-4 w-4" /> Issued
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600">
                          <ArrowDownCircle className="h-4 w-4" /> Returned
                        </span>
                      )}
                    </td>
                    <td className="p-3 border">
                      {item.ActionType === "ISSUE" ? (
                        <button
                          disabled={true} // always disabled
                          className="px-3 py-1 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                        >
                          <span className="flex items-center gap-1">
                            <ArrowDownCircle className="h-4 w-4" /> Return Disabled
                          </span>
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-5 w-5" /> Done
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && records.length === 0 && staffId && (
          <div className="text-center text-gray-500">
            No records found for Staff ID: {staffId}
          </div>
        )}
      </div>
    </div>
  );
}
