


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Footer from "../../components/Footer/Footer";

// const AddItemPage = () => {
//   const [itemNames, setItemNames] = useState([]);
//   const [itemName, setItemName] = useState('');
//   const [serialNo, setSerialNo] = useState('');
//   const [description, setDescription] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchItemNames();
//   }, []);

//   const fetchItemNames = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axios.get('http://localhost:5000/api/items/items');
//       const data = res.data;

//       const uniqueNamesMap = new Map();
//       data.forEach(item => {
//         if (!uniqueNamesMap.has(item.name)) {
//           uniqueNamesMap.set(item.name, item);
//         }
//       });

//       setItemNames(Array.from(uniqueNamesMap.values()));
//       setIsLoading(false);
//     } catch (err) {
//       console.error('Failed to fetch item names:', err);
//       setError('Failed to fetch item names');
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setIsLoading(true);

//     try {
//       const payload = {
//         name: itemName.trim(),
//         serial_no: serialNo.trim(),
//         description: description.trim(),
//         quantity: parseInt(quantity, 10),
//         is_available: true,
//       };

//       const res = await axios.post('http://localhost:5000/api/items/add', payload);

//       setSuccess(res.data.message || 'Item added successfully!');
//       setItemName('');
//       setSerialNo('');
//       setDescription('');
//       setQuantity(1);

//       fetchItemNames();
//       setIsLoading(false);
//     } catch (err) {
//       console.error('Error adding item:', err.response?.data || err.message);
//       setError(err.response?.data?.message || 'Failed to add item. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Main Content */}
//       <main className="flex-grow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           {/* Header Section */}
//           <div className="text-center mb-12">
//             <h1 className="text-4xl font-extrabold text-calpoly-green mb-4">
//               Inventory Management System
//             </h1>
//             <div className="w-24 h-1 bg-calpoly-green mx-auto mb-4"></div>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Add new items to your inventory with this streamlined form
//             </p>
//           </div>

//           {/* Split Layout - Image on left, form on right */}
//           <div className="flex flex-col lg:flex-row gap-12">
//             {/* Image Section */}
//             <div className="lg:w-1/2">
//               <div className="relative h-full rounded-xl shadow-2xl overflow-hidden bg-calpoly-green">
//                 <div className="absolute inset-0 bg-calpoly-green opacity-90"></div>
//                 <img
//                   src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
//                   alt="Inventory management"
//                   className="w-full h-full object-cover mix-blend-overlay"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
//                   <div>
//                     <h2 className="text-3xl font-bold text-white mb-4">
//                       Cal Poly Inventory
//                     </h2>
//                     <p className="text-xl text-white opacity-90">
//                       Efficient, organized, and easy to use
//                     </p>
//                     <div className="mt-8">
//                       <div className="inline-flex items-center px-6 py-3 border border-white rounded-full text-white font-medium">
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                         </svg>
//                         Add New Items
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Form Section */}
//             <div className="lg:w-1/2">
//               <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
//                 {/* Form Header */}
//                 <div className="bg-calpoly-green py-5 px-6">
//                   <h2 className="text-2xl font-bold text-white">Add New Item</h2>
//                   <p className="text-calpoly-light-green">Fill out all required fields</p>
//                 </div>

//                 {/* Form Content */}
//                 <div className="p-6 md:p-8">
//                   {/* Status Messages */}
//                   {error && (
//                     <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <p className="text-red-700">{error}</p>
//                       </div>
//                     </div>
//                   )}

//                   {success && (
//                     <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <p className="text-green-700">{success}</p>
//                       </div>
//                     </div>
//                   )}

//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     {/* Item Name */}
//                     <div>
//                       <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 mb-1">
//                         Item Name <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           id="item-name"
//                           list="item-names-list"
//                           value={itemName}
//                           onChange={(e) => setItemName(e.target.value)}
//                           placeholder="Select or type a new item name"
//                           required
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calpoly-green focus:border-calpoly-green transition duration-200"
//                         />
//                         <datalist id="item-names-list">
//                           {itemNames.map((item) => (
//                             <option key={item.id} value={item.name} />
//                           ))}
//                         </datalist>
//                       </div>
//                     </div>

