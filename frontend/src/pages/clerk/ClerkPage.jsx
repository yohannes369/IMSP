
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { QRCodeCanvas } from "qrcode.react";
// import { io } from "socket.io-client";
// import {
//   PrinterIcon,
//   PlusCircleIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   SearchIcon,
//   PackageIcon,
// } from "lucide-react";
// import Footer from "../../components/Footer/Footer"; // ✅ custom footer

// // Connect to Socket.IO backend
// const socket = io("http://localhost:5000");

// const ClerkPage = () => {
//   const [items, setItems] = useState([]);
//   const [groupedItems, setGroupedItems] = useState({});
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4; // ✅ max 4 items per page

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();

//     // Listen for real-time new items
//     socket.on("new_item", (newItem) => {
//       setItems((prev) => [newItem, ...prev]);
//       setGroupedItems((prev) => {
//         const newGrouped = { ...prev };
//         newGrouped[newItem.name] ??= [];
//         newGrouped[newItem.name].unshift(newItem);
//         return newGrouped;
//       });
//     });

//     return () => {
//       socket.off("new_item");
//     };
//   }, []);

//   const fetchItems = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axios.get("http://localhost:5000/api/items/items");
//       const data = res.data;

//       const grouped = {};
//       data.forEach((item) => {
//         grouped[item.name] ??= [];
//         grouped[item.name].push(item);
//       });

//       setItems(data);
//       setGroupedItems(grouped);
//       setIsLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch items");
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this item?"
//     );
//     if (!confirmDelete) return;

//     try {
//       setError("");
//       setSuccess("");
//       setIsLoading(true);

//       await axios.delete(`http://localhost:5000/api/items/items/${id}`);

//       const newItems = items.filter((item) => item.id !== id);
//       const newGrouped = {};
//       newItems.forEach((item) => {
//         newGrouped[item.name] ??= [];
//         newGrouped[item.name].push(item);
//       });

//       setItems(newItems);
//       setGroupedItems(newGrouped);
//       setIsLoading(false);
//       setSuccess("Item deleted successfully.");
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       console.error("Failed to delete item:", err);
//       setError("Failed to delete item. Try again later.");
//       setIsLoading(false);
//     }
//   };

//   const handleUpdate = (id) => {
//     navigate(`/Clerk/update-item/${id}`);
//   };

//   const handleAddItem = () => {
//     navigate("/Clerk/add-item");
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A";
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     return date.toLocaleDateString();
//   };

//   const printQRCode = (item) => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>QR Code - ${item.name}</title>
//           <style>
//             body { text-align: center; padding: 20px; font-family: Arial; }
//             h3 { margin-bottom: 5px; }
//             p { margin: 5px 0; }
//             .qr-container { margin: 20px auto; }
//           </style>
//         </head>
//         <body>
//           <h3>${item.name}</h3>
//           <p>Serial: ${item.serial_no}</p>
//           <p>Quantity: ${item.quantity}</p>
//           <div class="qr-container">
//             <img src="${document
//               .getElementById(`qr-${item.id}`)
//               .toDataURL()}" width="200" height="200">
//           </div>
//           <p>${new Date().toLocaleDateString()}</p>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//   };

//   const filteredGroups = Object.entries(groupedItems)
//     .filter(
//       ([name, items]) =>
//         name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         items.some((item) =>
//           item.serial_no.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     )
//     .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const totalPages = Math.ceil(
//     Object.entries(groupedItems).filter(
//       ([name, items]) =>
//         name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         items.some((item) =>
//           item.serial_no.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     ).length / itemsPerPage
//   );

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="flex-grow p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold flex items-center">
//               <PackageIcon className="mr-2" /> Inventory Management
//             </h1>
//             <button
//               onClick={handleAddItem}
//               className="flex items-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
//             >
//               <PlusCircleIcon className="mr-2" /> Add Item
//             </button>
//           </div>

//           {/* Search */}
//           <div className="mb-6 relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <SearchIcon className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search by item name or serial number..."
//               className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>

//           {/* Alerts */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
//               {success}
//             </div>
//           )}

