
// // AddItemPage.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

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
//     Category: "General",
//     unit_type: "piece", // default unit
//     IsReturnable: false,
//     units: [
//       {
//         SerialNo: "",
//         Barcode: "BC001",
//         UnitPriceBirr: 0,
//         UnitPriceCent: 0,
//       },
//     ],
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const totalPrice = () =>
//     (
//       itemData.TotalQty *
//       (Number(itemData.UnitPriceBirr) + Number(itemData.UnitPriceCent) / 100)
//     ).toFixed(2);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setItemData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : name.includes("Price") || name === "TotalQty"
//           ? Number(value)
//           : value,
//     }));
//   };

//   const handleUnitChange = (index, e) => {
//     const { name, value } = e.target;
//     const units = [...itemData.units];
//     units[index][name] = name.includes("Price") ? Number(value) : value;
//     setItemData({ ...itemData, units });
//   };

//   useEffect(() => {
//     const qty = itemData.TotalQty;
//     let units = [...itemData.units];
//     if (qty > units.length) {
//       for (let i = units.length; i < qty; i++) {
//         units.push({
//           SerialNo: "",
//           Barcode: `BC${String(i + 1).padStart(3, "0")}`,
//           UnitPriceBirr: itemData.UnitPriceBirr,
//           UnitPriceCent: itemData.UnitPriceCent,
//         });
//       }
//     } else if (qty < units.length) units = units.slice(0, qty);
//     setItemData((prev) => ({ ...prev, units }));
//   }, [itemData.TotalQty, itemData.UnitPriceBirr, itemData.UnitPriceCent]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const payload = {
//         Name: itemData.Name,
//         Model: itemData.Model,
//         ShelfNumber: itemData.ShelfNumber,
//         UnitPriceBirr: itemData.UnitPriceBirr,
//         UnitPriceCent: itemData.UnitPriceCent,
//         TotalQty: itemData.TotalQty,
//         Remark: itemData.Remark,
//         Description: itemData.Description,
//         Category: itemData.Category || "General",
//         unit_type: itemData.unit_type,
//         IsReturnable: itemData.IsReturnable ? 1 : 0,
//         units: itemData.units,
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/items/add",
//         payload
//       );

//       setSuccess(`✅ Item added successfully! ItemID: ${response.data.itemID}`);
//       socket.emit("newItemAdded", response.data);

//       setItemData({
//         Name: "",
//         Model: "",
//         ShelfNumber: "",
//         UnitPriceBirr: 0,
//         UnitPriceCent: 0,
//         TotalQty: 1,
//         Remark: "",
//         Description: "",
//         Category: "General",
//         unit_type: "piece",
//         IsReturnable: false,
//         units: [
//           {
//             SerialNo: "",
//             Barcode: "BC001",
//             UnitPriceBirr: 0,
//             UnitPriceCent: 0,
//           },
//         ],
//       });
//     } catch (err) {
//       setError(err.response?.data?.message || "❌ Error adding item.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
//       <form
//         className="bg-white p-6 rounded shadow-md w-full max-w-3xl"
//         onSubmit={handleSubmit}
//       >
//         <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
//         {success && (
//           <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
//             {success}
//           </div>
//         )}
//         {error && (
//           <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
//             {error}
//           </div>
//         )}

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
//             placeholder="Description"
//             value={itemData.Description}
//             onChange={handleChange}
//             className="border p-2 rounded col-span-2"
//           />

//           {/* Category Dropdown */}
//           <select
//             name="Category"
//             value={itemData.Category}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="General">General</option>
//             <option value="Electronics">Electronics</option>
//             <option value="Software">Software & Licenses</option>
//             <option value="Furniture">Furniture</option>
//             <option value="Stationery">Stationery & Office Supplies</option>
//             <option value="Laboratory">Laboratory Equipment</option>
//             <option value="Tools">Tools & Consumables</option>
//             <option value="Vehicles">Vehicles & Spare Parts</option>
//             <option value="Networking">Networking & Communication</option>
//             <option value="Safety">Safety & Protective Gear</option>
//           </select>

//           {/* Unit Type Dropdown */}
//           <select
//             name="unit_type"
//             value={itemData.unit_type}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="piece">Piece</option>
//             <option value="pack">Pack</option>
//             <option value="packet">Packet</option>
//             <option value="box">Box</option>
//             <option value="dozen">Dozen</option>
//             <option value="kg">Kg</option>
//             <option value="liter">Liter</option>
//             <option value="meter">Meter</option>
//             <option value="number">Number</option>
//             <option value="birr">Birr</option>
//           </select>

