
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Model22FormList() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [returningItems, setReturningItems] = useState(new Set());

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/model22/form');
//       const rawRecords = res.data || [];

//       // Group by RequestID + StaffID
//       const grouped = {};
//       rawRecords.forEach(record => {
//         const key = `${record.RequestID}-${record.StaffID}`;
//         if (!grouped[key]) {
//           grouped[key] = {
//             staff: record,
//             items: [],
//             issueCount: 0,
//           };
//         }
//         grouped[key].items.push(record);
//         if (record.ActionType === 'ISSUE') {
//           grouped[key].issueCount++;
//         }
//       });

//       setRecords(Object.values(grouped));
//       setError('');
//     } catch (err) {
//       console.error('Error fetching Model22Form records:', err);
//       setError('Failed to fetch records. Please check your connection.');
//     }
//     setLoading(false);
//   };

//   const handleReturn = async (formID) => {
//     setReturningItems(prev => new Set([...prev, formID]));
//     try {
//       await axios.post(`http://localhost:5000/api/model22/return/${formID}`);

//       setRecords(prev =>
//         prev.map(group => ({
//           ...group,
//           items: group.items.filter(item => item.FormID !== formID),
//           issueCount: group.issueCount - 1
//         })).filter(group => group.items.length > 0)
//       );
//     } catch (err) {
//       console.error('Error returning item:', err);
//       alert('Failed to return item');
//     }

//     setReturningItems(prev => {
//       const newSet = new Set(prev);
//       newSet.delete(formID);
//       return newSet;
//     });
//   };

//   const formatPrice = (birr, cent) => `${birr}.${String(cent).padStart(2, '0')} ETB`;

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });

//   if (loading) {
//     return <p className="p-6 text-gray-600">Loading records...</p>;
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-100 text-red-700 p-4 rounded shadow">
//           <p className="font-bold">Error</p>
//           <p>{error}</p>
//           <button
//             onClick={fetchRecords}
//             className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!records.length) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-gray-500">No issued items found.</p>
//         <button
//           onClick={fetchRecords}
//           className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Refresh
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Issued Items Registry</h1>
//         <p className="text-gray-600">Track and manage all issued items with return functionality</p>
//       </div>

//       {/* Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 rounded shadow border">
//           <p className="text-sm text-gray-500">Total Groups</p>
//           <p className="text-2xl font-bold">{records.length}</p>
//         </div>
//         <div className="bg-white p-6 rounded shadow border">
//           <p className="text-sm text-gray-500">Total Items</p>
//           <p className="text-2xl font-bold">
//             {records.reduce((sum, g) => sum + g.items.length, 0)}
//           </p>
//         </div>
//         <div className="bg-white p-6 rounded shadow border">
//           <p className="text-sm text-gray-500">Active Issues</p>
//           <p className="text-2xl font-bold text-green-600">
//             {records.reduce((sum, g) => sum + g.issueCount, 0)}
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded shadow border overflow-x-auto">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg font-semibold">Inventory Records</h2>
//           <button
//             onClick={fetchRecords}
//             className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
//           >
//             Refresh
//           </button>
//         </div>
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 text-left border">Request & Staff</th>
//               <th className="p-2 text-left border">Item Details</th>
//               <th className="p-2 text-center border">Unit Info</th>
//               <th className="p-2 text-right border">Pricing</th>
//               <th className="p-2 text-center border">Status</th>
//               <th className="p-2 text-center border">Date</th>
//               <th className="p-2 text-center border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map(group => {
//               const { staff, items } = group;
//               return items.map((item, index) => (
//                 <tr key={item.FormID} className="hover:bg-gray-50">
//                   {index === 0 && (
//                     <td rowSpan={items.length} className="p-2 border align-top">
//                       <div>
//                         <span className="px-2 py-1 text-xs bg-gray-200 rounded">
//                           Request #{staff.RequestID}
//                         </span>
//                         <div className="mt-2">
//                           <p className="font-medium">{staff.FName} {staff.LName}</p>
//                           <p className="text-xs text-gray-500">ID: {staff.StaffID}</p>
//                         </div>
//                       </div>
//                     </td>
//                   )}

//                   <td className="p-2 border">
//                     <p className="font-medium">{item.ItemName}</p>
//                     <p className="text-xs text-gray-500">ID: {item.ItemID}</p>
//                     {item.Remark && (
//                       <p className="text-xs italic text-blue-600">{item.Remark}</p>
//                     )}
//                   </td>

//                   <td className="p-2 border text-center">
//                     <div>
//                       <p className="text-xs">Unit #{item.UnitID}</p>
//                       <p className="text-sm">{item.SerialNo}</p>
//                       <p className="text-xs text-gray-500">Qty: {item.Quantity}</p>
//                     </div>
//                   </td>

//                   <td className="p-2 border text-right">
//                     <p>{formatPrice(item.UnitPriceBirr, item.UnitPriceCent)}</p>
//                     <p className="text-xs text-gray-500">Balance: {item.BalanceQty}</p>
//                   </td>

//                   <td className="p-2 border text-center">
//                     <span
//                       className={`px-2 py-1 text-xs rounded ${
//                         item.ActionType === 'ISSUE'
//                           ? 'bg-blue-100 text-blue-700'
//                           : 'bg-gray-200 text-gray-700'
//                       }`}
//                     >
//                       {item.ActionType}
//                     </span>
//                   </td>

