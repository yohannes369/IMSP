
// const Request = require('../models/requestModel');
// const ClerkModel = require('../models/clerkModel');
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

//     // Validate required fields
//     if (!staff_id || !staff_name || !staff_email || !item_type || !quantity) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Create new request (model validates staff existence)
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

// // 📌 2. Staff fetches all their requests by staffId param
// exports.getRequestsByStaffId = async (req, res) => {
//   const { staffId } = req.params;
//   try {
//     const requests = await Request.findByStaffId(staffId);
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching requests', error: err.message });
//   }
// };

// // 📌 3. Manager reviews (approve/reject) a specific request by id
// exports.managerReview = async (req, res) => {
//   const { id } = req.params;
//   const { status, manager_comment } = req.body;

//   try {
//     // Update manager review and get all requests of that staff
//     const updatedStaffRequests = await Request.updateManagerReview(id, { status, manager_comment });
//     res.json({
//       message: 'Manager review completed successfully',
//       updatedStaffRequests,
//     });
//   } catch (err) {
//     res.status(400).json({ message: 'Manager review failed', error: err.message });
//   }
// };

// // 📌 4. Clerk reviews (final approve/reject) a specific request by id
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

// // 📌 5. Get one pending request for manager review (oldest first)
// exports.getNextPendingRequest = async (req, res) => {
//   try {
//     const requests = await Request.getOnePendingManagerRequest();
//     res.json(requests); // will be array with zero or one element
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // 📌 6. (Optional) Get a single request by request ID
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

// // 📌 7. Get all pending requests for clerk revie   w
// // exports.getNextPendingForClerk = async (req, res) => {
// //   try {
// //     const q = `
// //       SELECT * FROM item_requests 
// //       WHERE status = 'pending_clerk' 
// //       ORDER BY created_at ASC
// //     `;
// //     const [rows] = await db.query(q);
// //     res.json(rows);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Failed to fetch clerk requests' });
// //   }
// // };

// exports.getNextPendingClerkRequest = async (req, res) => {
//   try {
//     const rows = await Request.getOnePendingClerkRequest();
//     res.json(rows);
//   } catch (err) {
//     console.error('Clerk request error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch next pending clerk request' });
//   }
// };



//corect one

// const Request = require('../models/requestModel');
// const ClerkModel = require('../models/clerkModel');

// // 📌 1. Staff creates a new request
// // exports.createRequest = async (req, res) => {
// //   try {
// //     const {
// //       staff_id,
// //       staff_name,
// //       staff_email,
// //       item_type,
// //       item_serial,
// //       quantity,
// //       explanation,
// //     } = req.body;

// //     // Validate required fields
// //     if (!staff_id || !staff_name || !staff_email || !item_type || !quantity) {
// //       return res.status(400).json({ message: 'Missing required fields' });
// //     }

// //     // ✅ Check if this item is already requested by another staff and still pending
// //     const existingRequest = await Request.findPendingByItemSerial(item_serial);
// //     if (existingRequest) {
// //       return res.status(400).json({
// //         message: `Item with serial number ${item_serial} has already been requested by another staff.`,
// //       });
// //     }

// //     // Create new request
// //     await Request.create({
// //       staff_id,
// //       staff_name,
// //       staff_email,
// //       item_type,
// //       item_serial,
// //       quantity,
// //       explanation,
// //     });

// //     res.status(201).json({ message: 'Request submitted successfully' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Failed to submit request', error: err.message });
// //   }
// // };
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

//     // Validate required fields
//     if (!staff_id || !staff_name || !staff_email || !item_type || !quantity) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Use the fixed findPendingByItemSerial method
//     const existingRequest = await Request.findPendingByItemSerial(item_serial);
//     if (existingRequest) {
//       return res.status(400).json({
//         message: `Item with serial number ${item_serial} has already been requested by another staff.`,
//       });
//     }

//     // Create new request
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
//     console.error('Error in createRequest:', err);
//     res.status(500).json({ message: 'Failed to submit request', error: err.message });
//   }
// };

// // 📌 2. Staff fetches all their requests by staffId param
// exports.getRequestsByStaffId = async (req, res) => {
//   const { staffId } = req.params;
//   try {
//     const requests = await Request.findByStaffId(staffId);
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching requests', error: err.message });
//   }
// };

