

// const ItemModel = require('../models/itemModel');
// const db = require('../config/db');

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

// exports.getItemById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const item = await ItemModel.getItemById(id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
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

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     res.json({ message: 'Item updated successfully' });
//   } catch (err) {
//     console.error('Error updating item:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };







// const ItemModel = require('../models/itemModel');
// const bwipjs = require('bwip-js');
// const fs = require('fs');
// const path = require('path');

// exports.addItem = async (req, res) => {
//   try {
//     const { name,serial_no, description, quantity, is_available } = req.body;

//     // 1. Generate unique serial number
   

//     // 2. Generate barcode image buffer
//     const barcodeBuffer = await bwipjs.toBuffer({
//       bcid: 'code128',
//       text: serial_no,
//       scale: 3,
//       height: 10,
//       includetext: true,
//       textxalign: 'center',
//     });

//     // 3. Save image to public/barcodes/
//     const barcodeDir = path.join(__dirname, '..', 'public', 'barcodes');
//     if (!fs.existsSync(barcodeDir)) fs.mkdirSync(barcodeDir, { recursive: true });

//     const barcodeFilename = `${serial_no}.png`;
//     const barcodePath = path.join(barcodeDir, barcodeFilename);
//     fs.writeFileSync(barcodePath, barcodeBuffer);

//     const barcodeUrl = `/barcodes/${barcodeFilename}`;

//     // 4. Save to DB via model
//     const result = await ItemModel.addItem(
//       name,
//       serial_no,
//       serial_no,
//       description,
//       quantity,
//       is_available,
//       barcodeUrl
//     );

//     res.status(201).json({
//       message: 'Item added with barcode',
//       itemId: result.insertId,
//       serial_no,
//       barcode: barcodeUrl
//     });

//   } catch (err) {
//     console.error(err);
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

// exports.getItemById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const item = await ItemModel.getItemById(id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
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

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     res.json({ message: 'Item updated successfully' });
//   } catch (err) {
//     console.error('Error updating item:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };






// corect one

// const ItemModel = require('../models/itemModel');
// const bwipjs = require('bwip-js');
// const fs = require('fs');
// const path = require('path');

// // Add item and generate barcode image
// exports.addItem = async (req, res) => {
//   try {
//     const { name, serial_no, description, quantity, is_available } = req.body;

//     // 1. Generate barcode with serial number (can later fetch full details using serial_no)
//     const barcodeBuffer = await bwipjs.toBuffer({
//       bcid: 'code128',
//       text: serial_no,
//       scale: 3,
//       height: 10,
//       includetext: true,
//       textxalign: 'center',
//     });

//     // 2. Save barcode image in public/barcodes/
//     const barcodeDir = path.join(__dirname, '..', 'public', 'barcodes');
//     if (!fs.existsSync(barcodeDir)) fs.mkdirSync(barcodeDir, { recursive: true });

//     const barcodeFilename = `${serial_no}.png`;
//     const barcodePath = path.join(barcodeDir, barcodeFilename);
//     fs.writeFileSync(barcodePath, barcodeBuffer);
//     const barcodeUrl = `/barcodes/${barcodeFilename}`;

//     // 3. Save item to DB
//     const result = await ItemModel.addItem(name, serial_no, description, quantity, is_available, barcodeUrl);

//     res.status(201).json({
//       message: 'Item added successfully',
//       itemId: result.insertId,
//       serial_no,
//       barcode: barcodeUrl,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Fetch all items
// exports.getAllItems = async (req, res) => {
//   try {
//     const items = await ItemModel.getAllItems();
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Fetch single item by ID
// exports.getItemById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const item = await ItemModel.getItemById(id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Fetch item by barcode (serial number)
// exports.getItemByBarcode = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const item = await ItemModel.getItemBySerial(code);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete item
// exports.deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await ItemModel.deleteItem(id);
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
//     res.json({ message: 'Item deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update item
// exports.updateItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await ItemModel.updateItem(id, req.body);
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
//     res.json({ message: 'Item updated successfully' });
//   } catch (err) {
//     console.error('Error updating item:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




//correct code the clerk add bar code during add item code


// const ItemModel = require('../models/itemModel');
// const bwipjs = require('bwip-js');
// const fs = require('fs');
// const path = require('path');

// // Add item and generate barcode image
// exports.addItem = async (req, res) => {
//   try {
//     const { name, serial_no, description, quantity, is_available } = req.body;

