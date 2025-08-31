
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import Footer from '../../components/Footer/Footer'; // Adjust path as needed

// // Cal Poly color palette
// const calPolyGreen = '#154734';
// const calPolyGold = '#C4820E';
// const lightGreen = '#E8F4EA';

// // Connect to Socket.IO backend
// const socket = io('http://localhost:5000');

// const StaffRequestForm = () => {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedSerial, setSelectedSerial] = useState('');
//   const [availableQuantities, setAvailableQuantities] = useState({});

//   const [staffId, setStaffId] = useState('');
//   const [staffName, setStaffName] = useState('');
//   const [staffEmail, setStaffEmail] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [explanation, setExplanation] = useState('');

//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch items from API
//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('http://localhost:5000/api/items/items');
//       if (Array.isArray(res.data)) {
//         setItems(res.data);

//         const quantities = {};
//         res.data.forEach(item => {
//           quantities[item.serial_no] = item.quantity_available;
//         });
//         setAvailableQuantities(quantities);
//       }
//     } catch (err) {
//       console.error('Error fetching items:', err);
//       setMessage({ type: 'error', text: 'Failed to load inventory data' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();

//     // Listen for new items added by clerk
//     socket.on('new_item', (newItem) => {
//       setItems(prevItems => [newItem, ...prevItems]);

//       // Update available quantities
//       setAvailableQuantities(prev => ({
//         ...prev,
//         [newItem.serial_no]: newItem.quantity_available
//       }));
//     });

//     return () => {
//       socket.off('new_item');
//     };
//   }, []);

//   // Filter items when type changes
//   useEffect(() => {
//     if (selectedType) {
//       const filtered = items.filter(item => item.name === selectedType);
//       setFilteredItems(filtered);
//       setSelectedSerial('');
//     } else {
//       setFilteredItems([]);
//       setSelectedSerial('');
//     }
//   }, [selectedType, items]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!staffId || !staffName || !staffEmail || !selectedType || !selectedSerial || !quantity) {
//       setMessage({ type: 'error', text: 'Please fill all required fields.' });
//       return;
//     }

//     if (availableQuantities[selectedSerial] < quantity) {
//       setMessage({
//         type: 'error',
//         text: `Only ${availableQuantities[selectedSerial]} units available for this item.`
//       });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const payload = {
//         staff_id: staffId,
//         staff_name: staffName,
//         staff_email: staffEmail,
//         item_type: selectedType,
//         item_serial: selectedSerial,
//         quantity,
//         explanation,
//         status: 'pending'
//       };

//       await axios.post('http://localhost:5000/api/requests', payload);
//       setMessage({ type: 'success', text: 'Request submitted successfully!' });

//       // Reset form
//       setStaffId('');
//       setStaffName('');
//       setStaffEmail('');
//       setSelectedType('');
//       setSelectedSerial('');
//       setQuantity(1);
//       setExplanation('');
//     } catch (error) {
//       console.error('Submission error:', error);
//       let errMsg = error.response?.data?.message || error.message || 'Failed to submit request.';
//       if (errMsg.includes('already been requested')) {
//         errMsg = 'This item is already requested by another staff member.';
//       }
//       setMessage({ type: 'error', text: errMsg });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="flex-grow">
//         <div className="max-w-4xl mx-auto p-6">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="mb-6 border-b pb-4">
//               <h2 className="text-2xl font-bold" style={{ color: calPolyGreen }}>
//                 Inventory Request Form
//               </h2>
//               <p className="text-gray-600">Request items from the Smart IMS inventory</p>
//             </div>

//             {message && (
//               <div
//                 className={`p-4 mb-6 rounded-lg ${
//                   message.type === 'success'
//                     ? 'bg-green-50 text-green-800 border border-green-200'
//                     : 'bg-red-50 text-red-800 border border-red-200'
//                 }`}
//               >
//                 {message.text}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Staff Info */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
//                     Requester Information
//                   </h3>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
//                     <input
//                       type="text"
//                       placeholder="Enter your staff ID"
//                       value={staffId}
//                       onChange={e => setStaffId(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                     <input
//                       type="text"
//                       placeholder="Enter your full name"
//                       value={staffName}
//                       onChange={e => setStaffName(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     <input
//                       type="email"
//                       placeholder="Enter your email"
//                       value={staffEmail}
//                       onChange={e => setStaffEmail(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
//                 </div>

