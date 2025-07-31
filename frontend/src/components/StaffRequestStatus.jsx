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
import React, { useState } from 'react';
import axios from 'axios';

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

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Track My Requests</h2>
      <input
        type="text"
        placeholder="Enter your Staff ID"
        value={staffId}
        onChange={(e) => setStaffId(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={fetchStatus} disabled={loading} style={{ padding: '8px 16px' }}>
        {loading ? 'Loading...' : 'Track Requests'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {requests.length > 0 && (
        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Item Type</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Manager Comment</th>
              <th>Clerk Comment</th>
              <th>Requested On</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.item_type}</td>
                <td>{req.quantity}</td>
                <td>{req.status}</td>
                <td>{req.manager_comment || '-'}</td>
                <td>{req.clerk_comment || '-'}</td>
                <td>{new Date(req.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffRequestStatus;
