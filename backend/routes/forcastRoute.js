const express = require('express');
const router = express.Router();
const { getRequestsForForecast } = require('../controllers/forcast');

// ✅ keep the URL spelling exactly as you requested
router.get('/requests/forcast', getRequestsForForecast);

module.exports = router;
