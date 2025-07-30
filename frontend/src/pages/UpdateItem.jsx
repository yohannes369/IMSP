
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UpdateItem = () => {
//   const { id } = useParams(); // get item ID from URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     serial_no: '',
//     description: '',
//     quantity: '',
//     is_available: true,
//   });

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/items/items/${id}`);
//         const item = res.data;
//         setFormData({
//           name: item.name || '',
//           serial_no: item.serial_no || '',
//           description: item.description || '',
//           quantity: item.quantity || '',
//           is_available: item.is_available === 1 || item.is_available === true,
//         });
//       } catch (error) {
//         console.error('Error fetching item:', error.message);
//         alert('Failed to fetch item');
//       }
//     };

//     fetchItem();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/items/items/${id}`, formData);
//       alert('Item updated successfully!');
//       navigate('/items'); // redirect after update
//     } catch (error) {
//       console.error('Error updating item:', error.message);
//       alert('Failed to update item');
//     }
//   };

//   return (
//     <div className="update-form" style={{ maxWidth: '500px', margin: 'auto' }}>
//       <h2>Update Item</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Name:
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>Serial No:
//           <input
//             type="text"
//             name="serial_no"
//             value={formData.serial_no}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>Description:
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </label>

//         <label>Quantity:
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>Available:
//           <input
//             type="checkbox"
//             name="is_available"
//             checked={formData.is_available}
//             onChange={handleChange}
//           />
//         </label>

//         <button type="submit">Update Item</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateItem;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    serial_no: '',
    description: '',
    quantity: '',
    is_available: true,
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items/items/${id}`);
        const item = res.data;
        setFormData({
          name: item.name || '',
          serial_no: item.serial_no || '',
          description: item.description || '',
          quantity: item.quantity || '',
          is_available: item.is_available === 1 || item.is_available === true,
        });
      } catch (error) {
        console.error('Error fetching item:', error.message);
        alert('Failed to fetch item');
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/items/items/${id}`, formData);
      alert('Item updated successfully!');
      navigate('/items');
    } catch (error) {
      console.error('Error updating item:', error.message);
      alert('Failed to update item');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-xl p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Update Item</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Serial No</label>
          <input
            type="text"
            name="serial_no"
            value={formData.serial_no}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_available"
            checked={formData.is_available}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-600 font-medium">Available</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
