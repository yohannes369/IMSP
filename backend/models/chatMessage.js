
// const pool = require("../config/db");

// const ChatMessage = {
//   // Save a new message, automatically detecting roles
//   create: async (data) => {
//     const { sender_staff_id, receiver_staff_id, content, chat_type } = data;

//     // Fetch roles from the users table
//     const [senderRows] = await pool.query(
//       `SELECT role FROM users WHERE staff_id = ?`,
//       [sender_staff_id]
//     );
//     if (senderRows.length === 0) throw new Error("Sender not found");

//     const [receiverRows] = await pool.query(
//       `SELECT role FROM users WHERE staff_id = ?`,
//       [receiver_staff_id]
//     );
//     if (receiverRows.length === 0) throw new Error("Receiver not found");

//     const sender_role = senderRows[0].role;
//     const receiver_role = receiverRows[0].role;

//     const [result] = await pool.query(
//       `INSERT INTO chat_messages 
//        (sender_staff_id, sender_role, receiver_staff_id, receiver_role, content, chat_type) 
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [sender_staff_id, sender_role, receiver_staff_id, receiver_role, content, chat_type]
//     );

//     return result.insertId;
//   },

//   // Get conversation between two users
//   getConversation: async (me, other) => {
//     const [rows] = await pool.query(
//       `SELECT * FROM chat_messages
//        WHERE (sender_staff_id = ? AND receiver_staff_id = ?)
//           OR (sender_staff_id = ? AND receiver_staff_id = ?)
//        ORDER BY created_at ASC`,
//       [me, other, other, me]
//     );
//     return rows;
//   },

//   // Get messages in a group
//   getGroupMessages: async (groupId) => {
//     const [rows] = await pool.query(
//       `SELECT * FROM chat_messages 
//        WHERE chat_type = 'group' AND receiver_staff_id = ?
//        ORDER BY created_at ASC`,
//       [groupId]
//     );
//     return rows;
//   },

//   // Mark messages as read
//   markAsRead: async (receiver_staff_id, sender_staff_id) => {
//     const [result] = await pool.query(
//       `UPDATE chat_messages 
//        SET read_status = 1 
//        WHERE receiver_staff_id = ? AND sender_staff_id = ?`,
//       [receiver_staff_id, sender_staff_id]
//     );
//     return result.affectedRows;
//   },
// };

// module.exports = ChatMessage;
const pool = require("../config/db");

const ChatMessage = {
  /**
   * Save a new message, automatically detecting sender and receiver roles.
   * @param {Object} data - { sender_staff_id, receiver_staff_id, content, chat_type }
   * @returns {number} insertId of the new message
   */
  create: async (data) => {
    const { sender_staff_id, receiver_staff_id, content, chat_type } = data;

    if (!sender_staff_id || !receiver_staff_id || !content) {
      throw new Error("sender_staff_id, receiver_staff_id, and content are required");
    }

    try {
      // Fetch sender role
      const [senderRows] = await pool.query(
        `SELECT role FROM users WHERE staff_id = ?`,
        [sender_staff_id]
      );
      if (!senderRows || senderRows.length === 0) {
        throw new Error(`Sender with staff_id "${sender_staff_id}" not found`);
      }

      // Fetch receiver role
      const [receiverRows] = await pool.query(
        `SELECT role FROM users WHERE staff_id = ?`,
        [receiver_staff_id]
      );
      if (!receiverRows || receiverRows.length === 0) {
        throw new Error(`Receiver with staff_id "${receiver_staff_id}" not found`);
      }

      const sender_role = senderRows[0].role;
      const receiver_role = receiverRows[0].role;

      // Insert message
      const [result] = await pool.query(
        `INSERT INTO chat_messages
         (sender_staff_id, sender_role, receiver_staff_id, receiver_role, content, chat_type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [sender_staff_id, sender_role, receiver_staff_id, receiver_role, content, chat_type || "private"]
      );

      return result.insertId;
    } catch (err) {
      console.error("Error creating chat message:", err.message);
      throw err;
    }
  },

  /**
   * Get conversation between two users
   * @param {string|number} me - staff_id of one user
   * @param {string|number} other - staff_id of the other user
   */
  getConversation: async (me, other) => {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM chat_messages
         WHERE (sender_staff_id = ? AND receiver_staff_id = ?)
            OR (sender_staff_id = ? AND receiver_staff_id = ?)
         ORDER BY created_at ASC`,
        [me, other, other, me]
      );
      return rows;
    } catch (err) {
      console.error("Error fetching conversation:", err.message);
      throw err;
    }
  },

  /**
   * Get messages in a group
   * @param {string|number} groupId
   */
  getGroupMessages: async (groupId) => {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM chat_messages
         WHERE chat_type = 'group' AND receiver_staff_id = ?
         ORDER BY created_at ASC`,
        [groupId]
      );
      return rows;
    } catch (err) {
      console.error("Error fetching group messages:", err.message);
      throw err;
    }
  },

  /**
   * Mark messages as read
   * @param {string|number} receiver_staff_id
   * @param {string|number} sender_staff_id
   */
  markAsRead: async (receiver_staff_id, sender_staff_id) => {
    try {
      const [result] = await pool.query(
        `UPDATE chat_messages
         SET read_status = 1
         WHERE receiver_staff_id = ? AND sender_staff_id = ?`,
        [receiver_staff_id, sender_staff_id]
      );
      return result.affectedRows;
    } catch (err) {
      console.error("Error marking messages as read:", err.message);
      throw err;
    }
  },
};

module.exports = ChatMessage;
