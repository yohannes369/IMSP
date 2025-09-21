

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const StaffRequestForm = () => {
//   const [staffId, setStaffId] = useState("");
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const [itemName, setItemName] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [measurement, setMeasurement] = useState("");
//   const [myRequests, setMyRequests] = useState([]);
//   const [message, setMessage] = useState("");

//   const measurementOptions = ["pcs", "box", "set", "unit", "kg"];

//   // Fetch staff requests
//   useEffect(() => {
//     if (!staffId) return;
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/requests/staff/${staffId}`
//         );
//         setMyRequests(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchRequests();
//   }, [staffId]);

//   // Listen to real-time updates
//   useEffect(() => {
//     socket.on("update_request", (data) => {
//       setMyRequests((prev) =>
//         prev.map((r) =>
//           r.request_id === parseInt(data.request_id)
//             ? { ...r, status: data.status, manager_comment: data.manager_comment }
//             : r
//         )
//       );
//     });
//     return () => socket.off("update_request");
//   }, []);

//   // Submit request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!staffId || !fname || !lname || !itemName) {
//       setMessage("❌ Please fill Staff ID, First Name, Last Name, and Item Name");
//       return;
//     }
//     try {
//       const res = await axios.post("http://localhost:5000/api/requests", {
//         staff_id: staffId,
//         fname,
//         lname,
//         item_name: itemName,
//         quantity,
//         measurement,
//       });

//       setMessage("Request submitted ✅");
//       setItemName("");
//       setQuantity(1);
//       setMeasurement("");
//       setFname("");
//       setLname("");

//       setMyRequests((prev) => [
//         {
//           request_id: res.data.requestId,
//           staff_id: staffId,
//           fname,
//           lname,
//           item_name: itemName,
//           quantity,
//           measurement,
//           status: "PENDING",
//           manager_comment: null,
//         },
//         ...prev,
//       ]);
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to submit request");
//     }
//   };

//   return (
//     <div className="flex justify-center mt-6">
//       <div className="bg-white shadow-xl rounded-lg p-6 w-[360px] h-[640px] flex flex-col">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h2 className="text-lg font-bold">Request Form Model 20</h2>
//           <p className="text-sm">Manager: Yohannes</p>
//         </div>

//         {/* Staff ID and Name */}
//         <input
//           type="text"
//           placeholder="Staff ID"
//           value={staffId}
//           onChange={(e) => setStaffId(e.target.value)}
//           className="border p-2 rounded mb-2 w-full"
//         />
//         <input
//           type="text"
//           placeholder="First Name"
//           value={fname}
//           onChange={(e) => setFname(e.target.value)}
//           className="border p-2 rounded mb-2 w-full"
//         />
//         <input
//           type="text"
//           placeholder="Last Name"
//           value={lname}
//           onChange={(e) => setLname(e.target.value)}
//           className="border p-2 rounded mb-3 w-full"
//         />

//         {/* Item Name (manual entry) */}
//         <input
//           type="text"
//           placeholder="Item Name"
//           value={itemName}
//           onChange={(e) => setItemName(e.target.value)}
//           className="border p-2 rounded mb-3 w-full"
//         />

//         {/* Quantity */}
//         <input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           className="border p-2 rounded mb-3 w-full"
//         />

//         {/* Measurement */}
//         <select
//           value={measurement}
//           onChange={(e) => setMeasurement(e.target.value)}
//           className="border p-2 rounded mb-3 w-full"
//         >
//           <option value="">-- Select Measurement --</option>
//           {measurementOptions.map((m, idx) => (
//             <option key={idx} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>

//         {/* Submit button */}
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
//         >
//           Submit
//         </button>

//         {/* Message */}
//         {message && <p className="text-green-600 mb-3">{message}</p>}

//         {/* Requests list */}
//         <div className="flex-1 overflow-y-auto">
//           {myRequests.map((req) => (
//             <div
//               key={req.request_id}
//               className="border p-3 rounded mb-2 bg-gray-50"
//             >
//               <span>
//                 <strong>{req.item_name}</strong> ({req.quantity} {req.measurement})
//               </span>
//               <span className="block">
//                 Staff: {req.fname} {req.lname}
//               </span>
//               <span className="block">Status: {req.status}</span>
//               {req.manager_comment && (
//                 <span className="block text-sm text-gray-600">
//                   Manager: {req.manager_comment}
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffRequestForm;
import React, { useState } from "react";
import axios from "axios";

const StaffRequestForm = () => {
  const [staffId, setStaffId] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [measurement, setMeasurement] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const measurementOptions = ["pcs", "box", "set", "unit", "kg"];

  // Submit request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!staffId || !fname || !lname || !itemName) {
      setMessage("❌ Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/requests", {
        staff_id: staffId,
        fname,
        lname,
        item_name: itemName,
        quantity,
        measurement,
      });

      setMessage("Request submitted successfully ✅");
      setItemName("");
      setQuantity(1);
      setMeasurement("");
      // Keep staff info for convenience
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 py-8 px-4 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md flex flex-col">
        {/* Header */}
        <div className="text-center mb-6 border-b border-green-100 pb-4">
          <h2 className="text-2xl font-bold text-green-800">Request Form Model 20</h2>
          <p className="text-sm text-gray-600 mt-1"></p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Staff ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Staff ID <span className="text-green-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your staff ID"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              required
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-green-600">*</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-green-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name <span className="text-green-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              required
            />
          </div>

          {/* Quantity & Measurement */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Measurement</label>
              <select
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">Select unit</option>
                {measurementOptions.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            message.includes("❌") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}>
            {message}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Company Name • All requests are subject to approval</p>
        </div>
      </div>
    </div>
  );
};

export default StaffRequestForm;
