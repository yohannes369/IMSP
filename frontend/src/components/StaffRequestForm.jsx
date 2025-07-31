import React, { useState } from 'react';
import axios from 'axios';

const StaffRequestForm = () => {
  const [form, setForm] = useState({
    staff_id: '',
    staff_name: '',
    staff_email: '',
    item_type: '',
    item_serial: '',
    quantity: 1,
    explanation: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRequest = async () => {
    try {
      await axios.post('http://localhost:5000/api/requests', form);
      alert('Request submitted!');
    } catch (err) {
      alert('Error submitting request');
    }
  };

  return (
    <div>
      <h2>Submit Inventory Request</h2>
      {Object.keys(form).map(key => (
        <div key={key}>
          <input
            type={key === 'quantity' ? 'number' : 'text'}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button onClick={submitRequest}>Submit</button>
    </div>
  );
};

export default StaffRequestForm;