//                     {/* Serial Number */}
//                     <div>
//                       <label htmlFor="serial-no" className="block text-sm font-medium text-gray-700 mb-1">
//                         Serial Number <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         id="serial-no"
//                         type="text"
//                         value={serialNo}
//                         onChange={(e) => setSerialNo(e.target.value)}
//                         placeholder="Enter serial number"
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calpoly-green focus:border-calpoly-green transition duration-200"
//                       />
//                     </div>

//                     {/* Description */}
//                     <div>
//                       <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                         Description
//                       </label>
//                       <textarea
//                         id="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Enter description (optional)"
//                         rows={3}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calpoly-green focus:border-calpoly-green transition duration-200"
//                       />
//                     </div>

//                     {/* Quantity */}
//                     <div>
//                       <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
//                         Quantity <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         id="quantity"
//                         type="number"
//                         min={1}
//                         value={quantity}
//                         onChange={(e) => setQuantity(e.target.value)}
//                         required
//                         className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calpoly-green focus:border-calpoly-green transition duration-200"
//                       />
//                     </div>

//                     {/* Submit Button */}
//                     <div className="pt-4">
//                       <button
//                         type="submit"
//                         disabled={isLoading}
//                         className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-calpoly-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-calpoly-green transition duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
//                       >
//                         {isLoading ? (
//                           <>
//                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Processing...
//                           </>
//                         ) : (
//                           <>
//                             <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                             </svg>
//                             Add Item
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>

//               {/* Help Section */}
//               <div className="mt-8 bg-calpoly-light-green bg-opacity-10 border border-calpoly-light-green border-opacity-20 rounded-xl p-6">
//                 <h3 className="text-lg font-medium text-calpoly-green mb-4 flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Need Help?
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 mt-1">
//                       <svg className="h-5 w-5 text-calpoly-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium text-calpoly-green">Item Name:</span> Use existing names when possible to maintain consistency.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 mt-1">
//                       <svg className="h-5 w-5 text-calpoly-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium text-calpoly-green">Serial Number:</span> Must be unique for tracking purposes.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 mt-1">
//                       <svg className="h-5 w-5 text-calpoly-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium text-calpoly-green">Description:</span> Include details like model, specifications, or location.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default AddItemPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddItemPage = () => {
//   const [itemData, setItemData] = useState({
//     Name: "",
//     Model: "",
//     ShelfNumber: "",
//     UnitPriceBirr: "",
//     UnitPriceCent: "",
//     TotalQty: 1,
//     Remark: "",
//     units: [{ SerialNo: "", UnitPriceBirr: "", UnitPriceCent: "" }],
//   });

//   // Update item fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setItemData({ ...itemData, [name]: value });
//   };

//   // Update unit fields
//   const handleUnitChange = (index, e) => {
//     const { name, value } = e.target;
//     const units = [...itemData.units];
//     units[index][name] = value;
//     setItemData({ ...itemData, units });
//   };

//   // Add new unit
//   const addUnit = () => {
//     setItemData((prev) => ({
//       ...prev,
//       units: [...prev.units, { SerialNo: "", UnitPriceBirr: "", UnitPriceCent: "" }],
//     }));
//   };

//   // Remove unit
//   const removeUnit = (index) => {
//     setItemData((prev) => {
//       const newUnits = prev.units.filter((_, i) => i !== index);
//       return { ...prev, units: newUnits };
//     });
//   };

//   // Update TotalQty whenever units array changes
//   useEffect(() => {
//     setItemData((prev) => ({ ...prev, TotalQty: prev.units.length }));
//   }, [itemData.units]);

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3000/api/items/add", itemData);
//       alert(`Item added successfully! ItemID: ${response.data.itemID}`);
//       // Reset form
//       setItemData({
//         Name: "",
//         Model: "",
//         ShelfNumber: "",
//         UnitPriceBirr: "",
//         UnitPriceCent: "",
//         TotalQty:  "",
//         Remark: "",
//         units: [{ SerialNo: "", UnitPriceBirr: "", UnitPriceCent: "" }],
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Error adding item: " + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
//       <form
//         className="bg-white p-6 rounded shadow-md w-full max-w-3xl"
//         onSubmit={handleSubmit}
//       >
//         <h1 className="text-2xl font-bold mb-4">Add New Item</h1>

//         {/* Item Details */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="text"
//             name="Name"
//             placeholder="Item Name"
//             value={itemData.Name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="Model"
//             placeholder="Model"
//             value={itemData.Model}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="ShelfNumber"
//             placeholder="Shelf Number"
//             value={itemData.ShelfNumber}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             name="UnitPriceBirr"
//             placeholder="Unit Price Birr"
//             value={itemData.UnitPriceBirr}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="UnitPriceCent"
//             placeholder="Unit Price Cent"
//             value={itemData.UnitPriceCent}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="Remark"
//             placeholder="Remark"
//             value={itemData.Remark}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         {/* Total Quantity */}
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Total Quantity</label>
//           <input
//             type="number"
//             value={itemData.TotalQty}
//             readOnly
//             className="border p-2 rounded w-32 bg-gray-100"
//           />
//         </div>

//         {/* Units */}
//         <h2 className="text-xl font-semibold mb-2">Units</h2>
//         {itemData.units.map((unit, index) => (
//           <div key={index} className="flex gap-2 mb-2 items-center">
//             <input
//               type="text"
//               name="SerialNo"
//               placeholder="Serial No"
//               value={unit.SerialNo}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded flex-1"
//               required
//             />
//             <input
//               type="number"
//               name="UnitPriceBirr"
//               placeholder="Unit Price Birr"
//               value={unit.UnitPriceBirr}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded w-32"
//               required
//             />
//             <input
//               type="number"
//               name="UnitPriceCent"
//               placeholder="Unit Price Cent"
//               value={unit.UnitPriceCent}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded w-32"
//               required
//             />
//             {itemData.units.length > 1 && (
//               <button
//                 type="button"
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//                 onClick={() => removeUnit(index)}
//               >
//                 X
//               </button>
//             )}
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addUnit}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         >
//           Add Unit
//         </button>

//         <button
//           type="submit"
//           className="bg-green-500 text-white px-6 py-2 rounded"
//         >
//           Submit Item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddItemPage;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddItemPage = () => {
//   const [itemData, setItemData] = useState({
//     Name: "",
//     Model: "",
//     ShelfNumber: "",
//     UnitPriceBirr: 0,
//     UnitPriceCent: 0,
//     TotalQty: 1,
//     Remark: "",
//     units: [
//       { SerialNo: "SN001", Barcode: "BC001", UnitPriceBirr: 0, UnitPriceCent: 0 },
//     ],
//   });

//   // Update item fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setItemData((prev) => ({
//       ...prev,
//       [name]: name.includes("Price") || name === "TotalQty" ? Number(value) : value,
//     }));
//   };

//   // Generate units only when TotalQty increases
//   useEffect(() => {
//     const qty = itemData.TotalQty;
//     let units = [...itemData.units];

//     if (qty > units.length) {
//       for (let i = units.length; i < qty; i++) {
//         units.push({
//           SerialNo: `SN${String(i + 1).padStart(3, "0")}`,
//           Barcode: `BC${String(i + 1).padStart(3, "0")}`,
//           UnitPriceBirr: itemData.UnitPriceBirr,
//           UnitPriceCent: itemData.UnitPriceCent,
//         });
//       }
//     } else if (qty < units.length) {
//       units = units.slice(0, qty);
//     }

