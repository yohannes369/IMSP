


// const RequestModel = require('../models/clerkModel');

// // ✅ PUT /requests/clerk/:id – Clerk reviews a request
// exports.updateClerkReview = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { status, clerk_comment } = req.body;

//     const request = await RequestModel.getRequestById(id);
//     if (!request) return res.status(404).json({ message: 'Request not found' });

//     if (status === 'approved') {
//       const { serial_no, quantity, staff_id } = request;

//       const item = await RequestModel.getItemBySerial(serial_no);
//       if (!item) return res.status(404).json({ message: 'Item not found' });

//       if (item.quantity < quantity) {
//         return res.status(400).json({ message: 'Insufficient stock' });
//       }

//       await RequestModel.decreaseItemQuantity(item_serial, quantity);

//       await RequestModel.insertGivenItem({
//         staff_id,
//         item_serial,
//         quantity,
//         given_date: new Date(),
//       });
//     }

//     await RequestModel.updateClerkReview(id, status, clerk_comment);
//     res.json({ message: 'Request reviewed successfully by clerk.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error during clerk review', error: err.message });
//   }
// };

// // ✅ GET /requests/clerk/pending – Get one pending request for clerk
// exports.getOnePendingClerkRequest = async (req, res) => {
//   try {
//     const request = await RequestModel.getOnePendingClerkRequest();
//     if (!request) return res.status(404).json({ message: 'No pending request found' });
//     res.json(request);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch pending request', error: err.message });
//   }
// };

// // ✅ POST /requests/clerk/give – Give item to staff after final approval
// exports.giveItemToStaff = async (req, res) => {
//   try {
//     const { request_id } = req.body;
//     console.log('➡️ Received request_id:', request_id);

//     const request = await RequestModel.getRequestById(request_id);
//     if (!request) {
//       console.log('❌ Request not found for ID:', request_id);
//       return res.status(404).json({ message: 'Request not found' });
//     }

//   const { item_serial, quantity, staff_id } = request;

// const item = await RequestModel.getItemBySerial(item_serial);
// if (!item) {
//   console.log('❌ Item not found:', item_serial);
//   return res.status(404).json({ message: 'Item not found' });
// }


//     if (item.quantity < quantity) {
//       console.log('❌ Not enough stock:', item.quantity, 'requested:', quantity);
//       return res.status(400).json({ message: 'Insufficient stock to fulfill request' });
//     }

//     await RequestModel.decreaseItemQuantity(item_serial, quantity);

//     await RequestModel.insertGivenItem({
//       staff_id,
//       item_serial,
//       quantity,
//       given_date: new Date(),
//     });

//     await RequestModel.deleteRequestById(request_id);

//     res.json({ message: 'Item given to staff and request completed.' });
//   } catch (err) {
//     console.error('🔥 ERROR in giveItemToStaff:', err);
//     res.status(500).json({ message: 'Failed to give item', error: err.message });
//   }
// };



// corect one 

// const RequestModel = require('../models/clerkModel');

// // ✅ PUT /requests/clerk/:id – Clerk reviews a request
// // exports.updateClerkReview = async (req, res) => {
// //   try {
// //     const id = req.params.id;
// //     const { status, clerk_comment } = req.body;

// //     const request = await RequestModel.getRequestById(id);
// //     if (!request) return res.status(404).json({ message: 'Request not found' });

// //     if (status === 'approved') {
// //       const { serial_no, quantity, staff_id } = request;

// //       const item = await RequestModel.getItemBySerial(serial_no);
// //       if (!item) return res.status(404).json({ message: 'Item not found' });

// //       if (item.quantity < quantity) {
// //         return res.status(400).json({ message: 'Insufficient stock' });
// //       }

// //       await RequestModel.decreaseItemQuantity(item_serial, quantity);

// //       await RequestModel.insertGivenItem({
// //         staff_id,
// //         item_serial,
// //         quantity,
// //         given_date: new Date(),
// //       });
// //     }

