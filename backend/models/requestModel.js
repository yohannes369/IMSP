
// const db = require('../config/db');

// const STATUS = {
//   PENDING_MANAGER: 'pending_manager',
//   REJECTED_MANAGER: 'rejected_manager',
//   PENDING_CLERK: 'pending_clerk',
//   REJECTED_CLERK: 'rejected_clerk',
//   APPROVED: 'approved',
// };

// const create = async ({
//   staff_id,
//   staff_name,
//   staff_email,
//   item_type,
//   item_serial,
//   quantity,
//   explanation,
// }) => {
//   const [userRows] = await db.query('SELECT id FROM users WHERE staff_id = ? LIMIT 1', [staff_id]);
//   if (userRows.length === 0) {
//     throw new Error(`Staff ID ${staff_id} not found.`);
//   }

//   const [result] = await db.query(
//     `INSERT INTO item_requests 
//      (staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, status)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     [staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, STATUS.PENDING_MANAGER]
//   );

//   return result;
// };

// const findByStaffId = async (staffId) => {
//   const [rows] = await db.query(
//     `SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC`,
//     [staffId]
//   );
//   return rows;
// };

// const findById = async (id) => {
//   const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//   return rows[0];
// };

// const updateManagerReview = async (id, { status, manager_comment }) => {
//   if (![STATUS.PENDING_CLERK, STATUS.REJECTED_MANAGER].includes(status)) {
//     throw new Error('Invalid status for manager review');
//   }

//   await db.query(
//     `UPDATE item_requests SET status = ?, manager_comment = ? WHERE id = ?`,
//     [status, manager_comment, id]
//   );

//   const [[{ staff_id }]] = await db.query('SELECT staff_id FROM item_requests WHERE id = ?', [id]);

//   const [requests] = await db.query(
//     `SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC`,
//     [staff_id]
//   );

//   return requests;
// };


// const getOnePendingManagerRequest = async () => {
//   const [rows] = await db.query(
//     `SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1`,
//     [STATUS.PENDING_MANAGER]
//   );
//   return rows;
// };

// const getOnePendingClerkRequest = async () => {
//   const [rows] = await db.query(
//     `SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1`,
//     [STATUS.PENDING_CLERK]
//   );
//   return rows;
// };

// const updateClerkReview = async (id, { status, clerk_comment }) => {
//   if (![STATUS.APPROVED, STATUS.REJECTED_CLERK].includes(status)) {
//     throw new Error('Invalid status for clerk review');
//   }

//   await db.query(
//     `UPDATE item_requests SET status = ?, clerk_comment = ? WHERE id = ?`,
//     [status, clerk_comment, id]
//   );

//   const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//   return rows[0];
// };

// module.exports = {
//   STATUS,
//   create,
//   findByStaffId,
//   findById,
//   updateManagerReview,
//   updateClerkReview,
//   getOnePendingManagerRequest,
//   getOnePendingClerkRequest,
// };


// corecte one


// const db = require('../config/db');

// const STATUS = {
//   PENDING_MANAGER: 'pending_manager',
//   REJECTED_MANAGER: 'rejected_manager',
//   PENDING_CLERK: 'pending_clerk',
//   REJECTED_CLERK: 'rejected_clerk',
//   APPROVED: 'approved',
// };

// /**
//  * Create a new item request
//  */
// const create = async ({
//   staff_id,
//   staff_name,
//   staff_email,
//   item_type,
//   item_serial,
//   quantity,
//   explanation,
// }) => {
//   // Check if staff exists
//   const [userRows] = await db.query(
//     'SELECT id FROM users WHERE staff_id = ? LIMIT 1',
//     [staff_id]
//   );
//   if (userRows.length === 0) {
//     throw new Error(`Staff ID ${staff_id} not found.`);
//   }

//   // Check if item is already requested and still pending or approved
//   const [[existing]] = await db.query(
//     `SELECT id FROM item_requests 
//      WHERE item_serial = ? 
//      AND status IN (?, ?, ?) 
//      LIMIT 1`,
//     [item_serial, STATUS.PENDING_MANAGER, STATUS.PENDING_CLERK, STATUS.APPROVED]
//   );

//   if (existing) {
//     throw new Error(
//       `Item with serial number ${item_serial} has already been requested by another staff.`
//     );
//   }

//   // Insert new request
//   const [result] = await db.query(
//     `INSERT INTO item_requests 
//      (staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, status)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       staff_id,
//       staff_name,
//       staff_email,
//       item_type,
//       item_serial,
//       quantity,
//       explanation,
//       STATUS.PENDING_MANAGER,
//     ]
//   );

//   return result;
// };

// /**
//  * Get all requests of a staff
//  */
// const findByStaffId = async (staffId) => {
//   const [rows] = await db.query(
//     `SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC`,
//     [staffId]
//   );
//   return rows;
// };

// /**
//  * Get request by ID
//  */
// const findById = async (id) => {
//   const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//   return rows[0];
// };

