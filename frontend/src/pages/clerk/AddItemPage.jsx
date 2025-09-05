

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // connect to backend

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
//     units: [{ SerialNo: "SN001", Barcode: "BC001", UnitPriceBirr: 0, UnitPriceCent: 0 }],
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const totalPrice = () =>
//     (itemData.TotalQty * (Number(itemData.UnitPriceBirr) + Number(itemData.UnitPriceCent) / 100)).toFixed(2);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setItemData((prev) => ({
//       ...prev,
//       [name]: name.includes("Price") || name === "TotalQty" ? Number(value) : value,
//     }));
//   };

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
//     } else if (qty < units.length) units = units.slice(0, qty);
//     setItemData((prev) => ({ ...prev, units }));
//   }, [itemData.TotalQty, itemData.UnitPriceBirr, itemData.UnitPriceCent]);

//   const handleUnitChange = (index, e) => {
//     const { name, value } = e.target;
//     const units = [...itemData.units];
//     units[index][name] = name.includes("Price") ? Number(value) : value;
//     setItemData({ ...itemData, units });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     try {
//       const response = await axios.post("http://localhost:5000/api/items/add", itemData);
//       setSuccess(`✅ Item added successfully! ItemID: ${response.data.itemID}`);
//       socket.emit("newItemAdded", response.data); // optional, server already emits

//       setItemData({
//         Name: "",
//         Model: "",
//         ShelfNumber: "",
//         UnitPriceBirr: 0,
//         UnitPriceCent: 0,
//         TotalQty: 1,
//         Remark: "",
//         Description: "",
//         units: [{ SerialNo: "SN001", Barcode: "BC001", UnitPriceBirr: 0, UnitPriceCent: 0 }],
//       });
//     } catch (err) {
//       setError(err.response?.data?.message || "❌ Error adding item.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
//       <form className="bg-white p-6 rounded shadow-md w-full max-w-3xl" onSubmit={handleSubmit}>
//         <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
//         {success && <div className="mb-4 p-3 rounded bg-green-100 text-green-700">{success}</div>}
//         {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{error}</div>}

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input type="text" name="Name" placeholder="Item Name" value={itemData.Name} onChange={handleChange} className="border p-2 rounded" required />
//           <input type="text" name="Model" placeholder="Model" value={itemData.Model} onChange={handleChange} className="border p-2 rounded" />
//           <input type="text" name="ShelfNumber" placeholder="Shelf Number" value={itemData.ShelfNumber} onChange={handleChange} className="border p-2 rounded" />
//           <input type="number" name="UnitPriceBirr" placeholder="Unit Price Birr" value={itemData.UnitPriceBirr} onChange={handleChange} className="border p-2 rounded" required />
//           <input type="number" name="UnitPriceCent" placeholder="Unit Price Cent" value={itemData.UnitPriceCent} onChange={handleChange} className="border p-2 rounded" required />
//           <input type="text" name="Remark" placeholder="Remark" value={itemData.Remark} onChange={handleChange} className="border p-2 rounded" />
//           <input type="text" name="Description" placeholder="Description" value={itemData.Description} onChange={handleChange} className="border p-2 rounded col-span-2" />
//           <input type="number" name="TotalQty" placeholder="Total Quantity" value={itemData.TotalQty} onChange={handleChange} className="border p-2 rounded" min="1" required />
//         </div>

//         <div className="mb-4">
//           <label className="block font-semibold mb-1">Total Price</label>
//           <input type="text" value={totalPrice()} readOnly className="border p-2 rounded w-48 bg-gray-100" />
//         </div>

//         <h2 className="text-xl font-semibold mb-2">Units</h2>
//         {itemData.units.map((unit, index) => (
//           <div key={index} className="flex gap-2 mb-2 items-center">
//             <input type="text" name="SerialNo" placeholder={`Serial No #${index + 1}`} value={unit.SerialNo} onChange={(e) => handleUnitChange(index, e)} className="border p-2 rounded flex-1" required />
//             <input type="text" name="Barcode" placeholder={`Barcode #${index + 1}`} value={unit.Barcode} onChange={(e) => handleUnitChange(index, e)} className="border p-2 rounded flex-1" required />
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
    Category: "General",    // ✅ new
    IsReturnable: true,     // ✅ new
    units: [
      {
        SerialNo: "",      // optional now
        Barcode: "BC001",
        UnitPriceBirr: 0,
        UnitPriceCent: 0,
      },
    ],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  useEffect(() => {
    const qty = itemData.TotalQty;
    let units = [...itemData.units];
    if (qty > units.length) {
      for (let i = units.length; i < qty; i++) {
        units.push({
          SerialNo: "",       // optional
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
      const response = await axios.post(
        "http://localhost:5000/api/items/add",
        itemData
      );
      setSuccess(
        `✅ Item added successfully! ItemID: ${response.data.itemID}`
      );
      socket.emit("newItemAdded", response.data);

      // Reset form
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
        IsReturnable: true,
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
      setError(err.response?.data?.message || "❌ Error adding item.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-3xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
        {success && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="Name"
            placeholder="Item Name"
            value={itemData.Name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="Model"
            placeholder="Model"
            value={itemData.Model}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="ShelfNumber"
            placeholder="Shelf Number"
            value={itemData.ShelfNumber}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="UnitPriceBirr"
            placeholder="Unit Price Birr"
            value={itemData.UnitPriceBirr}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="UnitPriceCent"
            placeholder="Unit Price Cent"
            value={itemData.UnitPriceCent}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="Remark"
            placeholder="Remark"
            value={itemData.Remark}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="Description"
            placeholder="Description"
            value={itemData.Description}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />

          {/* Category Dropdown */}
          <select
            name="Category"
            value={itemData.Category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="General">General</option>
            <option value="Electronics">Electronics</option>
            <option value="Software">Software</option>
            <option value="Furniture">Furniture</option>
            <option value="Stationery">Stationery</option>
          </select>

          {/* IsReturnable Checkbox */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="IsReturnable"
              checked={itemData.IsReturnable}
              onChange={handleChange}
            />
            Returnable
          </label>

          <input
            type="number"
            name="TotalQty"
            placeholder="Total Quantity"
            value={itemData.TotalQty}
            onChange={handleChange}
            className="border p-2 rounded"
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Total Price</label>
          <input
            type="text"
            value={totalPrice()}
            readOnly
            className="border p-2 rounded w-48 bg-gray-100"
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">Units</h2>
        {itemData.units.map((unit, index) => (
          <div key={index} className="flex gap-2 mb-2 items-center">
            <input
              type="text"
              name="SerialNo"
              placeholder={`Serial No #${index + 1} (optional)`}
              value={unit.SerialNo}
              onChange={(e) => handleUnitChange(index, e)}
              className="border p-2 rounded flex-1"
            />
            <input
              type="text"
              name="Barcode"
              placeholder={`Barcode #${index + 1}`}
              value={unit.Barcode}
              onChange={(e) => handleUnitChange(index, e)}
              className="border p-2 rounded flex-1"
              required
            />
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
