

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";

// const ClerkPage = () => {
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // ✅ Connect to Socket.IO server
//   useEffect(() => {
//     const socket = io("http://localhost:5000");
//     socket.on("newItemAdded", (newItem) => {
//       setItems((prevItems) => [...prevItems, { ...newItem, units: [] }]);
//     });
//     return () => socket.disconnect();
//   }, []);

//   // ✅ Fetch all items
//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/api/items/items");
//       setItems(response.data || []);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || err.message);
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch single item with units
//   const fetchItemById = async (id) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://localhost:5000/api/items/items/${id}`
//       );
//       setSelectedItem(response.data || null);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || err.message);
//       setLoading(false);
//     }
//   };

//   // ✅ Delete item
//   const deleteItem = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/items/items/${id}`);
//       setItems((prev) => prev.filter((item) => item.ItemID !== id));
//       setSelectedItem(null);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   // ✅ Calculate total price
//   const calculateTotalPrice = (item) => {
//     if (!item) return { birr: 0, cent: 0 };
//     const totalCent = item.UnitPriceCent * item.TotalQty;
//     const extraBirr = Math.floor(totalCent / 100);
//     const remainingCent = totalCent % 100;
//     const totalBirr = item.UnitPriceBirr * item.TotalQty + extraBirr;
//     return { birr: totalBirr, cent: remainingCent };
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const totalPrice = calculateTotalPrice(selectedItem);

//   // ✅ Group items by category
//   const groupedItems = items.reduce((groups, item) => {
//     const category = item.Category || "General";
//     if (!groups[category]) groups[category] = [];
//     groups[category].push(item);
//     return groups;
//   }, {});

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Inventory Management
//       </h1>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {!loading && !error && (
//         <div className="flex gap-6">
//           {/* Items grouped by category */}
//           <div className="w-1/3">
//             <h2 className="font-semibold mb-2 text-lg text-gray-700">
//               Items List
//             </h2>
//             <div className="bg-white p-4 rounded shadow-md max-h-[80vh] overflow-y-auto">
//               {Object.keys(groupedItems).map((category) => (
//                 <div key={category} className="mb-4">
//                   <h3 className="font-bold text-gray-600 border-b mb-2">
//                     {category}
//                   </h3>
//                   <ul>
//                     {groupedItems[category].map((item) => (
//                       <li
//                         key={item.ItemID}
//                         className="cursor-pointer hover:bg-gray-200 p-2 rounded flex justify-between"
//                         onClick={() => fetchItemById(item.ItemID)}
//                       >
//                         <span>
//                           {item.ItemName} ({item.Model})
//                         </span>
//                         <span className="text-gray-500">
//                           {item.TotalQty} ({item.unit_type || "Unit"})
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Selected item details */}
//           <div className="w-2/3">
//             {selectedItem ? (
//               <div className="bg-white p-6 rounded shadow-md space-y-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-2xl font-semibold text-gray-800">
//                     {selectedItem.ItemName} ({selectedItem.Model})
//                   </h2>
//                   <span
//                     className={`px-3 py-1 rounded text-sm ${
//                       selectedItem.IsReturnable
//                         ? "bg-green-100 text-green-700"
//                         : "bg-gray-200 text-gray-600"
//                     }`}
//                   >
//                     {selectedItem.IsReturnable ? "Returnable" : "Not Returnable"}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 text-gray-700">
//                   <p>
//                     <strong>Shelf Number:</strong> {selectedItem.ShelfNumber}
//                   </p>
//                   <p>
//                     <strong>Total Quantity:</strong> {selectedItem.TotalQty} (
//                     {selectedItem.unit_type || "Unit"})
//                   </p>
//                   <p>
//                     <strong>Remark:</strong> {selectedItem.Remark}
//                   </p>
//                   <p>
//                     <strong>Unit Price:</strong> {selectedItem.UnitPriceBirr}{" "}
//                     Birr {selectedItem.UnitPriceCent} Cent
//                   </p>
//                   <p>
//                     <strong>Total Price:</strong> {totalPrice.birr} Birr{" "}
//                     {totalPrice.cent} Cent
//                   </p>
//                 </div>

//                 {/* Action buttons */}
//                 <div className="flex gap-4 mt-4">
//                   <button
//                     onClick={() =>
//                       navigate(`/Clerk/update-item/:id/${selectedItem.ItemID}`)
//                     }
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     Edit Item
//                   </button>
//                   <button
//                     onClick={() => deleteItem(selectedItem.ItemID)}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Delete Item
//                   </button>
//                 </div>

