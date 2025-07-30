
// const express = require('express');
// const router = express.Router();
// const itemController = require('../controllers/itemController');

// router.post('/add', itemController.addItem);
// router.get('/items', itemController.getAllItems);
// router.delete('/items/:id', itemController.deleteItem);
// router.put('/items/:id', itemController.updateItem);
// router.get('/items', itemController.getAllItems); // ✅ Now this will work
// // router.get('/items/:id', itemController.getItemById); // <-- MISSING

// // router.get('/names', itemController.getUniqueItemNames);


// module.exports = router;

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/add', itemController.addItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItemById); // ✅ GET single item
router.delete('/items/:id', itemController.deleteItem);
router.put('/items/:id', itemController.updateItem);
// router.get('/names', itemController.getUniqueItemNames);

module.exports = router;
