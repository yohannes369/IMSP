
// import React, { useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { FiPlus, FiMinus } from "react-icons/fi";

// // ✅ Socket.IO connection
// const socket = io("http://localhost:5000");

// // 🎨 Cal Poly colors
// const calPolyGreen = "#154734";
// const calPolyGold = "#C4820E";

// export default function ReturnItemPage() {
//   const [user_id, setUserId] = useState("");
//   const [first_name, setFirstName] = useState("");
//   const [last_name, setLastName] = useState("");
//   const [items, setItems] = useState([{ item_name: "", serial_number: "", quantity: 1 }]);

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = field === "quantity" ? parseInt(value) : value;
//     setItems(newItems);
//   };

//   const addItem = () =>
//     setItems([...items, { item_name: "", serial_number: "", quantity: 1 }]);

//   const removeItem = (index) =>
//     setItems(items.filter((_, i) => i !== index));

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       for (const item of items) {
//         if (!item.item_name || !item.serial_number || item.quantity < 1) continue;

//         const payload = {
//           user_id,
//           first_name,
//           last_name,
//           item_name: item.item_name,
//           serial_number: item.serial_number,
//           quantity: item.quantity,
//         };

//         await axios.post("http://localhost:5000/api/returns", payload);
//       }

//       setItems([{ item_name: "", serial_number: "", quantity: 1 }]);
//       alert("Return request submitted successfully ✅");
//     } catch (err) {
//       console.error("Error submitting return:", err);
//       alert("Failed to submit return ❌");
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       {/* Header */}
//       <div
//         className="text-white p-5 rounded-lg shadow mb-6"
//         style={{ background: calPolyGreen }}
//       >
//         <h2 className="text-2xl font-bold">Return Items</h2>
//         <p className="text-sm text-gray-200">Submit your returned items</p>
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6 bg-white p-6 rounded-xl shadow border border-gray-200"
//       >
//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             <label className="block font-medium text-gray-700">Staff ID</label>
//             <input
//               type="text"
//               value={user_id}
//               onChange={(e) => setUserId(e.target.value)}
//               className="border p-2 w-full rounded focus:ring-2 focus:ring-green-600"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium text-gray-700">First Name</label>
//             <input
//               type="text"
//               value={first_name}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="border p-2 w-full rounded focus:ring-2 focus:ring-green-600"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium text-gray-700">Last Name</label>
//             <input
//               type="text"
//               value={last_name}
//               onChange={(e) => setLastName(e.target.value)}
//               className="border p-2 w-full rounded focus:ring-2 focus:ring-green-600"
//               required
//             />
//           </div>
//         </div>

//         {/* Items */}
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-12 gap-2 items-end border p-4 rounded-lg bg-gray-50"
//           >
//             <div className="col-span-4">
//               <label className="block font-medium text-gray-700">Item Name</label>
//               <input
//                 type="text"
//                 value={item.item_name}
//                 onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
//                 className="border p-2 w-full rounded focus:ring-2 focus:ring-green-600"
//                 required
//               />
//             </div>

//             <div className="col-span-4">
//               <label className="block font-medium text-gray-700">Serial Number</label>
//               <input
//                 type="text"
//                 value={item.serial_number}
//                 onChange={(e) =>
//                   handleItemChange(index, "serial_number", e.target.value)
//                 }
//                 className="border p-2 w-full rounded focus:ring-2 focus:ring-green-600"
//                 required
//               />
//             </div>

//             <div className="col-span-2">
//               <label className="block font-medium text-gray-700">Quantity</label>
//               <input
//                 type="number"
//                 value={item.quantity}
//                 min={1}
//                 onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
//                 className="border p-2 w-full rounded focus:ring-2 focus:ring-green-600"
//                 required
//               />
//             </div>

//             <div className="col-span-2 flex gap-2">
//               {index === 0 ? (
//                 <button
//                   type="button"
//                   onClick={addItem}
//                   className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 mt-6"
//                 >
//                   <FiPlus /> Add
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => removeItem(index)}
//                   className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 mt-6"
//                 >
//                   <FiMinus /> Remove
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="w-full py-3 rounded-lg font-semibold text-white shadow hover:opacity-90"
//           style={{ background: calPolyGreen }}
//         >
//           Submit Returns
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiCheckSquare, FiSquare, FiSend } from "react-icons/fi";