//                 {/* Units table */}
//                 {selectedItem.units?.length > 0 && (
//                   <>
//                     <h3 className="font-semibold mt-4 mb-2 text-gray-700">
//                       Units
//                       {selectedItem.units.some((u) => u.SerialNo)
//                         ? " (Serial Tracked)"
//                         : " (Non-Serial)"}
//                     </h3>
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full border border-gray-300">
//                         <thead>
//                           <tr className="bg-gray-200 text-gray-700">
//                             <th className="border px-2 py-1">UnitID</th>
//                             <th className="border px-2 py-1">Serial No</th>
//                             <th className="border px-2 py-1">Status</th>
//                             <th className="border px-2 py-1">Assigned To</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {selectedItem.units
//                             // ✅ For non-serial items, filter by AssignedTo non-empty
//                             .filter(
//                               (u) =>
//                                 u.SerialNo || (u.AssignedTo && u.AssignedTo !== "")
//                             )
//                             .map((unit) => (
//                               <tr key={unit.UnitID}>
//                                 <td className="border px-2 py-1">{unit.UnitID}</td>
//                                 <td className="border px-2 py-1">
//                                   {unit.SerialNo || "-"}
//                                 </td>
//                                 <td className="border px-2 py-1">{unit.Status}</td>
//                                 <td className="border px-2 py-1">{unit.AssignedTo || "-"}</td>
//                               </tr>
//                             ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <p className="text-gray-600">Select an item to view details</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClerkPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const ClerkPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterReturnable, setFilterReturnable] = useState("all");
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [stats, setStats] = useState({
    totalItems: 0,
    returnableItems: 0,
    nonReturnableItems: 0,
    totalValue: { birr: 0, cent: 0 }
  });
  const navigate = useNavigate();

  // Socket connection for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("newItemAdded", (newItem) => {
      setItems((prevItems) => [...prevItems, { ...newItem, units: [] }]);
    });
    return () => socket.disconnect();
  }, []);

  // Fetch all items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/items/items");
      setItems(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  // Calculate statistics
  useEffect(() => {
    if (items.length > 0) {
      const returnableItems = items.filter(item => item.IsReturnable).length;
      const nonReturnableItems = items.length - returnableItems;
      
      // Calculate total inventory value
      let totalBirr = 0;
      let totalCent = 0;
      
      items.forEach(item => {
        const itemTotal = calculateTotalPrice(item);
        totalBirr += itemTotal.birr;
        totalCent += itemTotal.cent;
      });
      
      // Convert excess cents to birr
      const extraBirr = Math.floor(totalCent / 100);
      totalBirr += extraBirr;
      totalCent = totalCent % 100;
      
      setStats({
        totalItems: items.length,
        returnableItems,
        nonReturnableItems,
        totalValue: { birr: totalBirr, cent: totalCent }
      });
    }
  }, [items]);

  // Extract unique categories from items
  useEffect(() => {
    const uniqueCategories = [...new Set(items.map(item => item.Category || "Uncategorized"))];
    setCategories(uniqueCategories);
    
    // Initialize all categories as expanded
    const initialExpandedState = {};
    uniqueCategories.forEach(category => {
      initialExpandedState[category] = true;
    });
    setExpandedCategories(initialExpandedState);
  }, [items]);

  // Fetch single item with units
  const fetchItemById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/items/items/${id}`
      );
      setSelectedItem(response.data || null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/items/items/${id}`);
      setItems((prev) => prev.filter((item) => item.ItemID !== id));
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  // Calculate total price
  const calculateTotalPrice = (item) => {
    if (!item) return { birr: 0, cent: 0 };
    const totalCent = item.UnitPriceCent * item.TotalQty;
    const extraBirr = Math.floor(totalCent / 100);
    const remainingCent = totalCent % 100;
    const totalBirr = item.UnitPriceBirr * item.TotalQty + extraBirr;
    return { birr: totalBirr, cent: remainingCent };
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Toggle expand all categories
  const toggleExpandAll = () => {
    const allExpanded = Object.values(expandedCategories).every(val => val);
    const newState = {};
    categories.forEach(category => {
      newState[category] = !allExpanded;
    });
    setExpandedCategories(newState);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const totalPrice = calculateTotalPrice(selectedItem);

  // Filter items based on search and filters
  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.Model && item.Model.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === "all" || item.Category === filterCategory;
    
    const matchesReturnable = filterReturnable === "all" || 
      (filterReturnable === "returnable" && item.IsReturnable) ||
      (filterReturnable === "non-returnable" && !item.IsReturnable);
    
    return matchesSearch && matchesCategory && matchesReturnable;
  });

  // Group items by category
  const groupedItems = filteredItems.reduce((groups, item) => {
    const category = item.Category || "Uncategorized";
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Inventory Management System</h1>
            <p className="text-gray-600 mt-1">Manage your inventory items efficiently</p>
          </div>
          <button
            onClick={() => navigate("/Clerk/add-item")}
            className="mt-4 md:mt-0 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center shadow-md transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add New Item
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Returnable</p>
                <p className="text-2xl font-bold text-gray-800">{stats.returnableItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Non-Returnable</p>
                <p className="text-2xl font-bold text-gray-800">{stats.nonReturnableItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalValue.birr} Birr {stats.totalValue.cent} Cent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Items</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Returnable Status</label>
              <select
                value={filterReturnable}
                onChange={(e) => setFilterReturnable(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Items</option>
                <option value="returnable">Returnable Only</option>
                <option value="non-returnable">Non-Returnable Only</option>
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Items List */}
            <div className="w-full lg:w-2/5">
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg text-gray-800">
                    Items ({filteredItems.length})
                  </h2>
                  <button 
                    onClick={toggleExpandAll}
                    className="text-sm text-green-600 hover:text-green-800 font-medium"
                  >
                    {Object.values(expandedCategories).every(val => val) ? 'Collapse All' : 'Expand All'}
                  </button>
                </div>
                
                <div className="max-h-[70vh] overflow-y-auto pr-2">
                  {Object.keys(groupedItems).length > 0 ? (
                    Object.keys(groupedItems).map((category) => (
                      <div key={category} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                        <div 
                          className="flex justify-between items-center p-3 bg-green-50 cursor-pointer"
                          onClick={() => toggleCategory(category)}
                        >
                          <h3 className="font-medium text-gray-800 flex items-center">
                            <svg 
                              className={`w-4 h-4 mr-2 transform transition-transform ${expandedCategories[category] ? 'rotate-90' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                            {category} 
                            <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                              {groupedItems[category].length}
                            </span>
                          </h3>
                          <svg 
                            className={`w-4 h-4 transform transition-transform ${expandedCategories[category] ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                        
                        {expandedCategories[category] && (
                          <ul className="divide-y divide-gray-100">
                            {groupedItems[category].map((item) => (
                              <li
                                key={item.ItemID}
                                className={`cursor-pointer p-3 transition-all flex justify-between items-center ${
                                  selectedItem?.ItemID === item.ItemID
                                    ? "bg-green-50 border-l-4 border-green-600"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => fetchItemById(item.ItemID)}
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-gray-800">
                                    {item.ItemName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.Model}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold">
                                    {item.TotalQty} {item.unit_type || "Unit"}
                                  </div>
                                  <div
                                    className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                                      item.IsReturnable
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {item.IsReturnable ? "Returnable" : "Non-Returnable"}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16"></path>
                      </svg>
                      <p className="text-gray-500">No items found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Item Details Panel */}
            <div className="w-full lg:w-3/5">
              {selectedItem ? (
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                        {selectedItem.ItemName}
                      </h2>
                      <p className="text-gray-600">{selectedItem.Model}</p>
                    </div>
                    <div className="flex flex-col items-end mt-2 md:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                          selectedItem.IsReturnable
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {selectedItem.IsReturnable ? "Returnable" : "Not Returnable"}
                      </span>
                      {selectedItem.Category && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {selectedItem.Category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-600 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                        </svg>
                        Basic Information
                      </h3>
                      <p><span className="font-semibold">Shelf Number:</span> {selectedItem.ShelfNumber}</p>
                      <p><span className="font-semibold">Total Quantity:</span> {selectedItem.TotalQty} ({selectedItem.unit_type || "Unit"})</p>
                      <p><span className="font-semibold">Remark:</span> {selectedItem.Remark || "N/A"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-600 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Pricing Information
                      </h3>
                      <p><span className="font-semibold">Unit Price:</span> {selectedItem.UnitPriceBirr} Birr {selectedItem.UnitPriceCent} Cent</p>
                      <p><span className="font-semibold">Total Value:</span> 
                        <span className="text-green-700 font-semibold"> {totalPrice.birr} Birr {totalPrice.cent} Cent</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <button
                      onClick={() =>
                        navigate(`/Clerk/update-item/${selectedItem.ItemID}`)
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center shadow-md"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit Item
                    </button>
                    <button
                      onClick={() => deleteItem(selectedItem.ItemID)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Delete Item
                    </button>
                  </div>

                  {/* Units table */}
                  {selectedItem.units?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        Unit Details
                        {selectedItem.units.some((u) => u.SerialNo)
                          ? " (Serial Tracked)"
                          : " (Non-Serial)"}
                      </h3>
                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-green-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Unit ID</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Serial No</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Status</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Assigned To</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {selectedItem.units
                              .filter(
                                (u) =>
                                  u.SerialNo || (u.AssignedTo && u.AssignedTo !== "")
                              )
                              .map((unit) => (
                                <tr key={unit.UnitID} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{unit.UnitID}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    {unit.SerialNo || "-"}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      unit.Status === 'Available' 
                                        ? 'bg-green-100 text-green-800' 
                                        : unit.Status === 'In Use'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {unit.Status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    {unit.AssignedTo || "-"}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No item selected</h3>
                  <p className="mt-2 text-gray-500">Select an item from the list to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClerkPage;