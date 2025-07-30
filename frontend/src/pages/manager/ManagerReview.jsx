import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerReview = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [explanations, setExplanations] = useState({});

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/manager/item-requests/pending');
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleExplanationChange = (id, text) => {
    setExplanations(prev => ({ ...prev, [id]: text }));
  };

  const handleDecision = async (id, action) => {
    const explanation = explanations[id] || '';

    try {
      await axios.post(`http://localhost:5000/api/manager/item-requests/${id}/decision`, {
        action,
        explanation
      });
      alert(`Request ${action}ed successfully.`);
      fetchRequests(); // Refresh after decision
    } catch (err) {
      console.error('Error submitting decision:', err);
      alert('Failed to process request.');
    }
  };

  if (loading) return <p>Loading requests...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pending Item Requests</h1>
      {requests.length === 0 ? (
        <p>No pending requests for review.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="border rounded p-4 mb-4 shadow bg-white">
            <p><strong>Staff:</strong> {req.staff_name} ({req.staff_email})</p>
            <p><strong>Item:</strong> {req.item_type}</p>
            <p><strong>Serial No:</strong> {req.item_serial || 'N/A'}</p>
            <p><strong>Quantity:</strong> {req.quantity}</p>
            <textarea
              className="w-full p-2 border mt-2 rounded"
              rows="2"
              placeholder="Add explanation (optional for accept, required for reject)"
              value={explanations[req.id] || ''}
              onChange={(e) => handleExplanationChange(req.id, e.target.value)}
            />
            <div className="flex gap-3 mt-2">
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                onClick={() => handleDecision(req.id, 'accept')}
              >
                Accept
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                onClick={() => handleDecision(req.id, 'reject')}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManagerReview;
