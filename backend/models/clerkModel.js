
// const db = require('../config/db');

// const RequestModel = {
//   // Fetch request by ID
//   getRequestById: async (id) => {
//     const [[row]] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//     return row;
//   },

//   // Fetch item by serial number
//   getItemBySerial: async (serial) => {
//     const [[row]] = await db.query('SELECT * FROM items WHERE serial_no = ?', [serial]);
//     return row;
//   },

//   // Decrease item quantity and delete item if quantity becomes zero
//   decreaseItemQuantity: async (serial, quantity) => {
//     // Get current quantity
//     const [[item]] = await db.query('SELECT quantity FROM items WHERE serial_no = ?', [serial]);

//     if (!item) throw new Error('Item not found');
//     const newQty = item.quantity - 1;

//     if (newQty > 0) {
//       await db.query('UPDATE items SET quantity = ? WHERE serial_no = ?', [newQty, serial]);
//     } else {
//       // If newQty is 0 or less, delete the item
//       await db.query('DELETE FROM items WHERE serial_no = ?', [serial]);
//     }
//   },

//   // Insert into give_items
//   insertGivenItem: async ({ staff_id, item_serial, quantity, given_at }) => {
//     await db.query(
//       'INSERT INTO give_items (staff_id, item_serial, quantity, given_at) VALUES (?, ?, ?, ?)',
//       [staff_id, item_serial, quantity, given_at]
//     );
//   },

//   // Update clerk review
//   updateClerkReview: async (id, status, clerk_comment) => {
//     const [result] = await db.query(
//       'UPDATE item_requests SET status = ?, clerk_comment = ? WHERE id = ?',
//       [status, clerk_comment, id]
//     );
//     return result.affectedRows > 0;
//   },

//   // Get one request with 'pending_clerk' status
//   getOnePendingClerkRequest: async () => {
//     const [[row]] = await db.query(
//       "SELECT * FROM item_requests WHERE status = 'pending_clerk' ORDER BY id ASC LIMIT 1"
//     );
//     return row;
//   },

//   // Delete request after item is given
//   deleteRequestById: async (id) => {
//     await db.query('DELETE FROM item_requests WHERE id = ?', [id]);
//   },
// };

// module.exports = RequestModel;


// corect one

// const db = require('../config/db');

// const RequestModel = {
//   // Fetch request by ID
//   getRequestById: async (id) => {
//     const [[row]] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//     return row;
//   },

//   // Fetch item by serial number
//   getItemBySerial: async (serial) => {
//     const [[row]] = await db.query('SELECT * FROM items WHERE serial_no = ?', [serial]);
//     return row;
//   },

//   // Decrease item quantity and delete item if quantity becomes zero
//   decreaseItemQuantity: async (serial, quantity) => {
//     // Get current quantity
//     const [[item]] = await db.query('SELECT quantity FROM items WHERE serial_no = ?', [serial]);

//     if (!item) throw new Error('Item not found');
//     const newQty = item.quantity - 1;

//     if (newQty > 0) {
//       await db.query('UPDATE items SET quantity = ? WHERE serial_no = ?', [newQty, serial]);
//     } else {
//       // If newQty is 0 or less, delete the item
//       await db.query('DELETE FROM items WHERE serial_no = ?', [serial]);
//     }
//   },

//   // Insert into give_items
//   insertGivenItem: async ({ staff_id, item_serial, quantity, given_at }) => {
//     await db.query(
//       'INSERT INTO give_items (staff_id, item_serial, quantity, given_at) VALUES (?, ?, ?, ?)',
//       [staff_id, item_serial, quantity, given_at]
//     );
//   },

//   // Update clerk review
//   updateClerkReview: async (id, status, clerk_comment) => {
//     const [result] = await db.query(
//       'UPDATE item_requests SET status = ?, clerk_comment = ? WHERE id = ?',
//       [status, clerk_comment, id]
//     );
//     return result.affectedRows > 0;
//   },

//   // Get one request with 'pending_clerk' status
//   getOnePendingClerkRequest: async () => {
//     const [[row]] = await db.query(
//       "SELECT * FROM item_requests WHERE status = 'pending_clerk' ORDER BY id ASC LIMIT 1"
//     );
//     return row;
//   },

//   // status is approve by clerk   after item is given code
//   // status is approve by clerk   after item is given code
// approveByClerk: async (id) => {
//   // Set status to 'approved_by_clerk' after item is given
//   const [result] = await db.query(
//     "UPDATE item_requests SET status = 'approved_by_clerk' WHERE id = ?",
//     [id]
//   );
//   return result.affectedRows > 0;
// },

 
  
// };

// module.exports = RequestModel;
// const db = require('../config/db');

// // Get request by ID
// const getRequestById = async (id) => {
//   const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
//   return rows[0] || null;
// };

// // Get item by serial number
// const getItemBySerial = async (serial_no) => {
//   const [rows] = await db.query('SELECT * FROM items WHERE serial_no = ?', [serial_no]);
//   return rows[0] || null;
// };

