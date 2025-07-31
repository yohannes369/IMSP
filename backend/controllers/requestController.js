// const Request = require('../models/requestModel');

// // 📌 1. Staff creates a new request
// exports.createRequest = async (req, res) => {
//   try {
//     const {
//       staff_id,
//       staff_name,
//       staff_email,
//       item_type,
//       item_serial,
//       quantity,
//       explanation,
//     } = req.body;

//     if (!staff_id || !staff_name || !staff_email || !item_type || !quantity) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     await Request.create({
//       staff_id,
//       staff_name,
//       staff_email,
//       item_type,
//       item_serial,
//       quantity,
//       explanation,
//     });

//     res.status(201).json({ message: 'Request submitted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to submit request', error: err.message });
//   }
// };

// // 📌 2. Staff fetches all their requests
// exports.getRequestsByStaffId = async (req, res) => {
//   const { staffId } = req.params;
//   try {
//     const [requests] = await Request.findByStaffId(staffId);
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching requests', error: err.message });
//   }
// };

// // 📌 3. Manager reviews (approve/reject)
// exports.managerReview = async (req, res) => {
//   const { id } = req.params;
//   const { status, manager_comment } = req.body;

//   try {
//     await Request.updateManagerReview(id, { status, manager_comment });
//     res.json({ message: 'Manager review completed successfully' });
//   } catch (err) {
//     res.status(400).json({ message: 'Manager review failed', error: err.message });
//   }
// };

// exports.getNextPendingRequest = async (req, res) => {
//   try {
//     // Get one pending request (status = pending_manager)
//     const requests = await ItemRequest.getOnePendingManagerRequest();

//     // Send array with zero or one element
//     res.json(requests);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // 📌 4. Clerk reviews (final approval/rejection)
// exports.clerkReview = async (req, res) => {
//   const { id } = req.params;
//   const { status, clerk_comment } = req.body;

//   try {
//     await Request.updateClerkReview(id, { status, clerk_comment });
//     res.json({ message: 'Clerk review completed successfully' });
//   } catch (err) {
//     res.status(400).json({ message: 'Clerk review failed', error: err.message });
//   }
// };

// // 📌 5. (Optional) Get a single request by request ID
// exports.getRequestById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const request = await Request.findById(id);
//     if (!request) {
//       return res.status(404).json({ message: 'Request not found' });
//     }
//     res.json(request);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching request', error: err.message });
//   }
// };
const Request = require('../models/requestModel');

// 📌 1. Staff creates a new request
exports.createRequest = async (req, res) => {
  try {
    const {
      staff_id,
      staff_name,
      staff_email,
      item_type,
      item_serial,
      quantity,
      explanation,
    } = req.body;

    // Validate required fields
    if (!staff_id || !staff_name || !staff_email || !item_type || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new request (model validates staff existence)
    await Request.create({
      staff_id,
      staff_name,
      staff_email,
      item_type,
      item_serial,
      quantity,
      explanation,
    });

    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit request', error: err.message });
  }
};

// 📌 2. Staff fetches all their requests by staffId param
exports.getRequestsByStaffId = async (req, res) => {
  const { staffId } = req.params;
  try {
    const requests = await Request.findByStaffId(staffId);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message });
  }
};

// 📌 3. Manager reviews (approve/reject) a specific request by id
exports.managerReview = async (req, res) => {
  const { id } = req.params;
  const { status, manager_comment } = req.body;

  try {
    // Update manager review and get all requests of that staff
    const updatedStaffRequests = await Request.updateManagerReview(id, { status, manager_comment });
    res.json({
      message: 'Manager review completed successfully',
      updatedStaffRequests,
    });
  } catch (err) {
    res.status(400).json({ message: 'Manager review failed', error: err.message });
  }
};

// 📌 4. Clerk reviews (final approve/reject) a specific request by id
exports.clerkReview = async (req, res) => {
  const { id } = req.params;
  const { status, clerk_comment } = req.body;

  try {
    await Request.updateClerkReview(id, { status, clerk_comment });
    res.json({ message: 'Clerk review completed successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Clerk review failed', error: err.message });
  }
};

// 📌 5. Get one pending request for manager review (oldest first)
exports.getNextPendingRequest = async (req, res) => {
  try {
    const requests = await Request.getOnePendingManagerRequest();
    res.json(requests); // will be array with zero or one element
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 📌 6. (Optional) Get a single request by request ID
exports.getRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching request', error: err.message });
  }
};
// 📌 7. Get all pending requests for clerk revie   w
// exports.getNextPendingForClerk = async (req, res) => {
//   try {
//     const q = `
//       SELECT * FROM item_requests 
//       WHERE status = 'pending_clerk' 
//       ORDER BY created_at ASC
//     `;
//     const [rows] = await db.query(q);
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch clerk requests' });
//   }
// };

exports.getNextPendingClerkRequest = async (req, res) => {
  try {
    const rows = await Request.getOnePendingClerkRequest();
    res.json(rows);
  } catch (err) {
    console.error('Clerk request error:', err.message);
    res.status(500).json({ message: 'Failed to fetch next pending clerk request' });
  }
};