//     // Generate barcode with serial number
//     const barcodeBuffer = await bwipjs.toBuffer({
//       bcid: 'code128',
//       text: serial_no,
//       scale: 3,
//       height: 10,
//       includetext: true,
//       textxalign: 'center',
//     });

//     // Save barcode image
//     const barcodeDir = path.join(__dirname, '..', 'public', 'barcodes');
//     if (!fs.existsSync(barcodeDir)) fs.mkdirSync(barcodeDir, { recursive: true });

//     const barcodeFilename = `${serial_no}.png`;
//     const barcodePath = path.join(barcodeDir, barcodeFilename);
//     fs.writeFileSync(barcodePath, barcodeBuffer);
//     const barcodeUrl = `/barcodes/${barcodeFilename}`;

//     // Save item to DB
//     const result = await ItemModel.addItem(name, serial_no, description, quantity, is_available, barcodeUrl);

//     res.status(201).json({
//       message: 'Item added successfully',
//       itemId: result.insertId,
//       serial_no,
//       barcode: barcodeUrl,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all items (in stock)
// exports.getAllItems = async (req, res) => {
//   try {
//     const items = await ItemModel.getAllItems();
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all given items
// exports.getAllGivenItems = async (req, res) => {
//   try {
//     const items = await ItemModel.getAllGivenItems();
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get single item by ID
// exports.getItemById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const item = await ItemModel.getItemById(id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get item by barcode (serial number)
// exports.getItemByBarcode = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const item = await ItemModel.getItemBySerial(code);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Request item
// exports.requestItem = async (req, res) => {
//   try {
//     const { itemId, staffId } = req.body;
//     const result = await ItemModel.requestItem(itemId, staffId);
//     if (!result) return res.status(404).json({ message: 'Item not found or already requested' });
//     res.status(201).json({ message: 'Item requested successfully', requestId: result.insertId });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Approve request
// exports.approveRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const clerkId = req.user.id; // Assuming clerk ID comes from auth middleware
//     const result = await ItemModel.approveRequest(requestId, clerkId);
//     if (!result) return res.status(404).json({ message: 'Request not found or already processed' });
//     res.status(200).json({ message: 'Request approved and item assigned successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete item
// exports.deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await ItemModel.deleteItem(id);
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
//     res.json({ message: 'Item deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update item
// exports.updateItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await ItemModel.updateItem(id, req.body);
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
//     res.json({ message: 'Item updated successfully' });
//   } catch (err) {
//     console.error('Error updating item:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const ItemModel = require('../models/itemModel');
// const bwipjs = require('bwip-js');
// const fs = require('fs');
// const path = require('path');

// // Add item and generate barcode image
// exports.addItem = async (req, res) => {
//   try {
//     const { name, serial_no, description, quantity, is_available } = req.body;

//     // Generate barcode image buffer using serial_no
//     const barcodeBuffer = await bwipjs.toBuffer({
//       bcid: 'code128',      // Barcode type
//       text: serial_no,      // Data to encode
//       scale: 3,             // 3x scaling factor
//       height: 10,           // Bar height, in mm
//       includetext: true,    // Show human-readable text
//       textxalign: 'center', // Center-align text
//     });

//     // Ensure barcode directory exists
//     const barcodeDir = path.join(__dirname, '..', 'public', 'barcodes');
//     if (!fs.existsSync(barcodeDir)) fs.mkdirSync(barcodeDir, { recursive: true });

//     // Write barcode image to file named after serial_no
//     const barcodeFilename = `${serial_no}.png`;
//     const barcodePath = path.join(barcodeDir, barcodeFilename);
//     fs.writeFileSync(barcodePath, barcodeBuffer);

//     // URL/path saved in DB to reference the barcode image
//     const barcodeUrl = `/barcodes/${barcodeFilename}`;

//     // Save item with barcode URL to database (adds entry in items and give_items)
//     const result = await ItemModel.addItem(name, serial_no, description, quantity, is_available, barcodeUrl);