//           {/* Table */}
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Serial No
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Description
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Quantity
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         QR Code
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Created At
//                       </th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredGroups.length > 0 ? (
//                       filteredGroups.map(([name, items]) =>
//                         items.map((item, idx) => (
//                           <tr
//                             key={item.id}
//                             className={
//                               idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                             }
//                           >
//                             {idx === 0 && (
//                               <td
//                                 rowSpan={items.length}
//                                 className="px-6 py-4 font-medium"
//                               >
//                                 {name}
//                               </td>
//                             )}
//                             <td className="px-6 py-4">{item.serial_no}</td>
//                             <td className="px-6 py-4">
//                               {item.description || "N/A"}
//                             </td>
//                             <td className="px-6 py-4">{item.quantity}</td>
//                             <td className="px-6 py-4">
//                               <span
//                                 className={`px-2 py-1 rounded-full text-xs ${
//                                   item.is_available
//                                     ? "bg-green-100 text-green-800"
//                                     : "bg-red-100 text-red-800"
//                                 }`}
//                               >
//                                 {item.is_available
//                                   ? "Available"
//                                   : "Unavailable"}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4">
//                               <div className="flex flex-col items-center">
//                                 <QRCodeCanvas
//                                   id={`qr-${item.id}`}
//                                   value={JSON.stringify({
//                                     name: item.name,
//                                     serial_no: item.serial_no,
//                                     description: item.description,
//                                     quantity: item.quantity,
//                                     is_available: item.is_available,
//                                   })}
//                                   size={80}
//                                 />
//                                 <button
//                                   onClick={() => printQRCode(item)}
//                                   className="mt-2 flex items-center text-xs text-green-700 hover:text-green-900"
//                                 >
//                                   <PrinterIcon className="h-3 w-3 mr-1" /> Print
//                                 </button>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4">
//                               {formatDate(item.created_at)}
//                             </td>
//                             <td className="px-6 py-4 text-right space-x-2">
//                               <button
//                                 onClick={() => handleUpdate(item.id)}
//                                 className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() => handleDelete(item.id)}
//                                 className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       )
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="8"
//                           className="px-6 py-4 text-center text-gray-500"
//                         >
//                           {searchTerm
//                             ? "No items match your search"
//                             : "No items found"}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Pagination */}
//           {filteredGroups.length > 0 && (
//             <div className="mt-4 flex justify-between items-center">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`flex items-center px-3 py-1 rounded ${
//                   currentPage === 1
//                     ? "text-gray-400 cursor-not-allowed"
//                     : "text-green-700 hover:bg-green-100"
//                 }`}
//               >
//                 <ChevronLeftIcon className="h-4 w-4 mr-1" /> Previous
//               </button>
//               <span className="text-sm text-gray-700">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className={`flex items-center px-3 py-1 rounded ${
//                   currentPage === totalPages
//                     ? "text-gray-400 cursor-not-allowed"
//                     : "text-green-700 hover:bg-green-100"
//                 }`}
//               >
//                 Next <ChevronRightIcon className="h-4 w-4 ml-1" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ✅ Custom Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default ClerkPage
// ;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const ClerkPage = () => {
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Connect to Socket.IO server
//   useEffect(() => {
//     const socket = io("http://localhost:5000"); // your backend URL
//     socket.on("newItemAdded", (newItem) => {
//       setItems((prevItems) => [...prevItems, { ...newItem, units: [] }]);
//     });

//     return () => socket.disconnect(); // cleanup
//   }, []);

//   // Fetch all items
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

