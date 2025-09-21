




// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Search, Package, Users, CheckCircle, AlertCircle } from 'lucide-react';

// export default function IssueItemForm() {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [selectedUnits, setSelectedUnits] = useState([]);
//   const [quantity, setQuantity] = useState('');
//   const [remark, setRemark] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [searchRequest, setSearchRequest] = useState('');
//   const [searchItem, setSearchItem] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const pollingRef = useRef();

//   // Fetch approved requests
//   const fetchRequests = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/requests');
//       const data = await res.json();
//       setRequests(Array.isArray(data) ? data.filter(r => r.status === 'APPROVED') : []);
//     } catch (err) {
//       console.error('Error fetching requests:', err);
//       setRequests([]);
//     }
//   };

//   // Fetch all items and categories
//   const fetchItems = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/items/items');
//       const data = res.data || [];
//       setItems(data);
//       const uniqueCategories = Array.from(new Set(data.map(i => i.Category))).sort();
//       setCategories(uniqueCategories);
//     } catch (err) {
//       console.error('Error fetching items:', err);
//       setItems([]);
//       setCategories([]);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//     fetchItems();

//     pollingRef.current = setInterval(() => {
//       fetchRequests();
//       fetchItems();
//     }, 5000);

//     return () => clearInterval(pollingRef.current);
//   }, []);

//   const filteredRequests = requests.filter(req =>
//     `${req.fname} ${req.lname}`.toLowerCase().includes(searchRequest.toLowerCase()) ||
//     req.staff_id.toLowerCase().includes(searchRequest.toLowerCase()) ||
//     req.request_id.toString().includes(searchRequest)
//   );

//   const filteredItems = items.filter(item => {
//     const matchesSearch =
//       item.ItemName.toLowerCase().includes(searchItem.toLowerCase()) ||
//       item.Model.toLowerCase().includes(searchItem.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || item.Category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleRequestSelect = (request) => {
//     setSelectedRequest(request);
//   };

//   const handleItemSelect = (item) => {
//     setSelectedItem(item);
//     setSelectedUnits([]);
//     setQuantity('');
//   };

//   const handleUnitToggle = (unitID) => {
//     setSelectedUnits(prev =>
//       prev.includes(unitID) ? prev.filter(id => id !== unitID) : [...prev, unitID]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedRequest || !selectedItem) {
//       alert("Please select request and item");
//       return;
//     }

//     // Check if item really has serial numbers
//     const isSerial =
//       selectedItem.units &&
//       selectedItem.units.length > 0 &&
//       selectedItem.units.some(u => u.SerialNo && u.SerialNo.trim() !== "");

//     if (isSerial && selectedUnits.length === 0) {
//       alert("Please select at least one unit");
//       return;
//     }

//     if (!isSerial && (!quantity || Number(quantity) <= 0)) {
//       alert("Please enter a valid quantity");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         RequestID: selectedRequest.request_id,
//         ItemID: selectedItem.ItemID,
//         Quantity: isSerial ? selectedUnits.length : Number(quantity),
//         Remark: remark,
//         UnitIDs: isSerial ? selectedUnits.map(id => Number(id)) : []
//       };

//       const res = await axios.post('http://localhost:5000/api/model22/issue', payload);
//       const formIDs = res.data?.FormIDs || [];
//       alert(`Successfully issued ${payload.Quantity} unit(s). FormIDs: ${formIDs.join(', ') || 'N/A'}`);

//       setSelectedRequest(null);
//       setSelectedItem(null);
//       setSelectedUnits([]);
//       setQuantity('');
//       setRemark('');

//       await fetchRequests();
//       await fetchItems();
//     } catch (err) {
//       console.error(err);
//       alert("Server error while issuing units");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-blue-600 mb-2">Stock Flow Assistant</h1>
//           <p className="text-gray-600 text-lg">Professional inventory management system for efficient item issuing</p>
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Request Selection */}
//           <div className="p-6 bg-white shadow rounded">
//             <div className="flex items-center gap-3 mb-6">
//               <Users className="h-6 w-6 text-blue-600" />
//               <h2 className="text-xl font-semibold">Select Request</h2>
//             </div>
//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 placeholder="Search by name, ID, or request number..."
//                 value={searchRequest}
//                 onChange={(e) => setSearchRequest(e.target.value)}
//                 className="pl-10 border rounded w-full p-2"
//               />
//             </div>
//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {filteredRequests.map(req => (
//                 <div
//                   key={req.request_id}
//                   className={`p-4 cursor-pointer border rounded transition-all ${
//                     selectedRequest?.request_id === req.request_id
//                       ? 'border-blue-600 bg-blue-50'
//                       : 'border-gray-200 hover:border-blue-400'
//                   }`}
//                   onClick={() => handleRequestSelect(req)}
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-xs font-medium text-gray-600">#{req.request_id}</span>
//                     <CheckCircle className="h-4 w-4 text-green-500" />
//                   </div>
//                   <h3 className="font-medium">{req.fname} {req.lname}</h3>
//                   <p className="text-sm text-gray-500">ID: {req.staff_id}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Item Selection */}
//           <div className="p-6 bg-white shadow rounded">
//             <div className="flex items-center gap-3 mb-6">
//               <Package className="h-6 w-6 text-blue-600" />
//               <h2 className="text-xl font-semibold">Select Item</h2>
//             </div>

//             <div className="mb-4 flex gap-2 flex-wrap">
//               <button
//                 type="button"
//                 className={`px-3 py-1 rounded text-sm ${
//                   selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
//                 }`}
//                 onClick={() => setSelectedCategory('all')}
//               >
//                 All
//               </button>
//               {categories.map(cat => (
//                 <button
//                   key={cat}
//                   type="button"
//                   className={`px-3 py-1 rounded text-sm ${
//                     selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'
//                   }`}
//                   onClick={() => setSelectedCategory(cat)}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 placeholder="Search items..."
//                 value={searchItem}
//                 onChange={(e) => setSearchItem(e.target.value)}
//                 className="pl-10 border rounded w-full p-2"
//               />
//             </div>

//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {filteredItems.map(item => (
//                 <div
//                   key={item.ItemID}
//                   className={`p-4 cursor-pointer border rounded transition-all ${
//                     selectedItem?.ItemID === item.ItemID
//                       ? 'border-blue-600 bg-blue-50'
//                       : 'border-gray-200 hover:border-blue-400'
//                   }`}
//                   onClick={() => handleItemSelect(item)}
//                 >
//                   <h3 className="font-medium mb-1">{item.ItemName}</h3>
//                   <p className="text-sm text-gray-500 mb-2">Model: {item.Model}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs bg-gray-200 px-2 py-1 rounded">
//                       {item.units?.length || item.TotalQty || 0} available
//                     </span>
//                     {item.Category && <span className="text-xs text-gray-600">{item.Category}</span>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Issue Details */}
//           <div className="p-6 bg-white shadow rounded">
//             <div className="flex items-center gap-3 mb-6">
//               <CheckCircle className="h-6 w-6 text-blue-600" />
//               <h2 className="text-xl font-semibold">Issue Details</h2>
//             </div>

//             {selectedRequest && (
//               <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-200">
//                 <h3 className="font-medium text-blue-700 mb-1">Selected Request</h3>
//                 <p className="text-sm">{selectedRequest.fname} {selectedRequest.lname}</p>
//                 <p className="text-xs text-gray-500">#{selectedRequest.request_id}</p>
//               </div>
//             )}

//             {selectedItem && (
//               <div className="space-y-4">
//                 {/* Check if item really has serial numbers */}
//                 {selectedItem.units &&
//                 selectedItem.units.length > 0 &&
//                 selectedItem.units.some(u => u.SerialNo && u.SerialNo.trim() !== "") ? (
//                   <div>
//                     <label className="text-sm font-medium mb-3 block">Select Units:</label>
//                     <div className="space-y-2 max-h-48 overflow-y-auto">
//                       {selectedItem.units.map(unit => (
//                         <div
//                           key={unit.UnitID}
//                           className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-400"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={selectedUnits.includes(unit.UnitID)}
//                             onChange={() => handleUnitToggle(unit.UnitID)}
//                           />
//                           <div className="flex-1">
//                             <span className="text-sm">{unit.SerialNo}</span>
//                             <p className="text-xs text-gray-500">Status: {unit.Status}</p>
//                           </div>
//                           {unit.Status === 'Available'
//                             ? <CheckCircle className="h-4 w-4 text-green-500" />
//                             : <AlertCircle className="h-4 w-4 text-yellow-500" />}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   // Non-serial Items → only quantity input
//                   <div>
//                     <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
//                     <input
//                       id="quantity"
//                       type="number"
//                       value={quantity}
//                       onChange={(e) => setQuantity(e.target.value)}
//                       required
//                       min="1"
//                       max={selectedItem.TotalQty || 1}
//                       className="mt-1 border rounded w-full p-2"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       {selectedItem.TotalQty || 0} units available
//                     </p>
//                   </div>
//                 )}