// //     await RequestModel.updateClerkReview(id, status, clerk_comment);
// //     res.json({ message: 'Request reviewed successfully by clerk.' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error during clerk review', error: err.message });
// //   }
// // };
//  exports.updateClerkReview = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { status, clerk_comment } = req.body;

//     const request = await RequestModel.getRequestById(id);
//     if (!request) return res.status(404).json({ message: 'Request not found' });

//     if (status === 'approved') {
//       const { serial_no, quantity, staff_id } = request;

//       const item = await RequestModel.getItemBySerial(serial_no);
//       if (!item) return res.status(404).json({ message: 'Item not found' });

//       if (item.quantity < quantity) {
//         return res.status(400).json({ message: 'Insufficient stock' });
//       }

//       await RequestModel.decreaseItemQuantity(item_serial, quantity);

//       await RequestModel.insertGivenItem({
//         staff_id,
//         item_serial,
//         quantity,
//         given_date: new Date(),
//       });
//     }

//     await RequestModel.updateClerkReview(id, status, clerk_comment);
//     res.json({ message: 'Request reviewed successfully by clerk.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error during clerk review', error: err.message });
//   }
// };

// // ✅ GET /requests/clerk/pending – Get one pending request for clerk
// exports.getOnePendingClerkRequest = async (req, res) => {
//   try {
//     const request = await RequestModel.getOnePendingClerkRequest();
//     if (!request) return res.status(404).json({ message: 'No pending request found' });
//     res.json(request);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch pending request', error: err.message });
//   }
// };

// // ✅ POST /requests/clerk/give – Give item to staff after final approval
// exports.giveItemToStaff = async (req, res) => {
//   try {
//     const { request_id } = req.body;
//     console.log('➡️ Received request_id:', request_id);

//     const request = await RequestModel.getRequestById(request_id);
//     if (!request) {
//       console.log('❌ Request not found for ID:', request_id);
//       return res.status(404).json({ message: 'Request not found' });
//     }

//   const { item_serial, quantity, staff_id } = request;

// const item = await RequestModel.getItemBySerial(item_serial);
// if (!item) {
//   console.log('❌ Item not found:', item_serial);
//   return res.status(404).json({ message: 'Item not found' });
// }


//     if (item.quantity < quantity) {
//       console.log('❌ Not enough stock:', item.quantity, 'requested:', quantity);
//       return res.status(400).json({ message: 'Insufficient stock to fulfill request' });
//     }

//     await RequestModel.decreaseItemQuantity(item_serial, quantity);

//     await RequestModel.insertGivenItem({
//       staff_id,
//       item_serial,
//       quantity,
//       given_date: new Date(),
//     });

//     await RequestModel.approveByClerk(request_id);

//     res.json({ message: 'Item given to staff and request completed.' });
//   } catch (err) {
//     console.error('🔥 ERROR in giveItemToStaff:', err);
//     res.status(500).json({ message: 'Failed to give item', error: err.message });
//   }
// };





// corect one



// const {
//   getRequestById,
//   getItemBySerial,
//   insertGivenItem,
//   decreaseItemQuantity,
//   updateClerkReview,
//   getOnePendingClerkRequest,
//   approveByClerk,
//   getItemByBarcodeFromGivenItems,
// } = require('../models/clerkModel');

// const db = require('../config/db');

// // Update clerk review
// exports.updateClerkReview = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { status, clerk_comment } = req.body;

//     const request = await getRequestById(id);
//     if (!request) return res.status(404).json({ message: 'Request not found' });

//     await updateClerkReview(id, status, clerk_comment);

//     res.json({ message: 'Request updated successfully' });
//   } catch (err) {
//     console.error('Error in updateClerkReview:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// // Get one pending clerk request
// exports.getOnePendingClerkRequest = async (req, res) => {
//   try {
//     const request = await getOnePendingClerkRequest();
//     if (!request) return res.status(404).json({ message: 'No pending requests' });

//     res.json(request);
//   } catch (err) {
//     console.error('Error in getOnePendingClerkRequest:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// // Give item to staff
// exports.giveItemToStaff = async (req, res) => {
//   const connection = await db.getConnection();
//   await connection.beginTransaction();

//   try {
//     const { request_id } = req.body;
//     if (!request_id) {
//       await connection.rollback();
//       return res.status(400).json({ message: 'Request ID is required' });
//     }

//     // Fetch request
//     const [requests] = await connection.query('SELECT * FROM item_requests WHERE id = ?', [request_id]);
//     if (requests.length === 0) {
//       await connection.rollback();
//       return res.status(404).json({ message: 'Request not found' });
//     }
//     const request = requests[0];

//     // Fetch item
//     const [items] = await connection.query('SELECT * FROM items WHERE serial_no = ?', [request.item_serial]);
//     if (items.length === 0) {
//       await connection.rollback();
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     const item = items[0];

//     // Check quantity
//     if (item.quantity < request.quantity) {
//       await connection.rollback();
//       return res.status(400).json({ message: 'Insufficient stock to fulfill request' });
//     }

//     // Insert into give_items
//     await connection.query(
//       `INSERT INTO give_items (staff_id, staff_name, item_type, item_serial, quantity, given_at)
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [
//         request.staff_id,
//         request.staff_name || 'Unknown',
//         item.item_type || 'Unknown',
//         request.item_serial,
//         request.quantity,
//         new Date(),
     
//       ]
//     );

//     // Update items quantity or delete if zero
//     const newQty = item.quantity - request.quantity;
//     if (newQty > 0) {
//       await connection.query('UPDATE items SET quantity = ? WHERE serial_no = ?', [newQty, request.item_serial]);
//     } else {
//       await connection.query('DELETE FROM items WHERE serial_no = ?', [request.item_serial]);
//     }

//     // Approve the request by clerk
//     await connection.query("UPDATE item_requests SET status = 'approved_by_clerk' WHERE id = ?", [request_id]);

//     await connection.commit();

//     res.json({
//       message: 'Item given to staff and request completed.',
//       barcode: item.barcode,
//       itemDetails: {
//         staff_id: request.staff_id,
//         staff_name: request.staff_name || 'Unknown',
//         item_type: item.item_type || 'Unknown',
//         item_serial: request.item_serial,
//         quantity: request.quantity,
//         given_at: new Date(),
       
//       },
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error in giveItemToStaff:', error);
//     res.status(500).json({ message: 'Failed to give item', error: error.message });
//   } finally {
//     connection.release();
//   }
// };

// // Get given item by barcode
// exports.getItemByBarcode = async (req, res) => {
//   try {
//     const { barcode } = req.params;
//     if (!barcode) return res.status(400).json({ message: 'Barcode is required' });

//     const item = await getItemByBarcodeFromGivenItems(barcode);

//     if (!item) {
//       return res.status(404).json({
//         message: 'Given item not found',
//         suggestion: 'Check if barcode is correctly registered in given_items table',
//       });
//     }

//     res.json({ success: true, data: item });
//   } catch (err) {
//     console.error('Error in getItemByBarcode:', err);
//     res.status(500).json({ message: 'Error fetching given item details', error: err.message });
//   }
// };

// corect one 

// const {
//   getRequestById,
//   getItemBySerial,
//   insertGivenItem,
//   decreaseItemQuantity,
//   updateClerkReview,
//   getOnePendingClerkRequest,
//   approveByClerk,
//   getItemByBarcodeFromGivenItems,
// } = require('../models/clerkModel');

// const db = require('../config/db');

// // Update clerk review
// exports.updateClerkReview = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { status, clerk_comment } = req.body;

//     const request = await getRequestById(id);
//     if (!request) return res.status(404).json({ message: 'Request not found' });

//     await updateClerkReview(id, status, clerk_comment);

//     res.json({ message: 'Request updated successfully' });
//   } catch (err) {
//     console.error('Error in updateClerkReview:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// // Get one pending clerk request
// exports.getOnePendingClerkRequest = async (req, res) => {
//   try {
//     const request = await getOnePendingClerkRequest();
//     if (!request) return res.status(404).json({ message: 'No pending requests' });

//     res.json(request);
//   } catch (err) {
//     console.error('Error in getOnePendingClerkRequest:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// // Give item to staff (with proper item_type from request)
// exports.giveItemToStaff = async (req, res) => {
//   const connection = await db.getConnection();
//   await connection.beginTransaction();

//   try {
//     const { request_id } = req.body;
//     if (!request_id) {
//       await connection.rollback();
//       return res.status(400).json({ message: 'Request ID is required' });
//     }

//     // Fetch request
//     const [requests] = await connection.query('SELECT * FROM item_requests WHERE id = ?', [request_id]);
//     if (requests.length === 0) {
//       await connection.rollback();
//       return res.status(404).json({ message: 'Request not found' });
//     }
//     const request = requests[0];

//     // Fetch item
//     const [items] = await connection.query('SELECT * FROM items WHERE serial_no = ?', [request.item_serial]);
//     if (items.length === 0) {
//       await connection.rollback();
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     const item = items[0];

//     // Check quantity
//     if (item.quantity < request.quantity) {
//       await connection.rollback();
//       return res.status(400).json({ message: 'Insufficient stock to fulfill request' });
//     }

//     // Use item_type from request table, fallback to item table
//     const itemTypeToInsert = request.item_type || item.item_type || 'Unknown';

//     // Insert into give_items
//     await insertGivenItem({
//       staff_id: request.staff_id,
//       staff_name: request.staff_name || 'Unknown',
//       item_type: itemTypeToInsert,
//       item_serial: request.item_serial,
//       quantity: request.quantity,
//       given_at: new Date(),
//       barcode: item.barcode || null
//     });

//     // Update items quantity
//     const newQty = item.quantity - request.quantity;
//     if (newQty > 0) {
//       await connection.query('UPDATE items SET quantity = ? WHERE serial_no = ?', [newQty, request.item_serial]);
//     } else {
//       await connection.query('DELETE FROM items WHERE serial_no = ?', [request.item_serial]);
//     }

//     // Approve request by clerk
//     await approveByClerk(request_id);

//     await connection.commit();

//     res.json({
//       message: 'Item given to staff and request completed.',
//       barcode: item.barcode || null,
//       itemDetails: {
//         staff_id: request.staff_id,
//         staff_name: request.staff_name || 'Unknown',
//         item_type: itemTypeToInsert,
//         item_serial: request.item_serial,
//         quantity: request.quantity,
//         given_at: new Date()
//       },
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error in giveItemToStaff:', error);
//     res.status(500).json({ message: 'Failed to give item', error: error.message });
//   } finally {
//     connection.release();
//   }
// };

// // Get given item by barcode
// exports.getItemByBarcode = async (req, res) => {
//   try {
//     const { barcode } = req.params;
//     if (!barcode) return res.status(400).json({ message: 'Barcode is required' });

//     const item = await getItemByBarcodeFromGivenItems(barcode);

//     if (!item) {
//       return res.status(404).json({
//         message: 'Given item not found',
//         suggestion: 'Check if barcode is correctly registered in give_items table',
//       });
//     }

//     res.json({ success: true, data: item });
//   } catch (err) {
//     console.error('Error in getItemByBarcode:', err);
//     res.status(500).json({ message: 'Error fetching given item details', error: err.message });
//   }
// };

// const {
//   getRequestById,
//   getItemBySerial,
//   insertGivenItem,
//   decreaseItemQuantity,
//   updateClerkReview,
//   getOnePendingClerkRequest,
//   approveByClerk,
//   getItemByBarcodeFromGivenItems,
// } = require('../models/clerkModel');

// const db = require('../config/db');

// // Update clerk review
// exports.updateClerkReview = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { status, clerk_comment } = req.body;

//     const request = await getRequestById(id);
//     if (!request) return res.status(404).json({ message: 'Request not found' });

//     await updateClerkReview(id, status, clerk_comment);

//     res.json({ message: 'Request updated successfully' });
//   } catch (err) {
//     console.error('Error in updateClerkReview:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// // Get one pending clerk request
// exports.getOnePendingClerkRequest = async (req, res) => {
//   try {
//     const request = await getOnePendingClerkRequest();
//     if (!request) return res.status(404).json({ message: 'No pending requests' });

//     res.json(request);
//   } catch (err) {
//     console.error('Error in getOnePendingClerkRequest:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// // Give item to staff (with proper item_type from request) — 🔴 edited for real-time
// exports.giveItemToStaff = async (req, res) => {
//   const connection = await db.getConnection();
//   await connection.beginTransaction();
//   const io = req.app.get('io'); // get Socket.IO instance

//   try {
//     const { request_id } = req.body;
//     if (!request_id) {
//       await connection.rollback();
//       return res.status(400).json({ message: 'Request ID is required' });
//     }

//     // Fetch request
//     const [requests] = await connection.query('SELECT * FROM item_requests WHERE id = ?', [request_id]);
//     if (requests.length === 0) {
//       await connection.rollback();
//       return res.status(404).json({ message: 'Request not found' });
//     }
//     const request = requests[0];

//     // Fetch item
//     const [items] = await connection.query('SELECT * FROM items WHERE serial_no = ?', [request.item_serial]);
//     if (items.length === 0) {
//       await connection.rollback();
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     const item = items[0];

//     // Check quantity
//     if (item.quantity < request.quantity) {
//       await connection.rollback();
//       return res.status(400).json({ message: 'Insufficient stock to fulfill request' });
//     }

//     // Use item_type from request table, fallback to item table
//     const itemTypeToInsert = request.item_type || item.item_type || 'Unknown';

//     // Insert into give_items
//     await insertGivenItem({
//       staff_id: request.staff_id,
//       staff_name: request.staff_name || 'Unknown',
//       item_type: itemTypeToInsert,
//       item_serial: request.item_serial,
//       quantity: request.quantity,
//       given_at: new Date(),
//       barcode: item.barcode || null
//     });

//     // Update items quantity
//     const newQty = item.quantity - request.quantity;
//     if (newQty > 0) {
//       await connection.query('UPDATE items SET quantity = ? WHERE serial_no = ?', [newQty, request.item_serial]);
//     } else {
//       await connection.query('DELETE FROM items WHERE serial_no = ?', [request.item_serial]);
//     }

//     // Approve request by clerk
//     await approveByClerk(request_id);

//     await connection.commit();

//     // 🔴 Emit Socket.IO event for real-time notification (sidebar)
//     io.emit('assign_request_processed');

//     res.json({
//       message: 'Item given to staff and request completed.',
//       barcode: item.barcode || null,
//       itemDetails: {
//         staff_id: request.staff_id,
//         staff_name: request.staff_name || 'Unknown',
//         item_type: itemTypeToInsert,
//         item_serial: request.item_serial,
//         quantity: request.quantity,
//         given_at: new Date()
//       },
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error in giveItemToStaff:', error);
//     res.status(500).json({ message: 'Failed to give item', error: error.message });
//   } finally {
//     connection.release();
//   }
// };

// // Get given item by barcode
// exports.getItemByBarcode = async (req, res) => {
//   try {
//     const { barcode } = req.params;
//     if (!barcode) return res.status(400).json({ message: 'Barcode is required' });

//     const item = await getItemByBarcodeFromGivenItems(barcode);

//     if (!item) {
//       return res.status(404).json({
//         message: 'Given item not found',
//         suggestion: 'Check if barcode is correctly registered in give_items table',
//       });
//     }

//     res.json({ success: true, data: item });
//   } catch (err) {
//     console.error('Error in getItemByBarcode:', err);
//     res.status(500).json({ message: 'Error fetching given item details', error: err.message });
//   }
// };
const {
  getRequestById,
  insertGivenItem,
  updateClerkReview,
  getOnePendingClerkRequest,
  approveByClerk,
  getItemByBarcodeFromGivenItems,
} = require('../models/clerkModel');
const db = require('../config/db');

// 🔴 Update clerk review (with real-time notification)
exports.updateClerkReview = async (req, res) => {
  const io = req.app.get('io'); // Socket.IO instance
  try {
    const id = req.params.id;
    const { status, clerk_comment } = req.body;

    const request = await getRequestById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    await updateClerkReview(id, status, clerk_comment);

    // Emit notification to clerks if approved
    if (status === 'approved') {
      io.emit('notify_clerk', {
        requestId: request.id,
        staff_id: request.staff_id,
        staff_name: request.staff_name,
        item_serial: request.item_serial,
        item_type: request.item_type,
        quantity: request.quantity,
        request_date: request.request_date || request.created_at
      });

      // 🔴 Emit assign_request_processed so sidebar badge increments
      io.emit('assign_request_processed');
    }

    res.json({ message: 'Request updated successfully' });
  } catch (err) {
    console.error('Error in updateClerkReview:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// 🔴 Get one pending clerk request (for sidebar count)
exports.getOnePendingClerkRequest = async (req, res) => {
  try {
    const request = await getOnePendingClerkRequest();
    if (!request) return res.status(404).json({ message: 'No pending requests' });

    res.json(request);
  } catch (err) {
    console.error('Error in getOnePendingClerkRequest:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// 🔴 Give item to staff (with real-time sidebar update)
exports.giveItemToStaff = async (req, res) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  const io = req.app.get('io'); // Socket.IO instance

  try {
    const { request_id } = req.body;
    if (!request_id) {
      await connection.rollback();
      return res.status(400).json({ message: 'Request ID is required' });
    }

    const [requests] = await connection.query('SELECT * FROM item_requests WHERE id = ?', [request_id]);
    if (requests.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Request not found' });
    }
    const request = requests[0];

    const [items] = await connection.query('SELECT * FROM items WHERE serial_no = ?', [request.item_serial]);
    if (items.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Item not found' });
    }
    const item = items[0];

    if (item.quantity < request.quantity) {
      await connection.rollback();
      return res.status(400).json({ message: 'Insufficient stock to fulfill request' });
    }

    const itemTypeToInsert = request.item_type || item.item_type || 'Unknown';

    await insertGivenItem({
      staff_id: request.staff_id,
      staff_name: request.staff_name || 'Unknown',
      item_type: itemTypeToInsert,
      item_serial: request.item_serial,
      quantity: request.quantity,
      given_at: new Date(),
      barcode: item.barcode || null
    });

    const newQty = item.quantity - request.quantity;
    if (newQty > 0) {
      await connection.query('UPDATE items SET quantity = ? WHERE serial_no = ?', [newQty, request.item_serial]);
    } else {
      await connection.query('DELETE FROM items WHERE serial_no = ?', [request.item_serial]);
    }

    await approveByClerk(request_id);
    await connection.commit();

    // 🔴 Emit Socket.IO event to update sidebar badge
    io.emit('assign_request_processed');

    res.json({
      message: 'Item given to staff and request completed.',
      barcode: item.barcode || null,
      itemDetails: {
        staff_id: request.staff_id,
        staff_name: request.staff_name || 'Unknown',
        item_type: itemTypeToInsert,
        item_serial: request.item_serial,
        quantity: request.quantity,
        given_at: new Date()
      },
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error in giveItemToStaff:', error);
    res.status(500).json({ message: 'Failed to give item', error: error.message });
  } finally {
    connection.release();
  }
};

// Get given item by barcode
exports.getItemByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;
    if (!barcode) return res.status(400).json({ message: 'Barcode is required' });

    const item = await getItemByBarcodeFromGivenItems(barcode);

    if (!item) {
      return res.status(404).json({
        message: 'Given item not found',
        suggestion: 'Check if barcode is correctly registered in give_items table',
      });
    }

    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error in getItemByBarcode:', err);
    res.status(500).json({ message: 'Error fetching given item details', error: err.message });
  }
};
