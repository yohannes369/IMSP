// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// export default function ChatBox({ me, other, role }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch conversation
//   const fetchConversation = async () => {
//     try {
//       const res = await api.get(`/conversation/${me}/${other}`);
//       setMessages(res.data);
//     } catch (err) {
//       console.error("Error fetching conversation:", err);
//     }
//   };

//   useEffect(() => {
//     fetchConversation();
//   }, [me, other]);

//   // Send message
//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     try {
//       await api.post("/", {
//         sender_id: me,
//         receiver_id: other,
//         message: input,
//       });
//       setInput("");
//       fetchConversation();
//     } catch (err) {
//       console.error("Error sending message:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mark as read
//   const markAsRead = async (id) => {
//     try {
//       await api.put(`/read/${id}`);
//       fetchConversation();
//     } catch (err) {
//       console.error("Error marking as read:", err);
//     }
//   };

//   // Delete
//   const deleteMessage = async (id) => {
//     try {
//       await api.delete(`/${id}`);
//       fetchConversation();
//     } catch (err) {
//       console.error("Error deleting message:", err);
//     }
//   };

//   return (
//     <div className="p-4 border rounded-md w-[400px]">
//       <h2 className="font-bold mb-2">{role} Chat (User {me})</h2>
//       <div className="h-64 overflow-y-auto border p-2 mb-2 bg-gray-50 rounded">
//         {messages.length === 0 ? (
//           <p className="text-gray-500 text-sm">No messages yet.</p>
//         ) : (
//           messages.map((msg) => (
//             <div
//               key={msg.message_id}
//               className={`p-2 mb-1 rounded ${
//                 msg.sender_id === me
//                   ? "bg-blue-200 text-right"
//                   : "bg-gray-200 text-left"
//               }`}
//             >
//               <p>{msg.message}</p>
//               <div className="flex justify-between text-xs text-gray-600">
//                 <span>{msg.is_read ? "✅ Read" : "⌛ Unread"}</span>
//                 <div className="flex gap-2">
//                   {msg.sender_id === me && (
//                     <button
//                       onClick={() => deleteMessage(msg.message_id)}
//                       className="text-red-500"
//                     >
//                       Delete
//                     </button>
//                   )}
//                   {!msg.is_read && msg.receiver_id === me && (
//                     <button
//                       onClick={() => markAsRead(msg.message_id)}
//                       className="text-green-600"
//                     >
//                       Mark Read
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 border rounded px-2 py-1"
//         />
//         <button
//           onClick={sendMessage}
//           disabled={loading}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           {loading ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ChatBox({ me, other }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch conversation
  const fetchConversation = async () => {
    if (!me?.staff_id || !other?.staff_id) return;
    try {
      const res = await api.get(
        `/conversation/${me.staff_id}/${other.staff_id}`
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching conversation:", err);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, [me, other]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      await api.post("/", {
        sender_staff_id: me.staff_id,
        sender_role: me.role,
        receiver_staff_id: other.staff_id,
        receiver_role: other.role,
        content: input,
        chat_type: "direct",
      });
      setInput("");
      fetchConversation();
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mark message as read
  const markAsRead = async (id) => {
    try {
      await api.put(`/read/${id}`);
      fetchConversation();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  // Delete message
  const deleteMessage = async (id) => {
    try {
      await api.delete(`/${id}`);
      fetchConversation();
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  return (
    <div className="p-4 border rounded-md w-[400px]">
      <h2 className="font-bold mb-2">
        Chat with {other?.name ?? other?.staff_id} ({other?.role})
      </h2>

      <div className="h-64 overflow-y-auto border p-2 mb-2 bg-gray-50 rounded">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.message_id}
              className={`p-2 mb-1 rounded ${
                msg.sender_staff_id === me.staff_id
                  ? "bg-blue-200 text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              <p>{msg.content}</p>
              <div className="flex justify-between text-xs text-gray-600">
                <span>{msg.read_status ? "✅ Read" : "⌛ Unread"}</span>
                <div className="flex gap-2">
                  {msg.sender_staff_id === me.staff_id && (
                    <button
                      onClick={() => deleteMessage(msg.message_id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  )}
                  {!msg.read_status && msg.receiver_staff_id === me.staff_id && (
                    <button
                      onClick={() => markAsRead(msg.message_id)}
                      className="text-green-600"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
