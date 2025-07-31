import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClerkReview = () => {
  const [requests, setRequests] = useState([]);
  const [comments, setComments] = useState({});
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests/clerk/pending');
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch clerk requests:', err);
    }
  };

  const handleReviewSubmit = async (id) => {
    const status = statuses[id] || 'approved';
    const clerk_comment = comments[id] || '';

    try {
      await axios.put(`http://localhost:5000/api/requests/clerk/${id}`, {
        status,
        clerk_comment,
      });
      alert('Review submitted successfully!');
      fetchPendingRequests(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Clerk Reviews</h2>

      {requests.length === 0 ? (
        <p>No pending requests for clerk.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="border rounded p-4 mb-4 shadow">
            <p><strong>Request ID:</strong> {req.id}</p>
            <p><strong>Staff ID:</strong> {req.staff_id}</p>
            <p><strong>Item:</strong> {req.item_type} ({req.item_serial})</p>
            <p><strong>Quantity:</strong> {req.quantity}</p>
            <p><strong>Explanation:</strong> {req.explanation}</p>

            <select
              className="mt-2 border p-1"
              value={statuses[req.id] || 'approved'}
              onChange={(e) =>
                setStatuses({ ...statuses, [req.id]: e.target.value })
              }
            >
              <option value="approved">Approve</option>
              <option value="rejected_clerk">Reject</option>
            </select>

            <input
              className="mt-2 border p-1 w-full"
              placeholder="Clerk Comment"
              value={comments[req.id] || ''}
              onChange={(e) =>
                setComments({ ...comments, [req.id]: e.target.value })
              }
            />

            <button
              onClick={() => handleReviewSubmit(req.id)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Submit Review
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ClerkReview;
