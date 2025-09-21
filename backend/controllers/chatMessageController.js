const ChatMessage = require("../models/chatMessage");

const chatController = {
  // Send a message
  sendMessage: async (req, res) => {
    try {
      const { sender_staff_id, receiver_staff_id, content, chat_type } = req.body;

      // Validate required fields
      if (!sender_staff_id || !receiver_staff_id || !content) {
        return res
          .status(400)
          .json({ success: false, error: "sender_staff_id, receiver_staff_id, and content are required" });
      }

      // Create message (roles will be auto-detected in ChatMessage.create)
      const messageId = await ChatMessage.create({
        sender_staff_id,
        receiver_staff_id,
        content,
        chat_type,
      });

      res.status(201).json({ success: true, messageId });
    } catch (err) {
      console.error("Error creating chat message:", err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Get conversation between two users
  getConversation: async (req, res) => {
    try {
      const { me, other } = req.params;
      const messages = await ChatMessage.getConversation(me, other);
      res.json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  },

  // Get group messages
  getGroupMessages: async (req, res) => {
    try {
      const { groupId } = req.params;
      const messages = await ChatMessage.getGroupMessages(groupId);
      res.json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch group messages" });
    }
  },

  // Mark messages as read
  markAsRead: async (req, res) => {
    try {
      const { receiver_staff_id, sender_staff_id } = req.body;
      await ChatMessage.markAsRead(receiver_staff_id, sender_staff_id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to mark messages as read" });
    }
  },
};

module.exports = chatController;
