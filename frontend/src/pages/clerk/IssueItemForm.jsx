

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function IssueItemForm() {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [selectedUnits, setSelectedUnits] = useState([]);
//   const [quantity, setQuantity] = useState('');
//   const [remark, setRemark] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch approved requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/requests');
//         const data = await res.json();
//         setRequests(Array.isArray(data) ? data.filter(r => r.status === 'APPROVED') : []);
//       } catch (err) {
//         console.error('Error fetching requests:', err);
//         setRequests([]);
//       }
//     };
//     fetchRequests();
//   }, []);

//   // Fetch all items
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/items/items');
//         setItems(res.data || []);
//       } catch (err) {
//         console.error('Error fetching items:', err);
//         setItems([]);
//       }
//     };
//     fetchItems();
//   }, []);

//   const handleRequestChange = (e) => {
//     const requestID = e.target.value;
//     if (!requestID) {
//       setSelectedRequest(null);
//       clearItemSelection();
//       return;
//     }
//     const req = requests.find(r => r.request_id === Number(requestID));
//     setSelectedRequest(req || null);
//     if (req) setQuantity(req.quantity ?? '');
//   };

//   const handleItemChange = (e) => {
//     const itemID = e.target.value;
//     if (!itemID) {
//       clearItemSelection();
//       return;
//     }
//     const item = items.find(i => i.ItemID === Number(itemID));
//     setSelectedItem(item || null);
//     setSelectedUnits([]);
//   };

//   const clearItemSelection = () => {
//     setSelectedItem(null);
//     setSelectedUnits([]);
//   };

//   const handleUnitCheckbox = (unitID) => {
//     setSelectedUnits(prev =>
//       prev.includes(unitID) ? prev.filter(id => id !== unitID) : [...prev, unitID]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedRequest || !selectedItem || selectedUnits.length === 0) {
//       setMessage('Please select request, item, and at least one unit');
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         RequestID: selectedRequest.request_id,
//         ItemID: selectedItem.ItemID,
//         UnitIDs: selectedUnits.map(id => Number(id)),
//         Quantity: Number(quantity),
//         Remark: remark
//       };

//       const res = await axios.post('http://localhost:5000/api/model22/issue', payload);

//       // safely handle FormIDs
//       const formIDs = res.data?.FormIDs || [];
//       setMessage(`Successfully issued ${selectedUnits.length} unit(s). FormIDs: ${formIDs.join(', ') || 'N/A'}`);

//       // Reset form
//       setSelectedRequest(null);
//       clearItemSelection();
//       setQuantity('');
//       setRemark('');
//     } catch (err) {
//       console.error(err);
//       setMessage('Server error while issuing units');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Issue Item</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         {/* Request Select */}
//         <div>
//           <label className="block mb-1 font-medium">Select Approved Request:</label>
//           <select
//             value={selectedRequest?.request_id || ''}
//             onChange={handleRequestChange}
//             className="w-full border rounded p-2"
//           >
//             <option value="">--Select Request--</option>
//             {requests.map(req => (
//               <option key={req.request_id} value={req.request_id}>
//                 {req.request_id} - {req.staff_id} ({req.fname} {req.lname})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Item Select */}
//         <div>
//           <label className="block mb-1 font-medium">Select Item:</label>
//           <select
//             value={selectedItem?.ItemID || ''}
//             onChange={handleItemChange}
//             className="w-full border rounded p-2"
//           >
//             <option value="">--Select Item--</option>
//             {items.map(item => (
//               <option key={item.ItemID} value={item.ItemID}>
//                 {item.ItemName} ({item.Model})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Units */}
//         {selectedItem?.units?.length > 0 && (
//           <div>
//             <label className="block mb-1 font-medium">Select Units:</label>
//             <div className="space-y-1">
//               {selectedItem.units.map(unit => (
//                 <div key={unit.UnitID} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={unit.UnitID}
//                     checked={selectedUnits.includes(unit.UnitID)}
//                     onChange={() => handleUnitCheckbox(unit.UnitID)}
//                   />
//                   <span>{unit.SerialNo} - Status: {unit.Status}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Quantity */}
//         <div>
//           <label className="block mb-1 font-medium">Quantity:</label>
//           <input
//             type="number"
//             value={quantity}
//             onChange={e => setQuantity(e.target.value)}
//             required
//             className="w-full border rounded p-2"
//           />
//         </div>

//         {/* Remark */}
//         <div>
//           <label className="block mb-1 font-medium">Remark:</label>
//           <input
//             type="text"
//             value={remark}
//             onChange={e => setRemark(e.target.value)}
//             className="w-full border rounded p-2"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`px-4 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//         >
//           {loading ? 'Issuing...' : 'Issue Item'}
//         </button>
//       </form>

//       {message && <p className="mt-3 text-green-700 font-medium">{message}</p>}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Package, Users, CheckCircle, AlertCircle } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState('all');

  const itemCategories = [
    { id: 'electronics', name: 'Electronics', icon: '💻' },
    { id: 'office', name: 'Office Supplies', icon: '📋' },
    { id: 'furniture', name: 'Furniture', icon: '🪑' },
    { id: 'tools', name: 'Tools & Equipment', icon: '🔧' },
    { id: 'other', name: 'Other', icon: '📦' }
  ];

  useEffect(() => {
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
    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items/items');
        setItems(res.data || []);
      } catch (err) {
        console.error('Error fetching items:', err);
        setItems([]);
      }
    };
    fetchItems();
  }, []);

  const filteredRequests = requests.filter(req =>
    `${req.fname} ${req.lname}`.toLowerCase().includes(searchRequest.toLowerCase()) ||
    req.staff_id.toLowerCase().includes(searchRequest.toLowerCase()) ||
    req.request_id.toString().includes(searchRequest)
  );

  const filteredItems = items.filter(item => {
    const matchesSearch = item.ItemName.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.Model.toLowerCase().includes(searchItem.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.Category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
    if (request.quantity) setQuantity(request.quantity.toString());
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSelectedUnits([]);
  };

  const handleUnitToggle = (unitID) => {
    setSelectedUnits(prev =>
      prev.includes(unitID) ? prev.filter(id => id !== unitID) : [...prev, unitID]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRequest || !selectedItem || selectedUnits.length === 0) {
      alert("Please select request, item, and at least one unit");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        RequestID: selectedRequest.request_id,
        ItemID: selectedItem.ItemID,
        UnitIDs: selectedUnits.map(id => Number(id)),
        Quantity: Number(quantity),
        Remark: remark
      };

      const res = await axios.post('http://localhost:5000/api/model22/issue', payload);
      const formIDs = res.data?.FormIDs || [];

      alert(`Successfully issued ${selectedUnits.length} unit(s). FormIDs: ${formIDs.join(', ') || 'N/A'}`);

      setSelectedRequest(null);
      setSelectedItem(null);
      setSelectedUnits([]);
      setQuantity('');
      setRemark('');
    } catch (err) {
      console.error(err);
      alert("Server error while issuing units");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Stock Flow Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            Professional inventory management system for efficient item issuing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Selection */}
          <div className="p-6 bg-white shadow rounded">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Select Request</h2>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search by name, ID, or request number..."
                value={searchRequest}
                onChange={(e) => setSearchRequest(e.target.value)}
                className="pl-10 border rounded w-full p-2"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredRequests.map(req => (
                <div
                  key={req.request_id}
                  className={`p-4 cursor-pointer border rounded transition-all ${
                    selectedRequest?.request_id === req.request_id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-400'
                  }`}
                  onClick={() => handleRequestSelect(req)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">#{req.request_id}</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <h3 className="font-medium">{req.fname} {req.lname}</h3>
                  <p className="text-sm text-gray-500">ID: {req.staff_id}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Item Selection */}
          <div className="p-6 bg-white shadow rounded">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Select Item</h2>
            </div>

            <div className="mb-4 flex gap-2 flex-wrap">
              <button type="button" className={`px-3 py-1 rounded text-sm ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setSelectedCategory('all')}>All</button>
              {itemCategories.map(cat => (
                <button key={cat.id} type="button" className={`px-3 py-1 rounded text-sm ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setSelectedCategory(cat.id)}>
                  {cat.icon} {cat.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search items..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="pl-10 border rounded w-full p-2"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredItems.map(item => (
                <div
                  key={item.ItemID}
                  className={`p-4 cursor-pointer border rounded transition-all ${
                    selectedItem?.ItemID === item.ItemID
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-400'
                  }`}
                  onClick={() => handleItemSelect(item)}
                >
                  <h3 className="font-medium mb-1">{item.ItemName}</h3>
                  <p className="text-sm text-gray-500 mb-2">Model: {item.Model}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{item.units?.length || 0} units</span>
                    {item.Category && (
                      <span className="text-xs text-gray-600">{itemCategories.find(c => c.id === item.Category)?.icon} {item.Category}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issue Details */}
          <div className="p-6 bg-white shadow rounded">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Issue Details</h2>
            </div>

            {selectedRequest && (
              <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-200">
                <h3 className="font-medium text-blue-700 mb-1">Selected Request</h3>
                <p className="text-sm">{selectedRequest.fname} {selectedRequest.lname}</p>
                <p className="text-xs text-gray-500">#{selectedRequest.request_id}</p>
              </div>
            )}

            {selectedItem && (
              <div className="mb-6">
                <div className="p-4 bg-blue-50 rounded border border-blue-200 mb-4">
                  <h3 className="font-medium text-blue-700 mb-1">Selected Item</h3>
                  <p className="text-sm">{selectedItem.ItemName}</p>
                  <p className="text-xs text-gray-500">{selectedItem.Model}</p>
                </div>

                {selectedItem.units && selectedItem.units.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-3 block">Select Units:</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedItem.units.map(unit => (
                        <div key={unit.UnitID} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-400">
                          <input
                            type="checkbox"
                            checked={selectedUnits.includes(unit.UnitID)}
                            onChange={() => handleUnitToggle(unit.UnitID)}
                          />
                          <div className="flex-1">
                            <span className="text-sm">{unit.SerialNo}</span>
                            <p className="text-xs text-gray-500">Status: {unit.Status}</p>
                          </div>
                          {unit.Status === 'Available' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {unit.Status !== 'Available' && (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  min="1"
                  className="mt-1 border rounded w-full p-2"
                />
              </div>

              <div>
                <label htmlFor="remark" className="block text-sm font-medium">Remark (Optional)</label>
                <input
                  id="remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Add any additional notes..."
                  className="mt-1 border rounded w-full p-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !selectedRequest || !selectedItem || selectedUnits.length === 0}
                className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
              >
                {loading ? 'Processing...' : `Issue ${selectedUnits.length || 0} Unit(s)`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
