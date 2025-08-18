
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AddItemPage = () => {
//   const [itemNames, setItemNames] = useState([]); // unique names only
//   const [itemName, setItemName] = useState('');
//   const [serialNo, setSerialNo] = useState('');
//   const [description, setDescription] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     fetchItemNames();
//   }, []);

//   const fetchItemNames = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/items/items'); // adjust URL
//       const data = res.data;

//       // Filter duplicates by name
//       const uniqueNamesMap = new Map();
//       data.forEach(item => {
//         if (!uniqueNamesMap.has(item.name)) {
//           uniqueNamesMap.set(item.name, item);
//         }
//       });

//       setItemNames(Array.from(uniqueNamesMap.values()));
//     } catch (err) {
//       console.error('Failed to fetch item names:', err);
//       setError('Failed to fetch item names');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const payload = {
//         name: itemName.trim(),
//         serial_no: serialNo.trim(),
//         description: description.trim(),
//         quantity: parseInt(quantity, 10),
//         is_available: true,
//       };

//       const res = await axios.post('http://localhost:5000/api/items/add', payload);

//       setSuccess(res.data.message || 'Item added successfully!');
//       setItemName('');
//       setSerialNo('');
//       setDescription('');
//       setQuantity(1);

//       // Refresh item names after adding
//       fetchItemNames();
//     } catch (err) {
//       console.error('Error adding item:', err.response?.data || err.message);
//       setError('Failed to add item. Check console for details.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Add Item</h2>

//       {error && <p className="text-red-600 mb-3">{error}</p>}
//       {success && <p className="text-green-600 mb-3">{success}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="block">
//           Item Name
//           <input
//             list="item-names-list"
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//             placeholder="Select or type a new item name"
//             required
//             className="w-full border p-2 rounded mt-1"
//           />
//           <datalist id="item-names-list">
//             {itemNames.map((item) => (
//               <option key={item.id} value={item.name} />
//             ))}
//           </datalist>
//         </label>

//         <label className="block">
//           Serial Number
//           <input
//             type="text"
//             value={serialNo}
//             onChange={(e) => setSerialNo(e.target.value)}
//             placeholder="Enter serial number"
//             required
//             className="w-full border p-2 rounded mt-1"
//           />
//         </label>

//         <label className="block">
//           Description
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter description (optional)"
//             className="w-full border p-2 rounded mt-1"
//           />
//         </label>

//         <label className="block">
//           Quantity
//           <input
//             type="number"
//             min={1}
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             required
//             className="w-full border p-2 rounded mt-1"
//           />
//         </label>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Add Item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddItemPage;


// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const AddItemPage = () => {
// //   const [itemNames, setItemNames] = useState([]);
// //   const [itemName, setItemName] = useState('');
// //   const [serialNo, setSerialNo] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [quantity, setQuantity] = useState(1);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     fetchItemNames();
// //   }, []);

// //   const fetchItemNames = async () => {
// //     try {
// //       setIsLoading(true);
// //       const res = await axios.get('http://localhost:5000/api/items/items');
// //       const data = res.data;

// //       const uniqueNamesMap = new Map();
// //       data.forEach(item => {
// //         if (!uniqueNamesMap.has(item.name)) {
// //           uniqueNamesMap.set(item.name, item);
// //         }
// //       });

// //       setItemNames(Array.from(uniqueNamesMap.values()));
// //       setIsLoading(false);
// //     } catch (err) {
// //       console.error('Failed to fetch item names:', err);
// //       setError('Failed to fetch item names');
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setSuccess('');
// //     setIsLoading(true);

// //     try {
// //       const payload = {
// //         name: itemName.trim(),
// //         serial_no: serialNo.trim(),
// //         description: description.trim(),
// //         quantity: parseInt(quantity, 10),
// //         is_available: true,
// //       };

// //       const res = await axios.post('http://localhost:5000/api/items/add', payload);

// //       setSuccess(res.data.message || 'Item added successfully!');
// //       setItemName('');
// //       setSerialNo('');
// //       setDescription('');
// //       setQuantity(1);

// //       fetchItemNames();
// //       setIsLoading(false);
// //     } catch (err) {
// //       console.error('Error adding item:', err.response?.data || err.message);
// //       setError(err.response?.data?.message || 'Failed to add item. Please try again.');
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Split Layout - Image on left, form on right */}
// //         <div className="flex flex-col lg:flex-row gap-8">
// //           {/* Image Section - Responsive for all screens */}
// //           <div className="lg:flex-1 w-full">
// //             <div className="relative h-64 md:h-96 lg:h-full rounded-xl shadow-lg overflow-hidden bg-green-100">
// //               {/* Responsive image with multiple src options */}
// //               <picture>
// //                 {/* WebP format for browsers that support it */}
// //                 <source 
// //                   srcSet="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&fm=webp" 
// //                   type="image/webp"
// //                 />
// //                 {/* Fallback for older browsers */}
// //                 <source
// //                   srcSet="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
// //                   type="image/jpeg"
// //                 />
// //                 {/* Default image */}
// //                 <img
// //                   src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
// //                   alt="Inventory management system"
// //                   className="w-full h-full object-cover"
// //                   loading="lazy"
// //                   decoding="async"
// //                 />
// //               </picture>
// //               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-6">
// //                 <div className="text-center text-white">
// //                   <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
// //                     Inventory Management
// //                   </h2>
// //                   <p className="text-lg sm:text-xl md:text-2xl">
// //                     Streamline your item addition process
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Form Section */}
// //           <div className="lg:flex-1 w-full">
// //             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
// //               {/* Header with decorative green bar */}
// //               <div className="bg-green-600 py-4 px-6">
// //                 <h2 className="text-2xl font-bold text-white">Add New Inventory Item</h2>
// //                 <p className="text-green-100">Fill out the form to add a new item to your inventory</p>
// //               </div>

