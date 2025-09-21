

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", { transports: ["websocket"] });

// function ICTReturnPage() {
//   const [returns, setReturns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReturns = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/returns");
//         setReturns(res.data.filter(r => r.status === "Pending"));
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReturns();

//     socket.on("newReturn", (newReturn) => {
//       if (newReturn.status === "Pending") {
//         setReturns(prev => prev.some(r => r.return_id === newReturn.return_id) ? prev : [...prev, newReturn]);
//       }
//     });

//     socket.on("updateReturn", ({ return_id }) => {
//       setReturns(prev => prev.filter(r => r.return_id !== return_id));
//     });

//     return () => {
//       socket.off("newReturn");
//       socket.off("updateReturn");
//     };
//   }, []);

//   const handleDecision = async (id, decision) => {
//     try {
//       await axios.put(`http://localhost:5000/api/returns/${id}/ict`, { decision });
//       setReturns(prev => prev.filter(r => r.return_id !== id));
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Failed to update request.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">ICT Return Requests</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : returns.length === 0 ? (
//         <p>No pending requests</p>
//       ) : (
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th>Return ID</th>
//               <th>User</th>
//               <th>Item</th>
//               <th>Quantity</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {returns.map(r => (
//               <tr key={r.return_id}>
//                 <td>{r.return_id}</td>
//                 <td>{r.first_name} {r.last_name}</td>
//                 <td>{r.item_name}</td>
//                 <td>{r.quantity}</td>
//                 <td className="space-x-2">
//                   <button
//                     className="px-3 py-1 bg-green-600 text-white rounded"
//                     onClick={() => handleDecision(r.return_id, "approve")}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className="px-3 py-1 bg-red-600 text-white rounded"
//                     onClick={() => handleDecision(r.return_id, "reject")}
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

// export default ICTReturnPage;


import React, { useEffect, useState } from "react";
import axios from "axios";

function ICTReturnPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch pending returns
  const fetchReturns = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/returns");
      setReturns(res.data.filter(r => r.status === "Pending"));
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchReturns();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchReturns, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Handle approve/reject decision
  const handleDecision = async (id, decision) => {
    try {
      await axios.put(`http://localhost:5000/api/returns/${id}/ict`, { decision });
      setReturns(prev => prev.filter(r => r.return_id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update request.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">ICT Return Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : returns.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Return ID</th>
              <th>User</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map(r => (
              <tr key={r.return_id}>
                <td>{r.return_id}</td>
                <td>{r.first_name} {r.last_name}</td>
                <td>{r.item_name}</td>
                <td>{r.quantity}</td>
                <td className="space-x-2">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => handleDecision(r.return_id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => handleDecision(r.return_id, "reject")}
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

export default ICTReturnPage;
