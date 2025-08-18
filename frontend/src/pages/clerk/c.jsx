// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ClerkPendingReturns = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch pending return requests
//   const fetchPendingReturns = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await axios.get('http://localhost:5000/api/pending-returns');
//       setRequests(res.data);
//       if (res.data.length === 0) setError('No pending return requests.');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch pending return requests.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Approve a return request
//   const handleApprove = async (requestId) => {
//     if (!window.confirm('Are you sure you want to approve this return?')) return;
//     try {
//       await axios.post(`http://localhost:5000/api/approve-return/${requestId}`);
//       alert('Return request approved.');
//       fetchPendingReturns(); // refresh list
//     } catch (err) {
//       console.error(err);
//       alert('Failed to approve return request.');
//     }
//   };

//   useEffect(() => {
//     fetchPendingReturns();
//   }, []);

//   return (
//     <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
//       <h2>Pending Return Requests</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {requests.length > 0 && (
//         <table
//           border="1"
//           cellPadding="8"
//           style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}
//         >
//           <thead>
//             <tr style={{ background: '#f2f2f2' }}>
//               <th>Request ID</th>
//               <th>Staff Name</th>
//               <th>Item Type</th>
//               <th>Item Serial</th>
//               <th>Quantity</th>
//               <th>Requested At</th>
//               <th>Given At</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => (
//               <tr key={req.id}>
//                 <td>{req.id}</td>
//                 <td>{req.staff_name}</td>
//                 <td>{req.item_type}</td>
//                 <td>{req.item_serial}</td>
//                 <td>{req.quantity}</td>
//                 <td>{new Date(req.requested_at).toLocaleString()}</td>
//                 <td>{req.given_at ? new Date(req.given_at).toLocaleString() : '-'}</td>
//                 <td>
//                   <button
//                     onClick={() => handleApprove(req.id)}
//                     style={{
//                       padding: '5px 10px',
//                       background: 'green',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: 4,
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Approve
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

// export default ClerkPendingReturns;

// corect one

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ClerkPendingReturns = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchPendingReturns = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await axios.get('http://localhost:5000/api/pending-returns');
//       setRequests(res.data);
//       if (res.data.length === 0) setError('No pending return requests.');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch pending return requests');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (requestId) => {
//     if (!window.confirm('Are you sure you want to approve this return?')) return;
//     try {
//       await axios.post(`http://localhost:5000/api/approve-return/${requestId}`);
//       alert('Return request approved.');
//       fetchPendingReturns();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to approve return request');
//     }
//   };

//   useEffect(() => {
//     fetchPendingReturns();
//   }, []);

//   return (
//     <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
//       <h2>Pending Return Requests</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {requests.length > 0 && (
//         <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ background: '#f2f2f2' }}>
//               <th>Request ID</th>
//               <th>Staff Name</th>
//               <th>Item Type</th>
//               <th>Item Serial</th>
//               <th>Quantity</th>
//               <th>Requested At</th>
//               <th>Given At</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => (
//               <tr key={req.id}>
//                 <td>{req.id}</td>
//                 <td>{req.staff_name}</td>
//                 <td>{req.item_type}</td>
//                 <td>{req.item_serial}</td>
//                 <td>{req.quantity}</td>
//                 <td>{new Date(req.requested_at).toLocaleString()}</td>
//                 <td>{req.given_at ? new Date(req.given_at).toLocaleString() : '-'}</td>
//                 <td>
//                   <button
//                     onClick={() => handleApprove(req.id)}
//                     style={{ padding: '5px 10px', background: 'green', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
//                   >
//                     Approve
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

// export default ClerkPendingReturns;

// corect

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCheck, FiClock, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import Footer from "../../components/Footer/Footer";

const ClerkPendingReturns = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cal Poly color scheme
  const calPolyGreen = '#154734';
  const calPolyGold = '#C4820E';
  const calPolyLightGreen = '#E6F2E9';

  const fetchPendingReturns = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.get('http://localhost:5000/api/pending-returns');
      setRequests(res.data);
      if (res.data.length === 0) setError('No pending return requests found.');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch pending return requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    if (!window.confirm('Are you sure you want to approve this return?')) return;

    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/approve-return/${requestId}`);
      setSuccess('Return request approved successfully!');
      fetchPendingReturns();
    } catch (err) {
      console.error(err);
      setError('Failed to approve return request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchPendingReturns();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <FiClock className="mr-2" style={{ color: calPolyGreen }} />
              <span style={{ color: calPolyGreen }}>Pending Return Requests</span>
            </h1>
            <button
              onClick={fetchPendingReturns}
              disabled={loading}
              className="flex items-center px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: calPolyLightGreen,
                color: calPolyGreen
              }}
            >
              <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 rounded-lg flex items-center bg-red-100 text-red-700">
              <FiAlertCircle className="mr-2" />
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 rounded-lg flex items-center bg-green-100 text-green-700">
              <FiCheck className="mr-2" />
              {success}
            </div>
          )}

          {/* Requests Table */}
          {loading && !requests.length ? (
            <div className="flex justify-center items-center h-64">
              <div 
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                style={{ borderColor: calPolyGreen }}
              ></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: calPolyGreen }}>
                        Staff
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: calPolyGreen }}>
                        Item Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: calPolyGreen }}>
                        Serial
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: calPolyGreen }}>
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: calPolyGreen }}>
                        Dates
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: calPolyGreen }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.length > 0 ? (
                      requests.map((req) => (
                        <tr key={req.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{req.staff_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{req.item_type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {req.item_serial}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {req.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <span className="font-medium">Requested:</span> {formatDate(req.requested_at)}
                            </div>
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">Given:</span> {formatDate(req.given_at)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleApprove(req.id)}
                              disabled={loading}
                              className="flex items-center px-4 py-2 rounded-lg text-white"
                              style={{ 
                                backgroundColor: loading ? '#9CA3AF' : calPolyGreen,
                                cursor: loading ? 'not-allowed' : 'pointer'
                              }}
                            >
                              <FiCheck className="mr-2" />
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                          No pending return requests found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer 
        backgroundColor={calPolyGreen}
        textColor="#FFFFFF"
      />
    </div>
  );
};

export default ClerkPendingReturns;