//                 <div>
//                   <label htmlFor="remark" className="block text-sm font-medium">Remark (Optional)</label>
//                   <input
//                     id="remark"
//                     value={remark}
//                     onChange={(e) => setRemark(e.target.value)}
//                     placeholder="Add any additional notes..."
//                     className="mt-1 border rounded w-full p-2"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={
//                     loading ||
//                     !selectedRequest ||
//                     !selectedItem ||
//                     (selectedItem.units?.some(u => u.SerialNo && u.SerialNo.trim() !== "") &&
//                       selectedUnits.length === 0) ||
//                     (!(selectedItem.units?.some(u => u.SerialNo && u.SerialNo.trim() !== "")) &&
//                       (!quantity || Number(quantity) <= 0))
//                   }
//                   className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
//                 >
//                   {loading ? 'Processing...' : 'Issue'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// // corect one 

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Search, Package, Users, CheckCircle, AlertCircle, ClipboardList, User, Box, Hash, FileText } from 'lucide-react';

// export default function IssueItemForm() {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [selectedUnits, setSelectedUnits] = useState([]);
//   const [quantity, setQuantity] = useState('');
//   const [remark, setRemark] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [searchRequest, setSearchRequest] = useState('');
//   const [searchItem, setSearchItem] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const pollingRef = useRef();

//   // Fetch approved requests
//   const fetchRequests = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/requests');
//       const data = await res.json();
//       // Only keep approved requests
//       setRequests(Array.isArray(data) ? data.filter(r => r.status === 'APPROVED') : []);
//     } catch (err) {
//       console.error('Error fetching requests:', err);
//       setRequests([]);
//     }
//   };

//   // Fetch all items and categories
//   const fetchItems = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/items/items');
//       const data = res.data || [];
//       setItems(data);

//       // Dynamically get categories from DB
//       const uniqueCategories = Array.from(new Set(data.map(i => i.Category))).sort();
//       setCategories(uniqueCategories);
//     } catch (err) {
//       console.error('Error fetching items:', err);
//       setItems([]);
//       setCategories([]);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//     fetchItems();

//     pollingRef.current = setInterval(() => {
//       fetchRequests();
//       fetchItems();
//     }, 5000);

//     return () => clearInterval(pollingRef.current);
//   }, []);

//   // Filter requests by staff name or item name
//   const filteredRequests = requests.filter(req =>
//     `${req.fname} ${req.lname}`.toLowerCase().includes(searchRequest.toLowerCase()) ||
//     req.item_name.toLowerCase().includes(searchRequest.toLowerCase())
//   );

//   // Filter items by search and category
//   const filteredItems = items.filter(item => {
//     const matchesSearch =
//       item.ItemName.toLowerCase().includes(searchItem.toLowerCase()) ||
//       item.Model.toLowerCase().includes(searchItem.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || item.Category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleRequestSelect = (request) => {
//     setSelectedRequest(request);
//   };

//   const handleItemSelect = (item) => {
//     setSelectedItem(item);
//     setSelectedUnits([]);
//     setQuantity('');
//   };

//   const handleUnitToggle = (unitID) => {
//     setSelectedUnits(prev =>
//       prev.includes(unitID) ? prev.filter(id => id !== unitID) : [...prev, unitID]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedRequest || !selectedItem) {
//       alert("Please select request and item");
//       return;
//     }

//     const isSerial =
//       selectedItem.units &&
//       selectedItem.units.length > 0 &&
//       selectedItem.units.some(u => u.SerialNo && u.SerialNo.trim() !== "");

