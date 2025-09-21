
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateItem = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [itemData, setItemData] = useState({
//     Name: "",
//     Model: "",
//     TotalQty: 0,
//     ShelfNumber: "",
//     UnitPriceBirr: 0,
//     UnitPriceCent: 0,
//     Remark: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch item data by ID
//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/items/items/${id}`);
//         const { ItemName, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark } = response.data;
//         setItemData({ Name: ItemName, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark });
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.data?.message || err.message);
//         setLoading(false);
//       }
//     };
//     fetchItem();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setItemData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/items/items/${id}`, itemData);
//       alert("Item updated successfully");
//       navigate("/clerk"); // redirect back to clerk page
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || err.message);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-4">Update Item</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <div>
//             <label className="block font-medium">Name</label>
//             <input
//               type="text"
//               name="Name"
//               value={itemData.Name}
//               onChange={handleChange}
//               className="w-full border px-2 py-1 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Model</label>
//             <input
//               type="text"
//               name="Model"
//               value={itemData.Model}
//               onChange={handleChange}
//               className="w-full border px-2 py-1 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Total Quantity</label>
//             <input
//               type="number"
//               name="TotalQty"
//               value={itemData.TotalQty}
//               onChange={handleChange}
//               className="w-full border px-2 py-1 rounded"
//               min={1}
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Shelf Number</label>
//             <input
//               type="text"
//               name="ShelfNumber"
//               value={itemData.ShelfNumber}
//               onChange={handleChange}
//               className="w-full border px-2 py-1 rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Unit Price Birr</label>
//             <input
//               type="number"
//               name="UnitPriceBirr"
//               value={itemData.UnitPriceBirr}
//               onChange={handleChange}
//               className="w-full border px-2 py-1 rounded"
//               min={0}
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Unit Price Cent</label>
//             <input
//               type="number"
//               name="UnitPriceCent"
//               value={itemData.UnitPriceCent}
//               onChange={handleChange}
//               className="w-full border px-2 py-1 rounded"
//               min={0}
//               max={99}
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Remark</label>
//             <input
//               type="text"
//               name="Remark"
//               value={itemData.Remark}
//               onChange={handleChange}
//               className="w-full border px-2 py-1 rounded"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             Update Item
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateItem;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState({
    Name: "",
    Model: "",
    TotalQty: 0,
    ShelfNumber: "",
    UnitPriceBirr: 0,
    UnitPriceCent: 0,
    Remark: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch item data by ID
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/items/${id}`);
        const { ItemName, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark } = response.data;
        setItemData({ 
          Name: ItemName, 
          Model, 
          TotalQty, 
          ShelfNumber, 
          UnitPriceBirr, 
          UnitPriceCent, 
          Remark 
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message || "Failed to fetch item data");
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    // Ensure numeric fields are stored as numbers
    setItemData(prev => ({ 
      ...prev, 
      [name]: name === "TotalQty" || name === "UnitPriceBirr" || name === "UnitPriceCent" 
        ? Number(value) 
        : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    
    try {
      await axios.put(`http://localhost:5000/api/items/items/${id}`, itemData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/clerk"); // redirect back to clerk page after 1.5 seconds
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to update item");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/clerk");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading item data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-blue-50">
            <h2 className="text-2xl font-semibold text-gray-800">Update Inventory Item</h2>
            <p className="mt-1 text-sm text-gray-600">Edit the details of item #{id}</p>
          </div>
          
          {/* Success Message */}
          {success && (
            <div className="m-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">Item updated successfully. Redirecting...</span>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="m-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={itemData.Name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter item name"
                />
              </div>
              
              <div>
                <label htmlFor="Model" className="block text-sm font-medium text-gray-700 mb-1">
                  Model *
                </label>
                <input
                  type="text"
                  id="Model"
                  name="Model"
                  value={itemData.Model}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter model"
                />
              </div>
              
              <div>
                <label htmlFor="TotalQty" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Quantity *
                </label>
                <input
                  type="number"
                  id="TotalQty"
                  name="TotalQty"
                  value={itemData.TotalQty}
                  onChange={handleNumericChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={1}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="ShelfNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Shelf Number
                </label>
                <input
                  type="text"
                  id="ShelfNumber"
                  name="ShelfNumber"
                  value={itemData.ShelfNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter shelf location"
                />
              </div>
              
              <div>
                <label htmlFor="UnitPriceBirr" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price (Birr) *
                </label>
                <input
                  type="number"
                  id="UnitPriceBirr"
                  name="UnitPriceBirr"
                  value={itemData.UnitPriceBirr}
                  onChange={handleNumericChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={0}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="UnitPriceCent" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price (Cent) *
                </label>
                <input
                  type="number"
                  id="UnitPriceCent"
                  name="UnitPriceCent"
                  value={itemData.UnitPriceCent}
                  onChange={handleNumericChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={0}
                  max={99}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Must be between 0-99 cents</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="Remark" className="block text-sm font-medium text-gray-700 mb-1">
                Remarks
              </label>
              <textarea
                id="Remark"
                name="Remark"
                value={itemData.Remark}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional notes about this item"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : "Update Item"}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;