//     setItemData((prev) => ({ ...prev, units }));
//   }, [itemData.TotalQty, itemData.UnitPriceBirr, itemData.UnitPriceCent]);

//   // Update individual unit fields
//   const handleUnitChange = (index, e) => {
//     const { name, value } = e.target;
//     const units = [...itemData.units];
//     units[index][name] =
//       name.includes("Price") ? Number(value) : value;
//     setItemData({ ...itemData, units });
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/items/add",
//         itemData
//       );
//       alert(`Item added successfully! ItemID: ${response.data.itemID}`);

//       // Reset form
//       setItemData({
//         Name: "",
//         Model: "",
//         ShelfNumber: "",
//         UnitPriceBirr: 0,
//         UnitPriceCent: 0,
//         TotalQty: 1,
//         Remark: "",
//         units: [{ SerialNo: "SN001", Barcode: "BC001", UnitPriceBirr: 0, UnitPriceCent: 0 }],
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Error adding item: " + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
//       <form
//         className="bg-white p-6 rounded shadow-md w-full max-w-3xl"
//         onSubmit={handleSubmit}
//       >
//         <h1 className="text-2xl font-bold mb-4">Add New Item</h1>

//         {/* Item Details */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="text"
//             name="Name"
//             placeholder="Item Name"
//             value={itemData.Name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="Model"
//             placeholder="Model"
//             value={itemData.Model}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="ShelfNumber"
//             placeholder="Shelf Number"
//             value={itemData.ShelfNumber}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             name="UnitPriceBirr"
//             placeholder="Unit Price Birr"
//             value={itemData.UnitPriceBirr}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="UnitPriceCent"
//             placeholder="Unit Price Cent"
//             value={itemData.UnitPriceCent}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="Remark"
//             placeholder="Remark"
//             value={itemData.Remark}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             name="TotalQty"
//             placeholder="Total Quantity"
//             value={itemData.TotalQty}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             min="1"
//             required
//           />
//         </div>

//         {/* Units */}
//         <h2 className="text-xl font-semibold mb-2">Units</h2>
//         {itemData.units.map((unit, index) => (
//           <div key={index} className="flex gap-2 mb-2 items-center">
//             <input
//               type="text"
//               name="SerialNo"
//               placeholder={`Serial No #${index + 1}`}
//               value={unit.SerialNo}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded flex-1"
//               required
//             />
//             <input
//               type="text"
//               name="Barcode"
//               placeholder={`Barcode #${index + 1}`}
//               value={unit.Barcode}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded flex-1"
//               required
//             />
//             <input
//               type="number"
//               name="UnitPriceBirr"
//               placeholder="Unit Price Birr"
//               value={unit.UnitPriceBirr}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded w-32"
//               required
//             />
//             <input
//               type="number"
//               name="UnitPriceCent"
//               placeholder="Unit Price Cent"
//               value={unit.UnitPriceCent}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded w-32"
//               required
//             />
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="bg-green-500 text-white px-6 py-2 rounded mt-4"
//         >
//           Submit Item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddItemPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddItemPage = () => {
//   const [itemData, setItemData] = useState({
//     Name: "",
//     Model: "",
//     ShelfNumber: "",
//     UnitPriceBirr: 0,
//     UnitPriceCent: 0,
//     TotalQty: 1,
//     Remark: "",
//     Description: "",
//     units: [
//       { SerialNo: "SN001", Barcode: "BC001", UnitPriceBirr: 0, UnitPriceCent: 0 },
//     ],
//   });

//   // Calculate total price
//   const totalPrice = () => {
//     return (
//       itemData.TotalQty *
//       (Number(itemData.UnitPriceBirr) + Number(itemData.UnitPriceCent) / 100)
//     ).toFixed(2);
//   };

//   // Update item fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setItemData((prev) => ({
//       ...prev,
//       [name]: name.includes("Price") || name === "TotalQty" ? Number(value) : value,
//     }));
//   };