// //               {/* Form content */}
// //               <div className="p-6 md:p-8">
// //                 {/* Status messages */}
// //                 {error && (
// //                   <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
// //                     <div className="flex items-center">
// //                       <svg className="h-5 w-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                       </svg>
// //                       <p className="text-red-700">{error}</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {success && (
// //                   <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
// //                     <div className="flex items-center">
// //                       <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                       </svg>
// //                       <p className="text-green-700">{success}</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <form onSubmit={handleSubmit} className="space-y-6">
// //                   {/* Item Name */}
// //                   <div>
// //                     <label htmlFor="item-name" className="block text-sm font-medium text-green-800 mb-1">
// //                       Item Name <span className="text-red-500">*</span>
// //                     </label>
// //                     <div className="relative">
// //                       <input
// //                         id="item-name"
// //                         list="item-names-list"
// //                         value={itemName}
// //                         onChange={(e) => setItemName(e.target.value)}
// //                         placeholder="Select or type a new item name"
// //                         required
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
// //                       />
// //                       <datalist id="item-names-list">
// //                         {itemNames.map((item) => (
// //                           <option key={item.id} value={item.name} />
// //                         ))}
// //                       </datalist>
// //                       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
// //                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //                         </svg>
// //                       </div>
// //                     </div>
// //                     <p className="mt-1 text-xs text-gray-500">Select from existing items or enter a new name</p>
// //                   </div>

// //                   {/* Serial Number */}
// //                   <div>
// //                     <label htmlFor="serial-no" className="block text-sm font-medium text-green-800 mb-1">
// //                       Serial Number <span className="text-red-500">*</span>
// //                     </label>
// //                     <input
// //                       id="serial-no"
// //                       type="text"
// //                       value={serialNo}
// //                       onChange={(e) => setSerialNo(e.target.value)}
// //                       placeholder="Enter serial number"
// //                       required
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
// //                     />
// //                   </div>

// //                   {/* Description */}
// //                   <div>
// //                     <label htmlFor="description" className="block text-sm font-medium text-green-800 mb-1">
// //                       Description
// //                     </label>
// //                     <textarea
// //                       id="description"
// //                       value={description}
// //                       onChange={(e) => setDescription(e.target.value)}
// //                       placeholder="Enter description (optional)"
// //                       rows={3}
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
// //                     />
// //                   </div>

// //                   {/* Quantity */}
// //                   <div>
// //                     <label htmlFor="quantity" className="block text-sm font-medium text-green-800 mb-1">
// //                       Quantity <span className="text-red-500">*</span>
// //                     </label>
// //                     <div className="relative w-32">
// //                       <input
// //                         id="quantity"
// //                         type="number"
// //                         min={1}
// //                         value={quantity}
// //                         onChange={(e) => setQuantity(e.target.value)}
// //                         required
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
// //                       />
// //                       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
// //                         <span className="text-gray-500">units</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Submit Button */}
// //                   <div className="pt-4">
// //                     <button
// //                       type="submit"
// //                       disabled={isLoading}
// //                       className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
// //                     >
// //                       {isLoading ? (
// //                         <>
// //                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                           </svg>
// //                           Processing...
// //                         </>
// //                       ) : (
// //                         <>
// //                           <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
// //                           </svg>
// //                           Add Item
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>

