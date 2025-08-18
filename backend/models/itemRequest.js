
// const db = require('../config/db');

// // const ItemRequest = {
// //   async create(data) {
// //     const query = `
// //       INSERT INTO item_requests
// //       (staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, status, manager_cause, clerk_cause, given_to_staff_at)
// //       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// //     `;
// //     const params = [
// //       data.staff_id,
// //       data.staff_name,
// //       data.staff_email,
// //       data.item_type,
// //       data.item_serial || null,
// //       data.quantity,
// //       data.explanation || null,
// //       data.status || 'pending_manager',
// //       data.manager_cause || null,
// //       data.clerk_cause || null,
// //       data.given_to_staff_at || null,
// //     ];

// //     const [result] = await db.query(query, params);
// //     return result;
// //   },

// //   //... other methods ...
// // };
// const ItemRequest = {
//   // Create a new item request
//   async create(data) {
//     const query = `
//       INSERT INTO item_requests
//       (staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, status, manager_cause, clerk_cause, given_to_staff_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const params = [
//       data.staff_id,
//       data.staff_name,
//       data.staff_email,
//       data.item_type,
//       data.item_serial || null,
//       data.quantity,
//       data.explanation || null,
//       data.status || 'pending_manager',
//       data.manager_cause || null,
//       data.clerk_cause || null,
//       data.given_to_staff_at || null,
//     ];

//     const [result] = await db.query(query, params);
//     return result; // contains insertId and other meta info
//   },

//   // Find an existing item request by staff_id
//   async findByStaffId(staff_id) {
//     const query = `
//       SELECT * FROM item_requests WHERE staff_id = ? LIMIT 1
//     `;
//     const [rows] = await db.query(query, [staff_id]);
//     return rows[0]; // returns existing request or undefined
//   },

//   // ... other methods ...


// //   // Get all requests that are pending manager approval
// //   async getPendingRequests() {
// //     const [rows] = await db.query(
// //       'SELECT * FROM item_requests WHERE status = "pending_manager"'
// //     );
// //     return rows;
// //   },

// //   // Update request status (used by manager to accept/reject)
// //   async updateRequestStatus(id, newStatus, managerCause = null) {
// //     const [result] = await db.query(
// //       `UPDATE item_requests 
// //        SET status = ?, manager_cause = ? 
// //        WHERE id = ?`,
// //       [newStatus, managerCause, id]
// //     );
// //     return result.affectedRows;
// //   },
// // Get all item requests pending manager approval
// async getPendingRequests() {
//   const [rows] = await db.query(
//     'SELECT * FROM item_requests WHERE manager_status = "pending" ORDER BY created_at ASC'
//   );
//   return rows;
// },

// // Update request status for manager decision (approve or reject)
// async updateRequestStatus(requestId, newStatus, managerCause = null) {
//   // Validate input status
//   const allowedStatuses = ['approved', 'rejected'];
//   if (!allowedStatuses.includes(newStatus)) {
//     throw new Error(`Invalid manager status '${newStatus}'. Allowed: ${allowedStatuses.join(', ')}`);
//   }

//   // If approved, clear manager_cause; if rejected, managerCause must be provided
//   const causeToSave = newStatus === 'rejected' ? managerCause : null;

//   const [result] = await db.query(
//     `UPDATE item_requests
//      SET manager_status = ?, manager_cause = ?, updated_at = NOW()
//      WHERE id = ?`,
//     [newStatus, causeToSave, requestId]
//   );

//   return result.affectedRows;
// },

//   // (Optional) Find by ID
//   async findById(id) {
//     const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//     return rows[0];
//   }


// };





// module.exports = ItemRequest;

// module.exports = ItemRequest;

