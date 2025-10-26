
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const InventoryReport = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [counters, setCounters] = useState(["", "", ""]); // Three counters

//   // Fetch items from API
//   const fetchItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/items/items");
//       const data = response.data;

//       const processedItems = data.map((item) => ({
//         item_id: item.ItemID ?? item.id ?? 0,
//         item_name: item.ItemName ?? item.name ?? "-",
//         model: item.Model ?? item.model ?? "-",
//         available_qty: item.TotalQty ?? 0,
//         counted_qty: 0,
//         difference: item.TotalQty ?? 0,
//       }));

//       setItems(processedItems);
//       setLoading(false);
//     } catch (err) {
//       console.error("Fetch Items Error:", err);
//       setError("Failed to fetch items");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // Update counted quantity and difference
//   const handleCountChange = (index, value) => {
//     const updatedItems = [...items];
//     const counted = parseInt(value) || 0;
//     updatedItems[index].counted_qty = counted;
//     updatedItems[index].difference = updatedItems[index].available_qty - counted;
//     setItems(updatedItems);
//   };

//   // Update counter names
//   const handleCounterChange = (index, value) => {
//     const updatedCounters = [...counters];
//     updatedCounters[index] = value;
//     setCounters(updatedCounters);
//   };

//   // Calculate totals
//   const totalAvailable = items.reduce((sum, item) => sum + item.available_qty, 0);
//   const totalCounted = items.reduce((sum, item) => sum + item.counted_qty, 0);
//   const totalDifference = totalAvailable - totalCounted;

//   // Save report to backend
//   const saveReport = async () => {
//     if (counters.some((name) => !name.trim())) {
//       alert("Please fill all counter names before saving.");
//       return;
//     }

//     setSaving(true);
//     try {
//       const reportPromises = items.map((item) =>
//         axios.post("http://localhost:5000/api/reports", {
//           ...item,
//           counter_names: counters.join(","), // Comma-separated counter names
//         })
//       );

//       await Promise.all(reportPromises);
//       alert("Report saved successfully!");
//     } catch (err) {
//       console.error("Save Report Error:", err);
//       alert("Failed to save report");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p className="text-green-600">Loading inventory...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-green-700">Inventory Report</h1>
//       <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
//         <thead className="bg-green-200">
//           <tr>
//             <th className="border px-4 py-2 text-left">Item Name</th>
//             <th className="border px-4 py-2 text-left">Model</th>
//             <th className="border px-4 py-2 text-right">Available Qty</th>
//             <th className="border px-4 py-2 text-right">Counted Qty</th>
//             <th className="border px-4 py-2 text-right">Difference</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={item.item_id} className="hover:bg-green-50">
//               <td className="border px-4 py-2">{item.item_name}</td>
//               <td className="border px-4 py-2">{item.model}</td>
//               <td className="border px-4 py-2 text-right">{item.available_qty}</td>
//               <td className="border px-4 py-2 text-right">
//                 <input
//                   type="number"
//                   className="border px-2 py-1 w-24 rounded text-right"
//                   value={item.counted_qty}
//                   onChange={(e) => handleCountChange(index, e.target.value)}
//                   min="0"
//                 />
//               </td>
//               <td className="border px-4 py-2 text-right font-semibold text-green-700">
//                 {item.difference}
//               </td>
//             </tr>
//           ))}

//           {/* Totals */}
//           <tr className="font-bold bg-green-100">
//             <td className="border px-4 py-2">Total</td>
//             <td className="border px-4 py-2">-</td>
//             <td className="border px-4 py-2 text-right">{totalAvailable}</td>
//             <td className="border px-4 py-2 text-right">{totalCounted}</td>
//             <td className="border px-4 py-2 text-right text-green-800">{totalDifference}</td>
//           </tr>

//           {/* Counters */}
//           <tr className="bg-green-50 font-semibold">
//             <td className="border px-4 py-2" colSpan={5}>
//               <div className="flex flex-col md:flex-row gap-3 items-center">
//                 <span>Counters:</span>
//                 {counters.map((val, idx) => (
//                   <input
//                     key={idx}
//                     type="text"
//                     className="border px-2 py-1 rounded w-40"
//                     placeholder={`Counter ${idx + 1} Name`}
//                     value={val}
//                     onChange={(e) => handleCounterChange(idx, e.target.value)}
//                   />
//                 ))}
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <button
//         onClick={saveReport}
//         className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
//         disabled={saving}
//       >
//         {saving ? "Saving..." : "Save Report"}
//       </button>
//     </div>
//   );
// };

