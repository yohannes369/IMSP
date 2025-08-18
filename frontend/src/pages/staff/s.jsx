// import React, { useState } from 'react';
// import axios from 'axios';

// const StaffGivenItems = () => {
//   const [staffId, setStaffId] = useState('');
//   const [givenItems, setGivenItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch all items given to this staff from give_items table
//   const fetchGivenItems = async () => {
//     if (!staffId.trim()) return setError('Please enter your Staff ID');
//     setError('');
//     setLoading(true);

//     try {
//       // Updated URL to fetch items directly from give_items table
//       const res = await axios.get(`http://localhost:5000/api/give-items/${staffId}`);
//       setGivenItems(res.data);

//       if (res.data.length === 0) setError('No items given to you.');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch given items');
//       setGivenItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Request return for a given item
//   const handleReturnRequest = async (giveItemId) => {
//     if (!staffId.trim()) {
//       alert('Staff ID is required to request return');
//       return;
//     }

//     if (!window.confirm('Do you want to request return for this item?')) return;

//     try {
//       await axios.post(
//         'http://localhost:5000/api/request-return',
//         { giveItemId, staffId },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       alert('Return request sent to clerk.');
//       fetchGivenItems(); // Refresh the list after requesting return
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || 'Failed to send return request');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
//       <h2>My Given Items</h2>
//       <input
//         type="text"
//         placeholder="Enter your Staff ID"
//         value={staffId}
//         onChange={(e) => setStaffId(e.target.value)}
//         style={{ width: '100%', padding: 8, marginBottom: 10 }}
//       />
//       <button
//         onClick={fetchGivenItems}
//         disabled={loading}
//         style={{
//           padding: '8px 16px',
//           background: '#007bff',
//           color: '#fff',
//           border: 'none',
//           cursor: 'pointer'
//         }}
//       >
//         {loading ? 'Loading...' : 'Fetch Items'}
//       </button>

//       {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

//       {givenItems.length > 0 && (
//         <table
//           border="1"
//           cellPadding="8"
//           style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}
//         >
//           <thead>
//             <tr style={{ background: '#f2f2f2' }}>
//               <th>ID</th>
//               <th>Item Type</th>
//               <th>Serial</th>
//               <th>Quantity</th>
//               <th>Given At</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {givenItems.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.item_type}</td>
//                 <td>{item.item_serial}</td>
//                 <td>{item.quantity}</td>
//                 <td>{new Date(item.given_at).toLocaleString()}</td>
//                 <td>
//                   <button
//                     onClick={() => handleReturnRequest(item.id)}
//                     style={{
//                       padding: '5px 10px',
//                       background: 'red',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: 4,
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Return
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default StaffGivenItems;
import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer'; // Adjust path as needed

// Cal Poly color palette
const calPolyGreen = '#154734';
const calPolyGold = '#C4820E';
const lightGreen = '#E8F4EA';

const StaffGivenItems = () => {
  const [staffId, setStaffId] = useState('');
  const [givenItems, setGivenItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGivenItems = async () => {
    if (!staffId.trim()) return setError('Please enter your Staff ID');
    setError('');
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:5000/api/give-items/${staffId}`);
      setGivenItems(res.data);
      if (res.data.length === 0) setError('No items have been assigned to you.');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch assigned items. Please try again.');
      setGivenItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnRequest = async (giveItemId) => {
    if (!staffId.trim()) {
      alert('Staff ID is required to request return');
      return;
    }

    if (!window.confirm('Are you sure you want to request return for this item?')) return;

    try {
      await axios.post(
        'http://localhost:5000/api/request-return',
        { giveItemId, staffId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert('Return request submitted successfully!');
      fetchGivenItems();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to submit return request');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold" style={{ color: calPolyGreen }}>
                My Assigned Inventory
              </h2>
              <p className="text-gray-600">View and manage items assigned to you</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter your Staff ID"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={fetchGivenItems}
                disabled={loading}
                className={`px-6 py-2 rounded-md font-medium text-white transition-colors ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
                style={{ backgroundColor: loading ? undefined : calPolyGreen }}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'View My Items'
                )}
              </button>
            </div>

            {error && (
              <div className="p-4 mb-6 rounded-lg bg-red-50 text-red-800 border border-red-200">
                {error}
              </div>
            )}

            {givenItems.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Serial Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned On
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {givenItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.item_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.item_serial}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.given_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleReturnRequest(item.id)}
                            className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            Request Return
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-width footer */}
      <Footer bgColor={calPolyGreen} textColor="white" />
    </div>
  );
};

export default StaffGivenItems;