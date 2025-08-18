// import React, { useState } from 'react';
// import axios from 'axios';

// const StaffRequestForm = () => {
//   const [form, setForm] = useState({
//     staff_id: '',
//     staff_name: '',
//     staff_email: '',
//     item_type: '',
//     item_serial: '',
//     quantity: 1,
//     explanation: ''
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitRequest = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/requests', form);
//       alert('Request submitted!');
//     } catch (err) {
//       alert('Error submitting request');
//     }
//   };

//   return (
//     <div>
//       <h2>Submit Inventory Request</h2>
//       {Object.keys(form).map(key => (
//         <div key={key}>
//           <input
//             type={key === 'quantity' ? 'number' : 'text'}
//             name={key}
//             placeholder={key}
//             value={form[key]}
//             onChange={handleChange}
//           />
//         </div>
//       ))}
//       <button onClick={submitRequest}>Submit</button>
//     </div>
//   );
// };

// export default StaffRequestForm;




// correct opne  

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StaffRequestForm = () => {
//   const [items, setItems] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [serialOptions, setSerialOptions] = useState([]);
//   const [selectedSerial, setSelectedSerial] = useState('');

//   // Other form fields
//   const [staffId, setStaffId] = useState('');
//   const [staffName, setStaffName] = useState('');
//   const [staffEmail, setStaffEmail] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [explanation, setExplanation] = useState('');

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         // Fetch all items from your API (matches ClerkPage)
//         const res = await axios.get('http://localhost:5000/api/items/items');
//         if (Array.isArray(res.data)) {
//           setItems(res.data);
//         } else {
//           console.warn('Expected an array but got:', res.data);
//           setItems([]);
//         }
//       } catch (err) {
//         console.error('Error fetching items:', err);
//         setItems([]);
//       }
//     };

//     fetchItems();
//   }, []);

//   useEffect(() => {
//     if (selectedType) {
//       // Filter serial_no where item name matches selectedType
//       const filteredSerials = items
//         .filter(item => item.name === selectedType)
//         .map(item => item.serial_no);

//       setSerialOptions(filteredSerials);
//       setSelectedSerial('');
//     } else {
//       setSerialOptions([]);
//       setSelectedSerial('');
//     }
//   }, [selectedType, items]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!staffId || !staffName || !staffEmail || !selectedType || !selectedSerial || !quantity) {
//       alert('Please fill all required fields');
//       return;
//     }

//     try {
//       const payload = {
//         staff_id: staffId,
//         staff_name: staffName,
//         staff_email: staffEmail,
//         item_type: selectedType,     // sending name as item_type
//         item_serial: selectedSerial, // sending serial_no as item_serial
//         quantity,
//         explanation,
//       };

//       const res = await axios.post('http://localhost:5000/api/requests', payload);
//       alert(res.data.message || 'Request submitted successfully');

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
//       alert(error.response?.data?.message || 'Failed to submit request');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded shadow">
//       <div>
//         <label htmlFor="staff_id" className="block font-semibold mb-1">Staff ID</label>
//         <input
//           type="text"
//           id="staff_id"
//           value={staffId}
//           onChange={e => setStaffId(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="staff_name" className="block font-semibold mb-1">Staff Name</label>
//         <input
//           type="text"
//           id="staff_name"
//           value={staffName}
//           onChange={e => setStaffName(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="staff_email" className="block font-semibold mb-1">Staff Email</label>
//         <input
//           type="email"
//           id="staff_email"
//           value={staffEmail}
//           onChange={e => setStaffEmail(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="item_type" className="block font-semibold mb-1">Item Type</label>
//         <select
//           id="item_type"
//           value={selectedType}
//           onChange={e => setSelectedType(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select item type</option>
//           {[...new Set(items.map(i => i.name))].map((type, idx) => (
//             <option key={`${type}-${idx}`} value={type}>{type}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="item_serial" className="block font-semibold mb-1">Item Serial</label>
//         <select
//           id="item_serial"
//           value={selectedSerial}
//           onChange={e => setSelectedSerial(e.target.value)}
//           disabled={!selectedType}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select item serial</option>
//           {serialOptions.map((serial, idx) => (
//             <option key={`${serial}-${idx}`} value={serial}>{serial}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="quantity" className="block font-semibold mb-1">Quantity</label>
//         <input
//           type="number"
//           id="quantity"
//           min="1"
//           value={quantity}
//           onChange={e => setQuantity(parseInt(e.target.value, 10) || 1)}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="explanation" className="block font-semibold mb-1">Explanation</label>
//         <textarea
//           id="explanation"
//           value={explanation}
//           onChange={e => setExplanation(e.target.value)}
//           placeholder="Optional explanation"
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Submit Request
//       </button>
//     </form>
//   );
// };

// export default StaffRequestForm;

// corect one 

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StaffRequestForm = () => {
//   const [items, setItems] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [serialOptions, setSerialOptions] = useState([]);
//   const [selectedSerial, setSelectedSerial] = useState('');

//   // Form fields
//   const [staffId, setStaffId] = useState('');
//   const [staffName, setStaffName] = useState('');
//   const [staffEmail, setStaffEmail] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [explanation, setExplanation] = useState('');

//   // Feedback message
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch items from API
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/items/items');
//         if (Array.isArray(res.data)) {
//           setItems(res.data);
//         } else {
//           console.warn('Expected an array but got:', res.data);
//           setItems([]);
//         }
//       } catch (err) {
//         console.error('Error fetching items:', err);
//         setItems([]);
//       }
//     };

//     fetchItems();
//   }, []);

//   // Update serial options when item type changes
//   useEffect(() => {
//     if (selectedType) {
//       const filteredSerials = items
//         .filter(item => item.name === selectedType)
//         .map(item => item.serial_no);
//       setSerialOptions(filteredSerials);
//       setSelectedSerial('');
//     } else {
//       setSerialOptions([]);
//       setSelectedSerial('');
//     }
//   }, [selectedType, items]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate inputs
//     if (!staffId || !staffName || !staffEmail || !selectedType || !selectedSerial || !quantity) {
//       setMessage({ type: 'error', text: 'Please fill all required fields.' });
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
//       };

//       const res = await axios.post('http://localhost:5000/api/requests', payload);
//       setMessage({ type: 'success', text: res.data.message || 'Request submitted successfully.' });

//       // Reset form
//       setStaffId('');
//       setStaffName('');
//       setStaffEmail('');
//       setSelectedType('');
//       setSelectedSerial('');-`1   `
//       setQuantity(1);
//       setExplanation('');
//     } catch (error) {
//       console.error('Submission error:', error);

//       // Extract custom message from backend
//       let errMsg =
//         error.response?.data?.message ||
//         error.message ||
//         'Failed to submit request.';

//       // Replace backend message with user-friendly text
//       if (errMsg.toLowerCase().includes('already been requested')) {
//         errMsg = 'The item is requested by another staff, please choose another serial number.';
//       }

//       setMessage({ type: 'error', text: errMsg });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4 max-w-md mx-auto p-4 border rounded shadow"
//     >
//       <h2 className="text-xl font-semibold mb-2">Create Item Request</h2>

//       {message && (
//         <div
//           className={`p-3 rounded ${
//             message.type === 'success'
//               ? 'bg-green-100 text-green-700'
//               : 'bg-red-100 text-red-700'
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       <div>
//         <label htmlFor="staff_id" className="block font-semibold mb-1">
//           Staff ID
//         </label>
//         <input
//           type="text"
//           id="staff_id"
//           value={staffId}
//           onChange={e => setStaffId(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="staff_name" className="block font-semibold mb-1">
//           Staff Name
//         </label>
//         <input
//           type="text"
//           id="staff_name"
//           value={staffName}
//           onChange={e => setStaffName(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="staff_email" className="block font-semibold mb-1">
//           Staff Email
//         </label>
//         <input
//           type="email"
//           id="staff_email"
//           value={staffEmail}
//           onChange={e => setStaffEmail(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="item_type" className="block font-semibold mb-1">
//           Item Type
//         </label>
//         <select
//           id="item_type"
//           value={selectedType}
//           onChange={e => setSelectedType(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select item type</option>
//           {[...new Set(items.map(i => i.name))].map((type, idx) => (
//             <option key={`${type}-${idx}`} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="item_serial" className="block font-semibold mb-1">
//           Item Serial
//         </label>
//         <select
//           id="item_serial"
//           value={selectedSerial}
//           onChange={e => setSelectedSerial(e.target.value)}
//           disabled={!selectedType}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select item serial</option>
//           {serialOptions.map((serial, idx) => (
//             <option key={`${serial}-${idx}`} value={serial}>
//               {serial}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="quantity" className="block font-semibold mb-1">
//           Quantity
//         </label>
//         <input
//           type="number"
//           id="quantity"
//           min="1"
//           value={quantity}
//           onChange={e => setQuantity(parseInt(e.target.value, 10) || 1)}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="explanation" className="block font-semibold mb-1">
//           Explanation
//         </label>
//         <textarea
//           id="explanation"
//           value={explanation}
//           onChange={e => setExplanation(e.target.value)}
//           placeholder="Optional explanation"
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className={`w-full text-white px-4 py-2 rounded ${
//           loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
//         }`}
//       >
//         {loading ? 'Submitting...' : 'Submit Request'}
//       </button>
//     </form>
//   );
// };

// export default StaffRequestForm;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StaffRequestForm = () => {
//   // State management
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedSerial, setSelectedSerial] = useState('');
//   const [availableQuantities, setAvailableQuantities] = useState({});

//   // Form fields
//   const [staffId, setStaffId] = useState('');
//   const [staffName, setStaffName] = useState('');
//   const [staffEmail, setStaffEmail] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [explanation, setExplanation] = useState('');

//   // UI state
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch items from API
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get('http://localhost:5000/api/items/items');
//         if (Array.isArray(res.data)) {
//           setItems(res.data);

//           const quantities = {};
//           res.data.forEach(item => {
//             quantities[item.serial_no] = item.quantity_available;
//           });
//           setAvailableQuantities(quantities);
//         } else {
//           console.warn('Expected an array but got:', res.data);
//           setItems([]);
//         }
//       } catch (err) {
//         console.error('Error fetching items:', err);
//         setMessage({ type: 'error', text: 'Failed to load inventory data' });
//         setItems([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
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

//       const res = await axios.post('http://localhost:5000/api/requests', payload);
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
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <div className="mb-6 border-b pb-4">
//         <h2 className="text-2xl font-bold text-gray-800">Inventory Request Form</h2>
//         <p className="text-gray-600">Request items from the company inventory</p>
//       </div>

//       {message && (
//         <div
//           className={`p-4 mb-6 rounded-lg ${
//             message.type === 'success'
//               ? 'bg-green-50 text-green-800 border border-green-200'
//               : 'bg-red-50 text-red-800 border border-red-200'
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
//               Requester Information
//             </h3>
//             <div>
//               <label htmlFor="staff_id" className="block text-sm font-medium text-gray-700 mb-1">
//                 Staff ID <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="staff_id"
//                 value={staffId}
//                 onChange={e => setStaffId(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="staff_name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="staff_name"
//                 value={staffName}
//                 onChange={e => setStaffName(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="staff_email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 id="staff_email"
//                 value={staffEmail}
//                 onChange={e => setStaffEmail(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Item Details</h3>
//             <div>
//               <label htmlFor="item_type" className="block text-sm font-medium text-gray-700 mb-1">
//                 Item Type <span className="text-red-500">*</span>
//               </label>
//               <select
//                 id="item_type"
//                 value={selectedType}
//                 onChange={e => setSelectedType(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select an item type</option>
//                 {[...new Set(items.map(i => i.name))].map((type) => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label htmlFor="item_serial" className="block text-sm font-medium text-gray-700 mb-1">
//                 Serial Number <span className="text-red-500">*</span>
//               </label>
//               <select
//                 id="item_serial"
//                 value={selectedSerial}
//                 onChange={e => setSelectedSerial(e.target.value)}
//                 disabled={!selectedType}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//               >
//                 <option value="">Select a serial number</option>
//                 {filteredItems.map((item) => (
//                   <option key={item.serial_no} value={item.serial_no}>
//                     {item.serial_no} {item.quantity_available ? `(Available: ${item.quantity_available})` : '(Out of stock)'}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
//                 Quantity <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 id="quantity"
//                 min="1"
//                 max={availableQuantities[selectedSerial] || 1}
//                 value={quantity}
//                 onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {selectedSerial && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   Maximum available: {availableQuantities[selectedSerial] || 0}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div>
//           <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
//             Reason for Request
//           </label>
//           <textarea
//             id="explanation"
//             value={explanation}
//             onChange={e => setExplanation(e.target.value)}
//             placeholder="Please explain why you need this item..."
//             rows={3}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="pt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 px-4 rounded-md font-medium text-white ${
//               loading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
//             }`}
//           >
//             {loading ? 'Processing...' : 'Submit Request'}
//           </button>
//         </div>
//       </form>

//       <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//         <h3 className="text-sm font-medium text-blue-800 mb-2">Inventory Status Information</h3>
//         <p className="text-xs text-blue-700">
//           All requests are subject to approval. You will receive an email confirmation once your request is processed.
//           For urgent requests, please contact the inventory department directly.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StaffRequestForm;

// corect

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';

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
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <div className="mb-6 border-b pb-4">
//         <h2 className="text-2xl font-bold text-gray-800">Inventory Request Form</h2>
//         <p className="text-gray-600">Request items from the company inventory</p>
//       </div>

//       {message && (
//         <div
//           className={`p-4 mb-6 rounded-lg ${
//             message.type === 'success'
//               ? 'bg-green-50 text-green-800 border border-green-200'
//               : 'bg-red-50 text-red-800 border border-red-200'
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Staff Info */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
//               Requester Information
//             </h3>
//             <input
//               type="text"
//               placeholder="Staff ID"
//               value={staffId}
//               onChange={e => setStaffId(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={staffName}
//               onChange={e => setStaffName(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={staffEmail}
//               onChange={e => setStaffEmail(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>

//           {/* Item Details */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Item Details</h3>
//             <select
//               value={selectedType}
//               onChange={e => setSelectedType(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="">Select item type</option>
//               {[...new Set(items.map(i => i.name))].map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>

//             <select
//               value={selectedSerial}
//               onChange={e => setSelectedSerial(e.target.value)}
//               disabled={!selectedType}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="">Select serial number</option>
//               {filteredItems.map(item => (
//                 <option key={item.serial_no} value={item.serial_no}>
//                   {item.serial_no} (Available: {availableQuantities[item.serial_no] || 0})
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               min="1"
//               max={availableQuantities[selectedSerial] || 1}
//               value={quantity}
//               onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//         </div>

//         <textarea
//           placeholder="Reason for request..."
//           value={explanation}
//           onChange={e => setExplanation(e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border rounded"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 px-4 rounded-md font-medium text-white ${
//             loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           {loading ? 'Processing...' : 'Submit Request'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StaffRequestForm;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Footer from '../../components/Footer/Footer'; // Adjust path as needed

// Cal Poly color palette
const calPolyGreen = '#154734';
const calPolyGold = '#C4820E';
const lightGreen = '#E8F4EA';

// Connect to Socket.IO backend
const socket = io('http://localhost:5000');

const StaffRequestForm = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSerial, setSelectedSerial] = useState('');
  const [availableQuantities, setAvailableQuantities] = useState({});

  const [staffId, setStaffId] = useState('');
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [explanation, setExplanation] = useState('');

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch items from API
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/items/items');
      if (Array.isArray(res.data)) {
        setItems(res.data);

        const quantities = {};
        res.data.forEach(item => {
          quantities[item.serial_no] = item.quantity_available;
        });
        setAvailableQuantities(quantities);
      }
    } catch (err) {
      console.error('Error fetching items:', err);
      setMessage({ type: 'error', text: 'Failed to load inventory data' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();

    // Listen for new items added by clerk
    socket.on('new_item', (newItem) => {
      setItems(prevItems => [newItem, ...prevItems]);

      // Update available quantities
      setAvailableQuantities(prev => ({
        ...prev,
        [newItem.serial_no]: newItem.quantity_available
      }));
    });

    return () => {
      socket.off('new_item');
    };
  }, []);

  // Filter items when type changes
  useEffect(() => {
    if (selectedType) {
      const filtered = items.filter(item => item.name === selectedType);
      setFilteredItems(filtered);
      setSelectedSerial('');
    } else {
      setFilteredItems([]);
      setSelectedSerial('');
    }
  }, [selectedType, items]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!staffId || !staffName || !staffEmail || !selectedType || !selectedSerial || !quantity) {
      setMessage({ type: 'error', text: 'Please fill all required fields.' });
      return;
    }

    if (availableQuantities[selectedSerial] < quantity) {
      setMessage({
        type: 'error',
        text: `Only ${availableQuantities[selectedSerial]} units available for this item.`
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        staff_id: staffId,
        staff_name: staffName,
        staff_email: staffEmail,
        item_type: selectedType,
        item_serial: selectedSerial,
        quantity,
        explanation,
        status: 'pending'
      };

      await axios.post('http://localhost:5000/api/requests', payload);
      setMessage({ type: 'success', text: 'Request submitted successfully!' });

      // Reset form
      setStaffId('');
      setStaffName('');
      setStaffEmail('');
      setSelectedType('');
      setSelectedSerial('');
      setQuantity(1);
      setExplanation('');
    } catch (error) {
      console.error('Submission error:', error);
      let errMsg = error.response?.data?.message || error.message || 'Failed to submit request.';
      if (errMsg.includes('already been requested')) {
        errMsg = 'This item is already requested by another staff member.';
      }
      setMessage({ type: 'error', text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold" style={{ color: calPolyGreen }}>
                Inventory Request Form
              </h2>
              <p className="text-gray-600">Request items from the Smart IMS inventory</p>
            </div>

            {message && (
              <div
                className={`p-4 mb-6 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Staff Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Requester Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
                    <input
                      type="text"
                      placeholder="Enter your staff ID"
                      value={staffId}
                      onChange={e => setStaffId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={staffName}
                      onChange={e => setStaffName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={staffEmail}
                      onChange={e => setStaffEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Item Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Item Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
                    <select
                      value={selectedType}
                      onChange={e => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select item type</option>
                      {[...new Set(items.map(i => i.name))].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                    <select
                      value={selectedSerial}
                      onChange={e => setSelectedSerial(e.target.value)}
                      disabled={!selectedType}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select serial number</option>
                      {filteredItems.map(item => (
                        <option key={item.serial_no} value={item.serial_no}>
                          {item.serial_no} (Available: {availableQuantities[item.serial_no] || 0})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max={availableQuantities[selectedSerial] || 1}
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Request</label>
                <textarea
                  placeholder="Explain why you need this item..."
                  value={explanation}
                  onChange={e => setExplanation(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
                style={{ backgroundColor: loading ? undefined : calPolyGreen }}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Full-width footer */}
      <Footer bgColor={calPolyGreen} textColor="white" />
    </div>
  );
};

export default StaffRequestForm;