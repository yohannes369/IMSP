const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

router.post('/contact', ContactController.sendMessage); // submit form
router.get('/contact', ContactController.getMessages);  // get all messages (admin)

module.exports = router;