// 🎨 Cal Poly colors
const calPolyGreen = "#154734";
const calPolyGold = "#C4820E";

export default function ReturnItemPage() {
  const [staffId, setStaffId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [issuedItems, setIssuedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch issued items
  const fetchIssuedItems = async () => {
    if (!staffId.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/model22/form");
      const allRecords = res.data.records || [];
      const filtered = allRecords.filter((r) => r.StaffID === staffId && r.ActionType === "ISSUE");
      setIssuedItems(filtered);
    } catch (err) {
      console.error("Error fetching issued items:", err);
      alert("Failed to fetch issued items ❌");
    }
    setLoading(false);
  };

  // ✅ Toggle item selection
  const toggleItemSelection = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.FormID === item.FormID);
      if (exists) {
        return prev.filter((i) => i.FormID !== item.FormID);
      } else {
        return [...prev, item];
      }
    });
  };

  // ✅ Submit return
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name || selectedItems.length === 0) {
      alert("Fill names and select at least one item ❌");
      return;
    }

    try {
      for (const item of selectedItems) {
        const payload = {
          user_id: staffId,
          first_name,
          last_name,
          item_name: item.ItemName,
          serial_number: item.SerialNo,
          quantity: item.Quantity,
        };

        await axios.post("http://localhost:5000/api/returns", payload);
      }

      setSelectedItems([]);
      alert("Return request submitted successfully ✅");
      fetchIssuedItems();
    } catch (err) {
      console.error("Error submitting return:", err);
      alert("Failed to submit return ❌");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-12 gap-6">
      {/* Left: Issued Items */}
      <div className="col-span-6 bg-white shadow rounded-lg p-5">
        <h2 className="text-lg font-bold mb-3 text-gray-800">Issued Items</h2>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Enter Staff ID..."
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={fetchIssuedItems}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Load
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : issuedItems.length === 0 ? (
          <p className="text-gray-500">No issued items found</p>
        ) : (
          <ul className="space-y-2 max-h-[500px] overflow-y-auto">
            {issuedItems.map((item) => {
              const selected = selectedItems.some((i) => i.FormID === item.FormID);
              return (
                <li
                  key={item.FormID}
                  className={`p-3 border rounded flex justify-between items-center cursor-pointer ${
                    selected ? "bg-green-100 border-green-400" : "hover:bg-gray-50"
                  }`}
                  onClick={() => toggleItemSelection(item)}
                >
                  <div>
                    <p className="font-semibold">{item.ItemName}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.Quantity} | S/N: {item.SerialNo || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Date: {new Date(item.ActionDate).toLocaleString()}
                    </p>
                  </div>
                  {selected ? (
                    <FiCheckSquare className="text-green-600 text-xl" />
                  ) : (
                    <FiSquare className="text-gray-400 text-xl" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Right: Return Form */}
      <div className="col-span-6 bg-white shadow rounded-lg p-5">
        <h2 className="text-lg font-bold mb-3 text-gray-800">Return Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
          </div>

          {/* Selected Items */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Items to Return:</h3>
            {selectedItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No items selected</p>
            ) : (
              <ul className="space-y-2">
                {selectedItems.map((item) => (
                  <li
                    key={item.FormID}
                    className="p-2 border rounded bg-gray-50 flex justify-between"
                  >
                    <span>
                      {item.ItemName} (Qty: {item.Quantity}, SN:{" "}
                      {item.SerialNo || "N/A"})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white shadow flex items-center justify-center gap-2"
            style={{ background: calPolyGreen }}
          >
            <FiSend /> Submit Return
          </button>
        </form>
      </div>
    </div>
  );
}