//   // Fetch single item by ID along with all units
//   const fetchItemById = async (id) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:5000/api/items/items/${id}`);
//       setSelectedItem(response.data || null);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || err.message);
//       setLoading(false);
//     }
//   };

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

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Inventory Management</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && (
//         <div className="flex gap-6">
//           {/* Items list */}
//           <div className="w-1/3">
//             <h2 className="font-semibold mb-2 text-lg">Items List</h2>
//             <ul className="bg-white p-4 rounded shadow-md max-h-[80vh] overflow-y-auto">
//               {items.map((item) => (
//                 <li
//                   key={item.ItemID}
//                   className="cursor-pointer hover:bg-gray-200 p-2 rounded flex justify-between"
//                   onClick={() => fetchItemById(item.ItemID)}
//                 >
//                   <span>{item.ItemName} ({item.Model})</span>
//                   <span className="text-gray-500">{item.TotalQty}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Selected item details */}
//           <div className="w-2/3">
//             {selectedItem ? (
//               <div className="bg-white p-6 rounded shadow-md space-y-4">
//                 <h2 className="text-2xl font-semibold">
//                   {selectedItem.ItemName} ({selectedItem.Model})
//                 </h2>
//                 <div className="grid grid-cols-2 gap-4">
//                   <p><strong>Shelf Number:</strong> {selectedItem.ShelfNumber}</p>
//                   <p><strong>Total Quantity:</strong> {selectedItem.TotalQty}</p>
//                   <p><strong>Remark:</strong> {selectedItem.Remark}</p>
//                   <p>
//                     <strong>Unit Price:</strong> {selectedItem.UnitPriceBirr} Birr {selectedItem.UnitPriceCent} Cent
//                   </p>
//                   <p>
//                     <strong>Total Price:</strong> {totalPrice.birr} Birr {totalPrice.cent} Cent
//                   </p>
//                 </div>

//                 {/* Units table */}
//                 <h3 className="font-semibold mt-4 mb-2">Units</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full border border-gray-300">
//                     <thead>
//                       <tr className="bg-gray-200">
//                         <th className="border px-2 py-1">UnitID</th>
//                         <th className="border px-2 py-1">Serial No</th>
//                         <th className="border px-2 py-1">Unit Price Birr</th>
//                         <th className="border px-2 py-1">Unit Price Cent</th>
//                         <th className="border px-2 py-1">Total Price</th>
//                         <th className="border px-2 py-1">Status</th>
//                         <th className="border px-2 py-1">Assigned To</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedItem.units?.length > 0 ? (
//                         selectedItem.units.map((unit) => (
//                           <tr key={unit.UnitID}>
//                             <td className="border px-2 py-1">{unit.UnitID}</td>
//                             <td className="border px-2 py-1">{unit.SerialNo}</td>
//                             <td className="border px-2 py-1">{unit.UnitPriceBirr}</td>
//                             <td className="border px-2 py-1">{unit.UnitPriceCent}</td>
//                             <td className="border px-2 py-1">{unit.TotalPrice}</td>
//                             <td className="border px-2 py-1">{unit.Status}</td>
//                             <td className="border px-2 py-1">{unit.AssignedTo || "-"}</td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="7" className="text-center p-2">No units available</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ) : (
//               <p>Select an item to view details</p>
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
import { useNavigate } from "react-router-dom"; // For navigation

const ClerkPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Connect to Socket.IO server
  useEffect(() => {
    const socket = io("http://localhost:5000"); // your backend URL
    socket.on("newItemAdded", (newItem) => {
      setItems((prevItems) => [...prevItems, { ...newItem, units: [] }]);
    });

    return () => socket.disconnect(); // cleanup
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

  // Fetch single item by ID along with all units
  const fetchItemById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/items/items/${id}`);
      setSelectedItem(response.data || null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  // Delete an item
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

  const calculateTotalPrice = (item) => {
    if (!item) return { birr: 0, cent: 0 };
    const totalCent = item.UnitPriceCent * item.TotalQty;
    const extraBirr = Math.floor(totalCent / 100);
    const remainingCent = totalCent % 100;
    const totalBirr = item.UnitPriceBirr * item.TotalQty + extraBirr;
    return { birr: totalBirr, cent: remainingCent };
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const totalPrice = calculateTotalPrice(selectedItem);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Inventory Management</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex gap-6">
          {/* Items list */}
          <div className="w-1/3">
            <h2 className="font-semibold mb-2 text-lg">Items List</h2>
            <ul className="bg-white p-4 rounded shadow-md max-h-[80vh] overflow-y-auto">
              {items.map((item) => (
                <li
                  key={item.ItemID}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded flex justify-between"
                  onClick={() => fetchItemById(item.ItemID)}
                >
                  <span>{item.ItemName} ({item.Model})</span>
                  <span className="text-gray-500">{item.TotalQty}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Selected item details */}
          <div className="w-2/3">
            {selectedItem ? (
              <div className="bg-white p-6 rounded shadow-md space-y-4">
                <h2 className="text-2xl font-semibold">
                  {selectedItem.ItemName} ({selectedItem.Model})
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <p><strong>Shelf Number:</strong> {selectedItem.ShelfNumber}</p>
                  <p><strong>Total Quantity:</strong> {selectedItem.TotalQty}</p>
                  <p><strong>Remark:</strong> {selectedItem.Remark}</p>
                  <p>
                    <strong>Unit Price:</strong> {selectedItem.UnitPriceBirr} Birr {selectedItem.UnitPriceCent} Cent
                  </p>
                  <p>
                    <strong>Total Price:</strong> {totalPrice.birr} Birr {totalPrice.cent} Cent
                  </p>
                </div>

                {/* Update & Delete buttons */}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => navigate(`/Clerk/update-item/:id/${selectedItem.ItemID}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit Item
                  </button>
                  <button
                    onClick={() => deleteItem(selectedItem.ItemID)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete Item
                  </button>
                </div>

                {/* Units table */}
                <h3 className="font-semibold mt-4 mb-2">Units</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border px-2 py-1">UnitID</th>
                        <th className="border px-2 py-1">Serial No</th>
                        <th className="border px-2 py-1">Unit Price Birr</th>
                        <th className="border px-2 py-1">Unit Price Cent</th>
                        <th className="border px-2 py-1">Total Price</th>
                        <th className="border px-2 py-1">Status</th>
                        <th className="border px-2 py-1">Assigned To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItem.units?.length > 0 ? (
                        selectedItem.units.map((unit) => (
                          <tr key={unit.UnitID}>
                            <td className="border px-2 py-1">{unit.UnitID}</td>
                            <td className="border px-2 py-1">{unit.SerialNo}</td>
                            <td className="border px-2 py-1">{unit.UnitPriceBirr}</td>
                            <td className="border px-2 py-1">{unit.UnitPriceCent}</td>
                            <td className="border px-2 py-1">{unit.TotalPrice}</td>
                            <td className="border px-2 py-1">{unit.Status}</td>
                            <td className="border px-2 py-1">{unit.AssignedTo || "-"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center p-2">No units available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p>Select an item to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClerkPage;
