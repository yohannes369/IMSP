



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const ClerkPage = () => {
  const [items, setItems] = useState([]);
  const [groupedItems, setGroupedItems] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Create navigate function

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items/items');
      const data = res.data;

      const grouped = {};
      data.forEach(item => {
        if (!grouped[item.name]) {
          grouped[item.name] = [];
        }
        grouped[item.name].push(item);
      });

      setItems(data);
      setGroupedItems(grouped);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch items');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;

    try {
      setError('');
      setSuccess('');

      await axios.delete(`http://localhost:5000/api/items/items/${id}`);

      const newItems = items.filter(item => item.id !== id);

      const newGrouped = {};
      newItems.forEach(item => {
        if (!newGrouped[item.name]) {
          newGrouped[item.name] = [];
        }
        newGrouped[item.name].push(item);
      });

      setItems(newItems);
      setGroupedItems(newGrouped);

      setSuccess('Item deleted successfully.');
    } catch (err) {
      console.error('Failed to delete item:', err);
      setError('Failed to delete item. Try again later.');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-item/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Grouped Items by Name</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Serial No</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Available</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedItems).map(([name, items]) =>
            items.map((item, idx) => (
              <tr key={item.id}>
                {idx === 0 ? (
                  <td className="border p-2" rowSpan={items.length}>
                    {name}
                  </td>
                ) : null}
                <td className="border p-2">{item.serial_no}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.is_available ? 'Yes' : 'No'}</td>
                <td className="border p-2">{new Date(item.created_at).toLocaleString()}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClerkPage;
