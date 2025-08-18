// // const db = require('../config/db');

// // const GivenItem = {
// //   create: async (data) => {
// //     const query = `INSERT INTO given_items (staff_id, staff_name, item_type, item_serial, quantity, given_date, clerk_id, status)
// //                    VALUES (?, ?, ?, ?, ?, NOW(), ?, 'awaiting_staff_signature')`;
// //     const values = [
// //       data.staff_id,
// //       data.staff_name,
// //       data.item_type,
// //       data.item_serial,
// //       data.quantity,
// //       data.clerk_id
// //     ];
// //     return db.query(query, values);
// //   }
// // };

// // module.exports = GivenItem;

// const db = require('../config/db');

// // const GivenItem = {
// //   create: async ({ staff_id, staff_name, item_type, item_serial, quantity,  }) => {
// //     const q = `
// //       INSERT INTO given_items 
// //       (staff_id, staff_name, item_type, item_serial, quantity, clerk_id, given_date) 
// //       VALUES (?, ?, ?, ?, ?, ?, NOW())
// //     `;
// //     const values = [staff_id, staff_name, item_type, item_serial, quantity, ];
// //     return db.query(q, values);
// //   }
// // };

// // module.exports = GivenItem;
// // const GivenItem = {
// //   create: async ({ staff_id, staff_name, item_type, item_serial, quantity }) => {
// //     const q = `
// //       INSERT INTO given_items 
// //       (staff_id, staff_name, item_type, item_serial, quantity, given_at) 
// //       VALUES (?, ?, ?, ?, ?, NOW())
// //     `;
// //     const values = [staff_id, staff_name, item_type, item_serial, quantity];
// //     return db.query(q, values);
// //   }
// // };
// const GivenItem = {
//   create: async ({ staff_id, staff_name, item_type, item_serial, quantity }) => {
//     const q = `
//       INSERT INTO given_items 
//       (staff_id, staff_name, item_type, item_serial, quantity, given_at) 
//       VALUES (?, ?, ?, ?, ?, NOW())
//     `;
//     const values = [staff_id, staff_name, item_type, item_serial, quantity];
//     return db.query(q, values);
//   }
// };

// module.exports = GivenItem;



// module.exports = GivenItem;
