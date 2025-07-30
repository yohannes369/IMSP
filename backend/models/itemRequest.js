// const db = require('../config/db');

// const ItemRequest = {
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
//     return result;
//   },

//   async findAll() {
//     const query = `SELECT * FROM item_requests ORDER BY created_at DESC`;
//     const [rows] = await db.query(query);
//     return rows;
//   },

//   async findById(id) {
//     const query = `SELECT * FROM item_requests WHERE id = ?`;
//     const [rows] = await db.query(query, [id]);
//     return rows[0];
//   },

//   async update(id, data) {
//     // Build dynamic query based on provided fields
//     const fields = [];
//     const params = [];

//     if (data.staff_id !== undefined) {
//       fields.push(`staff_id = ?`);
//       params.push(data.staff_id);
//     }
//     if (data.staff_name !== undefined) {
//       fields.push(`staff_name = ?`);
//       params.push(data.staff_name);
//     }
//     if (data.staff_email !== undefined) {
//       fields.push(`staff_email = ?`);
//       params.push(data.staff_email);
//     }
//     if (data.item_type !== undefined) {
//       fields.push(`item_type = ?`);
//       params.push(data.item_type);
//     }
//     if (data.item_serial !== undefined) {
//       fields.push(`item_serial = ?`);
//       params.push(data.item_serial);
//     }
//     if (data.quantity !== undefined) {
//       fields.push(`quantity = ?`);
//       params.push(data.quantity);
//     }
//     if (data.explanation !== undefined) {
//       fields.push(`explanation = ?`);
//       params.push(data.explanation);
//     }
//     if (data.status !== undefined) {
//       fields.push(`status = ?`);
//       params.push(data.status);
//     }
//     if (data.manager_cause !== undefined) {
//       fields.push(`manager_cause = ?`);
//       params.push(data.manager_cause);
//     }
//     if (data.clerk_cause !== undefined) {
//       fields.push(`clerk_cause = ?`);
//       params.push(data.clerk_cause);
//     }
//     if (data.given_to_staff_at !== undefined) {
//       fields.push(`given_to_staff_at = ?`);
//       params.push(data.given_to_staff_at);
//     }

//     if (fields.length === 0) {
//       throw new Error('No fields to update');
//     }

//     // updated_at will auto update by MySQL ON UPDATE CURRENT_TIMESTAMP, so no need to set here.

//     const query = `UPDATE item_requests SET ${fields.join(', ')} WHERE id = ?`;
//     params.push(id);

//     const [result] = await db.query(query, params);
//     return result;
//   },

//   async remove(id) {
//     const query = `DELETE FROM item_requests WHERE id = ?`;
//     const [result] = await db.query(query, [id]);
//     return result;
//   }
// };

// module.exports = ItemRequest;
const db = require('../config/db');

// const ItemRequest = {
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
//     return result;
//   },

//   //... other methods ...
// };
const ItemRequest = {
  // Create a new item request
  async create(data) {
    const query = `
      INSERT INTO item_requests
      (staff_id, staff_name, staff_email, item_type, item_serial, quantity, explanation, status, manager_cause, clerk_cause, given_to_staff_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.staff_id,
      data.staff_name,
      data.staff_email,
      data.item_type,
      data.item_serial || null,
      data.quantity,
      data.explanation || null,
      data.status || 'pending_manager',
      data.manager_cause || null,
      data.clerk_cause || null,
      data.given_to_staff_at || null,
    ];

    const [result] = await db.query(query, params);
    return result; // contains insertId and other meta info
  },

  // Find an existing item request by staff_id
  async findByStaffId(staff_id) {
    const query = `
      SELECT * FROM item_requests WHERE staff_id = ? LIMIT 1
    `;
    const [rows] = await db.query(query, [staff_id]);
    return rows[0]; // returns existing request or undefined
  },

  // ... other methods ...


//   // Get all requests that are pending manager approval
//   async getPendingRequests() {
//     const [rows] = await db.query(
//       'SELECT * FROM item_requests WHERE status = "pending_manager"'
//     );
//     return rows;
//   },

//   // Update request status (used by manager to accept/reject)
//   async updateRequestStatus(id, newStatus, managerCause = null) {
//     const [result] = await db.query(
//       `UPDATE item_requests 
//        SET status = ?, manager_cause = ? 
//        WHERE id = ?`,
//       [newStatus, managerCause, id]
//     );
//     return result.affectedRows;
//   },
// Get all item requests pending manager approval
async getPendingRequests() {
  const [rows] = await db.query(
    'SELECT * FROM item_requests WHERE manager_status = "pending" ORDER BY created_at ASC'
  );
  return rows;
},

// Update request status for manager decision (approve or reject)
async updateRequestStatus(requestId, newStatus, managerCause = null) {
  // Validate input status
  const allowedStatuses = ['approved', 'rejected'];
  if (!allowedStatuses.includes(newStatus)) {
    throw new Error(`Invalid manager status '${newStatus}'. Allowed: ${allowedStatuses.join(', ')}`);
  }

  // If approved, clear manager_cause; if rejected, managerCause must be provided
  const causeToSave = newStatus === 'rejected' ? managerCause : null;

  const [result] = await db.query(
    `UPDATE item_requests
     SET manager_status = ?, manager_cause = ?, updated_at = NOW()
     WHERE id = ?`,
    [newStatus, causeToSave, requestId]
  );

  return result.affectedRows;
},

  // (Optional) Find by ID
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
    return rows[0];
  }


};





module.exports = ItemRequest;

module.exports = ItemRequest;

