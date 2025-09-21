
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// function ManagerApprovedReturnsPage() {
//   const [managerApprovedReturns, setManagerApprovedReturns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const previousDataRef = useRef([]);

//   // Helper to check if arrays are equal
//   const isDataEqual = (a, b) => {
//     if (a.length !== b.length) return false;
//     return a.every((item, index) => JSON.stringify(item) === JSON.stringify(b[index]));
//   };

//   // Process returns data for display
//   const processReturnsData = (returns) => {
//     const itemMap = new Map();
    
//     returns.forEach(returnItem => {
//       const key = returnItem.item_name;
//       const userKey = `${returnItem.first_name} ${returnItem.last_name}`;
      
//       if (!itemMap.has(key)) {
//         itemMap.set(key, {
//           item_name: returnItem.item_name,
//           users: new Set([userKey]),
//           serialData: [{serial: returnItem.serial_number, quantity: returnItem.quantity}],
//           return_dates: [new Date(returnItem.return_date)],
//           status: returnItem.status
//         });
//       } else {
//         const existing = itemMap.get(key);
//         existing.users.add(userKey);
//         existing.serialData.push({serial: returnItem.serial_number, quantity: returnItem.quantity});
//         existing.return_dates.push(new Date(returnItem.return_date));
//       }
//     });

//     // Convert map to array and calculate totals
//     return Array.from(itemMap.values()).map(item => ({
//       ...item,
//       users: Array.from(item.users).join(", "),
//       total_quantity: item.serialData.reduce((sum, data) => sum + data.quantity, 0),
//       latest_return_date: new Date(Math.max(...item.return_dates.map(d => d.getTime())))
//     }));
//   };

//   const fetchManagerApprovedReturns = async () => {
//     try {
//       setError(null);
//       const res = await axios.get("http://localhost:5000/api/returns");
//       const approved = res.data.filter(r => r.status === "Manager Approved");
//       const processedData = processReturnsData(approved);

//       if (!isDataEqual(processedData, previousDataRef.current)) {
//         setManagerApprovedReturns(processedData);
//         previousDataRef.current = processedData;
//       }
//     } catch (err) {
//       console.error("Fetch error:", err.response?.data || err.message);
//       setError("Failed to fetch returns data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchManagerApprovedReturns();
//     const interval = setInterval(fetchManagerApprovedReturns, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="bg-green-700 px-6 py-4">
//           <h2 className="text-2xl font-bold text-white">Manager-Approved ICT Returns</h2>
//           <p className="text-green-100 mt-1">Review all approved returns in one place</p>
//         </div>
        
//         <div className="p-6">
//           {error && (
//             <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
//               <p>{error}</p>
//             </div>
//           )}
          
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//             </div>
//           ) : managerApprovedReturns.length === 0 ? (
//             <div className="text-center py-8">
//               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <h3 className="mt-2 text-lg font-medium text-gray-900">No manager-approved returns</h3>
//               <p className="mt-1 text-sm text-gray-500">Get started by approving some returns in the system.</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto rounded-lg border border-gray-200">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-green-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Item Name</th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Users</th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Serial Numbers & Quantities</th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Total Quantity</th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Return Date</th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {managerApprovedReturns.map((item, idx) => (
//                     <React.Fragment key={idx}>
//                       <tr className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
//                         <td rowSpan={item.serialData.length} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-top border-r">
//                           {item.item_name}
//                         </td>
//                         <td rowSpan={item.serialData.length} className="px-6 py-4 text-sm text-gray-500 align-top border-r">
//                           {item.users}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500 border-r">
//                           <div className="flex items-center">
//                             <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
//                               {item.serialData[0].serial}
//                             </span>
//                             <span className="ml-2 text-green-700 font-medium">
//                               (Qty: {item.serialData[0].quantity})
//                             </span>
//                           </div>
//                         </td>
//                         <td rowSpan={item.serialData.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center align-top border-r">
//                           <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
//                             {item.total_quantity}
//                           </span>
//                         </td>
//                         <td rowSpan={item.serialData.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top border-r">
//                           {item.latest_return_date.toLocaleDateString()}
//                         </td>
//                         <td rowSpan={item.serialData.length} className="px-6 py-4 whitespace-nowrap align-top">
//                           <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                             {item.status}
//                           </span>
//                         </td>
//                       </tr>
//                       {item.serialData.slice(1).map((serialItem, sIdx) => (
//                         <tr key={`${idx}-${sIdx+1}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
//                           <td className="px-6 py-4 text-sm text-gray-500 border-r">
//                             <div className="flex items-center">
//                               <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
//                                 {serialItem.serial}
//                               </span>
//                               <span className="ml-2 text-green-700 font-medium">
//                                 (Qty: {serialItem.quantity})
//                               </span>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
        
