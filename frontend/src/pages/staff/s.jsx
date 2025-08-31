import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer'; // Adjust path as needed

// Cal Poly color palette
const calPolyGreen = '#154734';
const calPolyGold = '#C4820E';

const StaffGivenItems = () => {
  const [staffId, setStaffId] = useState('');
  const [givenItems, setGivenItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch items assigned to this staff
  const fetchGivenItems = async () => {
    if (!staffId.trim()) {
      setError('Please enter your Staff ID');
      setGivenItems([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.get(`http://localhost:5000/api/give-items/${staffId}`);
      const items = res.data;

      if (!items || items.length === 0) {
        setError('No items assigned to this Staff ID.');
        setGivenItems([]);
      } else {
        setGivenItems(items);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch assigned items. Please try again.');
      setGivenItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle item return request
  const handleReturnRequest = async (giveItemId) => {
    if (!staffId.trim()) {
      alert('Staff ID is required to request return.');
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
      fetchGivenItems(); // Refresh assigned items
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
                {loading ? 'Loading...' : 'View My Items'}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Serial Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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

      <Footer bgColor={calPolyGreen} textColor="white" />
    </div>
  );
};

export default StaffGivenItems;