//     if (isSerial && selectedUnits.length === 0) {
//       alert("Please select at least one unit");
//       return;
//     }

//     if (!isSerial && (!quantity || Number(quantity) <= 0)) {
//       alert("Please enter a valid quantity");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         RequestID: selectedRequest.request_id,
//         ItemID: selectedItem.ItemID,
//         Quantity: isSerial ? selectedUnits.length : Number(quantity),
//         Remark: remark,
//         UnitIDs: isSerial ? selectedUnits.map(id => Number(id)) : []
//       };

//       const res = await axios.post('http://localhost:5000/api/model22/issue', payload);
//       const formIDs = res.data?.FormIDs || [];
//       alert(`Successfully issued ${payload.Quantity} unit(s). FormIDs: ${formIDs.join(', ') || 'N/A'}`);

//       setSelectedRequest(null);
//       setSelectedItem(null);
//       setSelectedUnits([]);
//       setQuantity('');
//       setRemark('');

//       await fetchRequests();
//       await fetchItems();
//     } catch (err) {
//       console.error(err);
//       alert("Server error while issuing units");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-green-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-green-700 mb-2 flex items-center justify-center gap-3">
//             <ClipboardList className="h-10 w-10" />
//             Stock Flow Assistant
//           </h1>
//           <p className="text-gray-600 text-lg">Professional inventory management system for efficient item issuing</p>
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Request Selection */}
//           <div className="p-6 bg-white shadow-lg rounded-lg border border-green-200">
//             <div className="flex items-center gap-3 mb-6 pb-3 border-b border-green-100">
//               <Users className="h-6 w-6 text-green-600" />
//               <h2 className="text-xl font-semibold text-green-800">Select Request</h2>
//             </div>
            
//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-green-400" />
//               <input
//                 placeholder="Search by staff or item..."
//                 value={searchRequest}
//                 onChange={(e) => setSearchRequest(e.target.value)}
//                 className="pl-10 border border-green-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>
            
//             <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
//               {filteredRequests.length === 0 ? (
//                 <div className="text-center py-4 text-gray-500">
//                   No approved requests found
//                 </div>
//               ) : (
//                 filteredRequests.map(req => (
//                   <div
//                     key={req.request_id}
//                     className={`p-4 cursor-pointer border rounded-lg transition-all ${
//                       selectedRequest?.request_id === req.request_id
//                         ? 'border-green-600 bg-green-50'
//                         : 'border-green-200 hover:border-green-400'
//                     }`}
//                     onClick={() => handleRequestSelect(req)}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="bg-green-100 p-2 rounded-full">
//                         <User className="h-4 w-4 text-green-600" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-medium text-green-900">{req.fname} {req.lname}</h3>
//                         <div className="text-sm text-gray-600 space-y-1 mt-2">
//                           <div className="flex items-center gap-2">
//                             <Box className="h-3 w-3" />
//                             <span>{req.item_name}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Hash className="h-3 w-3" />
//                             <span>{req.quantity} {req.measurement}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Item Selection */}
//           <div className="p-6 bg-white shadow-lg rounded-lg border border-green-200">
//             <div className="flex items-center gap-3 mb-6 pb-3 border-b border-green-100">
//               <Package className="h-6 w-6 text-green-600" />
//               <h2 className="text-xl font-semibold text-green-800">Select Item</h2>
//             </div>

