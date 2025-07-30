import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddItemPage = () => {
  const [itemNames, setItemNames] = useState([]); // unique names only
  const [itemName, setItemName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchItemNames();
  }, []);

  const fetchItemNames = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items/items'); // adjust URL
      const data = res.data;

      // Filter duplicates by name
      const uniqueNamesMap = new Map();
      data.forEach(item => {
        if (!uniqueNamesMap.has(item.name)) {
          uniqueNamesMap.set(item.name, item);
        }
      });

      setItemNames(Array.from(uniqueNamesMap.values()));
    } catch (err) {
      console.error('Failed to fetch item names:', err);
      setError('Failed to fetch item names');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const payload = {
        name: itemName.trim(),
        serial_no: serialNo.trim(),
        description: description.trim(),
        quantity: parseInt(quantity, 10),
        is_available: true,
      };

      const res = await axios.post('http://localhost:5000/api/items/add', payload);

      setSuccess(res.data.message || 'Item added successfully!');
      setItemName('');
      setSerialNo('');
      setDescription('');
      setQuantity(1);

      // Refresh item names after adding
      fetchItemNames();
    } catch (err) {
      console.error('Error adding item:', err.response?.data || err.message);
      setError('Failed to add item. Check console for details.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Item</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Item Name
          <input
            list="item-names-list"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Select or type a new item name"
            required
            className="w-full border p-2 rounded mt-1"
          />
          <datalist id="item-names-list">
            {itemNames.map((item) => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>
        </label>

        <label className="block">
          Serial Number
          <input
            type="text"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
            placeholder="Enter serial number"
            required
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block">
          Quantity
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