// export default InventoryReport;
import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryReport = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [counters, setCounters] = useState(["", "", ""]); // Three counters

  // Fetch items from API
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items/items");
      const data = response.data;

      const processedItems = data.map((item) => {
        // Safe property access
        const unitPriceBirr = parseFloat(item.UnitPriceBirr ?? item.unitPriceBirr ?? 0);
        const unitPriceCent = parseFloat(item.UnitPriceCent ?? item.unitPriceCent ?? 0);
        const unit_price = unitPriceBirr + unitPriceCent / 100;
        const available_qty = item.TotalQty ?? item.totalQty ?? 0;

        return {
          item_id: item.ItemID ?? item.itemID ?? 0,
          item_name: item.ItemName ?? item.itemName ?? "-",
          model: item.Model ?? "-",
          available_qty,
          counted_qty: available_qty, // default counted_qty = available_qty
          difference: 0, // difference = available - counted
          unit_price,
          total_price: available_qty * unit_price, // initial total price
        };
      });

      setItems(processedItems);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Items Error:", err);
      setError("Failed to fetch items");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Update counted quantity and difference
  const handleCountChange = (index, value) => {
    const updatedItems = [...items];
    const counted = parseInt(value) || 0;
    updatedItems[index].counted_qty = counted;
    updatedItems[index].difference = updatedItems[index].available_qty - counted;
    updatedItems[index].total_price = counted * updatedItems[index].unit_price; // total price based on counted_qty
    setItems(updatedItems);
  };

  // Update counter names
  const handleCounterChange = (index, value) => {
    const updatedCounters = [...counters];
    updatedCounters[index] = value;
    setCounters(updatedCounters);
  };

  // Calculate totals
  const totalAvailable = items.reduce((sum, item) => sum + item.available_qty, 0);
  const totalCounted = items.reduce((sum, item) => sum + item.counted_qty, 0);
  const totalDifference = totalAvailable - totalCounted;
  const totalPrice = items.reduce((sum, item) => sum + item.total_price, 0);

  // Save report to backend
  const saveReport = async () => {
    if (counters.some((name) => !name.trim())) {
      alert("Please fill all counter names before saving.");
      return;
    }

    setSaving(true);
    try {
      const reportPromises = items.map((item) =>
        axios.post("http://localhost:5000/api/reports", {
          ...item,
          counter_names: counters.join(","), // comma-separated
        })
      );

      await Promise.all(reportPromises);
      alert("Report saved successfully!");
    } catch (err) {
      console.error("Save Report Error:", err);
      alert("Failed to save report");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-green-600">Loading inventory...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Inventory Report</h1>
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-green-200">
          <tr>
            <th className="border px-4 py-2 text-left">Item Name</th>
            <th className="border px-4 py-2 text-left">Model</th>
            <th className="border px-4 py-2 text-right">Available Qty</th>
            <th className="border px-4 py-2 text-right">Counted Qty</th>
            <th className="border px-4 py-2 text-right">Difference</th>
            <th className="border px-4 py-2 text-right">Unit Price (Birr)</th>
            <th className="border px-4 py-2 text-right">Total Price (Birr)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.item_id} className="hover:bg-green-50">
              <td className="border px-4 py-2">{item.item_name}</td>
              <td className="border px-4 py-2">{item.model}</td>
              <td className="border px-4 py-2 text-right">{item.available_qty}</td>
              <td className="border px-4 py-2 text-right">
                <input
                  type="number"
                  className="border px-2 py-1 w-24 rounded text-right"
                  value={item.counted_qty}
                  onChange={(e) => handleCountChange(index, e.target.value)}
                  min="0"
                />
              </td>
              <td className="border px-4 py-2 text-right font-semibold text-green-700">{item.difference}</td>
              <td className="border px-4 py-2 text-right">{item.unit_price.toFixed(2)}</td>
              <td className="border px-4 py-2 text-right">{item.total_price.toFixed(2)}</td>
            </tr>
          ))}

          {/* Totals */}
          <tr className="font-bold bg-green-100">
            <td className="border px-4 py-2">Total</td>
            <td className="border px-4 py-2">-</td>
            <td className="border px-4 py-2 text-right">{totalAvailable}</td>
            <td className="border px-4 py-2 text-right">{totalCounted}</td>
            <td className="border px-4 py-2 text-right text-green-800">{totalDifference}</td>
            <td className="border px-4 py-2 text-right">-</td>
            <td className="border px-4 py-2 text-right">{totalPrice.toFixed(2)}</td>
          </tr>

          {/* Counters */}
          <tr className="bg-green-50 font-semibold">
            <td className="border px-4 py-2" colSpan={7}>
              <div className="flex flex-col md:flex-row gap-3 items-center">
                <span>Counters:</span>
                {counters.map((val, idx) => (
                  <input
                    key={idx}
                    type="text"
                    className="border px-2 py-1 rounded w-40"
                    placeholder={`Counter ${idx + 1} Name`}
                    value={val}
                    onChange={(e) => handleCounterChange(idx, e.target.value)}
                  />
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={saveReport}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Report"}
      </button>
    </div>
  );
};

export default InventoryReport;
