// // src/pages/manager/ContactMessages.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Mail, User, Calendar, Search, X } from "lucide-react";

// export function ContactMessages() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     let mounted = true;
//     const fetchMessages = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         // ✅ Use localhost:5000 API endpoint
//         const res = await axios.get("http://localhost:5000/api/contact");
//         const payload = res.data;

//         // Accept different backend shapes
//         let msgs = [];
//         if (Array.isArray(payload)) msgs = payload;
//         else if (Array.isArray(payload.messages)) msgs = payload.messages;
//         else if (Array.isArray(payload.data)) msgs = payload.data;
//         else msgs = [];

//         if (mounted) setMessages(msgs);
//       } catch (err) {
//         console.error("Error fetching contact messages:", err);
//         if (mounted) setError("Failed to load messages.");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchMessages();
//     return () => (mounted = false);
//   }, []);

//   const clearSearch = () => setQuery("");

//   const filtered = messages.filter((m) => {
//     if (!query) return true;
//     const q = query.toLowerCase();

//     // Always try full_name first, then combine first + last name
//     const name =
//       (m.full_name ||
//         `${m.firstName || m.first_name || ""} ${m.lastName || m.last_name || ""}` ||
//         ""
//       ).toLowerCase();

//     const email = (m.email || "").toLowerCase();
//     const body = (m.message || m.body || m.text || "").toLowerCase();
//     return name.includes(q) || email.includes(q) || body.includes(q);
//   });

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <header className="flex items-center justify-between mb-6">
//         <h1 className="flex items-center gap-3 text-2xl font-semibold text-gray-800">
//           <Mail className="h-6 w-6 text-blue-600" />
//           Contact Messages
//         </h1>

//         <div className="flex items-center gap-2">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search by name, email or message..."
//               className="pl-10 pr-10 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {query && (
//               <button
//                 onClick={clearSearch}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 aria-label="Clear search"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//         </div>
//       </header>

//       {loading ? (
//         <div className="text-center py-12 text-gray-500">Loading messages…</div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-700 p-4 rounded">{error}</div>
//       ) : filtered.length === 0 ? (
//         <div className="bg-yellow-50 text-yellow-700 p-4 rounded">
//           No messages found.
//         </div>
//       ) : (
//         <ul className="space-y-4">
//           {filtered.map((msg, idx) => {
//             const key = msg.id || msg._id || `${msg.email || "msg"}-${idx}`;
//             const displayName =
//               msg.full_name ||
//               `${msg.firstName || msg.first_name || ""} ${msg.lastName || msg.last_name || ""}`.trim() ||
//               "Unknown";
//             const email = msg.email || "-";
//             const body = msg.message || msg.body || msg.text || "-";
//             const dateValue = msg.created_at || msg.createdAt || msg.date || msg.timestamp;
//             const niceDate = dateValue ? new Date(dateValue).toLocaleString() : "-";

//             return (
//               <li
//                 key={key}
//                 className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0">
//                     <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
//                       <User className="h-5 w-5 text-gray-500" />
//                     </div>
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="font-medium text-gray-800">{displayName}</p>
//                         <p className="text-xs text-gray-500">{email}</p>
//                       </div>
//                       <div className="text-xs text-gray-400 flex items-center gap-2">
//                         <Calendar className="h-4 w-4" />
//                         <span>{niceDate}</span>
//                       </div>
//                     </div>

//                     <p className="mt-3 text-gray-700 whitespace-pre-wrap">{body}</p>
//                   </div>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ContactMessages;
// src/pages/manager/ContactMessages.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Mail, 
  User, 
  Calendar, 
  Search, 
  X, 
  Phone, 
  MessageSquare, 
  Star,
  Filter,
  ChevronDown,
  ChevronUp,
  Reply,
  Archive,
  Trash2,
  Eye
} from "lucide-react";

