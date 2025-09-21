// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ManagerReturnPage() {
//   const [returns, setReturns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch requests that are ICT Approved
//   useEffect(() => {
//     const fetchReturns = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/returns");
//         // Filter only ICT Approved requests
//         const ictApproved = res.data.filter(r => r.status === "ICT Approved");
//         setReturns(ictApproved);
//       } catch (err) {
//         console.error("Error fetching returns:", err);
//         alert("Failed to fetch return requests.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReturns();
//   }, []);

//   // Manager approve or reject
//   const handleDecision = async (id, decision) => {
//     if (!window.confirm(`Are you sure you want to ${decision} return #${id}?`)) return;

//     try {
//       await axios.put(`http://localhost:5000/api/returns/${id}/manager`, { decision });
//       setReturns(prev => prev.filter(r => r.return_id !== id));
//       alert(`Manager ${decision} successful!`);
//     } catch (err) {
//       console.error("Error updating return:", err);
//       alert("Error updating request.");
//     }
//   };

//   if (loading) {
//     return <p className="p-6">Loading return requests...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Manager - Return Requests</h2>
//       {returns.length === 0 ? (
//         <p>No ICT-approved requests waiting for manager action.</p>
//       ) : (
//         <table className="w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2 border">Return ID</th>
//               <th className="p-2 border">User</th>
//               <th className="p-2 border">Item</th>
//               <th className="p-2 border">Quantity</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {returns.map(r => (
//               <tr key={r.return_id} className="border-t">
//                 <td className="p-2 border">{r.return_id}</td>
//                 <td className="p-2 border">{r.first_name} {r.last_name}</td>
//                 <td className="p-2 border">{r.item_name}</td>
//                 <td className="p-2 border">{r.quantity}</td>
//                 <td className="p-2 border space-x-2">
//                   <button
//                     onClick={() => handleDecision(r.return_id, "approve")}
//                     className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleDecision(r.return_id, "reject")}
//                     className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default ManagerReturnPage;
import React, { useEffect, useState } from "react";
import axios from "axios";

function ManagerReturnPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch ICT-approved returns
  const fetchReturns = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/returns");
      const ictApproved = res.data.filter(r => r.status === "ICT Approved");
      setReturns(ictApproved);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching returns:", err);
      setLoading(false);
    }
  };

  // Polling effect: fetch data every 5 seconds
  useEffect(() => {
    // Initial fetch
    fetchReturns();

    // Polling interval
    const interval = setInterval(() => {
      fetchReturns();
    }, 5000); // 5000ms = 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Manager approve or reject
  const handleDecision = async (id, decision) => {
    if (!window.confirm(`Are you sure you want to ${decision} return #${id}?`)) return;

    try {
      await axios.put(`http://localhost:5000/api/returns/${id}/manager`, { decision });
      // Remove the item immediately from UI after decision
      setReturns(prev => prev.filter(r => r.return_id !== id));
      alert(`Manager ${decision} successful!`);
    } catch (err) {
      console.error("Error updating return:", err);
      alert("Error updating request.");
    }
  };

  if (loading) return <p className="p-6">Loading return requests...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manager - Return Requests</h2>
      {returns.length === 0 ? (
        <p>No ICT-approved requests waiting for manager action.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Return ID</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map(r => (
              <tr key={r.return_id} className="border-t">
                <td className="p-2 border">{r.return_id}</td>
                <td className="p-2 border">{r.first_name} {r.last_name}</td>
                <td className="p-2 border">{r.item_name}</td>
                <td className="p-2 border">{r.quantity}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleDecision(r.return_id, "approve")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(r.return_id, "reject")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManagerReturnPage;
