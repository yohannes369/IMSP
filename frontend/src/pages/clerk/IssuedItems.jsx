
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// // Connect to backend Socket.IO
// const socket = io("http://localhost:5000");

// const IssuedItems = () => {
//   const [records, setRecords] = useState([]);
//   const [formData, setFormData] = useState({
//     RequestID: "",
//     StaffID: "",
//     ItemID: "",
//     UnitID: "",
//     Quantity: "",
//     UnitPriceBirr: "",
//     UnitPriceCent: "",
//     BalanceQty: "",
//     Remark: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Fetch all issued/returned items from API
//   const fetchRecords = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/clerk/records");
//       setRecords(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("❌ Failed to fetch records.");
//     }
//   };

//   // Fetch all records on mount & setup real-time updates
//   useEffect(() => {
//     fetchRecords();

//     // --- Socket.IO: Listen for real-time updates ---
//     socket.on("model22:newIssue", (data) => {
//       console.log("📢 Real-time notification:", data);
//       fetchRecords(); // refresh table automatically
//       setSuccess(`✅ ${data.message} | RequestID: ${data.RequestID}`);
//       setTimeout(() => setSuccess(""), 4000);
//     });

//     socket.on("model22:itemUpdated", (updatedItem) => {
//       fetchRecords(); // refresh table if items or units changed
//     });

//     socket.on("model22:unitUpdated", (updatedUnit) => {
//       fetchRecords(); // refresh table if unit status changed
//     });

//     return () => {
//       socket.off("model22:newIssue");
//       socket.off("model22:itemUpdated");
//       socket.off("model22:unitUpdated");
//     };
//   }, []);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle issue submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const res = await axios.post("http://localhost:5000/api/clerk/issue", formData);
//       setFormData({
//         RequestID: "",
//         StaffID: "",
//         ItemID: "",
//         UnitID: "",
//         Quantity: "",
//         UnitPriceBirr: "",
//         UnitPriceCent: "",
//         BalanceQty: "",
//         Remark: ""
//       });

//       setSuccess("✅ Item issued successfully!");
//       fetchRecords(); // refresh table after issuing
//     } catch (err) {
//       console.error(err);
//       setError("❌ Failed to issue item.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Labels for form fields
//   const fieldLabels = {
//     RequestID: "Request ID",
//     StaffID: "Staff ID",
//     ItemID: "Item ID",
//     UnitID: "Unit ID",
//     Quantity: "Quantity",
//     UnitPriceBirr: "Unit Price (Birr)",
//     UnitPriceCent: "Unit Price (Cent)",
//     BalanceQty: "Balance Quantity",
//     Remark: "Remark"
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">📦 Issue Item to Staff</h2>

//       {error && <div className="text-red-600 mb-4">{error}</div>}
//       {success && <div className="text-green-600 mb-4">{success}</div>}

//       {/* Issue Form */}
//       <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md p-4 rounded">
//         <div className="grid grid-cols-2 gap-4">
//           {Object.keys(formData).map((key) => (
//             <div key={key} className="flex flex-col">
//               <label className="font-medium mb-1">{fieldLabels[key]}</label>
//               <input
//                 type={key.toLowerCase().includes("price") || key.toLowerCase().includes("quantity") ? "number" : "text"}
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1"
//                 required={key !== "Remark"}
//               />
//             </div>
//           ))}
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "⏳ Issuing..." : "✅ Issue Item"}
//         </button>
//       </form>

//       {/* Issued Items Table */}
//       <h3 className="text-xl font-semibold mb-2">📋 Issued / Returned Items</h3>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 "FormID",
//                 "RequestID",
//                 "StaffID",
//                 "ItemID",
//                 "UnitID",
//                 "ActionType",
//                 "Quantity",
//                 "UnitPriceBirr",
//                 "UnitPriceCent",
//                 "BalanceQty",
//                 "Remark",
//                 "ActionDate"
//               ].map((col) => (
//                 <th key={col} className="border px-2 py-1 text-left text-sm font-medium">{col}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {records.length > 0 ? (
//               records.map((record) => (
//                 <tr key={record.FormID} className="hover:bg-gray-50">
//                   {Object.values(record).map((val, i) => (
//                     <td key={i} className="border px-2 py-1 text-sm">{val}</td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="12" className="text-center text-gray-500 py-3 italic">
//                   No issued/returned items yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default IssuedItems;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const IssuedItems = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    RequestID: "",
    StaffID: "",
    ItemID: "",
    UnitID: "",
    Quantity: "",
    UnitPriceBirr: "",
    UnitPriceCent: "",
    BalanceQty: "",
    Remark: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const socketRef = useRef(null);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clerk/records");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch records.");
    }
  };

  useEffect(() => {
    fetchRecords();

    // Initialize Socket.IO once
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("model22:newIssue", (data) => {
      console.log("📢 Real-time notification:", data);
      fetchRecords();
      setSuccess(`✅ ${data.message} | RequestID: ${data.RequestID}`);
      setTimeout(() => setSuccess(""), 4000);
    });

    socketRef.current.on("model22:itemUpdated", () => fetchRecords());
    socketRef.current.on("model22:unitUpdated", () => fetchRecords());

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Basic validation
      if (!formData.RequestID || !formData.ItemID) {
        setError("❌ RequestID and ItemID are required.");
        setLoading(false);
        return;
      }

      // Quantity required if not serial (UnitID empty)
      if (!formData.UnitID && (!formData.Quantity || Number(formData.Quantity) <= 0)) {
        setError("❌ Quantity must be greater than 0 for non-serial items.");
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:5000/api/clerk/issue", formData);

      setFormData({
        RequestID: "",
        StaffID: "",
        ItemID: "",
        UnitID: "",
        Quantity: "",
        UnitPriceBirr: "",
        UnitPriceCent: "",
        BalanceQty: "",
        Remark: ""
      });

      setSuccess("✅ Item issued successfully!");
      fetchRecords();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to issue item.");
    } finally {
      setLoading(false);
    }
  };

  const fieldLabels = {
    RequestID: "Request ID",
    StaffID: "Staff ID",
    ItemID: "Item ID",
    UnitID: "Unit ID",
    Quantity: "Quantity",
    UnitPriceBirr: "Unit Price (Birr)",
    UnitPriceCent: "Unit Price (Cent)",
    BalanceQty: "Balance Quantity",
    Remark: "Remark"
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Issue Item to Staff</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md p-4 rounded">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="font-medium mb-1">{fieldLabels[key]}</label>
              <input
                type={key.toLowerCase().includes("price") || key.toLowerCase().includes("quantity") ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                required={key !== "Remark"}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "⏳ Issuing..." : "✅ Issue Item"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">📋 Issued / Returned Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {[
                "FormID",
                "RequestID",
                "StaffID",
                "ItemID",
                "UnitID",
                "ActionType",
                "Quantity",
                "UnitPriceBirr",
                "UnitPriceCent",
                "BalanceQty",
                "Remark",
                "ActionDate"
              ].map((col) => (
                <th key={col} className="border px-2 py-1 text-left text-sm font-medium">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.FormID} className="hover:bg-gray-50">
                  {[
                    record.FormID,
                    record.RequestID,
                    record.StaffID,
                    record.ItemID,
                    record.UnitID,
                    record.ActionType,
                    record.Quantity,
                    record.UnitPriceBirr,
                    record.UnitPriceCent,
                    record.BalanceQty,
                    record.Remark,
                    record.ActionDate
                  ].map((val, i) => (
                    <td key={i} className="border px-2 py-1 text-sm">{val}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center text-gray-500 py-3 italic">
                  No issued/returned items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuedItems;