// //             {/* Tips Section */}
// //             <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-6">
// //               <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
// //                 <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                 </svg>
// //                 Quick Tips
// //               </h3>
// //               <ul className="space-y-2 text-sm text-green-700">
// //                 <li className="flex items-start">
// //                   <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                   </svg>
// //                   <span>Use existing names when possible to maintain consistency</span>
// //                 </li>
// //                 <li className="flex items-start">
// //                   <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                   </svg>
// //                   <span>Serial numbers should be unique for each item</span>
// //                 </li>
// //                 <li className="flex items-start">
// //                   <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                   </svg>
// //                   <span>Detailed descriptions help with inventory management</span>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddItemPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../../components/Footer/Footer";

const AddItemPage = () => {
  const [itemNames, setItemNames] = useState([]);
  const [itemName, setItemName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchItemNames();
  }, []);

  const fetchItemNames = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:5000/api/items/items');
      const data = res.data;

      const uniqueNamesMap = new Map();
      data.forEach(item => {
        if (!uniqueNamesMap.has(item.name)) {
          uniqueNamesMap.set(item.name, item);
        }
      });

      setItemNames(Array.from(uniqueNamesMap.values()));
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch item names:', err);
      setError('Failed to fetch item names');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

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

      fetchItemNames();
      setIsLoading(false);
    } catch (err) {
      console.error('Error adding item:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to add item. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-calpoly-green mb-4">
              Inventory Management System
            </h1>
            <div className="w-24 h-1 bg-calpoly-green mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Add new items to your inventory with this streamlined form
            </p>
          </div>

          {/* Split Layout - Image on left, form on right */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="relative h-full rounded-xl shadow-2xl overflow-hidden bg-calpoly-green">
                <div className="absolute inset-0 bg-calpoly-green opacity-90"></div>
                <img
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Inventory management"
                  className="w-full h-full object-cover mix-blend-overlay"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Cal Poly Inventory
                    </h2>
                    <p className="text-xl text-white opacity-90">
                      Efficient, organized, and easy to use
                    </p>
                    <div className="mt-8">
                      <div className="inline-flex items-center px-6 py-3 border border-white rounded-full text-white font-medium">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Items
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                {/* Form Header */}
                <div className="bg-calpoly-green py-5 px-6">
                  <h2 className="text-2xl font-bold text-white">Add New Item</h2>
                  <p className="text-calpoly-light-green">Fill out all required fields</p>
                </div>

                {/* Form Content */}
                <div className="p-6 md:p-8">
                  {/* Status Messages */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700">{error}</p>
                      </div>
                    </div>
                  )}

                  {success && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-green-700">{success}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Item Name */}
                    <div>
                      <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Item Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="item-name"
                          list="item-names-list"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          placeholder="Select or type a new item name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calpoly-green focus:border-calpoly-green transition duration-200"
                        />
                        <datalist id="item-names-list">
                          {itemNames.map((item) => (
                            <option key={item.id} value={item.name} />
                          ))}
                        </datalist>
                      </div>
                    </div>

                    {/* Serial Number */}
                    <div>
                      <label htmlFor="serial-no" className="block text-sm font-medium text-gray-700 mb-1">
                        Serial Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="serial-no"
                        type="text"
                        value={serialNo}
                        onChange={(e) => setSerialNo(e.target.value)}
                        placeholder="Enter serial number"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calpoly-green focus:border-calpoly-green transition duration-200"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description (optional)"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calpoly-green focus:border-calpoly-green transition duration-200"
                      />
                    </div>

                    {/* Quantity */}
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calpoly-green focus:border-calpoly-green transition duration-200"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-calpoly-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-calpoly-green transition duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Item
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-8 bg-calpoly-light-green bg-opacity-10 border border-calpoly-light-green border-opacity-20 rounded-xl p-6">
                <h3 className="text-lg font-medium text-calpoly-green mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Need Help?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-calpoly-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-calpoly-green">Item Name:</span> Use existing names when possible to maintain consistency.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-calpoly-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-calpoly-green">Serial Number:</span> Must be unique for tracking purposes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-calpoly-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-calpoly-green">Description:</span> Include details like model, specifications, or location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddItemPage;