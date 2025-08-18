
// const db = require('../config/db');

// const ReturnModel = {

//   // Fetch all given items for a staff
//   getStaffGivenItems: async (staffId) => {
//     const [rows] = await db.query('SELECT * FROM give_items WHERE staff_id = ?', [staffId]);
//     return rows;
//   },

//   // Staff requests a return
//   createReturnRequest: async (giveItemId, staffId) => {
//     // Get the item from give_items
//     const [[item]] = await db.query('SELECT * FROM give_items WHERE id = ? AND staff_id = ?', [giveItemId, staffId]);
//     if (!item) throw new Error('Item not found');

//     // Insert into return_requests
//     const [result] = await db.query(
//       `INSERT INTO return_items
//         (id, staff_id, staff_name, item_type, item_serial, quantity, status, requested_at)
//         VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW())`,
//       [giveItemId, staffId, item.staff_name, item.item_type, item.item_serial, item.quantity]
//     );

//     return result;
//   },

//   // Clerk fetches all pending return requests
//   getPendingReturns: async () => {
//     const [rows] = await db.query('SELECT * FROM return_requests WHERE status="Pending"');
//     return rows;
//   },

//   // Clerk approves a return request
//   approveReturn: async (requestId) => {
//     // Get the return request
//     const [[req]] = await db.query('SELECT * FROM return_requests WHERE id = ?', [requestId]);
//     if (!req) throw new Error('Return request not found');

//     // Insert into return_items table
//     await db.query(
//       `INSERT INTO return_items 
//         (staff_id, staff_name, item_type, item_serial, quantity, returned_at)
//         VALUES (?, ?, ?, ?, ?, NOW())`,
//       [req.staff_id, req.staff_name, req.item_type, req.item_serial, req.quantity]
//     );

//     // Remove item from give_items table
//     await db.query('DELETE FROM give_items WHERE id = ?', [req.give_item_id]);

//     // Update the status of return request
//     await db.query('UPDATE return_requests SET status="Approved" WHERE id = ?', [requestId]);

//     return true;
//   }

// };

// module.exports = ReturnModel;

// cprect one

// const db = require('../config/db');

// const ReturnModel = {
//   // 1. Fetch given items for a staff
//   getStaffGivenItems: async (staffId) => {
//     const [rows] = await db.query(
//       'SELECT * FROM give_items WHERE staff_id = ?',
//       [staffId]
//     );
//     return rows;
//   },

//   // 2. Staff requests a return
//   createReturnRequest: async (giveItemId, staffId) => {
//     if (!giveItemId || !staffId) throw new Error('giveItemId and staffId are required');

//     const [[item]] = await db.query('SELECT * FROM give_items WHERE id = ?', [giveItemId]);
//     if (!item) throw new Error('Item not found');

//     // Insert into return_items without specifying id (auto-increment)
//     const [result] = await db.query(
//       `INSERT INTO return_items
//         (staff_id, staff_name, item_type, item_serial, quantity, status, requested_at)
//        VALUES (?, ?, ?, ?, ?, 'Pending', NOW())`,
//       [staffId, item.staff_name, item.item_type, item.item_serial, item.quantity]
//     );
//     return result;
//   },

//   // 3. Clerk fetches all pending return requests
//   getPendingReturns: async () => {
//     const [rows] = await db.query(
//       `SELECT ri.id, ri.staff_id, ri.staff_name, ri.item_type, ri.item_serial, ri.quantity, ri.status, ri.requested_at, gi.given_at
//        FROM return_items ri
//        LEFT JOIN give_items gi ON ri.staff_id = gi.staff_id AND ri.item_serial = gi.item_serial
//        WHERE ri.status='Pending'`
//     );
//     return rows;
//   },

//   // 4. Clerk approves return request
//   approveReturn: async (requestId) => {
//     const [[req]] = await db.query('SELECT * FROM return_items WHERE id = ?', [requestId]);
//     if (!req) throw new Error('Return request not found');

//     // Remove from give_items (match staff and serial)
//     await db.query(
//       'DELETE FROM give_items WHERE staff_id = ? AND item_serial = ?',
//       [req.staff_id, req.item_serial]
//     );

//     // Update return_items status and returned_at
//     await db.query(
//       'UPDATE return_items SET status="Approved", returned_at=NOW() WHERE id = ?',
//       [requestId]
//     );

//     return true;
//   }
// };

// module.exports = ReturnModel;
const db = require('../config/db');

const ReturnModel = {
  // 1. Fetch given items for a staff
  getStaffGivenItems: async (staffId) => {
    const [rows] = await db.query(
      'SELECT * FROM give_items WHERE staff_id = ?',
      [staffId]
    );
    return rows;
  },

  // 2. Staff requests a return (with real-time notification)
  createReturnRequest: async (giveItemId, staffId, io) => {
    if (!giveItemId || !staffId) throw new Error('giveItemId and staffId are required');

    const [[item]] = await db.query('SELECT * FROM give_items WHERE id = ?', [giveItemId]);
    if (!item) throw new Error('Item not found');

    const [result] = await db.query(
      `INSERT INTO return_items
        (staff_id, staff_name, item_type, item_serial, quantity, status, requested_at)
       VALUES (?, ?, ?, ?, ?, 'Pending', NOW())`,
      [staffId, item.staff_name, item.item_type, item.item_serial, item.quantity]
    );

    // Emit real-time notification to clerk
    if (io) {
      io.emit('new_return_request', {
        requestId: result.insertId,
        staffId: staffId,
        staffName: item.staff_name,
        itemSerial: item.item_serial,
        quantity: item.quantity,
      });
    }

    return result;
  },

  // 3. Clerk fetches all pending return requests
  getPendingReturns: async () => {
    const [rows] = await db.query(
      `SELECT ri.id, ri.staff_id, ri.staff_name, ri.item_type, ri.item_serial, ri.quantity, ri.status, ri.requested_at, gi.given_at
       FROM return_items ri
       LEFT JOIN give_items gi ON ri.staff_id = gi.staff_id AND ri.item_serial = gi.item_serial
       WHERE ri.status='Pending'`
    );
    return rows;
  },

  // 4. Clerk approves return request (with real-time notification)
  approveReturn: async (requestId, io) => {
    const [[req]] = await db.query('SELECT * FROM return_items WHERE id = ?', [requestId]);
    if (!req) throw new Error('Return request not found');

    // Remove from give_items (match staff and serial)
    await db.query(
      'DELETE FROM give_items WHERE staff_id = ? AND item_serial = ?',
      [req.staff_id, req.item_serial]
    );

    // Update return_items status and returned_at
    await db.query(
      'UPDATE return_items SET status="Approved", returned_at=NOW() WHERE id = ?',
      [requestId]
    );

    // Emit real-time notification to frontend
    if (io) {
      io.emit('return_request_processed', {
        requestId: requestId,
        staffId: req.staff_id,
        itemSerial: req.item_serial,
        status: 'Approved'
      });
    }

    return true;
  }
};

module.exports = ReturnModel;
