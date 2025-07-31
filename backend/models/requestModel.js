
// // };
// const db = require('../config/db');

// const STATUS = {
//   PENDING_MANAGER: 'pending_manager',
//   REJECTED_MANAGER: 'rejected_manager',
//   PENDING_CLERK: 'pending_clerk',
//   REJECTED_CLERK: 'rejected_clerk',
//   APPROVED: 'approved',
// };

// /**
//  * Create a new item request if staff_id exists in users table.
//  * Throws error if staff_id not found.
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
//   // Check if staff_id exists in users table
//   const checkQuery = 'SELECT id FROM users WHERE staff_id = ? LIMIT 1';
//   const [userRows] = await db.query(checkQuery, [staff_id]);

//   if (userRows.length === 0) {
//     throw new Error(`Staff ID ${staff_id} not found. Cannot create request.`);
//   }

//   // Insert new item request
//   const insertQuery = `
//     INSERT INTO item_requests 
//       (staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, status)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   const params = [
//     staff_id,
//     staff_name,
//     staff_email,
//     item_type,
//     item_serial,
//     quantity,
//     explanation,
//     STATUS.PENDING_MANAGER,
//   ];
//   const [result] = await db.query(insertQuery, params);
//   return result;
// };

// /**
//  * Find all requests by a specific staff ID ordered by newest first
//  */
// const findByStaffId = async (staffId) => {
//   const query = `
//     SELECT * FROM item_requests 
//     WHERE staff_id = ? 
//     ORDER BY created_at DESC
//   `;
//   const [rows] = await db.query(query, [staffId]);
//   return rows;
// };

// /**
//  * Find a specific request by ID
//  */
// const findById = async (id) => {
//   const query = 'SELECT * FROM item_requests WHERE id = ?';
//   const [rows] = await db.query(query, [id]);
//   return rows[0];
// };

// /**
//  * Manager reviews a request: updates status and manager_comment.
//  * After updating, returns all requests by the same staff_id.
//  * Allowed statuses for manager review: 'pending_clerk' (approve), 'rejected_manager' (reject)
//  */
// const updateManagerReview = async (id, { status, manager_comment }) => {
//   if (![STATUS.PENDING_CLERK, STATUS.REJECTED_MANAGER].includes(status)) {
//     throw new Error('Invalid status for manager review');
//   }

//   // Update the current request's status and manager comment
//   const updateQuery = `
//     UPDATE item_requests 
//     SET status = ?, manager_comment = ?
//     WHERE id = ?
//   `;
//   await db.query(updateQuery, [status, manager_comment, id]);

//   // Get the staff_id of this request
//   const staffQuery = `
//     SELECT staff_id FROM item_requests WHERE id = ?
//   `;
//   const [staffRows] = await db.query(staffQuery, [id]);

//   if (staffRows.length === 0) {
//     throw new Error(`Request with id ${id} not found`);
//   }

//   const staffId = staffRows[0].staff_id;

//   // Fetch all requests for that staff_id ordered newest first
//   const fetchAllStaffRequestsQuery = `
//     SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC
//   `;
//   const [allRequests] = await db.query(fetchAllStaffRequestsQuery, [staffId]);

//   return allRequests;
// };

// /**
//  * Get one pending request for manager review ordered by oldest first
//  * Returns array with zero or one request
//  */
// const getOnePendingManagerRequest = async () => {
//   const query = `
//     SELECT * FROM item_requests
//     WHERE status = ?
//     ORDER BY created_at ASC
//     LIMIT 1
//   `;
//   const [rows] = await db.query(query, [STATUS.PENDING_MANAGER]);
//   return rows;
// };

// /**
//  * Clerk reviews a request: updates status and clerk_comment.
//  * Allowed statuses for clerk review: 'approved', 'rejected_clerk'
//  */
// const updateClerkReview = async (id, { status, clerk_comment }) => {
//   if (![STATUS.APPROVED, STATUS.REJECTED_CLERK].includes(status)) {
//     throw new Error('Invalid status for clerk review');
//   }

//   const query = `
//     UPDATE item_requests 
//     SET status = ?, clerk_comment = ?
//     WHERE id = ?
//   `;
//   const [result] = await db.query(query, [status, clerk_comment, id]);
//   return result;
// };

// module.exports = {
//   STATUS,
//   create,
//   findByStaffId,
//   findById,
//   updateManagerReview,
//   updateClerkReview,
//   getOnePendingManagerRequest,
// };
const db = require('../config/db');

const STATUS = {
  PENDING_MANAGER: 'pending_manager',
  REJECTED_MANAGER: 'rejected_manager',
  PENDING_CLERK: 'pending_clerk',
  REJECTED_CLERK: 'rejected_clerk',
  APPROVED: 'approved',
};

const create = async ({
  staff_id,
  staff_name,
  staff_email,
  item_type,
  item_serial,
  quantity,
  explanation,
}) => {
  const [userRows] = await db.query('SELECT id FROM users WHERE staff_id = ? LIMIT 1', [staff_id]);
  if (userRows.length === 0) {
    throw new Error(`Staff ID ${staff_id} not found.`);
  }

  const [result] = await db.query(
    `INSERT INTO item_requests 
     (staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, STATUS.PENDING_MANAGER]
  );

  return result;
};

const findByStaffId = async (staffId) => {
  const [rows] = await db.query(
    `SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC`,
    [staffId]
  );
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
  return rows[0];
};

const updateManagerReview = async (id, { status, manager_comment }) => {
  if (![STATUS.PENDING_CLERK, STATUS.REJECTED_MANAGER].includes(status)) {
    throw new Error('Invalid status for manager review');
  }

  await db.query(
    `UPDATE item_requests SET status = ?, manager_comment = ? WHERE id = ?`,
    [status, manager_comment, id]
  );

  const [[{ staff_id }]] = await db.query('SELECT staff_id FROM item_requests WHERE id = ?', [id]);

  const [requests] = await db.query(
    `SELECT * FROM item_requests WHERE staff_id = ? ORDER BY created_at DESC`,
    [staff_id]
  );

  return requests;
};

const updateClerkReview = async (id, { status, clerk_comment }) => {
  if (![STATUS.APPROVED, STATUS.REJECTED_CLERK].includes(status)) {
    throw new Error('Invalid status for clerk review');
  }

  await db.query(
    `UPDATE item_requests SET status = ?, clerk_comment = ? WHERE id = ?`,
    [status, clerk_comment, id]
  );

  const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
  return rows[0];
};

const getOnePendingManagerRequest = async () => {
  const [rows] = await db.query(
    `SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1`,
    [STATUS.PENDING_MANAGER]
  );
  return rows;
};

const getOnePendingClerkRequest = async () => {
  const [rows] = await db.query(
    `SELECT * FROM item_requests WHERE status = ? ORDER BY created_at ASC LIMIT 1`,
    [STATUS.PENDING_CLERK]
  );
  return rows;
};

module.exports = {
  STATUS,
  create,
  findByStaffId,
  findById,
  updateManagerReview,
  updateClerkReview,
  getOnePendingManagerRequest,
  getOnePendingClerkRequest,
};