//           {/* IsReturnable Checkbox */}
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="IsReturnable"
//               checked={itemData.IsReturnable}
//               onChange={handleChange}
//             />
//             Returnable
//           </label>

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

//         <div className="mb-4">
//           <label className="block font-semibold mb-1">Total Price</label>
//           <input
//             type="text"
//             value={totalPrice()}
//             readOnly
//             className="border p-2 rounded w-48 bg-gray-100"
//           />
//         </div>

//         <h2 className="text-xl font-semibold mb-2">Units</h2>
//         {itemData.units.map((unit, index) => (
//           <div key={index} className="flex gap-2 mb-2 items-center">
//             <input
//               type="text"
//               name="SerialNo"
//               placeholder={`Serial No #${index + 1} (optional)`}
//               value={unit.SerialNo}
//               onChange={(e) => handleUnitChange(index, e)}
//               className="border p-2 rounded flex-1"
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
// AddItemPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

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
    Category: "General",
    unit_type: "piece",
    IsReturnable: false,
    units: [
      {
        SerialNo: "",
        Barcode: "BC001",
        UnitPriceBirr: 0,
        UnitPriceCent: 0,
      },
    ],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const totalPrice = () =>
    (
      itemData.TotalQty *
      (Number(itemData.UnitPriceBirr) + Number(itemData.UnitPriceCent) / 100)
    ).toFixed(2);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name.includes("Price") || name === "TotalQty"
          ? Number(value)
          : value,
    }));
  };

  const handleUnitChange = (index, e) => {
    const { name, value } = e.target;
    const units = [...itemData.units];
    units[index][name] = name.includes("Price") ? Number(value) : value;
    setItemData({ ...itemData, units });
  };

  useEffect(() => {
    const qty = itemData.TotalQty;
    let units = [...itemData.units];
    if (qty > units.length) {
      for (let i = units.length; i < qty; i++) {
        units.push({
          SerialNo: "",
          Barcode: `BC${String(i + 1).padStart(3, "0")}`,
          UnitPriceBirr: itemData.UnitPriceBirr,
          UnitPriceCent: itemData.UnitPriceCent,
        });
      }
    } else if (qty < units.length) units = units.slice(0, qty);
    setItemData((prev) => ({ ...prev, units }));
  }, [itemData.TotalQty, itemData.UnitPriceBirr, itemData.UnitPriceCent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const payload = {
        Name: itemData.Name,
        Model: itemData.Model,
        ShelfNumber: itemData.ShelfNumber,
        UnitPriceBirr: itemData.UnitPriceBirr,
        UnitPriceCent: itemData.UnitPriceCent,
        TotalQty: itemData.TotalQty,
        Remark: itemData.Remark,
        Description: itemData.Description,
        Category: itemData.Category || "General",
        unit_type: itemData.unit_type,
        IsReturnable: itemData.IsReturnable ? 1 : 0,
        units: itemData.units,
      };

      const response = await axios.post(
        "http://localhost:5000/api/items/add",
        payload
      );

      setSuccess(`Item added successfully! ItemID: ${response.data.itemID}`);
      socket.emit("newItemAdded", response.data);

      setItemData({
        Name: "",
        Model: "",
        ShelfNumber: "",
        UnitPriceBirr: 0,
        UnitPriceCent: 0,
        TotalQty: 1,
        Remark: "",
        Description: "",
        Category: "General",
        unit_type: "piece",
        IsReturnable: false,
        units: [
          {
            SerialNo: "",
            Barcode: "BC001",
            UnitPriceBirr: 0,
            UnitPriceCent: 0,
          },
        ],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error adding item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-[#0B6623] px-6 py-5 border-b border-[#084C1C]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Add New Inventory Item</h1>
                <p className="text-green-100 mt-1">Complete the form below to add a new item to inventory</p>
              </div>
              <div className="bg-green-800 text-white text-sm font-medium px-3 py-1 rounded-full">
                Required *
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                type="button"
                onClick={() => setActiveTab("basic")}
                className={`py-4 px-6 text-center font-medium text-sm border-b-2 ${
                  activeTab === "basic"
                    ? "border-[#0B6623] text-[#0B6623]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Basic Information
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("pricing")}
                className={`py-4 px-6 text-center font-medium text-sm border-b-2 ${
                  activeTab === "pricing"
                    ? "border-[#0B6623] text-[#0B6623]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pricing & Quantity
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("units")}
                className={`py-4 px-6 text-center font-medium text-sm border-b-2 ${
                  activeTab === "units"
                    ? "border-[#0B6623] text-[#0B6623]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Unit Details
              </button>
            </nav>
          </div>
          
          <form className="p-6" onSubmit={handleSubmit}>
            {/* Status Messages */}
            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Success</h3>
                    <p className="mt-1 text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <p className="mt-1 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Basic Information Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={itemData.Name}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                      required
                      placeholder="e.g., Laptop, Monitor, Keyboard"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                    <input
                      type="text"
                      name="Model"
                      value={itemData.Model}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                      placeholder="e.g., XPS 13, MX Keys"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Number</label>
                    <input
                      type="text"
                      name="ShelfNumber"
                      value={itemData.ShelfNumber}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                      placeholder="e.g., A-12, B-07"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="Category"
                      value={itemData.Category}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                    >
                      <option value="General">General</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Software">Software & Licenses</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Stationery">Stationery & Office Supplies</option>
                      <option value="Laboratory">Laboratory Equipment</option>
                      <option value="Tools">Tools & Consumables</option>
                      <option value="Vehicles">Vehicles & Spare Parts</option>
                      <option value="Networking">Networking & Communication</option>
                      <option value="Safety">Safety & Protective Gear</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit Type</label>
                    <select
                      name="unit_type"
                      value={itemData.unit_type}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                    >
                      <option value="piece">Piece</option>
                      <option value="pack">Pack</option>
                      <option value="packet">Packet</option>
                      <option value="box">Box</option>
                      <option value="dozen">Dozen</option>
                      <option value="kg">Kg</option>
                      <option value="liter">Liter</option>
                      <option value="meter">Meter</option>
                      <option value="number">Number</option>
                      <option value="birr">Birr</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <div className="flex items-center h-10">
                      <input
                        type="checkbox"
                        name="IsReturnable"
                        checked={itemData.IsReturnable}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#0B6623] focus:ring-[#0B6623] border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        Returnable Item
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="Description"
                    value={itemData.Description}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                    placeholder="Provide a detailed description of the item"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
                  <input
                    type="text"
                    name="Remark"
                    value={itemData.Remark}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                    placeholder="Additional notes or comments"
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("pricing")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0B6623] hover:bg-[#084C1C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B6623]"
                  >
                    Next: Pricing & Quantity
                    <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* Pricing & Quantity Tab */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Price (Birr) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">ETB</span>
                      </div>
                      <input
                        type="number"
                        name="UnitPriceBirr"
                        value={itemData.UnitPriceBirr}
                        onChange={handleChange}
                        className="block w-full pl-12 rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Price (Cent) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="UnitPriceCent"
                      value={itemData.UnitPriceCent}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                      required
                      min="0"
                      max="99"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="TotalQty"
                      value={itemData.TotalQty}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-3 border"
                      min="1"
                      required
                    />
                  </div>
                </div>
                
                <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Total Value</h2>
                    <div className="text-2xl font-bold text-[#0B6623]">{totalPrice()} ETB</div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {itemData.TotalQty} units × ({itemData.UnitPriceBirr} ETB + {itemData.UnitPriceCent} cents)
                  </p>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("basic")}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B6623]"
                  >
                    <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Basic Info
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("units")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0B6623] hover:bg-[#084C1C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B6623]"
                  >
                    Next: Unit Details
                    <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* Unit Details Tab */}
            {activeTab === "units" && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Unit Details</h3>
                      <p className="mt-1 text-sm text-blue-700">
                        Each unit will be added to inventory with the following details. Barcodes are automatically generated but can be customized.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto p-1">
                  {itemData.units.map((unit, index) => (
                    <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                        <span className="bg-[#0B6623] text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                          Unit #{index + 1}
                        </span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number (Optional)</label>
                          <input
                            type="text"
                            name="SerialNo"
                            value={unit.SerialNo}
                            onChange={(e) => handleUnitChange(index, e)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-2.5 border"
                            placeholder="Enter serial number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Barcode <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="Barcode"
                            value={unit.Barcode}
                            onChange={(e) => handleUnitChange(index, e)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0B6623] focus:ring-[#0B6623] sm:text-sm p-2.5 border"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("pricing")}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B6623]"
                  >
                    <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Pricing
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#0B6623] hover:bg-[#084C1C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B6623] disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Item...
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Add Item to Inventory
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;