//     res.status(201).json({
//       message: 'Item added successfully',
//       itemId: result.itemId,
//       serial_no,
//       barcode: barcodeUrl,
//     });
//   } catch (err) {
//     console.error('Add Item Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all items (in stock)
// exports.getAllItems = async (req, res) => {
//   try {
//     const items = await ItemModel.getAllItems();
//     res.status(200).json(items);
//   } catch (err) {
//     console.error('Get All Items Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all given items (assigned items)
// exports.getAllGivenItems = async (req, res) => {
//   try {
//     const items = await ItemModel.getAllGivenItems();
//     res.status(200).json(items);
//   } catch (err) {
//     console.error('Get All Given Items Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get single item by ID
// exports.getItemById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const item = await ItemModel.getItemById(id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
//   } catch (err) {
//     console.error('Get Item By ID Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get item by barcode (serial number)
// exports.getItemByBarcode = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const item = await ItemModel.getItemBySerial(code);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
//   } catch (err) {
//     console.error('Get Item By Barcode Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Request item
// exports.requestItem = async (req, res) => {
//   try {
//     const { itemId, staffId } = req.body;
//     const result = await ItemModel.requestItem(itemId, staffId);
//     if (!result) return res.status(404).json({ message: 'Item not found or already requested' });
//     res.status(201).json({ message: 'Item requested successfully', requestId: result.insertId });
//   } catch (err) {
//     console.error('Request Item Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Approve request (assign item)
// exports.approveRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const clerkId = req.user.id; // Assuming clerk ID comes from authentication middleware
//     const result = await ItemModel.approveRequest(requestId, clerkId);
//     if (!result) return res.status(404).json({ message: 'Request not found or already processed' });
//     res.status(200).json({ message: 'Request approved and item assigned successfully' });
//   } catch (err) {
//     console.error('Approve Request Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete item
// exports.deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await ItemModel.deleteItem(id);
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
//     res.json({ message: 'Item deleted' });
//   } catch (err) {
//     console.error('Delete Item Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update item
// exports.updateItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await ItemModel.updateItem(id, req.body);
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
//     res.json({ message: 'Item updated successfully' });
//   } catch (err) {
//     console.error('Update Item Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// corect one 

// const ItemModel = require('../models/itemModel');
// const bwipjs = require('bwip-js');
// const fs = require('fs');
// const path = require('path');

// // Add item and generate barcode image
// exports.addItem = async (req, res) => {
//   try {
//     const { name, serial_no, description, quantity, is_available } = req.body;

//     // Generate barcode image buffer using serial_no
//     const barcodeBuffer = await bwipjs.toBuffer({
//       bcid: 'code128',      // Barcode type
//       text: serial_no,      // Data to encode
//       scale: 3,             // 3x scaling factor
//       height: 10,           // Bar height, in mm
//       includetext: true,    // Show human-readable text
//       textxalign: 'center', // Center-align text
//     });

//     // Ensure barcode directory exists
//     const barcodeDir = path.join(__dirname, '..', 'public', 'barcodes');
//     if (!fs.existsSync(barcodeDir)) fs.mkdirSync(barcodeDir, { recursive: true });

//     const barcodeFilename = `${serial_no}.png`;
//     const barcodePath = path.join(barcodeDir, barcodeFilename);
//     fs.writeFileSync(barcodePath, barcodeBuffer);

//     const barcodeUrl = `/barcodes/${barcodeFilename}`;

//     // Save item with barcode URL to database
//     const result = await ItemModel.addItem(name, serial_no, description, quantity, is_available, barcodeUrl);

//     const newItem = {
//       id: result.itemId,
//       name,
//       serial_no,
//       description,
//       quantity,
//       is_available,
//       barcode: barcodeUrl,
//     };

//     // ===== Real-Time Notification =====
//     const io = req.app.get('io'); // Get Socket.IO instance from server.js
//     if (io) {
//       io.emit('new_item', newItem); // Emit new item to all connected clients
//     }

//     res.status(201).json({
//       message: 'Item added successfully',
//       itemId: result.itemId,
//       serial_no,
//       barcode: barcodeUrl,
//     });
//   } catch (err) {
//     console.error('Add Item Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all items (in stock)
// exports.getAllItems = async (req, res) => {
//   try {
//     const items = await ItemModel.getAllItems();
//     res.status(200).json(items);
//   } catch (err) {
//     console.error('Get All Items Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all given items (assigned items)
// exports.getAllGivenItems = async (req, res) => {
//   try {
//     const items = await ItemModel.getAllGivenItems();
//     res.status(200).json(items);
//   } catch (err) {
//     console.error('Get All Given Items Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get single item by ID
// exports.getItemById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const item = await ItemModel.getItemById(id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
//   } catch (err) {
//     console.error('Get Item By ID Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get item by barcode (serial number)
// exports.getItemByBarcode = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const item = await ItemModel.getItemBySerial(code);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.status(200).json(item);
//   } catch (err) {
//     console.error('Get Item By Barcode Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Request item
// exports.requestItem = async (req, res) => {
//   try {
//     const { itemId, staffId } = req.body;
//     const result = await ItemModel.requestItem(itemId, staffId);
//     if (!result) return res.status(404).json({ message: 'Item not found or already requested' });
//     res.status(201).json({ message: 'Item requested successfully', requestId: result.insertId });
//   } catch (err) {
//     console.error('Request Item Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Approve request (assign item)
// exports.approveRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const clerkId = req.user.id; // Assuming clerk ID comes from authentication middleware
//     const result = await ItemModel.approveRequest(requestId, clerkId);
//     if (!result) return res.status(404).json({ message: 'Request not found or already processed' });
//     res.status(200).json({ message: 'Request approved and item assigned successfully' });
//   } catch (err) {
//     console.error('Approve Request Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete item
// exports.deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await ItemModel.deleteItem(id);
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
//     res.json({ message: 'Item deleted' });
//   } catch (err) {
//     console.error('Delete Item Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update item
// exports.updateItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await ItemModel.updateItem(id, req.body);
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
//     res.json({ message: 'Item updated successfully' });
//   } catch (err) {
//     console.error('Update Item Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const ItemModel = require('../models/itemModel');
const bwipjs = require('bwip-js');
const fs = require('fs');
const path = require('path');

