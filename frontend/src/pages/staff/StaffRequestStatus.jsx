// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const StaffRequestStatus = () => {
// //   const [staffId, setStaffId] = useState('');
// //   const [requests, setRequests] = useState([]);

// //   const fetchStatus = async () => {
// //     try {
// //       const res = await axios.get(`http://localhost:5000/api/requests/${staffId}`);
// //       setRequests(res.data);
// //     } catch (err) {
// //       alert('Failed to fetch');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Track My Requests</h2>
// //       <input
// //         type="text"
// //         placeholder="Enter your Staff ID"
// //         value={staffId}
// //         onChange={(e) => setStaffId(e.target.value)}
// //       />
// //       <button onClick={fetchStatus}>Track</button>
// //       <ul>
// //         {requests.map((req) => (
// //           <li key={req.id}>
// //             <strong>{req.item_type}</strong> — Status: {req.status}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default StaffRequestStatus;
// import React, { useState } from 'react';
// import axios from 'axios';

// const StaffRequestStatus = () => {
//   const [staffId, setStaffId] = useState('');
//   const [requests, setRequests] = useState([]);

//   const fetchStatus = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/requests/${staffId}`);
//       setRequests(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to fetch requests');
//     }
//   };

//   return (
//     <div>
//       <h2>Track My Requests</h2>
//       <input
//         type="text"
//         placeholder="Enter your Staff ID"
//         value={staffId}
//         onChange={(e) => setStaffId(e.target.value)}
//       />
//       <button onClick={fetchStatus}>Track</button>
//       <ul>
//         {requests.map((req) => (
//           <li key={req.id}>
//             <strong>{req.item_type}</strong> — Status: {req.status}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StaffRequestStatus;

// corect one

// import React, { useState } from 'react';
// import axios from 'axios';

// const StaffRequestStatus = () => {
//   const [staffId, setStaffId] = useState('');
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchStatus = async () => {
//     if (!staffId.trim()) {
//       setError('Please enter your Staff ID');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/api/requests/${staffId}`);
//       setRequests(res.data);
//       if (res.data.length === 0) {
//         setError('No requests found for this Staff ID.');
//       }
//     } catch (err) {
//       setError('Failed to fetch requests. Please try again.');
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: 'auto' }}>
//       <h2>Track My Requests</h2>
//       <input
//         type="text"
//         placeholder="Enter your Staff ID"
//         value={staffId}
//         onChange={(e) => setStaffId(e.target.value)}
//         style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//       />
//       <button onClick={fetchStatus} disabled={loading} style={{ padding: '8px 16px' }}>
//         {loading ? 'Loading...' : 'Track Requests'}
//       </button>

//       {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

//       {requests.length > 0 && (
//         <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th>Request ID</th>
//               <th>Item Type</th>
//               <th>Quantity</th>
//               <th>Status</th>
//               <th>Manager Comment</th>
//               <th>Clerk Comment</th>
//               <th>Requested On</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => (
//               <tr key={req.id}>
//                 <td>{req.id}</td>
//                 <td>{req.item_type}</td>
//                 <td>{req.quantity}</td>
//                 <td>{req.status}</td>
//                 <td>{req.manager_comment || '-'}</td>
//                 <td>{req.clerk_comment || '-'}</td>
//                 <td>{new Date(req.created_at).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default StaffRequestStatus;

// corect one

// import React, { useState } from 'react';
// import axios from 'axios';

// const StaffRequestStatus = () => {
//   const [staffId, setStaffId] = useState('');
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchStatus = async () => {
//     if (!staffId.trim()) {
//       setError('Please enter your Staff ID');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       // Fetch requests including item serial
//       const res = await axios.get(`http://localhost:5000/api/requests/${staffId}`);
//       setRequests(res.data);
//       if (res.data.length === 0) {
//         setError('No requests found for this Staff ID.');
//       }
//     } catch (err) {
//       setError('Failed to fetch requests. Please try again.');
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: 'auto' }}>
//       <h2>Track My Requests</h2>
//       <input
//         type="text"
//         placeholder="Enter your Staff ID"
//         value={staffId}
//         onChange={(e) => setStaffId(e.target.value)}
//         style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//       />
//       <button onClick={fetchStatus} disabled={loading} style={{ padding: '8px 16px' }}>
//         {loading ? 'Loading...' : 'Track Requests'}
//       </button>

//       {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

//       {requests.length > 0 && (
//         <table
//           border="1"
//           cellPadding="8"
//           style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}
//         >
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Request ID</th>
//               <th>Item Serial</th>
//               <th>Item Type</th>
//               <th>Quantity</th>
//               <th>Status</th>
//               <th>Manager Comment</th>
//               <th>Clerk Comment</th>
//               <th>Requested On</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req, index) => (
//               <tr key={req.id}>
//                 <td>{index + 1}</td> {/* Serial number */}
//                 <td>{req.id}</td>
//                 <td>{req.item_serial || '-'}</td> {/* Item Serial */}
//                 <td>{req.item_type}</td>
//                 <td>{req.quantity}</td>
//                 <td>{req.status}</td>
//                 <td>{req.manager_comment || '-'}</td>
//                 <td>{req.clerk_comment || '-'}</td>
//                 <td>{new Date(req.created_at).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default StaffRequestStatus;

import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer'; // Adjust path as needed

// Cal Poly color palette
const calPolyGreen = '#154734';
const calPolyGold = '#C4820E';
const lightGreen = '#E8F4EA';

const StaffRequestStatus = () => {
  const [staffId, setStaffId] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStatus = async () => {
    if (!staffId.trim()) {
      setError('Please enter your Staff ID');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/requests/${staffId}`);
      setRequests(res.data);
      if (res.data.length === 0) {
        setError('No requests found for this Staff ID.');
      }
    } catch (err) {
      setError('Failed to fetch requests. Please try again.');
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold" style={{ color: calPolyGreen }}>
                My Request Status
              </h2>
              <p className="text-gray-600">Track your inventory requests</p>
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
                onClick={fetchStatus}
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
                  'Track Requests'
                )}
              </button>
            </div>

            {error && (
              <div className="p-4 mb-6 rounded-lg bg-red-50 text-red-800 border border-red-200">
                {error}
              </div>
            )}

            {requests.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Serial
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Manager Comment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clerk Comment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requested On
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {req.item_serial || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {req.item_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {req.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {req.manager_comment || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {req.clerk_comment || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(req.created_at).toLocaleString()}
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

export default StaffRequestStatus;