//             <div className="mb-4 flex gap-2 flex-wrap">
//               <button
//                 type="button"
//                 className={`px-3 py-1 rounded-lg text-sm transition-colors ${
//                   selectedCategory === 'all' 
//                     ? 'bg-green-600 text-white' 
//                     : 'bg-green-100 text-green-800 hover:bg-green-200'
//                 }`}
//                 onClick={() => setSelectedCategory('all')}
//               >
//                 All
//               </button>
//               {categories.map(cat => (
//                 <button
//                   key={cat}
//                   type="button"
//                   className={`px-3 py-1 rounded-lg text-sm transition-colors ${
//                     selectedCategory === cat 
//                       ? 'bg-green-600 text-white' 
//                       : 'bg-green-100 text-green-800 hover:bg-green-200'
//                   }`}
//                   onClick={() => setSelectedCategory(cat)}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-green-400" />
//               <input
//                 placeholder="Search items..."
//                 value={searchItem}
//                 onChange={(e) => setSearchItem(e.target.value)}
//                 className="pl-10 border border-green-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
//               {filteredItems.length === 0 ? (
//                 <div className="text-center py-4 text-gray-500">
//                   No items found
//                 </div>
//               ) : (
//                 filteredItems.map(item => (
//                   <div
//                     key={item.ItemID}
//                     className={`p-4 cursor-pointer border rounded-lg transition-all ${
//                       selectedItem?.ItemID === item.ItemID
//                         ? 'border-green-600 bg-green-50'
//                         : 'border-green-200 hover:border-green-400'
//                     }`}
//                     onClick={() => handleItemSelect(item)}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="bg-green-100 p-2 rounded-full">
//                         <Package className="h-4 w-4 text-green-600" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-medium text-green-900">{item.ItemName}</h3>
//                         <p className="text-sm text-gray-600 mb-2">Model: {item.Model}</p>
//                         <div className="flex items-center justify-between">
//                           <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                             {item.units?.length || item.TotalQty || 0} available
//                           </span>
//                           {item.Category && (
//                             <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
//                               {item.Category}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Issue Details */}
//           <div className="p-6 bg-white shadow-lg rounded-lg border border-green-200">
//             <div className="flex items-center gap-3 mb-6 pb-3 border-b border-green-100">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//               <h2 className="text-xl font-semibold text-green-800">Issue Details</h2>
//             </div>

//             {selectedRequest && (
//               <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
//                 <h3 className="font-medium text-green-800 mb-3 flex items-center gap-2">
//                   <User className="h-4 w-4" />
//                   Selected Request
//                 </h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">Name:</span>
//                     <span>{selectedRequest.fname} {selectedRequest.lname}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">Item:</span>
//                     <span>{selectedRequest.item_name}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">Quantity:</span>
//                     <span>{selectedRequest.quantity} {selectedRequest.measurement}</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {selectedItem && (
//               <div className="space-y-4">
//                 {selectedItem.units &&
//                 selectedItem.units.length > 0 &&
//                 selectedItem.units.some(u => u.SerialNo && u.SerialNo.trim() !== "") ? (
//                   <div>
//                     <label className="text-sm font-medium text-green-800 mb-3 block">Select Units:</label>
//                     <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
//                       {selectedItem.units.map(unit => (
//                         <div
//                           key={unit.UnitID}
//                           className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
//                             selectedUnits.includes(unit.UnitID)
//                               ? 'border-green-600 bg-green-50'
//                               : 'border-green-200 hover:border-green-400'
//                           }`}
//                         >
//                           <input
//                             type="checkbox"
//                             checked={selectedUnits.includes(unit.UnitID)}
//                             onChange={() => handleUnitToggle(unit.UnitID)}
//                             className="rounded text-green-600 focus:ring-green-500"
//                           />
//                           <div className="flex-1">
//                             <span className="text-sm font-medium">{unit.SerialNo}</span>
//                             <p className="text-xs text-gray-500">Status: {unit.Status}</p>
//                           </div>
//                           {unit.Status === 'Available'
//                             ? <CheckCircle className="h-4 w-4 text-green-500" />
//                             : <AlertCircle className="h-4 w-4 text-yellow-500" />}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <label htmlFor="quantity" className="block text-sm font-medium text-green-800">
//                       Quantity
//                     </label>
//                     <input
//                       id="quantity"
//                       type="number"
//                       value={quantity}
//                       onChange={(e) => setQuantity(e.target.value)}
//                       required
//                       min="1"
//                       max={selectedItem.TotalQty || 1}
//                       className="mt-1 border border-green-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     />
//                     <p className="text-xs text-green-600 mt-1">
//                       {selectedItem.TotalQty || 0} units available
//                     </p>
//                   </div>
//                 )}

