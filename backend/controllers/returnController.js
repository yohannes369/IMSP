
// const ReturnModel = require('../models/returnModel');

// // Fetch all items given to a staff
// exports.getStaffGivenItems = async (req, res) => {
//   try {
//     const staffId = req.params.staffId;
//     if (!staffId) return res.status(400).json({ message: 'Staff ID is required' });

//     const items = await ReturnModel.getStaffGivenItems(staffId);
//     res.json(items);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch given items' });
//   }
// };

// // Staff requests a return
// exports.requestReturn = async (req, res) => {
//   try {
//     const { giveItemId, staffId } = req.body;
//     if (!giveItemId || !staffId) return res.status(400).json({ message: 'giveItemId and staffId are required' });

//     await ReturnModel.createReturnRequest(giveItemId, staffId);
//     res.json({ message: 'Return request sent successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message || 'Failed to create return request' });
//   }
// };

// // Clerk fetches all pending return requests
// exports.getPendingReturns = async (req, res) => {
//   try {
//     const rows = await ReturnModel.getPendingReturns();
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch pending return requests' });
//   }
// };

// // Clerk approves a return request
// exports.approveReturn = async (req, res) => {
//   try {
//     const requestId = req.params.requestId;
//     if (!requestId) return res.status(400).json({ message: 'Request ID is required' });

//     await ReturnModel.approveReturn(requestId);
//     res.json({ message: 'Return request approved successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message || 'Failed to approve return request' });
//   }
// };



  // coorect one 


// const ReturnModel = require('../models/returnModel');

// // 1. Fetch given items for a staff
// exports.getStaffGivenItems = async (req, res) => {
//   const { staffId } = req.params;
//   try {
//     const items = await ReturnModel.getStaffGivenItems(staffId);
//     res.json(items);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch given items', error: err.message });
//   }
// };

// // 2. Staff requests a return
// exports.requestReturn = async (req, res) => {
//   const { giveItemId, staffId } = req.body;
//   if (!giveItemId || !staffId) return res.status(400).json({ message: 'giveItemId and staffId are required' });

//   try {
//     await ReturnModel.createReturnRequest(giveItemId, staffId);
//     res.json({ message: 'Return request sent to clerk' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to create return request', error: err.message });
//   }
// };

// // 3. Clerk fetches pending return requests
// exports.getPendingReturns = async (req, res) => {
//   try {
//     const requests = await ReturnModel.getPendingReturns();
//     res.json(requests);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch pending return requests', error: err.message });
//   }
// };

// // 4. Clerk approves return
// exports.approveReturn = async (req, res) => {
//   const { requestId } = req.params;
//   try {
//     await ReturnModel.approveReturn(requestId);
//     res.json({ message: 'Return request approved' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to approve return request', error: err.message });
//   }
// };
// controllers/returnController.js
const ReturnModel = require('../models/returnModel');

// Import socket instance
let io;
exports.initSocket = (socketIo) => {
  io = socketIo;
};

// 1. Fetch given items for a staff
exports.getStaffGivenItems = async (req, res) => {
  const { staffId } = req.params;
  try {
    const items = await ReturnModel.getStaffGivenItems(staffId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch given items', error: err.message });
  }
};

// 2. Staff requests a return
exports.requestReturn = async (req, res) => {
  const { giveItemId, staffId } = req.body;
  if (!giveItemId || !staffId)
    return res.status(400).json({ message: 'giveItemId and staffId are required' });

  try {
    await ReturnModel.createReturnRequest(giveItemId, staffId);

    // 🔔 Notify clerks in real-time
    if (io) {
      io.emit('returnRequestCreated', {
        staffId,
        giveItemId,
        message: 'New return request sent to clerk',
      });
    }

    res.json({ message: 'Return request sent to clerk' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create return request', error: err.message });
  }
};

// 3. Clerk fetches pending return requests
exports.getPendingReturns = async (req, res) => {
  try {
    const requests = await ReturnModel.getPendingReturns();
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch pending return requests', error: err.message });
  }
};

// 4. Clerk approves return
exports.approveReturn = async (req, res) => {
  const { requestId } = req.params;
  try {
    await ReturnModel.approveReturn(requestId);

    // 🔔 Notify staff in real-time
    if (io) {
      io.emit('returnRequestApproved', {
        requestId,
        message: 'Your return request has been approved',
      });
    }

    res.json({ message: 'Return request approved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to approve return request', error: err.message });
  }
};
