

// import React, { useState } from 'react';
// import axios from 'axios';

// const GiveItemForm = () => {
//   const [formData, setFormData] = useState({
//     staff_id: '',
//     name: '',
//     serial_no: '',
//     item_name_id: ''
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     try {
//       const res = await axios.post('http://localhost:5000/api/clerk/give-item', formData);
//       setMessage(res.data.message);
//       setFormData({ staff_id: '', name: '', serial_no: '', item_name_id: '' });
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg mt-10">
//       <h2 className="text-xl font-semibold mb-4">Give Item to Staff</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="staff_id"
//           placeholder="Staff ID"
//           value={formData.staff_id}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="name"
//           placeholder="Item Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="serial_no"
//           placeholder="Item Serial No"
//           value={formData.serial_no}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="item_name_id"
//           placeholder="Item Name ID"
//           value={formData.item_name_id}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Give Item
//         </button>
//       </form>

//       {message && <p className="text-green-600 mt-4">{message}</p>}
//       {error && <p className="text-red-600 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default GiveItemForm;

import React, { useState } from 'react';
import axios from 'axios';

const GiveItemForm = () => {
  const [formData, setFormData] = useState({
    staff_id: '',
    name: '',
    serial_no: '',
    item_name_id: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/clerk/give-item', formData);
      setMessage(res.data.message);
      setFormData({ staff_id: '', name: '', serial_no: '', item_name_id: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4">Give Item to Staff</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="staff_id"
          placeholder="Staff ID"
          value={formData.staff_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="serial_no"
          placeholder="Item Serial No"
          value={formData.serial_no}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="item_name_id"
          placeholder="Item Name ID"
          value={formData.item_name_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Give Item
        </button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default GiveItemForm;
