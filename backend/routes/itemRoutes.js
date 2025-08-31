// ;

// const express = require('express');
// const router = express.Router();
// const itemController = require('../controllers/itemController');

// router.post('/add', itemController.addItem);
// router.get('/items', itemController.getAllItems);
// router.get('/items/:id', itemController.getItemById);
// router.get('/barcode/:code', itemController.getItemByBarcode); // <-- Barcode lookup
// router.delete('/items/:id', itemController.deleteItem);
// router.put('/items/:id', itemController.updateItem);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { addItem } = require('../controllers/itemController');

// // Pass the function reference, DO NOT call it
// router.post('/add', addItem);
// router.get('/:id', getItemById);
// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  addItem,
  getAllItems,
  getItemById,
  updateItem,  // optional, if you implement it
  deleteItem   // optional, if you implement it
} = require('../controllers/itemController');

// Route to add a new item
router.post('/add', addItem);

// Route to fetch all items (with units)
router.get('/items', getAllItems); // ✅ function passed, not called

// Route to fetch a single item by ID (with units)
router.get('/items/:id', getItemById);

// Optional routes if Update/Delete implemented
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;