//   // Generate units automatically whenever TotalQty changes
//   useEffect(() => {
//     const qty = itemData.TotalQty;
//     let units = [...itemData.units];

//     if (qty > units.length) {
//       for (let i = units.length; i < qty; i++) {
//         units.push({
//           SerialNo: `SN${String(i + 1).padStart(3, "0")}`,
//           Barcode: `BC${String(i + 1).padStart(3, "0")}`,
//           UnitPriceBirr: itemData.UnitPriceBirr,
//           UnitPriceCent: itemData.UnitPriceCent,
//         });
//       }
//     } else if (qty < units.length) {
//       units = units.slice(0, qty);
//     }

//     setItemData((prev) => ({ ...prev, units }));
//   }, [itemData.TotalQty, itemData.UnitPriceBirr, itemData.UnitPriceCent]);

//   // Update individual unit fields (if needed)
//   const handleUnitChange = (index, e) => {
//     const { name, value } = e.target;
//     const units = [...itemData.units];
//     units[index][name] = name.includes("Price") ? Number(value) : value;
//     setItemData({ ...itemData, units });
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/items/add",
//         itemData
//       );
//       alert(`Item added successfully! ItemID: ${response.data.itemID}`);

//       // Reset form
//       setItemData({
//         Name: "",
//         Model: "",
//         ShelfNumber: "",
//         UnitPriceBirr: 0,
//         UnitPriceCent: 0,
//         TotalQty: 1,
//         Remark: "",
//         Description: "",
//         units: [
//           { SerialNo: "SN001", Barcode: "BC001", UnitPriceBirr: 0, UnitPriceCent: 0 },
//         ],
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Error adding item: " + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
//       <form
//         className="bg-white p-6 rounded shadow-md w-full max-w-3xl"
//         onSubmit={handleSubmit}
//       >
//         <h1 className="text-2xl font-bold mb-4">Add New Item</h1>

//         {/* Item Details */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="text"
//             name="Name"
//             placeholder="Item Name"
//             value={itemData.Name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="Model"
//             placeholder="Model"
//             value={itemData.Model}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="ShelfNumber"
//             placeholder="Shelf Number"
//             value={itemData.ShelfNumber}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             name="UnitPriceBirr"
//             placeholder="Unit Price Birr"
//             value={itemData.UnitPriceBirr}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="UnitPriceCent"
//             placeholder="Unit Price Cent"
//             value={itemData.UnitPriceCent}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="Remark"
//             placeholder="Remark"
//             value={itemData.Remark}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="Description"
//             placeholder="Description (optional)"
//             value={itemData.Description}
//             onChange={handleChange}
//             className="border p-2 rounded col-span-2"
//           />
//           <input
//             type="number"
//             name="TotalQty"
//             placeholder="Total Quantity"
//             value={itemData.TotalQty}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             min="1"
//             required
//           />
//         </div>

//         {/* Show Total Price */}
//         <div className="mb-4">
//           <label className="block font-semibold mb-1">Total Price</label>
//           <input
//             type="text"
//             value={totalPrice()}
//             readOnly
//             className="border p-2 rounded w-48 bg-gray-100"
//           />
//         </div>

//         {/* Units (display only, auto-generated) */}
//         <h2 className="text-xl font-semibold mb-2">Units</h2>
//         {itemData.units.map((unit, index) => (
//           <div key={index} className="flex gap-2 mb-2 items-center">
//             <input
//               type="text"
//               name="SerialNo"
//               placeholder={`Serial No #${index + 1}`}
//               value={unit.SerialNo}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded flex-1"
//               required
//             />
//             <input
//               type="text"
//               name="Barcode"
//               placeholder={`Barcode #${index + 1}`}
//               value={unit.Barcode}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded flex-1"
//               required
//             />
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="bg-green-500 text-white px-6 py-2 rounded mt-4"
//         >
//           Submit Item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddItemPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // connect to backend

