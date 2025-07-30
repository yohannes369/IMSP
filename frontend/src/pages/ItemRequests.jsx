import React, { useState } from 'react';
import axios from 'axios';

const ItemRequests = ({ onSuccess }) => {
  const [form, setForm] = useState({
    staff_id: '',
    staff_name: '',
    staff_email: '',
    item_type: '',
    item_serial: '',
    quantity: '',
    explanation: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (
      !form.staff_id ||
      !form.staff_name ||
      !form.staff_email ||
      !form.item_type ||
      !form.quantity
    ) {
      setError('Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/item-requests', {
        staff_id: Number(form.staff_id),
        staff_name: form.staff_name,
        staff_email: form.staff_email,
        item_type: form.item_type,
        item_serial: form.item_serial || null,
        quantity: Number(form.quantity),
        explanation: form.explanation || null,
        // status will default on backend
      });

      if (onSuccess) onSuccess(res.data);

      setForm({
        staff_id: '',
        staff_name: '',
        staff_email: '',
        item_type: '',
        item_serial: '',
        quantity: '',
        explanation: '',
      });
      alert('Item request created successfully!');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || 'Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Create New Item Request</h2>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

      <div style={{ marginBottom: 10 }}>
        <label>
          Staff ID*:<br />
          <input
            type="number"
            name="staff_id"
            value={form.staff_id}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Staff Name*:<br />
          <input
            type="text"
            name="staff_name"
            value={form.staff_name}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Staff Email*:<br />
          <input
            type="email"
            name="staff_email"
            value={form.staff_email}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Item Type*:<br />
          <input
            type="text"
            name="item_type"
            value={form.item_type}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Item Serial:<br />
          <input
            type="text"
            name="item_serial"
            value={form.item_serial}
            onChange={handleChange}
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Quantity*:<br />
          <input
            type="number"
            min="1"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Explanation:<br />
          <textarea
            name="explanation"
            value={form.explanation}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default ItemRequests;
