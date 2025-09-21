// const express = require('express');
// const router = express.Router();
// const { issueItemFromRequest,getModel22Form } = require('../controllers/model22Controller');

// // POST: Clerk issues item using RequestID
// router.post('/issue', issueItemFromRequest);
// //fech model22 form
// router.get('/form', getModel22Form);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  issueItemFromRequest,
  returnItem,
  getModel22Form
} = require('../controllers/model22Controller');

// POST: Clerk issues items using RequestID
router.post('/issue', issueItemFromRequest);

// POST: Clerk returns an issued item by FormID
router.post('/return/:formID', returnItem);

// GET: Fetch all Model22Form records
router.get('/form', getModel22Form);

module.exports = router;
