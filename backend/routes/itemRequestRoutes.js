const express = require('express');
const router = express.Router();
const itemRequestController = require('../controllers/itemRequestController');

router.post('/', itemRequestController.createItemRequest);
// router.get('/', itemRequestController.getAllItemRequests);
// router.get('/:id', itemRequestController.getItemRequestById);
// router.put('/:id', itemRequestController.updateItemRequest);
// router.delete('/:id', itemRequestController.deleteItemRequest);

module.exports = router;