//                   <td className="p-2 border text-center">{formatDate(item.ActionDate)}</td>

//                   <td className="p-2 border text-center">
//                     {item.ActionType === 'ISSUE' ? (
//                       <button
//                         onClick={() => handleReturn(item.FormID)}
//                         disabled={returningItems.has(item.FormID)}
//                         className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
//                       >
//                         {returningItems.has(item.FormID) ? 'Returning...' : 'Return'}
//                       </button>
//                     ) : (
//                       <span className="text-gray-400 text-sm">—</span>
//                     )}
//                   </td>
//                 </tr>
//               ));
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Model22FormList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [returningItems, setReturningItems] = useState(new Set());

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/model22/form');
      // ✅ Expect API returns { count, records }
      const rawRecords = res.data.records || [];

      // Group by RequestID + StaffID
      const grouped = {};
      rawRecords.forEach(record => {
        const key = `${record.RequestID}-${record.StaffID}`;
        if (!grouped[key]) {
          grouped[key] = {
            staff: record,
            items: [],
            issueCount: 0,
          };
        }
        grouped[key].items.push(record);
        if (record.ActionType === 'ISSUE') {
          grouped[key].issueCount++;
        }
      });

      setRecords(Object.values(grouped));
      setError('');
    } catch (err) {
      console.error('Error fetching Model22Form records:', err);
      setError('Failed to fetch records. Please check your connection.');
    }
    setLoading(false);
  };

  const handleReturn = async (formID) => {
    setReturningItems(prev => new Set([...prev, formID]));
    try {
      await axios.post(`http://localhost:5000/api/model22/return/${formID}`);

      setRecords(prev =>
        prev
          .map(group => ({
            ...group,
            items: group.items.filter(item => item.FormID !== formID),
            issueCount: group.issueCount - 1,
          }))
          .filter(group => group.items.length > 0)
      );
    } catch (err) {
      console.error('Error returning item:', err);
      alert('Failed to return item');
    }

    setReturningItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(formID);
      return newSet;
    });
  };

  const formatPrice = (birr, cent) =>
    `${birr}.${String(cent).padStart(2, '0')} ETB`;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return <p className="p-6 text-gray-600">Loading records...</p>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded shadow">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchRecords}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No issued items found.</p>
        <button
          onClick={fetchRecords}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Issued Items Registry</h1>
        <p className="text-gray-600">
          Track and manage all issued items with return functionality
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow border">
          <p className="text-sm text-gray-500">Total Groups</p>
          <p className="text-2xl font-bold">{records.length}</p>
        </div>
        <div className="bg-white p-6 rounded shadow border">
          <p className="text-sm text-gray-500">Total Items</p>
          <p className="text-2xl font-bold">
            {records.reduce((sum, g) => sum + g.items.length, 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow border">
          <p className="text-sm text-gray-500">Active Issues</p>
          <p className="text-2xl font-bold text-green-600">
            {records.reduce((sum, g) => sum + g.issueCount, 0)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow border overflow-x-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Inventory Records</h2>
          <button
            onClick={fetchRecords}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Refresh
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left border">Request & Staff</th>
              <th className="p-2 text-left border">Item Details</th>
              <th className="p-2 text-center border">Unit Info</th>
              <th className="p-2 text-right border">Pricing</th>
              <th className="p-2 text-center border">Status</th>
              <th className="p-2 text-center border">Date</th>
              <th className="p-2 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(group => {
              const { staff, items } = group;
              return items.map((item, index) => (
                <tr key={item.FormID} className="hover:bg-gray-50">
                  {index === 0 && (
                    <td rowSpan={items.length} className="p-2 border align-top">
                      <div>
                        <span className="px-2 py-1 text-xs bg-gray-200 rounded">
                          Request #{staff.RequestID}
                        </span>
                        <div className="mt-2">
                          <p className="font-medium">
                            {staff.FName} {staff.LName}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {staff.StaffID}
                          </p>
                        </div>
                      </div>
                    </td>
                  )}

                  <td className="p-2 border">
                    <p className="font-medium">{item.ItemName}</p>
                    <p className="text-xs text-gray-500">ID: {item.ItemID}</p>
                    {item.Remark && (
                      <p className="text-xs italic text-blue-600">{item.Remark}</p>
                    )}
                  </td>

                  <td className="p-2 border text-center">
                    <div>
                      <p className="text-xs">Unit #{item.UnitID}</p>
                      <p className="text-sm">{item.SerialNo}</p>
                      <p className="text-xs text-gray-500">Qty: {item.Quantity}</p>
                    </div>
                  </td>

                  <td className="p-2 border text-right">
                    <p>{formatPrice(item.UnitPriceBirr, item.UnitPriceCent)}</p>
                    <p className="text-xs text-gray-500">
                      Balance: {item.BalanceQty}
                    </p>
                  </td>

                  <td className="p-2 border text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        item.ActionType === 'ISSUE'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {item.ActionType}
                    </span>
                  </td>

                  <td className="p-2 border text-center">
                    {formatDate(item.ActionDate)}
                  </td>

                  <td className="p-2 border text-center">
                    {item.ActionType === 'ISSUE' ? (
                      <button
                        onClick={() => handleReturn(item.FormID)}
                        disabled={returningItems.has(item.FormID)}
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        {returningItems.has(item.FormID)
                          ? 'Returning...'
                          : 'Return'}
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
