import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // your backend URL

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const sender = "S001";   // Admin staff_id
  const receiver = "S002"; // Manager staff_id

  // Fetch initial chat messages
  useEffect(() => {
    axios
      .get(`http://localhost:5000/chat/messages/${sender}/${receiver}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, [sender, receiver]);

  // Listen for real-time messages
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      if (
        (msg.sender_staff_id === sender && msg.receiver_staff_id === receiver) ||
        (msg.sender_staff_id === receiver && msg.receiver_staff_id === sender)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("newMessage");
  }, [sender, receiver]);

  // Send a message
  const sendMessage = () => {
    if (!text) return;

    axios
      .post("http://localhost:5000/chat/send", {
        sender_id: sender,
        receiver_id: receiver,
        message_text: text,
      })
      .then((res) => {
        // Emit message for real-time update
        socket.emit("sendMessage", {
          message_id: res.data.message_id,
          sender_staff_id: sender,
          receiver_staff_id: receiver,
          message_text: text,
          sent_at: new Date(),
          is_read: false,
        });
        setText("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>Admin Chat with Manager</h2>

      {/* Chat messages */}
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((m) => (
          <div key={m.message_id} style={{ marginBottom: "5px" }}>
            <b>{m.sender}:</b> {m.message_text}
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          style={{ width: "80%", padding: "5px" }}
        />
        <button onClick={sendMessage} style={{ width: "18%", marginLeft: "2%" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