// Add item and generate barcode image with real-time notification
exports.addItem = async (req, res) => {
  try {
    const { name, serial_no, description, quantity, is_available } = req.body;

    // Generate barcode image buffer using serial_no
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: 'code128',
      text: serial_no,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: 'center',
    });

    // Ensure barcode directory exists
    const barcodeDir = path.join(__dirname, '..', 'public', 'barcodes');
    if (!fs.existsSync(barcodeDir)) fs.mkdirSync(barcodeDir, { recursive: true });

    const barcodeFilename = `${serial_no}.png`;
    const barcodePath = path.join(barcodeDir, barcodeFilename);
    fs.writeFileSync(barcodePath, barcodeBuffer);

    const barcodeUrl = `/barcodes/${barcodeFilename}`;

    // Save item with barcode URL to database
    const result = await ItemModel.addItem(name, serial_no, description, quantity, is_available, barcodeUrl);

    const newItem = {
      id: result.itemId,
      name,
      serial_no,
      description,
      quantity,
      is_available,
      barcode: barcodeUrl,
    };

    // ===== Real-Time Notification =====
    const io = req.app.get('io'); // Get Socket.IO instance from server.js
    if (io) io.emit('new_item', newItem); // Emit new item to all connected clients

    res.status(201).json({
      message: 'Item added successfully',
      itemId: result.itemId,
      serial_no,
      barcode: barcodeUrl,
    });
  } catch (err) {
    console.error('Add Item Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all items (in stock)
exports.getAllItems = async (req, res) => {
  try {
    const items = await ItemModel.getAllItems();
    res.status(200).json(items);
  } catch (err) {
    console.error('Get All Items Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all given items (assigned items)
exports.getAllGivenItems = async (req, res) => {
  try {
    const items = await ItemModel.getAllGivenItems();
    res.status(200).json(items);
  } catch (err) {
    console.error('Get All Given Items Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get single item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemModel.getItemById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    console.error('Get Item By ID Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get item by barcode (serial number)
exports.getItemByBarcode = async (req, res) => {
  try {
    const { code } = req.params;
    const item = await ItemModel.getItemBySerial(code);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    console.error('Get Item By Barcode Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Request item
exports.requestItem = async (req, res) => {
  try {
    const { itemId, staffId } = req.body;
    const result = await ItemModel.requestItem(itemId, staffId);
    if (!result) return res.status(404).json({ message: 'Item not found or already requested' });

    // ===== Real-Time Notification =====
    const io = req.app.get('io');
    if (io) io.emit('new_assign_request', {
      itemId,
      staffId,
      requestId: result.insertId,
    });

    res.status(201).json({ message: 'Item requested successfully', requestId: result.insertId });
  } catch (err) {
    console.error('Request Item Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Approve request (assign item) with real-time notification
exports.approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const clerkId = req.user.id;
    const result = await ItemModel.approveRequest(requestId, clerkId);
    if (!result) return res.status(404).json({ message: 'Request not found or already processed' });

    // ===== Real-Time Notification =====
    const io = req.app.get('io');
    if (io) io.emit('assign_request_processed', {
      requestId,
      clerkId,
    });

    res.status(200).json({ message: 'Request approved and item assigned successfully' });
  } catch (err) {
    console.error('Approve Request Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ItemModel.deleteItem(id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error('Delete Item Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ItemModel.updateItem(id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item updated successfully' });
  } catch (err) {
    console.error('Update Item Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
