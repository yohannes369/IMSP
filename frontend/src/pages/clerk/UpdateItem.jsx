
// const Item = require('../models/itemModel');
// const ItemUnit = require('../models/itemUnitModel');

// // Update an existing item
// const updateItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       Name,
//       Model,
//       TotalQty,
//       ShelfNumber,
//       UnitPriceBirr,
//       UnitPriceCent,
//       Remark
//     } = req.body;

//     // Fetch existing item
//     const existingItem = await Item.getById(id);
//     if (!existingItem) return res.status(404).json({ message: 'Item not found' });

//     // Update item in Items table
//     await Item.update(id, {
//       Name,
//       Model,
//       TotalQty,
//       ShelfNumber,
//       UnitPriceBirr,
//       UnitPriceCent,
//       Remark
//     });

//     // Handle quantity increase: add new units if TotalQty increased
//     if (TotalQty > existingItem.TotalQty) {
//       const newUnits = [];
//       for (let i = existingItem.TotalQty; i < TotalQty; i++) {
//         newUnits.push({
//           SerialNo: `SN${String(i + 1).padStart(3, "0")}`,
//           UnitPriceBirr,
//           UnitPriceCent,
//           Status: 'AVAILABLE',
//           AssignedTo: null
//         });
//       }
//       if (newUnits.length > 0) {
//         await ItemUnit.addUnits(id, newUnits);
//       }
//     }

//     // Real-time notification via Socket.IO
//     if (req.io) {
//       req.io.emit('itemUpdated', { ItemID: id });
//     }

//     res.status(200).json({ message: 'Item updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// module.exports = { updateItem };
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
  const [error, setError] = useState("");

  // Fetch item data by ID
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/items/${id}`);
        const { ItemName, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark } = response.data;
        setItemData({ Name: ItemName, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/items/items/${id}`, itemData);
      alert("Item updated successfully");
      navigate("/clerk"); // redirect back to clerk page
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Update Item</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="Name"
              value={itemData.Name}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Model</label>
            <input
              type="text"
              name="Model"
              value={itemData.Model}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Total Quantity</label>
            <input
              type="number"
              name="TotalQty"
              value={itemData.TotalQty}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              min={1}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Shelf Number</label>
            <input
              type="text"
              name="ShelfNumber"
              value={itemData.ShelfNumber}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Unit Price Birr</label>
            <input
              type="number"
              name="UnitPriceBirr"
              value={itemData.UnitPriceBirr}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              min={0}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Unit Price Cent</label>
            <input
              type="number"
              name="UnitPriceCent"
              value={itemData.UnitPriceCent}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              min={0}
              max={99}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Remark</label>
            <input
              type="text"
              name="Remark"
              value={itemData.Remark}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