//                 <div>
//                   <label htmlFor="remark" className="block text-sm font-medium text-green-800 flex items-center gap-2">
//                     <FileText className="h-4 w-4" />
//                     Remark (Optional)
//                   </label>
//                   <textarea
//                     id="remark"
//                     value={remark}
//                     onChange={(e) => setRemark(e.target.value)}
//                     placeholder="Add any additional notes..."
//                     rows="3"
//                     className="mt-1 border border-green-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={
//                     loading ||
//                     !selectedRequest ||
//                     !selectedItem ||
//                     (selectedItem.units?.some(u => u.SerialNo && u.SerialNo.trim() !== "") &&
//                       selectedUnits.length === 0) ||
//                     (!(selectedItem.units?.some(u => u.SerialNo && u.SerialNo.trim() !== "")) &&
//                       (!quantity || Number(quantity) <= 0))
//                   }
//                   className="w-full bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 transition disabled:bg-green-400 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <CheckCircle className="h-5 w-5" />
//                       Issue Items
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}

//             {!selectedItem && (
//               <div className="text-center py-8 text-gray-500">
//                 <Package className="h-12 w-12 mx-auto mb-3 text-green-300" />
//                 <p>Select an item to issue</p>
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Package, Users, CheckCircle, AlertCircle, ClipboardList, User, Box, Hash, FileText } from 'lucide-react';

export default function IssueItemForm() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchRequest, setSearchRequest] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pollingRef = useRef();

  // Fetch approved requests
  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/requests');
      const data = await res.json();
      setRequests(Array.isArray(data) ? data.filter(r => r.status === 'APPROVED') : []);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setRequests([]);
    }
  };

  // Fetch all items and categories
  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items/items');
      const data = res.data || [];
      setItems(data);

      // Dynamically get categories from DB
      const uniqueCategories = Array.from(new Set(data.map(i => i.Category))).sort();
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching items:', err);
      setItems([]);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchItems();

    pollingRef.current = setInterval(() => {
      fetchRequests();
      fetchItems();
    }, 5000);

    return () => clearInterval(pollingRef.current);
  }, []);

  const filteredRequests = requests.filter(req =>
    `${req.fname} ${req.lname}`.toLowerCase().includes(searchRequest.toLowerCase()) ||
    req.item_name.toLowerCase().includes(searchRequest.toLowerCase())
  );

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.ItemName.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.Model.toLowerCase().includes(searchItem.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.Category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSelectedUnits([]);
    setQuantity('');
  };

  const handleUnitToggle = (unitID) => {
    setSelectedUnits(prev =>
      prev.includes(unitID) ? prev.filter(id => id !== unitID) : [...prev, unitID]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRequest || !selectedItem) {
      alert("Please select request and item");
      return;
    }

    const isSerial =
      selectedItem.units &&
      selectedItem.units.length > 0 &&
      selectedItem.units.some(u => u.SerialNo && u.SerialNo.trim() !== "");

    if (isSerial && selectedUnits.length === 0) {
      alert("Please select at least one unit");
      return;
    }

    if (!isSerial && (!quantity || Number(quantity) <= 0)) {
      alert("Please enter a valid quantity");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        RequestID: selectedRequest.request_id,
        ItemID: selectedItem.ItemID,
        Quantity: isSerial ? selectedUnits.length : Number(quantity),
        Remark: remark,
        UnitIDs: isSerial ? selectedUnits.map(id => Number(id)) : []
      };

      const res = await axios.post('http://localhost:5000/api/model22/issue', payload);
      const formIDs = res.data?.FormIDs || [];
      alert(`Successfully issued ${payload.Quantity} unit(s). FormIDs: ${formIDs.join(', ') || 'N/A'}`);

      setSelectedRequest(null);
      setSelectedItem(null);
      setSelectedUnits([]);
      setQuantity('');
      setRemark('');

      await fetchRequests();
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert("Server error while issuing units");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-2 flex items-center justify-center gap-3">
            <ClipboardList className="h-10 w-10" />
            Stock Flow Assistant
          </h1>
          <p className="text-gray-600 text-lg">Professional inventory management system for efficient item issuing</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Request Selection */}
          <div className="p-6 bg-white shadow-lg rounded-lg border border-green-200">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-green-100">
              <Users className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-green-800">Select Request</h2>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-green-400" />
              <input
                placeholder="Search by staff or item..."
                value={searchRequest}
                onChange={(e) => setSearchRequest(e.target.value)}
                className="pl-10 border border-green-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No approved requests found
                </div>
              ) : (
                filteredRequests.map(req => (
                  <div
                    key={req.request_id}
                    className={`p-4 cursor-pointer border rounded-lg transition-all ${
                      selectedRequest?.request_id === req.request_id
                        ? 'border-green-600 bg-green-50'
                        : 'border-green-200 hover:border-green-400'
                    }`}
                    onClick={() => handleRequestSelect(req)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-green-900">{req.fname} {req.lname}</h3>
                        <div className="text-sm text-gray-600 space-y-1 mt-2">
                          <div className="flex items-center gap-2">
                            <Box className="h-3 w-3" />
                            <span>{req.item_name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Hash className="h-3 w-3" />
                            <span>{req.quantity} {req.measurement}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Item Selection */}
          <div className="p-6 bg-white shadow-lg rounded-lg border border-green-200">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-green-100">
              <Package className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-green-800">Select Item</h2>
            </div>

            <div className="mb-4 flex gap-2 flex-wrap">
              <button
                type="button"
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-green-600 text-white' 
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-green-400" />
              <input
                placeholder="Search items..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="pl-10 border border-green-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {filteredItems.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No items found
                </div>
              ) : (
                filteredItems.map(item => (
                  <div
                    key={item.ItemID}
                    className={`p-4 cursor-pointer border rounded-lg transition-all ${
                      selectedItem?.ItemID === item.ItemID
                        ? 'border-green-600 bg-green-50'
                        : 'border-green-200 hover:border-green-400'
                    }`}
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Package className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-green-900">{item.ItemName}</h3>
                        <p className="text-sm text-gray-600 mb-2">Model: {item.Model}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {item.TotalQty || 0} available
                          </span>
                          {item.Category && (
                            <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                              {item.Category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Issue Details */}
          <div className="p-6 bg-white shadow-lg rounded-lg border border-green-200">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-green-800">Issue Details</h2>
            </div>

            {selectedRequest && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Selected Request
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Name:</span>
                    <span>{selectedRequest.fname} {selectedRequest.lname}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Item:</span>
                    <span>{selectedRequest.item_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Quantity:</span>
                    <span>{selectedRequest.quantity} {selectedRequest.measurement}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedItem && (
              <div className="space-y-4">
                {selectedItem.units &&
                selectedItem.units.length > 0 &&
                selectedItem.units.some(u => u.SerialNo && u.SerialNo.trim() !== "") ? (
                  <div>
                    <label className="text-sm font-medium text-green-800 mb-3 block">Select Units:</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {selectedItem.units.map(unit => (
                        <div
                          key={unit.UnitID}
                          className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                            selectedUnits.includes(unit.UnitID)
                              ? 'border-green-600 bg-green-50'
                              : 'border-green-200 hover:border-green-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedUnits.includes(unit.UnitID)}
                            onChange={() => handleUnitToggle(unit.UnitID)}
                            className="rounded text-green-600 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium">{unit.SerialNo}</span>
                            <p className="text-xs text-gray-500">Status: {unit.Status}</p>
                          </div>
                          {unit.Status === 'Available'
                            ? <CheckCircle className="h-4 w-4 text-green-500" />
                            : <AlertCircle className="h-4 w-4 text-yellow-500" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-green-800">
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      min="1"
                      max={selectedItem.TotalQty || 1}
                      className="mt-1 border border-green-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <p className="text-xs text-green-600 mt-1">
                      {selectedItem.TotalQty || 0} units available
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="remark" className="block text-sm font-medium text-green-800 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Remark (Optional)
                  </label>
                  <textarea
                    id="remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Add any additional notes..."
                    rows="3"
                    className="mt-1 border border-green-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !selectedRequest ||
                    !selectedItem ||
                    (selectedItem.units?.some(u => u.SerialNo && u.SerialNo.trim() !== "") &&
                      selectedUnits.length === 0) ||
                    (!(selectedItem.units?.some(u => u.SerialNo && u.SerialNo.trim() !== "")) &&
                      (!quantity || Number(quantity) <= 0))
                  }
                  className="w-full bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 transition disabled:bg-green-400 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Issue Items
                    </>
                  )}
                </button>
              </div>
            )}

            {!selectedItem && (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-3 text-green-300" />
                <p>Select an item to issue</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
