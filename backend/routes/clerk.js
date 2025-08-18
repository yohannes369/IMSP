
// const express = require('express');
// const router = express.Router();

// const clerkController = require('../controllers/clerkController');

// router.put('/requests/clerk/:id', clerkController.updateClerkReview);
// router.get('/requests/clerk/pending', clerkController.getOnePendingClerkRequest);
// router.post('/requests/clerk/give', clerkController.giveItemToStaff);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const clerkController = require('../controllers/clerkController');

// router.put('/requests/clerk/:id', clerkController.updateClerkReview);
// router.get('/requests/clerk/pending', clerkController.getOnePendingClerkRequest);
// router.post('/requests/clerk/give', clerkController.giveItemToStaff);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const clerkController = require('../controllers/clerkController');

// router.put('/requests/clerk/:id', clerkController.updateClerkReview);
// router.get('/requests/clerk/pending', clerkController.getOnePendingClerkRequest);
// router.post('/requests/clerk/give', clerkController.giveItemToStaff);
// router.get('/items/barcode/:barcode', clerkController.getItemByBarcode);

// module.exports = router;








// corect one 


// const express = require('express');
// const router = express.Router();
// const clerkController = require('../controllers/clerkController');

// router.put('/requests/clerk/:id', clerkController.updateClerkReview);
// router.get('/requests/clerk/pending', clerkController.getOnePendingClerkRequest);
// router.post('/requests/clerk/give', clerkController.giveItemToStaff);
// router.get('/items/barcode/:barcode', clerkController.getItemByBarcode);

// module.exports = router;




const express = require('express');
const router = express.Router();
const clerkController = require('../controllers/clerkController');

router.put('/requests/clerk/:id', clerkController.updateClerkReview);
router.get('/requests/clerk/pending', clerkController.getOnePendingClerkRequest); // now returns array
router.post('/requests/clerk/give', clerkController.giveItemToStaff);
router.get('/items/barcode/:barcode', clerkController.getItemByBarcode);

module.exports = router;