// // 📌 3. Manager reviews (approve/reject) a specific request by id
// exports.managerReview = async (req, res) => {
//   const { id } = req.params;
//   const { status, manager_comment } = req.body;

//   try {
//     // Update manager review and get all requests of that staff
//     const updatedStaffRequests = await Request.updateManagerReview(id, { status, manager_comment });
//     res.json({
//       message: 'Manager review completed successfully',
//       updatedStaffRequests,
//     });
//   } catch (err) {
//     res.status(400).json({ message: 'Manager review failed', error: err.message });
//   }
// };

// // 📌 4. Clerk reviews (final approve/reject) a specific request by id
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

// // 📌 5. Get one pending request for manager review (oldest first)
// exports.getNextPendingRequest = async (req, res) => {
//   try {
//     const requests = await Request.getOnePendingManagerRequest();
//     res.json(requests); // will be array with zero or one element
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // 📌 6. (Optional) Get a single request by request ID
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

// // 📌 7. Get all pending requests for clerk review
// // (You can uncomment and use this if needed)
// // exports.getNextPendingForClerk = async (req, res) => {
// //   try {
// //     const q = `
// //       SELECT * FROM item_requests 
// //       WHERE status = 'pending_clerk' 
// //       ORDER BY created_at ASC
// //     `;
// //     const [rows] = await db.query(q);
// //     res.json(rows);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Failed to fetch clerk requests' });
// //   }
// // };

// // Get one pending request for clerk review (oldest first)
// exports.getNextPendingClerkRequest = async (req, res) => {
//   try {
//     const rows = await Request.getOnePendingClerkRequest();
//     res.json(rows);
//   } catch (err) {
//     console.error('Clerk request error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch next pending clerk request' });
//   }
// };



// coorect one


// const Request = require('../models/requestModel');
// const db = require('../config/db');

// let io;
// const setSocketIo = (socketIo) => { io = socketIo; };

// // Staff creates request
// async function createRequest(req, res) {
//   try {
//     const { staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation } = req.body;
//     if (!staff_id || !staff_name || !staff_email || !item_type || !quantity) return res.status(400).json({ message: 'Missing fields' });

//     const existing = await Request.findPendingByItemSerial(item_serial);
//     if (existing) return res.status(400).json({ message: `Item ${item_serial} already requested.` });

//     const result = await Request.createRequest({ staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation });

//     if (io) io.emit('notification', { type: 'new_request', message: `New request from ${staff_name} for ${item_serial}` });

//     res.status(201).json({ message: 'Request submitted', result });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to submit request', error: err.message });
//   }
// }

// // Get requests by staff
// async function getRequestsByStaffId(req, res) {
//   try {
//     const requests = await Request.findByStaffId(req.params.staffId);
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching requests', error: err.message });
//   }
// }

// // Manager review
// async function managerReview(req, res) {
//   try {
//     const { status, manager_comment, manager_name } = req.body;
//     const updated = await Request.updateManagerReview(req.params.id, { status, manager_comment });

//     if (io) io.emit('notification', { type: 'manager_review', message: `Manager ${manager_name} ${status} request ${updated[0].item_serial}` });

//     res.json({ message: 'Manager review completed', updated });
//   } catch (err) {
//     res.status(400).json({ message: 'Manager review failed', error: err.message });
//   }
// }

// // Clerk review
// async function clerkReview(req, res) {
//   try {
//     const { status, clerk_comment, clerk_name } = req.body;
//     const result = await Request.updateClerkReview(req.params.id, { status, clerk_comment });

//     if (io) io.emit('notification', { type: 'clerk_review', message: `Clerk ${clerk_name} ${status} request ${result.item_serial}` });

//     res.json({ message: 'Clerk review completed', result });
//   } catch (err) {
//     res.status(400).json({ message: 'Clerk review failed', error: err.message });
//   }
// }

// // Next pending requests
// async function getNextPendingRequest(req, res) {
//   try {
//     const rows = await Request.getOnePendingManagerRequest();
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// }

