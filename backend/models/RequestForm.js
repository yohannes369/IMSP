// const pool = require("../config/db");

// // Create a new request (includes fname and lname)
// async function createRequest(staff_id, fname, lname, item_name, quantity, measurement) {
//   const [result] = await pool.query(
//     `INSERT INTO RequestForm (staff_id, fname, lname, item_name, quantity, measurement) 
//      VALUES (?, ?, ?, ?, ?, ?)`,
//     [staff_id, fname, lname, item_name, quantity, measurement]
//   );
//   return result.insertId;
// }

// // Get all requests
// async function getRequests() {
//   const [rows] = await pool.query(
//     "SELECT * FROM RequestForm ORDER BY request_date DESC"
//   );
//   return rows;
// }

// // Get requests for a specific staff
// async function getRequestsByStaff(staff_id) {
//   const [rows] = await pool.query(
//     "SELECT * FROM RequestForm WHERE staff_id = ?",
//     [staff_id]
//   );
//   return rows;
// }

// // Update request status (approve/reject)
// async function updateRequestStatus(request_id, status, manager_comment) {
//   await pool.query(
//     `UPDATE RequestForm SET status = ?, manager_comment = ? WHERE request_id = ?`,
//     [status, manager_comment, request_id]
//   );
//   return true;
// }

// // Delete request
// async function deleteRequest(request_id) {
//   const [result] = await pool.query(
//     `DELETE FROM RequestForm WHERE request_id = ?`,
//     [request_id]
//   );
//   return result.affectedRows > 0; // true if a row was deleted
// }

// module.exports = {
//   createRequest,
//   getRequests,
//   getRequestsByStaff,
//   updateRequestStatus,
//   deleteRequest,
// };
const pool = require("../config/db");

// Create a new request (includes fname and lname)
async function createRequest(staff_id, fname, lname, item_name, quantity, measurement) {
  const [result] = await pool.query(
    `INSERT INTO RequestForm (staff_id, fname, lname, item_name, quantity, measurement) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [staff_id, fname, lname, item_name, quantity, measurement]
  );
  return result.insertId;
}

// Get all requests
async function getRequests() {
  const [rows] = await pool.query(
    "SELECT * FROM RequestForm ORDER BY request_date DESC"
  );
  return rows;
}

// Get requests for a specific staff
async function getRequestsByStaff(staff_id) {
  const [rows] = await pool.query(
    "SELECT * FROM RequestForm WHERE staff_id = ?",
    [staff_id]
  );
  return rows;
}

// Update request status (approve/reject)
async function updateRequestStatus(request_id, status, manager_comment) {
  await pool.query(
    `UPDATE RequestForm SET status = ?, manager_comment = ? WHERE request_id = ?`,
    [status, manager_comment, request_id]
  );
  return true;
}

// Delete request
async function deleteRequest(request_id) {
  const [result] = await pool.query(
    `DELETE FROM RequestForm WHERE request_id = ?`,
    [request_id]
  );
  return result.affectedRows > 0; // true if a row was deleted
}

module.exports = {
  createRequest,
  getRequests,
  getRequestsByStaff,
  updateRequestStatus,
  deleteRequest,
};