
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

// corct one

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UpdateItem = () => {
//   const { id } = useParams();
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
//       navigate('/items');
//     } catch (error) {
//       console.error('Error updating item:', error.message);
//       alert('Failed to update item');
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-xl p-8">
//       <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Update Item</h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="block text-gray-600 font-medium mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600 font-medium mb-1">Serial No</label>
//           <input
//             type="text"
//             name="serial_no"
//             value={formData.serial_no}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600 font-medium mb-1">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600 font-medium mb-1">Quantity</label>
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             name="is_available"
//             checked={formData.is_available}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           <label className="text-gray-600 font-medium">Available</label>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//         >
//           Update Item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateItem;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import Footer from "../../components/Footer/Footer";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cal Poly color scheme
  const calPolyGreen = '#154734';
  const calPolyGold = '#C4820E';
  const calPolyLightGreen = '#E6F2E9';

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
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
        setError('Failed to fetch item details');
      } finally {
        setLoading(false);
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
      setLoading(true);
      setError('');
      await axios.put(`http://localhost:5000/api/items/items/${id}`, formData);
      navigate('/Clerk/item-managment');
    } catch (error) {
      console.error('Error updating item:', error.message);
      setError(error.response?.data?.message || 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow">
        {/* Header */}
        <div 
          className="bg-white shadow-sm py-4 px-6"
          style={{ borderBottom: `3px solid ${calPolyGold}` }}
        >
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => navigate('/Clerk/item-managment')}
              className="flex items-center text-gray-700 hover:text-gray-900"
              style={{ color: calPolyGreen }}
            >
              <FiArrowLeft className="mr-1" /> Back to Inventory
            </button>
            <h1 
              className="text-2xl font-bold"
              style={{ color: calPolyGreen }}
            >
              Update Inventory Item
            </h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div 
            className="bg-white rounded-xl shadow-md overflow-hidden"
            style={{ borderTop: `4px solid ${calPolyGreen}` }}
          >
            {loading && !formData.name ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: calPolyGreen }}></div>
              </div>
            ) : (
              <>
                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Item Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        style={{ borderColor: calPolyGreen }}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Serial Number*</label>
                      <input
                        type="text"
                        name="serial_no"
                        value={formData.serial_no}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        style={{ borderColor: calPolyGreen }}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        style={{ borderColor: calPolyGreen }}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Quantity*</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        style={{ borderColor: calPolyGreen }}
                      />
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center h-full">
                        <input
                          type="checkbox"
                          name="is_available"
                          checked={formData.is_available}
                          onChange={handleChange}
                          className="h-5 w-5 rounded"
                          style={{ borderColor: calPolyGreen, color: calPolyGreen }}
                        />
                        <label className="ml-2 text-gray-700 font-medium">Available in Inventory</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => navigate('/Clerk/item-managment')}
                      className="px-6 py-2 border rounded-lg font-medium"
                      style={{ borderColor: calPolyGreen, color: calPolyGreen }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 rounded-lg font-medium text-white flex items-center"
                      style={{ 
                        backgroundColor: loading ? '#9CA3AF' : calPolyGreen,
                        cursor: loading ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {loading ? (
                        'Saving...'
                      ) : (
                        <>
                          <FiSave className="mr-2" /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer 
        backgroundColor={calPolyGreen}
        textColor="#FFFFFF"
      />
    </div>
  );
};

export default UpdateItem;