//                 {/* Item Details */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Item Details</h3>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
//                     <select
//                       value={selectedType}
//                       onChange={e => setSelectedType(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     >
//                       <option value="">Select item type</option>
//                       {[...new Set(items.map(i => i.name))].map(type => (
//                         <option key={type} value={type}>{type}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
//                     <select
//                       value={selectedSerial}
//                       onChange={e => setSelectedSerial(e.target.value)}
//                       disabled={!selectedType}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     >
//                       <option value="">Select serial number</option>
//                       {filteredItems.map(item => (
//                         <option key={item.serial_no} value={item.serial_no}>
//                           {item.serial_no} (Available: {availableQuantities[item.serial_no] || 0})
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//                     <input
//                       type="number"
//                       min="1"
//                       max={availableQuantities[selectedSerial] || 1}
//                       value={quantity}
//                       onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Request</label>
//                 <textarea
//                   placeholder="Explain why you need this item..."
//                   value={explanation}
//                   onChange={e => setExplanation(e.target.value)}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
//                   loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//                 }`}
//                 style={{ backgroundColor: loading ? undefined : calPolyGreen }}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </span>
//                 ) : (
//                   'Submit Request'
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Full-width footer */}
//       <Footer bgColor={calPolyGreen} textColor="white" />
//     </div>
//   );
// };

// export default StaffRequestForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // backend server

// const StaffRequestForm = () => {
//   const [staffId, setStaffId] = useState("");   // staff ID entered manually
//   const [itemType, setItemType] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [measurement, setMeasurement] = useState("");
//   const [myRequests, setMyRequests] = useState([]);
//   const [message, setMessage] = useState("");

//   // Example predefined dropdown values
//   const itemOptions = ["Laptop", "Printer", "Monitor", "Mouse", "Keyboard"];
//   const measurementOptions = ["pcs", "box", "set", "unit", "kg"];

//   // Fetch staff's requests when staffId changes
//   useEffect(() => {
//     if (!staffId) return; // only fetch if staffId is filled
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/requests/staff/${staffId}`
//         );
//         setMyRequests(res.data);
//       } catch (err) {
//         console.error("Error fetching requests", err);
//       }
//     };
//     fetchRequests();
//   }, [staffId]);

//   // Listen to real-time updates from manager
//   useEffect(() => {
//     socket.on("update_request", (data) => {
//       setMyRequests((prev) =>
//         prev.map((r) =>
//           r.request_id === parseInt(data.request_id)
//             ? { ...r, status: data.status, manager_comment: data.manager_comment }
//             : r
//         )
//       );
//       setMessage(
//         `Your request #${data.request_id} was ${data.status} (${data.manager_comment || "No comment"})`
//       );
//     });

//     return () => {
//       socket.off("update_request");
//     };
//   }, []);

//   // Submit new request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!staffId) {
//       setMessage("❌ Please enter your Staff ID first");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/requests", {
//         staff_id: staffId,
//         item_name: itemType,
//         quantity,
//         measurement,
//       });

//       setMessage("Request submitted successfully ✅");
//       setItemType("");
//       setQuantity(1);
//       setMeasurement("");

//       // Add request immediately to list
//       setMyRequests((prev) => [
//         {
//           request_id: res.data.requestId,
//           staff_id: staffId,
//           item_name: itemType,
//           quantity,
//           measurement,
//           status: "PENDING",
//           manager_comment: null,
//         },
//         ...prev,
//       ]);
//     } catch (err) {
//       console.error("Error submitting request", err);
//       setMessage("❌ Failed to submit request");
//     }
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
//       <h2 className="text-xl font-bold mb-4">Staff Request Form</h2>

//       {message && <p className="mb-3 text-green-600">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-3">
//         {/* Staff ID (manual entry) */}
//         <input
//           type="text"
//           placeholder="Enter your Staff ID"
//           value={staffId}
//           onChange={(e) => setStaffId(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />

//         {/* Item Type Dropdown */}
//         <select
//           value={itemType}
//           onChange={(e) => setItemType(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">-- Select Item --</option>
//           {itemOptions.map((item, idx) => (
//             <option key={idx} value={item}>
//               {item}
//             </option>
//           ))}
//         </select>

//         {/* Quantity */}
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />

//         {/* Measurement Dropdown */}
//         <select
//           value={measurement}
//           onChange={(e) => setMeasurement(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">-- Select Measurement --</option>
//           {measurementOptions.map((m, idx) => (
//             <option key={idx} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//         >
//           Submit Request
//         </button>
//       </form>

//       {staffId && (
//         <>
//           <h3 className="text-lg font-semibold mt-6 mb-2">My Requests</h3>
//           <ul className="space-y-2">
//             {myRequests.map((req) => (
//               <li
//                 key={req.request_id}
//                 className="p-3 border rounded flex flex-col bg-gray-50"
//               >
//                 <span>
//                   <strong>{req.item_name}</strong> ({req.quantity} {req.measurement})
//                 </span>
//                 <span>
//                   Status: <b>{req.status}</b>
//                 </span>
//                 {req.manager_comment && (
//                   <span className="text-sm text-gray-600">
//                     Manager: {req.manager_comment}
//                   </span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default StaffRequestForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const StaffRequestForm = () => {
  const [staffId, setStaffId] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [measurement, setMeasurement] = useState("");
  const [myRequests, setMyRequests] = useState([]);
  const [message, setMessage] = useState("");

  const measurementOptions = ["pcs", "box", "set", "unit", "kg"];

  // Fetch staff requests
  useEffect(() => {
    if (!staffId) return;
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/requests/staff/${staffId}`
        );
        setMyRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, [staffId]);

  // Listen to real-time updates
  useEffect(() => {
    socket.on("update_request", (data) => {
      setMyRequests((prev) =>
        prev.map((r) =>
          r.request_id === parseInt(data.request_id)
            ? { ...r, status: data.status, manager_comment: data.manager_comment }
            : r
        )
      );
    });
    return () => socket.off("update_request");
  }, []);

  // Submit request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!staffId || !fname || !lname || !itemName) {
      setMessage("❌ Please fill Staff ID, First Name, Last Name, and Item Name");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/requests", {
        staff_id: staffId,
        fname,
        lname,
        item_name: itemName,
        quantity,
        measurement,
      });

      setMessage("Request submitted ✅");
      setItemName("");
      setQuantity(1);
      setMeasurement("");
      setFname("");
      setLname("");

      setMyRequests((prev) => [
        {
          request_id: res.data.requestId,
          staff_id: staffId,
          fname,
          lname,
          item_name: itemName,
          quantity,
          measurement,
          status: "PENDING",
          manager_comment: null,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit request");
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-[360px] h-[640px] flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold">Request Form Model 20</h2>
          <p className="text-sm">Manager: Yohannes</p>
        </div>

        {/* Staff ID and Name */}
        <input
          type="text"
          placeholder="Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          className="border p-2 rounded mb-3 w-full"
        />

        {/* Item Name (manual entry) */}
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border p-2 rounded mb-3 w-full"
        />

        {/* Quantity */}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded mb-3 w-full"
        />

        {/* Measurement */}
        <select
          value={measurement}
          onChange={(e) => setMeasurement(e.target.value)}
          className="border p-2 rounded mb-3 w-full"
        >
          <option value="">-- Select Measurement --</option>
          {measurementOptions.map((m, idx) => (
            <option key={idx} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
        >
          Submit
        </button>

        {/* Message */}
        {message && <p className="text-green-600 mb-3">{message}</p>}

        {/* Requests list */}
        <div className="flex-1 overflow-y-auto">
          {myRequests.map((req) => (
            <div
              key={req.request_id}
              className="border p-3 rounded mb-2 bg-gray-50"
            >
              <span>
                <strong>{req.item_name}</strong> ({req.quantity} {req.measurement})
              </span>
              <span className="block">
                Staff: {req.fname} {req.lname}
              </span>
              <span className="block">Status: {req.status}</span>
              {req.manager_comment && (
                <span className="block text-sm text-gray-600">
                  Manager: {req.manager_comment}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffRequestForm;