export function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState(new Set());

  useEffect(() => {
    let mounted = true;
    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        // ✅ Use localhost:5000 API endpoint
        const res = await axios.get("http://localhost:5000/api/contact");
        const payload = res.data;

        // Accept different backend shapes
        let msgs = [];
        if (Array.isArray(payload)) msgs = payload;
        else if (Array.isArray(payload.messages)) msgs = payload.messages;
        else if (Array.isArray(payload.data)) msgs = payload.data;
        else msgs = [];

        // Add status if not present
        msgs = msgs.map(msg => ({
          status: "new",
          priority: "normal",
          ...msg
        }));

        if (mounted) setMessages(msgs);
      } catch (err) {
        console.error("Error fetching contact messages:", err);
        if (mounted) setError("Failed to load messages.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMessages();
    return () => (mounted = false);
  }, []);

  const clearSearch = () => setQuery("");
  
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };
  
  const toggleExpandMessage = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };
  
  const toggleSelectMessage = (id) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMessages(newSelected);
  };
  
  const selectAllMessages = () => {
    if (selectedMessages.size === filtered.length) {
      setSelectedMessages(new Set());
    } else {
      setSelectedMessages(new Set(filtered.map(msg => msg.id || msg._id)));
    }
  };
  
  const handleReply = (email) => {
    // Open default email client with pre-filled recipient
    window.location.href = `mailto:${email}`;
  };
  
  const handleCall = (phone) => {
    // Open phone dialer if available
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };
  
  const updateMessageStatus = (id, status) => {
    setMessages(messages.map(msg => 
      (msg.id === id || msg._id === id) ? { ...msg, status } : msg
    ));
  };
  
  const filtered = messages
    .filter((m) => {
      if (!query && statusFilter === "all") return true;
      
      const q = query.toLowerCase();
      const name = (
        m.full_name ||
        `${m.firstName || m.first_name || ""} ${m.lastName || m.last_name || ""}` ||
        ""
      ).toLowerCase();

      const email = (m.email || "").toLowerCase();
      const body = (m.message || m.body || m.text || "").toLowerCase();
      const phone = (m.phone || m.telephone || "").toLowerCase();
      
      const matchesSearch = 
        name.includes(q) || 
        email.includes(q) || 
        body.includes(q) || 
        phone.includes(q);
      
      const matchesStatus = statusFilter === "all" || m.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at || a.createdAt || a.date || a.timestamp);
      const dateB = new Date(b.created_at || b.createdAt || b.date || b.timestamp);
      
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const statusCounts = {
    all: messages.length,
    new: messages.filter(m => m.status === "new").length,
    inprogress: messages.filter(m => m.status === "inprogress").length,
    resolved: messages.filter(m => m.status === "resolved").length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="flex items-center gap-3 text-2xl font-semibold text-gray-800">
          <Mail className="h-6 w-6 text-blue-600" />
          Contact Messages
          {filtered.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {filtered.length}
            </span>
          )}
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, phone or message..."
              className="pl-10 pr-10 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <button 
            onClick={toggleSortOrder}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm whitespace-nowrap"
          >
            {sortOrder === "newest" ? (
              <>
                <ChevronDown className="h-4 w-4" /> Newest first
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4" /> Oldest first
              </>
            )}
          </button>
        </div>
      </header>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "all", label: "All", color: "gray" },
          { id: "new", label: "New", color: "blue" },
          { id: "inprogress", label: "In Progress", color: "yellow" },
          { id: "resolved", label: "Resolved", color: "green" },
        ].map((status) => (
          <button
            key={status.id}
            onClick={() => handleStatusFilter(status.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${statusFilter === status.id
              ? `bg-${status.color}-100 text-${status.color}-800 border border-${status.color}-300`
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>{status.label}</span>
            <span className={`bg-${status.color}-200 text-${status.color}-800 px-1.5 py-0.5 rounded-full text-xs`}>
              {statusCounts[status.id]}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
          <p>Loading messages…</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg border border-yellow-200 text-center">
          <p>No messages found.</p>
          <p className="text-sm mt-1">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <>
          {/* Bulk Actions */}
          {selectedMessages.size > 0 && (
            <div className="bg-blue-50 p-3 rounded-lg mb-4 flex items-center justify-between">
              <p className="text-blue-800">
                {selectedMessages.size} message{selectedMessages.size !== 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200">
                  <Archive className="h-4 w-4" /> Archive
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          )}
          
          <ul className="space-y-4">
            {filtered.map((msg, idx) => {
              const key = msg.id || msg._id || `${msg.email || "msg"}-${idx}`;
              const displayName =
                msg.full_name ||
                `${msg.firstName || msg.first_name || ""} ${msg.lastName || m.last_name || ""}`.trim() ||
                "Unknown";
              const email = msg.email || "-";
              const phone = msg.phone || msg.telephone || "";
              const body = msg.message || msg.body || msg.text || "-";
              const dateValue = msg.created_at || msg.createdAt || msg.date || msg.timestamp;
              const niceDate = dateValue ? new Date(dateValue).toLocaleString() : "-";
              const isExpanded = expandedMessage === key;
              const isSelected = selectedMessages.has(key);

              return (
                <li
                  key={key}
                  className={`bg-white p-4 rounded-lg border shadow-sm transition-all duration-200 ${
                    isSelected ? "ring-2 ring-blue-500 border-blue-300" : "border-gray-200"
                  } ${
                    msg.status === "new" ? "border-l-4 border-l-blue-500" : 
                    msg.status === "inprogress" ? "border-l-4 border-l-yellow-500" :
                    msg.status === "resolved" ? "border-l-4 border-l-green-500" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectMessage(key)}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate">{displayName}</p>
                          <div className="flex items-center gap-2 flex-wrap mt-1">
                            <a 
                              href={`mailto:${email}`}
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReply(email);
                              }}
                            >
                              <Mail className="h-3 w-3" /> {email}
                            </a>
                            {phone && (
                              <a 
                                href={`tel:${phone}`}
                                className="text-xs text-green-600 hover:text-green-800 hover:underline flex items-center gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCall(phone);
                                }}
                              >
                                <Phone className="h-3 w-3" /> {phone}
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2 self-start sm:self-auto">
                          <Calendar className="h-4 w-4" />
                          <span>{niceDate}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-gray-700 whitespace-pre-wrap line-clamp-3">
                          {body}
                        </p>
                        
                        {body.length > 200 && (
                          <button
                            onClick={() => toggleExpandMessage(key)}
                            className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-4 w-4" /> Show less
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4" /> Read full message
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-gray-700 whitespace-pre-wrap">{body}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 flex-wrap">
                        <button
                          onClick={() => handleReply(email)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100"
                        >
                          <Reply className="h-4 w-4" /> Reply
                        </button>
                        
                        <div className="flex items-center gap-2 ml-auto">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            msg.status === "new" ? "bg-blue-100 text-blue-800" :
                            msg.status === "inprogress" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                          </span>
                          
                          <select
                            value={msg.status}
                            onChange={(e) => updateMessageStatus(key, e.target.value)}
                            className="text-xs border rounded py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="new">New</option>
                            <option value="inprogress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          
                          {msg.priority === "high" && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default ContactMessages;