// /**
//  * Manager review update
//  */
// const updateManagerReview = async (id, { status, manager_comment }) => {
//   if (![STATUS.PENDING_CLERK, STATUS.REJECTED_MANAGER].includes(status)) {
//     throw new Error('Invalid status for manager review');
//   }

//   await db.query(
//     `UPDATE item_requests SET status = ?, manager_comment = ? WHERE id = ?`,
//     [status, manager_comment, id]
//   );

//   const [[{ staff_id }]] = await db.query(
//     'SELECT staff_id FROM item_requests WHERE id = ?',
//     [id]
//   );

//   const [requests] = await db.query(
//     `SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC`,
//     [staff_id]
//   );

//   return requests;
// };

// /**
//  * Get oldest pending manager request
//  */
// const getOnePendingManagerRequest = async () => {
//   const [rows] = await db.query(
//     `SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1`,
//     [STATUS.PENDING_MANAGER]
//   );
//   return rows;
// };

// /**
//  * Get oldest pending clerk request
//  */
// const getOnePendingClerkRequest = async () => {
//   const [rows] = await db.query(
//     `SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1`,
//     [STATUS.PENDING_CLERK]
//   );
//   return rows;
// };

// /**
//  * Clerk review update
//  */
// const updateClerkReview = async (id, { status, clerk_comment }) => {
//   if (![STATUS.APPROVED, STATUS.REJECTED_CLERK].includes(status)) {
//     throw new Error('Invalid status for clerk review');
//   }

//   await db.query(
//     `UPDATE item_requests SET status = ?, clerk_comment = ? WHERE id = ?`,
//     [status, clerk_comment, id]
//   );

//   const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//   return rows[0];
// };
// // Method to find existing request for a given item_serial in specific statuses
// const findPendingByItemSerial = async (item_serial) => {
//   const [rows] = await db.query(
//     `SELECT * FROM item_requests 
//      WHERE item_serial = ? 
//        AND status IN (?, ?, ?) 
//      LIMIT 1`,
//     [item_serial, STATUS.PENDING_MANAGER, STATUS.PENDING_CLERK, STATUS.APPROVED]
//   );
//   return rows.length > 0 ? rows[0] : null;
// };


// module.exports = {
//   STATUS,
//   create,
//   findByStaffId,
//   findById,
//   updateManagerReview,
//   updateClerkReview,
//   getOnePendingManagerRequest,
//   getOnePendingClerkRequest,
//    findPendingByItemSerial,
// };

// coorect one

// const db = require('../config/db');

// const STATUS = {
//   PENDING_MANAGER: 'pending_manager',
//   REJECTED_MANAGER: 'rejected_manager',
//   PENDING_CLERK: 'pending_clerk',
//   REJECTED_CLERK: 'rejected_clerk',
//   APPROVED: 'approved',
// };

// // Create a new request
// async function createRequest({ staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation }) {
//   const [userRows] = await db.query('SELECT id FROM users WHERE staff_id = ? LIMIT 1', [staff_id]);
//   if (userRows.length === 0) throw new Error(`Staff ID ${staff_id} not found.`);

//   const [[existing]] = await db.query(
//     `SELECT id FROM item_requests WHERE item_serial = ? AND status IN (?, ?, ?) LIMIT 1`,
//     [item_serial, STATUS.PENDING_MANAGER, STATUS.PENDING_CLERK, STATUS.APPROVED]
//   );
//   if (existing) throw new Error(`Item ${item_serial} has already been requested.`);

//   const [result] = await db.query(
//     `INSERT INTO item_requests 
//      (staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, status)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     [staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, STATUS.PENDING_MANAGER]
//   );

//   return result;
// }

// // Get requests by staff ID
// async function findByStaffId(staffId) {
//   const [rows] = await db.query('SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC', [staffId]);
//   return rows;
// }

// // Get request by ID
// async function findById(id) {
//   const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//   return rows[0];
// }

// // Manager review
// async function updateManagerReview(id, { status, manager_comment }) {
//   if (![STATUS.PENDING_CLERK, STATUS.REJECTED_MANAGER].includes(status)) throw new Error('Invalid status for manager review');

//   await db.query('UPDATE item_requests SET status = ?, manager_comment = ? WHERE id = ?', [status, manager_comment, id]);

//   const [[{ staff_id }]] = await db.query('SELECT staff_id FROM item_requests WHERE id = ?', [id]);
//   const [requests] = await db.query('SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC', [staff_id]);
//   return requests;
// }

// // Clerk review
// async function updateClerkReview(id, { status, clerk_comment }) {
//   if (![STATUS.APPROVED, STATUS.REJECTED_CLERK].includes(status)) throw new Error('Invalid status for clerk review');

//   await db.query('UPDATE item_requests SET status = ?, clerk_comment = ? WHERE id = ?', [status, clerk_comment, id]);
//   const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//   return rows[0];
// }

// // Get next pending manager request
// async function getOnePendingManagerRequest() {
//   const [rows] = await db.query('SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1', [STATUS.PENDING_MANAGER]);
//   return rows;
// }