// // Insert a given item record into give_items table
// const insertGivenItem = async ({
//   staff_id,
//   staff_name,
//   item_type,
//   item_serial,
//   quantity,
//   given_at,
//   barcode,
// }) => {
//   return await db.query(
//     `INSERT INTO give_items 
//       (staff_id, staff_name, item_type, item_serial, quantity, given_at, barcode) 
//      VALUES (?, ?, ?, ?, ?, ?, ?)`,
//     [staff_id, staff_name, item_type, item_serial, quantity, given_at, barcode]
//   );
// };

// // Decrease item quantity or delete if zero
// const decreaseItemQuantity = async (serial_no, quantity) => {
//   const [rows] = await db.query('SELECT quantity FROM items WHERE serial_no = ?', [serial_no]);
//   if (!rows.length) throw new Error('Item not found');

//   const newQuantity = rows[0].quantity - quantity;

//   if (newQuantity > 0) {
//     await db.query('UPDATE items SET quantity = ? WHERE serial_no = ?', [newQuantity, serial_no]);
//   } else {
//     await db.query('DELETE FROM items WHERE serial_no = ?', [serial_no]);
//   }
// };

// // Update clerk review status and comment on request
// const updateClerkReview = async (id, status, clerk_comment) => {
//   const [result] = await db.query(
//     'UPDATE item_requests SET status = ?, clerk_comment = ? WHERE id = ?',
//     [status, clerk_comment, id]
//   );
//   return result.affectedRows > 0;
// };

// // Get one pending clerk request (status 'pending_clerk')
// const getOnePendingClerkRequest = async () => {
//   const [rows] = await db.query(
//     "SELECT * FROM item_requests WHERE status = 'pending_clerk' ORDER BY id ASC LIMIT 1"
//   );
//   return rows[0] || null;
// };

// // Approve request by clerk after giving item
// const approveByClerk = async (id) => {
//   const [result] = await db.query(
//     "UPDATE item_requests SET status = 'approved_by_clerk' WHERE id = ?",
//     [id]
//   );
//   return result.affectedRows > 0;
// };

// // Get item details by barcode from give_items table
// const getItemByBarcodeFromGivenItems = async (barcode) => {
//   const [rows] = await db.query('SELECT * FROM give_items WHERE barcode = ?', [barcode]);
//   return rows[0] || null;
// };

// module.exports = {
//   getRequestById,
//   getItemBySerial,
//   insertGivenItem,
//   decreaseItemQuantity,
//   updateClerkReview,
//   getOnePendingClerkRequest,
//   approveByClerk,
//   getItemByBarcodeFromGivenItems,
// };



//corect one  





const db = require('../config/db');

// Get request by ID
const getRequestById = async (id) => {
  const [rows] = await db.query('SELECT * FROM item_requests WHERE id = ?', [id]);
  return rows[0] || null;
};

// Get item by serial number
const getItemBySerial = async (serial_no) => {
  const [rows] = await db.query('SELECT * FROM items WHERE serial_no = ?', [serial_no]);
  return rows[0] || null;
};

// Insert a given item record into give_items table
const insertGivenItem = async ({
  staff_id,
  staff_name,
  item_type,
  item_serial,
  quantity,
  given_at

}) => {
  return await db.query(
    `INSERT INTO give_items 
      (staff_id, staff_name, item_type, item_serial, quantity, given_at) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [staff_id, staff_name, item_type, item_serial, quantity, given_at]
  );
};

// Decrease item quantity (do NOT delete when it reaches 0)
const decreaseItemQuantity = async (serial_no, quantity) => {
  const [rows] = await db.query('SELECT quantity FROM items WHERE serial_no = ?', [serial_no]);
  if (!rows.length) throw new Error('Item not found');

  const newQuantity = rows[0].quantity - quantity;
  const finalQuantity = newQuantity >= 0 ? newQuantity : 0; // Prevent negative stock

  await db.query('UPDATE items SET quantity = ? WHERE serial_no = ?', [finalQuantity, serial_no]);
};

// Update clerk review status and comment on request
const updateClerkReview = async (id, status, clerk_comment) => {
  const [result] = await db.query(
    'UPDATE item_requests SET status = ?, clerk_comment = ? WHERE id = ?',
    [status, clerk_comment, id]
  );
  return result.affectedRows > 0;
};

// Get one pending clerk request (status 'pending_clerk')
const getOnePendingClerkRequest = async () => {
  const [rows] = await db.query(
    "SELECT * FROM item_requests WHERE status = 'pending_clerk' ORDER BY id ASC LIMIT 1"
  );
  return rows[0] || null;
};

// Approve request by clerk after giving item
const approveByClerk = async (id) => {
  const [result] = await db.query(
    "UPDATE item_requests SET status = 'approved_by_clerk' WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

// Get item details by barcode from give_items table
const getItemByBarcodeFromGivenItems = async (barcode) => {
  const [rows] = await db.query('SELECT * FROM give_items WHERE barcode = ?', [barcode]);
  return rows[0] || null;
};

module.exports = {
  getRequestById,
  getItemBySerial,
  insertGivenItem,
  decreaseItemQuantity,
  updateClerkReview,
  getOnePendingClerkRequest,
  approveByClerk,
  getItemByBarcodeFromGivenItems,
};