//         <div className="bg-green-50 px-6 py-3 border-t border-green-200">
//           <p className="text-xs text-green-700">Last updated: {new Date().toLocaleTimeString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManagerApprovedReturnsPage;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManagerApprovedReturnsPage() {
  const [managerApprovedReturns, setManagerApprovedReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const previousDataRef = useRef([]);
  const navigate = useNavigate();

  // Helper to check if arrays are equal
  const isDataEqual = (a, b) => {
    if (a.length !== b.length) return false;
    return a.every((item, index) => JSON.stringify(item) === JSON.stringify(b[index]));
  };

  // Process returns data for display
  const processReturnsData = (returns) => {
    const itemMap = new Map();
    
    returns.forEach(returnItem => {
      const key = returnItem.item_name;
      const userKey = `${returnItem.first_name} ${returnItem.last_name}`;
      
      if (!itemMap.has(key)) {
        itemMap.set(key, {
          item_name: returnItem.item_name,
          users: new Set([userKey]),
          serialData: [{serial: returnItem.serial_number, quantity: returnItem.quantity}],
          return_dates: [new Date(returnItem.return_date)],
          status: returnItem.status
        });
      } else {
        const existing = itemMap.get(key);
        existing.users.add(userKey);
        existing.serialData.push({serial: returnItem.serial_number, quantity: returnItem.quantity});
        existing.return_dates.push(new Date(returnItem.return_date));
      }
    });

    // Convert map to array and calculate totals
    return Array.from(itemMap.values()).map(item => ({
      ...item,
      users: Array.from(item.users).join(", "),
      total_quantity: item.serialData.reduce((sum, data) => sum + data.quantity, 0),
      latest_return_date: new Date(Math.max(...item.return_dates.map(d => d.getTime())))
    }));
  };

  const fetchManagerApprovedReturns = async () => {
    try {
      setError(null);
      const res = await axios.get("http://localhost:5000/api/returns");
      const approved = res.data.filter(r => r.status === "Manager Approved");
      const processedData = processReturnsData(approved);

      if (!isDataEqual(processedData, previousDataRef.current)) {
        setManagerApprovedReturns(processedData);
        previousDataRef.current = processedData;
      }
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      setError("Failed to fetch returns data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagerApprovedReturns();
    const interval = setInterval(fetchManagerApprovedReturns, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with navigation button */}
        <div className="bg-green-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Manager-Approved ICT Returns</h2>
            <p className="text-green-100 mt-1">Review all approved returns in one place</p>
          </div>
          <button
            onClick={() => navigate("/Clerk/model22formlist")}
            className="bg-white text-green-700 font-semibold px-4 py-2 rounded hover:bg-green-100 transition flex items-center gap-2 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Go to Model22 Forms
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : managerApprovedReturns.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No manager-approved returns</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by approving some returns in the system.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Item Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Users</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Serial Numbers & Quantities</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Total Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Return Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {managerApprovedReturns.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                        <td rowSpan={item.serialData.length} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-top border-r">
                          {item.item_name}
                        </td>
                        <td rowSpan={item.serialData.length} className="px-6 py-4 text-sm text-gray-500 align-top border-r">
                          {item.users}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 border-r">
                          <div className="flex items-center">
                            <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
                              {item.serialData[0].serial}
                            </span>
                            <span className="ml-2 text-green-700 font-medium">
                              (Qty: {item.serialData[0].quantity})
                            </span>
                          </div>
                        </td>
                        <td rowSpan={item.serialData.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center align-top border-r">
                          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                            {item.total_quantity}
                          </span>
                        </td>
                        <td rowSpan={item.serialData.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top border-r">
                          {item.latest_return_date.toLocaleDateString()}
                        </td>
                        <td rowSpan={item.serialData.length} className="px-6 py-4 whitespace-nowrap align-top">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                      {item.serialData.slice(1).map((serialItem, sIdx) => (
                        <tr key={`${idx}-${sIdx+1}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                          <td className="px-6 py-4 text-sm text-gray-500 border-r">
                            <div className="flex items-center">
                              <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
                                {serialItem.serial}
                              </span>
                              <span className="ml-2 text-green-700 font-medium">
                                (Qty: {serialItem.quantity})
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="bg-green-50 px-6 py-3 border-t border-green-200">
          <p className="text-xs text-green-700">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ManagerApprovedReturnsPage;