const AddItemPage = () => {
  const [itemData, setItemData] = useState({
    Name: "",
    Model: "",
    ShelfNumber: "",
    UnitPriceBirr: 0,
    UnitPriceCent: 0,
    TotalQty: 1,
    Remark: "",
    Description: "",
    units: [{ SerialNo: "SN001", Barcode: "BC001", UnitPriceBirr: 0, UnitPriceCent: 0 }],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const totalPrice = () =>
    (itemData.TotalQty * (Number(itemData.UnitPriceBirr) + Number(itemData.UnitPriceCent) / 100)).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: name.includes("Price") || name === "TotalQty" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    const qty = itemData.TotalQty;
    let units = [...itemData.units];
    if (qty > units.length) {
      for (let i = units.length; i < qty; i++) {
        units.push({
          SerialNo: `SN${String(i + 1).padStart(3, "0")}`,
          Barcode: `BC${String(i + 1).padStart(3, "0")}`,
          UnitPriceBirr: itemData.UnitPriceBirr,
          UnitPriceCent: itemData.UnitPriceCent,
        });
      }
    } else if (qty < units.length) units = units.slice(0, qty);
    setItemData((prev) => ({ ...prev, units }));
  }, [itemData.TotalQty, itemData.UnitPriceBirr, itemData.UnitPriceCent]);

  const handleUnitChange = (index, e) => {
    const { name, value } = e.target;
    const units = [...itemData.units];
    units[index][name] = name.includes("Price") ? Number(value) : value;
    setItemData({ ...itemData, units });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:5000/api/items/add", itemData);
      setSuccess(`✅ Item added successfully! ItemID: ${response.data.itemID}`);
      socket.emit("newItemAdded", response.data); // optional, server already emits

      setItemData({
        Name: "",
        Model: "",
        ShelfNumber: "",
        UnitPriceBirr: 0,
        UnitPriceCent: 0,
        TotalQty: 1,
        Remark: "",
        Description: "",
        units: [{ SerialNo: "SN001", Barcode: "BC001", UnitPriceBirr: 0, UnitPriceCent: 0 }],
      });
    } catch (err) {
      setError(err.response?.data?.message || "❌ Error adding item.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-3xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
        {success && <div className="mb-4 p-3 rounded bg-green-100 text-green-700">{success}</div>}
        {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{error}</div>}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="text" name="Name" placeholder="Item Name" value={itemData.Name} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="Model" placeholder="Model" value={itemData.Model} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="ShelfNumber" placeholder="Shelf Number" value={itemData.ShelfNumber} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="UnitPriceBirr" placeholder="Unit Price Birr" value={itemData.UnitPriceBirr} onChange={handleChange} className="border p-2 rounded" required />
          <input type="number" name="UnitPriceCent" placeholder="Unit Price Cent" value={itemData.UnitPriceCent} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="Remark" placeholder="Remark" value={itemData.Remark} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="Description" placeholder="Description" value={itemData.Description} onChange={handleChange} className="border p-2 rounded col-span-2" />
          <input type="number" name="TotalQty" placeholder="Total Quantity" value={itemData.TotalQty} onChange={handleChange} className="border p-2 rounded" min="1" required />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Total Price</label>
          <input type="text" value={totalPrice()} readOnly className="border p-2 rounded w-48 bg-gray-100" />
        </div>

        <h2 className="text-xl font-semibold mb-2">Units</h2>
        {itemData.units.map((unit, index) => (
          <div key={index} className="flex gap-2 mb-2 items-center">
            <input type="text" name="SerialNo" placeholder={`Serial No #${index + 1}`} value={unit.SerialNo} onChange={(e) => handleUnitChange(index, e)} className="border p-2 rounded flex-1" required />
            <input type="text" name="Barcode" placeholder={`Barcode #${index + 1}`} value={unit.Barcode} onChange={(e) => handleUnitChange(index, e)} className="border p-2 rounded flex-1" required />
          </div>
        ))}

        
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded mt-4"
        >
          Submit Item
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
