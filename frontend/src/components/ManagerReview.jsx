import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerReview = () => {
  const [currentRequest, setCurrentRequest] = useState(null);
  const [status, setStatus] = useState('pending_clerk'); // approve by default
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [noRequests, setNoRequests] = useState(false);

  // Fetch the next pending request for manager to review on mount or after review submission
  const fetchNextPendingRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/requests/manager/pending'); 
      // Expected: API returns one next pending request or empty array if none
      if (res.data && res.data.length > 0) {
        setCurrentRequest(res.data[0]);
        setStatus('pending_clerk');  // reset status to approve default for each new request
        setComment('');
        setNoRequests(false);
      } else {
        setCurrentRequest(null);
        setNoRequests(true);
      }
    } catch (err) {
      alert('Failed to fetch pending requests');
    } finally {
      setLoading(false);
    }
  };

  // Load the first request on component mount
  React.useEffect(() => {
    fetchNextPendingRequest();
  }, []);

  const handleSubmit = async () => {
    if (!currentRequest) return;

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/requests/manager/${currentRequest.id}`,
        {
          status,
          manager_comment: comment,
        }
      );

      // After submission, fetch next pending request
      await fetchNextPendingRequest();
    } catch (error) {
      alert('Failed to submit review: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (noRequests) return <p>No pending requests for review.</p>;

  if (!currentRequest) return null;

  return (
    <div>
      <h2>Manager Review</h2>

      {/* <div>
        <label>Request ID:</label>
        <input type="text" value={currentRequest.id} disabled />
      </div>

      <div>
        <label>Staff ID:</label>
        <input type="text" value={currentRequest.staff_id} disabled />
      </div> */}
          
 <div>
        <label>Staff name:</label>
        <input type="text" value={currentRequest.staff_name} disabled />
      </div>

      <div>
        <label>Item Type:</label>
        <input type="text" value={currentRequest.item_type} disabled />
      </div>

      <div>
        <label>Quantity:</label>
        <input type="number" value={currentRequest.quantity} disabled />
      </div>

      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending_clerk">Approve</option>
          <option value="rejected_manager">Reject</option>
        </select>
      </div>

      <div>
        <label>Comment:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment (optional)"
        />
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        Submit Review
      </button>
    </div>
  );
};

export default ManagerReview;
