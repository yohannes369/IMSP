// // controllers/itemController.js
// const ItemModel = require('../models/itemModel');
// //import db from '../config/db'; // MySQL connection

// // itemController.js
// const db = require('../config/db'); // Adjust the path based on your folder structure
// exports.addItem = async (req, res) => {
//   try {
//     const { name, serial_no, description, quantity, is_available } = req.body;
//     const result = await ItemModel.addItem(name, serial_no, description, quantity, is_available);
//     res.status(201).json({ message: 'Item added', itemId: result.insertId });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAllItems = async (req, res) => {
//   try {
//     const items = await ItemModel.getAllItems();
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await ItemModel.deleteItem(id);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     res.json({ message: 'Item deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateFields = req.body;

//     const result = await ItemModel.updateItem(id, updateFields);

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     res.json({ message: 'Item updated successfully' });
//   } catch (err) {
//     console.error('Error updating item:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getUniqueItemNames = async (req, res) => {
//   try {
//     const [names] = await db.query(`SELECT DISTINCT name FROM item_names`);
//     res.status(200).json(names);
//   } catch (err) {
//     console.error('Error fetching item names:', err);
//     res.status(500).json({ message: 'Failed to fetch item names' });
//   }
// };


const ItemModel = require('../models/itemModel');
const db = require('../config/db');

exports.addItem = async (req, res) => {
  try {
    const { name, serial_no, description, quantity, is_available } = req.body;
    const result = await ItemModel.addItem(name, serial_no, description, quantity, is_available);
    res.status(201).json({ message: 'Item added', itemId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await ItemModel.getAllItems();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemModel.getItemById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ItemModel.deleteItem(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const result = await ItemModel.updateItem(id, updateFields);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item updated successfully' });
  } catch (err) {
    console.error('Error updating item:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
