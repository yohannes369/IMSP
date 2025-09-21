// const express = require("express");
// const router = express.Router();
// const chatController = require("../controllers/chatMessageController");

// // Send a message
// router.post("/", chatController.sendMessage);

// // Get conversation between two users
// router.get("/conversation/:sender_id/:receiver_id", chatController.getConversation);

// // Get all messages for a user
// router.get("/user/:staff_id", chatController.getUserMessages);

// // Mark message as read
// router.put("/read/:message_id", chatController.markAsRead);

// // Delete a message
// router.delete("/:message_id", chatController.deleteMessage);

// module.exports = router;

const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatMessageController");
// Send message
router.post("/", chatController.sendMessage);

// Get conversation between two users
router.get("/conversation/:me/:other", chatController.getConversation);

// Get group chat messages
router.get("/group/:groupId", chatController.getGroupMessages);

// Mark messages as read
router.put("/read", chatController.markAsRead);

module.exports = router;
