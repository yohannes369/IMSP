const express = require('express');
const router = express.Router();
const { issueItemFromRequest,getModel22Form } = require('../controllers/model22Controller');

// POST: Clerk issues item using RequestID
router.post('/issue', issueItemFromRequest);
//fech model22 form
router.get('/form', getModel22Form);

module.exports = router;