// async function getNextPendingClerkRequest(req, res) {
//   try {
//     const rows = await Request.getOnePendingClerkRequest();
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// }

// // All requests for manager
// async function getAllRequests(req, res) {
//   try {
//     const [rows] = await db.query('SELECT * FROM item_requests ORDER BY created_at DESC');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
//   }
// }

// // Delete request
// async function deleteRequest(req, res) {
//   try {
//     await Request.deleteById(req.params.id);
//     if (io) io.emit('notification', { type: 'delete_request', message: `Request ${req.params.id} deleted` });
//     res.json({ message: 'Request deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Delete failed', error: err.message });
//   }
// }

// module.exports = {
//   createRequest,
//   getRequestsByStaffId,
//   managerReview,
//   clerkReview,
//   getNextPendingRequest,
//   getNextPendingClerkRequest,
//   getAllRequests,
//   deleteRequest,
//   setSocketIo
// };
const Request = require('../models/requestModel');
const db = require('../config/db');

let io;
const setSocketIo = (socketIo) => { io = socketIo; };

// Staff creates request
async function createRequest(req, res) {
  try {
    const { staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation } = req.body;
    if (!staff_id || !staff_name || !staff_email || !item_type || !quantity) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existing = await Request.findPendingByItemSerial(item_serial);
    if (existing) {
      return res.status(400).json({ message: `Item ${item_serial} already requested.` });
    }

    const result = await Request.createRequest({
      staff_id,
      staff_name,
      staff_email,
      item_type,
      item_serial,
      quantity,
      explanation
    });

    // 🔥 Emit new request event
    if (io) {
      io.emit('new_request', {
        requestId: result.insertId,
        staff_name,
        item_serial,
        quantity,
        message: `New request from ${staff_name} for ${item_serial}`
      });
    }

    res.status(201).json({ message: 'Request submitted', result });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit request', error: err.message });
  }
}

// Get requests by staff
async function getRequestsByStaffId(req, res) {
  try {
    const requests = await Request.findByStaffId(req.params.staffId);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message });
  }
}

// Manager review
async function managerReview(req, res) {
  try {
    const { status, manager_comment, manager_name } = req.body;
    const updated = await Request.updateManagerReview(req.params.id, { status, manager_comment });

    // 🔥 Emit manager review event
    if (io) {
      io.emit('manager_review', {
        requestId: req.params.id,
        status,
        manager_name,
        item_serial: updated[0].item_serial,
        message: `Manager ${manager_name} ${status} request ${updated[0].item_serial}`
      });
    }

    res.json({ message: 'Manager review completed', updated });
  } catch (err) {
    res.status(400).json({ message: 'Manager review failed', error: err.message });
  }
}

// Clerk review
async function clerkReview(req, res) {
  try {
    const { status, clerk_comment, clerk_name } = req.body;
    const result = await Request.updateClerkReview(req.params.id, { status, clerk_comment });

    // 🔥 Emit clerk review event
    if (io) {
      io.emit('clerk_review', {
        requestId: req.params.id,
        status,
        clerk_name,
        item_serial: result.item_serial,
        message: `Clerk ${clerk_name} ${status} request ${result.item_serial}`
      });
    }

    res.json({ message: 'Clerk review completed', result });
  } catch (err) {
    res.status(400).json({ message: 'Clerk review failed', error: err.message });
  }
}

// Next pending requests
async function getNextPendingRequest(req, res) {
  try {
    const rows = await Request.getOnePendingManagerRequest();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function getNextPendingClerkRequest(req, res) {
  try {
    const rows = await Request.getOnePendingClerkRequest();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// All requests for manager
async function getAllRequests(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM item_requests ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
  }
}

// Delete request
async function deleteRequest(req, res) {
  try {
    await Request.deleteById(req.params.id);

    // 🔥 Emit delete event
    if (io) {
      io.emit('delete_request', {
        requestId: req.params.id,
        message: `Request ${req.params.id} deleted`
      });
    }

    res.json({ message: 'Request deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
}

module.exports = {
  createRequest,
  getRequestsByStaffId,
  managerReview,
  clerkReview,
  getNextPendingRequest,
  getNextPendingClerkRequest,
  getAllRequests,
  deleteRequest,
  setSocketIo
};