// // Get next pending clerk request
// async function getOnePendingClerkRequest() {
//   const [rows] = await db.query('SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1', [STATUS.PENDING_CLERK]);
//   return rows;
// }

// // Find pending request by item_serial
// async function findPendingByItemSerial(item_serial) {
//   const [rows] = await db.query(
//     'SELECT * FROM item_requests WHERE item_serial = ? AND status IN (?, ?, ?) LIMIT 1',
//     [item_serial, STATUS.PENDING_MANAGER, STATUS.PENDING_CLERK, STATUS.APPROVED]
//   );
//   return rows.length > 0 ? rows[0] : null;
// }

// // Delete request
// async function deleteById(id) {
//   await db.query('DELETE FROM item_requests WHERE id = ?', [id]);
// }

// module.exports = {
//   STATUS,
//   createRequest,
//   findByStaffId,
//   findById,
//   updateManagerReview,
//   updateClerkReview,
//   getOnePendingManagerRequest,
//   getOnePendingClerkRequest,
//   findPendingByItemSerial,
//   deleteById
// };
const db = require('../config/db');

const STATUS = {
  PENDING_MANAGER: 'pending_manager',
  REJECTED_MANAGER: 'rejected_manager',
  PENDING_CLERK: 'pending_clerk',
  REJECTED_CLERK: 'rejected_clerk',
  APPROVED: 'approved',
};

// Create a new request
async function createRequest({ staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation }, io) {
  const [userRows] = await db.query('SELECT id FROM users WHERE staff_id = ? LIMIT 1', [staff_id]);
  if (userRows.length === 0) throw new Error(`Staff ID ${staff_id} not found.`);

  const [[existing]] = await db.query(
    `SELECT id FROM item_requests WHERE item_serial = ? AND status IN (?, ?, ?) LIMIT 1`,
    [item_serial, STATUS.PENDING_MANAGER, STATUS.PENDING_CLERK, STATUS.APPROVED]
  );
  if (existing) throw new Error(`Item ${item_serial} has already been requested.`);

  const [result] = await db.query(
    `INSERT INTO item_requests 
     (staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, STATUS.PENDING_MANAGER]
  );

  // Emit real-time notification
  if (io) {
    io.emit('new_assign_request', {
      requestId: result.insertId,
      staffName: staff_name,
      itemSerial: item_serial,
      quantity
    });
  }

  return result;
}

// Get requests by staff ID
async function findByStaffId(staffId) {
  const [rows] = await db.query('SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC', [staffId]);
  return rows;
}

// Get request by ID
async function findById(id) {
  const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
  return rows[0];
}

// Manager review
async function updateManagerReview(id, { status, manager_comment }, io) {
  if (![STATUS.PENDING_CLERK, STATUS.REJECTED_MANAGER].includes(status)) throw new Error('Invalid status for manager review');

  await db.query('UPDATE item_requests SET status = ?, manager_comment = ? WHERE id = ?', [status, manager_comment, id]);

  const [[{ staff_id }]] = await db.query('SELECT staff_id FROM item_requests WHERE id = ?', [id]);
  const [requests] = await db.query('SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC', [staff_id]);

  // Emit real-time notification
  if (io) {
    io.emit('manager_review_processed', {
      requestId: id,
      staffId: staff_id,
      status
    });
  }

  return requests;
}

// Clerk review
async function updateClerkReview(id, { status, clerk_comment }, io) {
  if (![STATUS.APPROVED, STATUS.REJECTED_CLERK].includes(status)) throw new Error('Invalid status for clerk review');

  await db.query('UPDATE item_requests SET status = ?, clerk_comment = ? WHERE id = ?', [status, clerk_comment, id]);
  const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);

  // Emit real-time notification
  if (io) {
    io.emit('assign_request_processed', {
      requestId: id,
      staffId: rows[0].staff_id,
      status
    });
  }

  return rows[0];
}

// Get next pending manager request
async function getOnePendingManagerRequest() {
  const [rows] = await db.query('SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1', [STATUS.PENDING_MANAGER]);
  return rows;
}

// Get next pending clerk request
async function getOnePendingClerkRequest() {
  const [rows] = await db.query('SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1', [STATUS.PENDING_CLERK]);
  return rows;
}

// Find pending request by item_serial
async function findPendingByItemSerial(item_serial) {
  const [rows] = await db.query(
    'SELECT * FROM item_requests WHERE item_serial = ? AND status IN (?, ?, ?) LIMIT 1',
    [item_serial, STATUS.PENDING_MANAGER, STATUS.PENDING_CLERK, STATUS.APPROVED]
  );
  return rows.length > 0 ? rows[0] : null;
}

// Delete request
async function deleteById(id) {
  await db.query('DELETE FROM item_requests WHERE id = ?', [id]);
}

module.exports = {
  STATUS,
  createRequest,
  findByStaffId,
  findById,
  updateManagerReview,
  updateClerkReview,
  getOnePendingManagerRequest,
  getOnePendingClerkRequest,
  findPendingByItemSerial,
  deleteById
};
