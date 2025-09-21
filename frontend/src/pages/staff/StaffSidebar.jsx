
// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { FiHome, FiClipboard, FiClock, FiBox, FiSettings, FiMenu, FiX, FiLogOut } from "react-icons/fi";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const StaffSidebar = ({ staffId }) => {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [requestNotifications, setRequestNotifications] = useState(0);
//   const [activeHover, setActiveHover] = useState(null);

//   useEffect(() => {
//     const handleRequestUpdate = (data) => {
//       if (data.staff_id === staffId && (data.status === "APPROVED" || data.status === "REJECTED")) {
//         setRequestNotifications((prev) => prev + 1);
//       }
//     };
//     socket.on("update_request", handleRequestUpdate);
//     return () => socket.off("update_request", handleRequestUpdate);
//   }, [staffId]);

//   useEffect(() => {
//     if (location.pathname === "/staf/staff-request-status") {
//       setRequestNotifications(0);
//     }
//   }, [location.pathname]);

//   const toggleSidebar = () => setMobileOpen((prev) => !prev);
//   const closeMobile = () => setMobileOpen(false);

//   const menuItems = [
//     { path: "/staff", name: "Dashboard", icon: <FiHome /> },
//     { path: "/staff/staff-request-form", name: "Request Form", icon: <FiClipboard /> },
//     { path: "/staff/staff-request-status", name: "Request Status", icon: <FiClock />, hasNotification: true },
//     { path: "/staff/returnrequest", name: "return request", icon: <FiBox /> },
//     { path: "/staff/issueditemsget", name: "issueditemsget", icon: <FiSettings /> },
//      { path: "/staff/returnrequesttracker", name: "returnrequesttracker", icon: <FiSettings /> },
   
//   ];

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-[#2E5E4E] text-white p-2 rounded-lg shadow-md"
//         onClick={toggleSidebar}
//       >
//         {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//       </button>

//       {/* Mobile overlay */}
//       {mobileOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobile} />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-[#2E5E4E] to-[#1C3B30] text-white z-50 transition-all duration-300
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
//           md:relative md:translate-x-0 md:z-auto
//           ${collapsed ? "w-20" : "w-64"} flex flex-col shadow-xl`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between h-16 px-4 border-b border-[#3A6B5A]">
//           {!collapsed && (
//             <div className="flex items-center">
//               <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-2">
//                 <span className="text-[#2E5E4E] font-bold text-sm">S</span>
//               </div>
//               <span className="font-bold text-lg">Staff Portal</span>
//             </div>
//           )}
//           <button
//             className="hidden md:block text-white p-1 rounded hover:bg-[#3A6B5A] transition-colors"
//             onClick={() => setCollapsed((prev) => !prev)}
//           >
//             {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
//           </button>
//         </div>

//         {/* Menu */}
//         <ul className="flex-1 py-4 px-2">
//           {menuItems.map((item) => (
//             <li key={item.path} className="mb-1">
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center px-3 py-3 rounded-lg transition-all duration-200 relative group
//                   ${isActive ? "bg-white text-[#2E5E4E] font-semibold shadow-md" : "hover:bg-[#3A6B5A] hover:text-white"}`
//                 }
//                 onClick={closeMobile}
//                 onMouseEnter={() => setActiveHover(item.path)}
//                 onMouseLeave={() => setActiveHover(null)}
//               >
//                 {/* Icon */}
//                 <div className="text-lg transition-transform duration-200 group-hover:scale-110">
//                   {item.icon}
//                 </div>

//                 {!collapsed && <span className="ml-3 transition-opacity duration-200">{item.name}</span>}

//                 {/* Tooltip for collapsed */}
//                 {collapsed && (
//                   <div
//                     className={`absolute left-full ml-3 px-2 py-1 bg-[#2E5E4E] text-white text-sm rounded shadow-lg z-10
//                     transition-opacity duration-200 ${activeHover === item.path ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//                   >
//                     {item.name}
//                   </div>
//                 )}

//                 {/* Notification badge */}
//                 {item.hasNotification && requestNotifications > 0 && (
//                   <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#E74C3C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                     {requestNotifications > 9 ? "9+" : requestNotifications}
//                   </span>
//                 )}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* Staff ID & Logout */}
//         <div className="mb-4 px-4 border-t border-[#3A6B5A] pt-4">
//           {!collapsed && staffId && (
//             <div className="mb-3 px-3 py-2 bg-[#3A6B5A] rounded-lg text-sm">
//               <div className="text-[#A3F7BF] text-xs">Staff ID</div>
//               <div className="truncate">{staffId}</div>
//             </div>
//           )}

//           <NavLink
//             to="/logout"
//             className={({ isActive }) =>
//               `flex items-center px-3 py-3 rounded-lg transition-colors duration-200 group
//               ${isActive ? "bg-white text-[#2E5E4E] font-semibold" : "hover:bg-[#3A6B5A] hover:text-white"}`
//             }
//             onClick={closeMobile}
//           >
//             <FiLogOut className="text-lg" />
//             {!collapsed && <span className="ml-3">Logout</span>}

//             {collapsed && (
//               <div
//                 className={`absolute left-full ml-3 px-2 py-1 bg-[#2E5E4E] text-white text-sm rounded shadow-lg z-10
//                 transition-opacity duration-200 ${activeHover === "/logout" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//               >
//                 Logout
//               </div>
//             )}
//           </NavLink>
//         </div>
//       </aside>

//       {/* Main content padding */}
//       <style>{`
//         @media (min-width: 768px) {
//           main {
//             margin-left: ${collapsed ? "5rem" : "16rem"};
//             transition: margin-left 0.3s ease;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default StaffSidebar;


// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { FiHome, FiClipboard, FiClock, FiBox, FiSettings, FiMenu, FiX, FiLogOut, FiBell } from "react-icons/fi";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const StaffSidebar = ({ staffId }) => {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [requestNotifications, setRequestNotifications] = useState(0);
//   const [trackerNotifications, setTrackerNotifications] = useState(0);
//   const [activeHover, setActiveHover] = useState(null);
//   const [approvedRequests, setApprovedRequests] = useState([]);

//   useEffect(() => {
//     const handleRequestUpdate = (data) => {
//       if (data.staff_id === staffId) {
//         if (data.status === "APPROVED" || data.status === "REJECTED") {
//           setRequestNotifications((prev) => prev + 1);
          
//           if (data.status === "APPROVED") {
//             setApprovedRequests((prev) => [...prev, data.request_id]);
//             setTrackerNotifications((prev) => prev + 1);
//           }
//         }
//       }
//     };
    
//     socket.on("update_request", handleRequestUpdate);
//     return () => socket.off("update_request", handleRequestUpdate);
//   }, [staffId]);

//   useEffect(() => {
//     if (location.pathname === "/staff/staff-request-status") {
//       setRequestNotifications(0);
//     }
    
//     if (location.pathname === "/staff/returnrequesttracker") {
//       setTrackerNotifications(0);
//     }
//   }, [location.pathname]);

//   const toggleSidebar = () => setMobileOpen((prev) => !prev);
//   const closeMobile = () => setMobileOpen(false);

//   const menuItems = [
//     { path: "/staff", name: "Dashboard", icon: <FiHome /> },
//     { path: "/staff/staff-request-form", name: "Request Form", icon: <FiClipboard /> },
//     { 
//       path: "/staff/staff-request-status", 
//       name: "Request Status", 
//       icon: <FiClock />, 
//       hasNotification: true,
//       notificationCount: requestNotifications
//     },
//     { path: "/staff/returnrequest", name: "Return Request", icon: <FiBox /> },
//     { path: "/staff/issueditemsget", name: "Issued Items", icon: <FiSettings /> },
//     { 
//       path: "/staff/returnrequesttracker", 
//       name: "Return Tracker", 
//       icon: <FiBell />, 
//       hasNotification: true,
//       notificationCount: trackerNotifications,
//       isTracker: true
//     },
//   ];

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-[#2E5E4E] text-white p-2 rounded-lg shadow-md"
//         onClick={toggleSidebar}
//       >
//         {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//       </button>

//       {/* Mobile overlay */}
//       {mobileOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobile} />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-[#2E5E4E] to-[#1C3B30] text-white z-50 transition-all duration-300
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
//           md:relative md:translate-x-0 md:z-auto
//           ${collapsed ? "w-20" : "w-64"} flex flex-col shadow-xl`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between h-16 px-4 border-b border-[#3A6B5A]">
//           {!collapsed && (
//             <div className="flex items-center">
//               <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-2">
//                 <span className="text-[#2E5E4E] font-bold text-sm">S</span>
//               </div>
//               <span className="font-bold text-lg">Staff Portal</span>
//             </div>
//           )}
//           <button
//             className="hidden md:block text-white p-1 rounded hover:bg-[#3A6B5A] transition-colors"
//             onClick={() => setCollapsed((prev) => !prev)}
//           >
//             {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
//           </button>
//         </div>

//         {/* Notification Summary Bar */}
//         {(requestNotifications > 0 || trackerNotifications > 0) && !collapsed && (
//           <div className="px-4 py-2 bg-[#3A6B5A] border-y border-[#4A7B6A] mx-2 my-3 rounded-lg">
//             <div className="text-xs text-[#A3F7BF] mb-1">Notifications Summary</div>
//             <div className="flex justify-between items-center text-sm">
//               {requestNotifications > 0 && (
//                 <div className="flex items-center">
//                   <span className="w-2 h-2 rounded-full bg-[#E74C3C] mr-2"></span>
//                   <span>{requestNotifications} request update(s)</span>
//                 </div>
//               )}
//               {trackerNotifications > 0 && (
//                 <div className="flex items-center">
//                   <span className="w-2 h-2 rounded-full bg-[#F39C12] mr-2"></span>
//                   <span>{trackerNotifications} approved request(s)</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Menu */}
//         <ul className="flex-1 py-4 px-2">
//           {menuItems.map((item) => (
//             <li key={item.path} className="mb-1">
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center px-3 py-3 rounded-lg transition-all duration-200 relative group
//                   ${isActive ? "bg-white text-[#2E5E4E] font-semibold shadow-md" : "hover:bg-[#3A6B5A] hover:text-white"}`
//                 }
//                 onClick={closeMobile}
//                 onMouseEnter={() => setActiveHover(item.path)}
//                 onMouseLeave={() => setActiveHover(null)}
//               >
//                 {/* Icon with special styling for tracker */}
//                 <div className={`text-lg transition-transform duration-200 group-hover:scale-110 relative
//                   ${item.isTracker && trackerNotifications > 0 ? "text-[#F39C12]" : ""}`}>
//                   {item.icon}
                  
//                   {/* Pulsing animation for tracker notifications */}
//                   {item.isTracker && trackerNotifications > 0 && (
//                     <span className="absolute -top-1 -right-1 flex h-3 w-3">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                       <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                     </span>
//                   )}
//                 </div>

//                 {!collapsed && <span className="ml-3 transition-opacity duration-200">{item.name}</span>}

//                 {/* Tooltip for collapsed */}
//                 {collapsed && (
//                   <div
//                     className={`absolute left-full ml-3 px-2 py-1 bg-[#2E5E4E] text-white text-sm rounded shadow-lg z-10
//                     transition-opacity duration-200 ${activeHover === item.path ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//                   >
//                     {item.name}
//                     {item.hasNotification && item.notificationCount > 0 && (
//                       <span className="ml-2 text-xs bg-red-500 rounded-full px-1">
//                         {item.notificationCount}
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* Notification badge */}
//                 {item.hasNotification && item.notificationCount > 0 && (
//                   <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold
//                     ${item.isTracker ? "bg-[#F39C12] text-white" : "bg-[#E74C3C] text-white"}`}>
//                     {item.notificationCount > 9 ? "9+" : item.notificationCount}
//                   </span>
//                 )}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* Horizontal separator */}
//         <div className="border-t border-[#3A6B5A] mx-3 my-2"></div>

//         {/* Staff ID & Logout */}
//         <div className="mb-4 px-4 pt-2">
//           {!collapsed && staffId && (
//             <div className="mb-3 px-3 py-2 bg-[#3A6B5A] rounded-lg text-sm">
//               <div className="text-[#A3F7BF] text-xs">Staff ID</div>
//               <div className="truncate">{staffId}</div>
//             </div>
//           )}

//           <NavLink
//             to="/logout"
//             className={({ isActive }) =>
//               `flex items-center px-3 py-3 rounded-lg transition-colors duration-200 group
//               ${isActive ? "bg-white text-[#2E5E4E] font-semibold" : "hover:bg-[#3A6B5A] hover:text-white"}`
//             }
//             onClick={closeMobile}
//           >
//             <FiLogOut className="text-lg" />
//             {!collapsed && <span className="ml-3">Logout</span>}

//             {collapsed && (
//               <div
//                 className={`absolute left-full ml-3 px-2 py-1 bg-[#2E5E4E] text-white text-sm rounded shadow-lg z-10
//                 transition-opacity duration-200 ${activeHover === "/logout" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//               >
//                 Logout
//               </div>
//             )}
//           </NavLink>
//         </div>
//       </aside>

//       {/* Main content padding */}
//       <style>{`
//         @media (min-width: 768px) {
//           main {
//             margin-left: ${collapsed ? "5rem" : "16rem"};
//             transition: margin-left 0.3s ease;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default StaffSidebar;

// corect


// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { FiHome, FiClipboard, FiClock, FiBox, FiSettings, FiMenu, FiX, FiLogOut, FiBell } from "react-icons/fi";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const StaffSidebar = ({ staffId }) => {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [requestNotifications, setRequestNotifications] = useState(0);
//   const [trackerNotifications, setTrackerNotifications] = useState(0);
//   const [activeHover, setActiveHover] = useState(null);

//   // Listen for manager-approved updates from socket
//   useEffect(() => {
//     const handleRequestUpdate = (data) => {
//       if (data.staff_id === staffId) {
//         if (data.status === "APPROVED") {
//           setTrackerNotifications((prev) => prev + 1);
//         }
//         if (data.status === "REJECTED") {
//           setRequestNotifications((prev) => prev + 1);
//         }
//       }
//     };

//     socket.on("update_request", handleRequestUpdate);
//     return () => socket.off("update_request", handleRequestUpdate);
//   }, [staffId]);

//   // Reset notifications when visiting corresponding pages
//   useEffect(() => {
//     if (location.pathname === "/staff/staff-request-status") {
//       setRequestNotifications(0);
//     }
//     if (location.pathname === "/staff/returnrequesttracker") {
//       setTrackerNotifications(0);
//     }
//   }, [location.pathname]);

//   const toggleSidebar = () => setMobileOpen((prev) => !prev);
//   const closeMobile = () => setMobileOpen(false);

//   const menuItems = [
//     { path: "/staff", name: "Dashboard", icon: <FiHome /> },
//     { path: "/staff/staff-request-form", name: "Request Form", icon: <FiClipboard /> },
//     { 
//       path: "/staff/staff-request-status", 
//       name: "Request Status", 
//       icon: <FiClock />, 
//       hasNotification: true,
//       notificationCount: requestNotifications
//     },
//     { path: "/staff/returnrequest", name: "Return Request", icon: <FiBox /> },
//     { path: "/staff/issueditemsget", name: "Issued Items", icon: <FiSettings /> },
//     { 
//       path: "/staff/returnrequesttracker", 
//       name: "Return Tracker", 
//       icon: <FiBell />, 
//       hasNotification: true,
//       notificationCount: trackerNotifications,
//       isTracker: true
//     },
//   ];

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-[#2E5E4E] text-white p-2 rounded-lg shadow-md"
//         onClick={toggleSidebar}
//       >
//         {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//       </button>

//       {/* Mobile overlay */}
//       {mobileOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobile} />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-[#2E5E4E] to-[#1C3B30] text-white z-50 transition-all duration-300
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
//           md:relative md:translate-x-0 md:z-auto
//           ${collapsed ? "w-20" : "w-64"} flex flex-col shadow-xl`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between h-16 px-4 border-b border-[#3A6B5A]">
//           {!collapsed && (
//             <div className="flex items-center">
//               <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-2">
//                 <span className="text-[#2E5E4E] font-bold text-sm">S</span>
//               </div>
//               <span className="font-bold text-lg">Staff Portal</span>
//             </div>
//           )}
//           <button
//             className="hidden md:block text-white p-1 rounded hover:bg-[#3A6B5A] transition-colors"
//             onClick={() => setCollapsed((prev) => !prev)}
//           >
//             {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
//           </button>
//         </div>

//         {/* Notification Summary Bar */}
//         {(requestNotifications > 0 || trackerNotifications > 0) && !collapsed && (
//           <div className="px-4 py-2 bg-[#3A6B5A] border-y border-[#4A7B6A] mx-2 my-3 rounded-lg">
//             <div className="text-xs text-[#A3F7BF] mb-1">Notifications Summary</div>
//             <div className="flex justify-between items-center text-sm">
//               {requestNotifications > 0 && (
//                 <div className="flex items-center">
//                   <span className="w-2 h-2 rounded-full bg-[#E74C3C] mr-2"></span>
//                   <span>{requestNotifications} request update(s)</span>
//                 </div>
//               )}
//               {trackerNotifications > 0 && (
//                 <div className="flex items-center">
//                   <span className="w-2 h-2 rounded-full bg-[#F39C12] mr-2"></span>
//                   <span>{trackerNotifications} approved request(s)</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Menu */}
//         <ul className="flex-1 py-4 px-2">
//           {menuItems.map((item) => (
//             <li key={item.path} className="mb-1">
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center px-3 py-3 rounded-lg transition-all duration-200 relative group
//                   ${isActive ? "bg-white text-[#2E5E4E] font-semibold shadow-md" : "hover:bg-[#3A6B5A] hover:text-white"}`
//                 }
//                 onClick={closeMobile}
//                 onMouseEnter={() => setActiveHover(item.path)}
//                 onMouseLeave={() => setActiveHover(null)}
//               >
//                 {/* Icon */}
//                 <div className={`text-lg transition-transform duration-200 group-hover:scale-110 relative
//                   ${item.isTracker && trackerNotifications > 0 ? "text-[#F39C12]" : ""}`}>
//                   {item.icon}

//                   {/* Pulsing for tracker */}
//                   {item.isTracker && trackerNotifications > 0 && (
//                     <span className="absolute -top-1 -right-1 flex h-3 w-3">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                       <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                     </span>
//                   )}
//                 </div>

//                 {!collapsed && <span className="ml-3 transition-opacity duration-200">{item.name}</span>}

//                 {/* Tooltip for collapsed */}
//                 {collapsed && (
//                   <div
//                     className={`absolute left-full ml-3 px-2 py-1 bg-[#2E5E4E] text-white text-sm rounded shadow-lg z-10
//                     transition-opacity duration-200 ${activeHover === item.path ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//                   >
//                     {item.name}
//                     {item.hasNotification && item.notificationCount > 0 && (
//                       <span className="ml-2 text-xs bg-red-500 rounded-full px-1">
//                         {item.notificationCount}
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* Notification badge */}
//                 {item.hasNotification && item.notificationCount > 0 && (
//                   <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold
//                     ${item.isTracker ? "bg-[#F39C12] text-white" : "bg-[#E74C3C] text-white"}`}>
//                     {item.notificationCount > 9 ? "9+" : item.notificationCount}
//                   </span>
//                 )}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* Horizontal separator */}
//         <div className="border-t border-[#3A6B5A] mx-3 my-2"></div>

//         {/* Staff ID & Logout */}
//         <div className="mb-4 px-4 pt-2">
//           {!collapsed && staffId && (
//             <div className="mb-3 px-3 py-2 bg-[#3A6B5A] rounded-lg text-sm">
//               <div className="text-[#A3F7BF] text-xs">Staff ID</div>
//               <div className="truncate">{staffId}</div>
//             </div>
//           )}

//           <NavLink
//             to="/logout"
//             className={({ isActive }) =>
//               `flex items-center px-3 py-3 rounded-lg transition-colors duration-200 group
//               ${isActive ? "bg-white text-[#2E5E4E] font-semibold" : "hover:bg-[#3A6B5A] hover:text-white"}`
//             }
//             onClick={closeMobile}
//           >
//             <FiLogOut className="text-lg" />
//             {!collapsed && <span className="ml-3">Logout</span>}

//             {collapsed && (
//               <div
//                 className={`absolute left-full ml-3 px-2 py-1 bg-[#2E5E4E] text-white text-sm rounded shadow-lg z-10
//                 transition-opacity duration-200 ${activeHover === "/logout" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//               >
//                 Logout
//               </div>
//             )}
//           </NavLink>
//         </div>
//       </aside>

//       {/* Main content padding */}
//       <style>{`
//         @media (min-width: 768px) {
//           main {
//             margin-left: ${collapsed ? "5rem" : "16rem"};
//             transition: margin-left 0.3s ease;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default StaffSidebar;


// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { FiHome, FiClipboard, FiClock, FiBox, FiSettings, FiMenu, FiX, FiLogOut, FiBell, FiUser, FiMail } from "react-icons/fi";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const StaffSidebar = ({ staffId, staffName, staffEmail }) => {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [requestNotifications, setRequestNotifications] = useState(0);
//   const [trackerNotifications, setTrackerNotifications] = useState(0);
//   const [activeHover, setActiveHover] = useState(null);
//   const [unreadNotifications, setUnreadNotifications] = useState([]);

//   // Listen for manager-approved updates from socket
//   useEffect(() => {
//     const handleRequestUpdate = (data) => {
//       if (data.staff_id === staffId) {
//         if (data.status === "APPROVED") {
//           setTrackerNotifications((prev) => prev + 1);
//           setUnreadNotifications(prev => [...prev, {
//             id: Date.now(),
//             type: 'approved',
//             message: `Your request was approved`,
//             time: new Date()
//           }]);
//         }
//         if (data.status === "REJECTED") {
//           setRequestNotifications((prev) => prev + 1);
//           setUnreadNotifications(prev => [...prev, {
//             id: Date.now(),
//             type: 'rejected',
//             message: `Your request was rejected`,
//             time: new Date()
//           }]);
//         }
//       }
//     };

//     socket.on("update_request", handleRequestUpdate);
//     return () => socket.off("update_request", handleRequestUpdate);
//   }, [staffId]);

//   // Reset notifications when visiting corresponding pages
//   useEffect(() => {
//     if (location.pathname === "/staff/staff-request-status") {
//       setRequestNotifications(0);
//     }
//     if (location.pathname === "/staff/returnrequesttracker") {
//       setTrackerNotifications(0);
//     }
//   }, [location.pathname]);

//   const toggleSidebar = () => setMobileOpen((prev) => !prev);
//   const closeMobile = () => setMobileOpen(false);

//   const menuItems = [
//     { path: "/staff", name: "Dashboard", icon: <FiHome /> },
//     { path: "/staff/staff-request-form", name: "Request Form", icon: <FiClipboard /> },
//     { 
//       path: "/staff/staff-request-status", 
//       name: "Request Status", 
//       icon: <FiClock />, 
//       hasNotification: true,
//       notificationCount: requestNotifications
//     },
//     { path: "/staff/returnrequest", name: "Return Request", icon: <FiBox /> },
//     { path: "/staff/issueditemsget", name: "Issued Items", icon: <FiSettings /> },
//     { 
//       path: "/staff/returnrequesttracker", 
//       name: "Return Tracker", 
//       icon: <FiBell />, 
//       hasNotification: true,
//       notificationCount: trackerNotifications,
//       isTracker: true
//     },
//   ];

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-[#2E5E4E] text-white p-2 rounded-lg shadow-md transition-all hover:bg-[#3A6B5A]"
//         onClick={toggleSidebar}
//       >
//         {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//       </button>

//       {/* Mobile overlay */}
//       {mobileOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobile} />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-[#2E5E4E] to-[#1C3B30] text-white z-50 transition-all duration-300
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
//           md:relative md:translate-x-0 md:z-auto
//           ${collapsed ? "w-20" : "w-64"} flex flex-col shadow-xl`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between h-16 px-4 border-b border-[#3A6B5A]">
//           {!collapsed && (
//             <div className="flex items-center">
//               <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-2 shadow-sm">
//                 <span className="text-[#2E5E4E] font-bold text-sm">S</span>
//               </div>
//               <span className="font-bold text-lg">Staff Portal</span>
//             </div>
//           )}
//           <button
//             className="hidden md:block text-white p-1 rounded hover:bg-[#3A6B5A] transition-colors"
//             onClick={() => setCollapsed((prev) => !prev)}
//           >
//             {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
//           </button>
//         </div>

//         {/* Staff Profile Section */}
//         {!collapsed && staffName && (
//           <div className="px-4 py-3 border-b border-[#3A6B5A]">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-[#3A6B5A] flex items-center justify-center mr-3">
//                 <FiUser className="text-[#A3F7BF]" />
//               </div>
//               <div className="overflow-hidden">
//                 <p className="font-medium truncate">{staffName}</p>
//                 <div className="flex items-center text-xs text-[#A3F7BF] truncate">
//                   <FiMail className="mr-1" size={12} />
//                   <span className="truncate">{staffEmail || "staff@example.com"}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Notification Summary Bar */}
//         {(requestNotifications > 0 || trackerNotifications > 0) && !collapsed && (
//           <div className="px-4 py-2 bg-[#3A6B5A] border-y border-[#4A7B6A] mx-2 my-3 rounded-lg">
//             <div className="text-xs text-[#A3F7BF] mb-1 font-semibold">NOTIFICATIONS</div>
//             <div className="flex flex-col gap-1 text-sm">
//               {requestNotifications > 0 && (
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <span className="w-2 h-2 rounded-full bg-[#E74C3C] mr-2"></span>
//                     <span>Request Updates</span>
//                   </div>
//                   <span className="bg-[#E74C3C] text-white text-xs px-2 py-0.5 rounded-full">
//                     {requestNotifications}
//                   </span>
//                 </div>
//               )}
//               {trackerNotifications > 0 && (
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <span className="w-2 h-2 rounded-full bg-[#F39C12] mr-2"></span>
//                     <span>Approved Requests</span>
//                   </div>
//                   <span className="bg-[#F39C12] text-white text-xs px-2 py-0.5 rounded-full">
//                     {trackerNotifications}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Thin Yellow Horizontal Line */}
//         <div className="h-0.5 bg-yellow-400 mx-4 my-2 opacity-80"></div>

//         {/* Menu */}
//         <ul className="flex-1 py-4 px-2">
//           {menuItems.map((item) => (
//             <li key={item.path} className="mb-1">
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center px-3 py-3 rounded-lg transition-all duration-200 relative group
//                   ${isActive ? "bg-white text-[#2E5E4E] font-semibold shadow-md" : "hover:bg-[#3A6B5A] hover:text-white"}`
//                 }
//                 onClick={closeMobile}
//                 onMouseEnter={() => setActiveHover(item.path)}
//                 onMouseLeave={() => setActiveHover(null)}
//               >
//                 {/* Icon with special styling for tracker */}
//                 <div className={`text-lg transition-transform duration-200 group-hover:scale-110 relative
//                   ${item.isTracker && trackerNotifications > 0 ? "text-[#F39C12]" : ""}`}>
//                   {item.icon}
                  
//                   {/* Pulsing animation for tracker notifications */}
//                   {item.isTracker && trackerNotifications > 0 && (
//                     <span className="absolute -top-1 -right-1 flex h-3 w-3">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                       <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                     </span>
//                   )}
//                 </div>

//                 {!collapsed && <span className="ml-3 transition-opacity duration-200">{item.name}</span>}

//                 {/* Tooltip for collapsed */}
//                 {collapsed && (
//                   <div
//                     className={`absolute left-full ml-3 px-2 py-1 bg-[#2E5E4E] text-white text-sm rounded shadow-lg z-10
//                     transition-opacity duration-200 ${activeHover === item.path ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//                   >
//                     {item.name}
//                     {item.hasNotification && item.notificationCount > 0 && (
//                       <span className="ml-2 text-xs bg-red-500 rounded-full px-1">
//                         {item.notificationCount}
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* Notification badge */}
//                 {item.hasNotification && item.notificationCount > 0 && (
//                   <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold
//                     ${item.isTracker ? "bg-[#F39C12] text-white shadow-md" : "bg-[#E74C3C] text-white shadow-md"}`}>
//                     {item.notificationCount > 9 ? "9+" : item.notificationCount}
//                   </span>
//                 )}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* Thin Yellow Horizontal Line at Bottom */}
//         <div className="h-0.5 bg-yellow-400 mx-4 my-2 opacity-80"></div>

//         {/* Staff ID & Logout */}
//         <div className="mb-4 px-4 pt-2">
//           {!collapsed && staffId && (
//             <div className="mb-3 px-3 py-2 bg-[#3A6B5A] rounded-lg text-sm border border-[#4A7B6A]">
//               <div className="text-[#A3F7BF] text-xs font-semibold">STAFF ID</div>
//               <div className="truncate font-medium">{staffId}</div>
//             </div>
//           )}

//           <NavLink
//             to="/logout"
//             className={({ isActive }) =>
//               `flex items-center px-3 py-3 rounded-lg transition-colors duration-200 group
//               ${isActive ? "bg-white text-[#2E5E4E] font-semibold" : "hover:bg-[#3A6B5A] hover:text-white"}`
//             }
//             onClick={closeMobile}
//           >
//             <FiLogOut className="text-lg" />
//             {!collapsed && <span className="ml-3">Logout</span>}

//             {collapsed && (
//               <div
//                 className={`absolute left-full ml-3 px-2 py-1 bg-[#2E5E4E] text-white text-sm rounded shadow-lg z-10
//                 transition-opacity duration-200 ${activeHover === "/logout" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//               >
//                 Logout
//               </div>
//             )}
//           </NavLink>
//         </div>
//       </aside>

//       {/* Main content padding */}
//       <style>{`
//         @media (min-width: 768px) {
//           main {
//             margin-left: ${collapsed ? "5rem" : "16rem"};
//             transition: margin-left 0.3s ease;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default StaffSidebar;
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiHome, FiClipboard, FiClock, FiBox, FiSettings, FiMenu, FiX, FiLogOut, FiBell, FiUser, FiMail } from "react-icons/fi";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const StaffSidebar = ({ staffId, staffName, staffEmail }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [requestNotifications, setRequestNotifications] = useState(0);
  const [returnNotifications, setReturnNotifications] = useState(0);
  const [activeHover, setActiveHover] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  // Listen for manager updates from socket
  useEffect(() => {
    const handleRequestUpdate = (data) => {
      if (data.staff_id === staffId) {
        // Request status updates
        if (data.status === "APPROVED" || data.status === "REJECTED") {
          setRequestNotifications(prev => prev + 1);
          setUnreadNotifications(prev => [...prev, {
            id: Date.now(),
            type: data.status.toLowerCase(),
            message: `Your request was ${data.status.toLowerCase()}`,
            time: new Date()
          }]);
        }
        // Return item updates
        if (data.status === "RETURNED") {
          setReturnNotifications(prev => prev + 1);
          setUnreadNotifications(prev => [...prev, {
            id: Date.now(),
            type: 'returned',
            message: `An item has been returned`,
            time: new Date()
          }]);
        }
      }
    };

    socket.on("update_request", handleRequestUpdate);
    return () => socket.off("update_request", handleRequestUpdate);
  }, [staffId]);

  // Reset notifications when visiting pages
  useEffect(() => {
    if (location.pathname === "/staff/staff-request-status") {
      setRequestNotifications(0);
    }
    if (location.pathname === "/staff/returnrequesttracker") {
      setReturnNotifications(0);
    }
  }, [location.pathname]);

  const toggleSidebar = () => setMobileOpen(prev => !prev);
  const closeMobile = () => setMobileOpen(false);

  const menuItems = [
    { path: "/staff", name: "Dashboard", icon: <FiHome /> },
    { path: "/staff/staff-request-form", name: "Request Form", icon: <FiClipboard /> },
    { 
      path: "/staff/staff-request-status", 
      name: "Request Status", 
      icon: <FiClock />, 
      hasNotification: true,
      notificationCount: requestNotifications
    },
    { path: "/staff/returnrequest", name: "Return Request", icon: <FiBox /> },
    { 
      path: "/staff/returnrequesttracker", 
      name: "Return Tracker", 
      icon: <FiBell />,
      hasNotification: true,
      notificationCount: returnNotifications
    },
    { path: "/staff/issueditemsget", name: "Issued Items", icon: <FiSettings /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#2E5E4E] text-white p-2 rounded-lg shadow-md transition-all hover:bg-[#3A6B5A]"
        onClick={toggleSidebar}
      >
        {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {mobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobile} />}

      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-[#2E5E4E] to-[#1C3B30] text-white z-50 transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 md:z-auto
          ${collapsed ? "w-20" : "w-64"} flex flex-col shadow-xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#3A6B5A]">
          {!collapsed && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-2 shadow-sm">
                <span className="text-[#2E5E4E] font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg">Staff Portal</span>
            </div>
          )}
          <button
            className="hidden md:block text-white p-1 rounded hover:bg-[#3A6B5A] transition-colors"
            onClick={() => setCollapsed(prev => !prev)}
          >
            {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
          </button>
        </div>

        {/* Staff Profile */}
        {!collapsed && staffName && (
          <div className="px-4 py-3 border-b border-[#3A6B5A]">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#3A6B5A] flex items-center justify-center mr-3">
                <FiUser className="text-[#A3F7BF]" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{staffName}</p>
                <div className="flex items-center text-xs text-[#A3F7BF] truncate">
                  <FiMail className="mr-1" size={12} />
                  <span className="truncate">{staffEmail || "staff@example.com"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Summary */}
        {(requestNotifications > 0 || returnNotifications > 0) && !collapsed && (
          <div className="px-4 py-2 bg-[#3A6B5A] border-y border-[#4A7B6A] mx-2 my-3 rounded-lg">
            <div className="text-xs text-[#A3F7BF] mb-1 font-semibold">NOTIFICATIONS</div>
            <div className="flex flex-col gap-1 text-sm">
              {requestNotifications > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#E74C3C] mr-2"></span>
                    <span>Request Updates</span>
                  </div>
                  <span className="bg-[#E74C3C] text-white text-xs px-2 py-0.5 rounded-full">{requestNotifications}</span>
                </div>
              )}
              {returnNotifications > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#F39C12] mr-2"></span>
                    <span>Returned Items</span>
                  </div>
                  <span className="bg-[#F39C12] text-white text-xs px-2 py-0.5 rounded-full">{returnNotifications}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="h-0.5 bg-yellow-400 mx-4 my-2 opacity-80"></div>

        {/* Menu */}
        <ul className="flex-1 py-4 px-2">
          {menuItems.map(item => (
            <li key={item.path} className="mb-1">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-lg transition-all duration-200 relative group
                  ${isActive ? "bg-white text-[#2E5E4E] font-semibold shadow-md" : "hover:bg-[#3A6B5A] hover:text-white"}`
                }
                onClick={closeMobile}
                onMouseEnter={() => setActiveHover(item.path)}
                onMouseLeave={() => setActiveHover(null)}
              >
                <div className="text-lg transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </div>
                {!collapsed && <span className="ml-3 transition-opacity duration-200">{item.name}</span>}

                {collapsed && (
                  <div
                    className={`absolute left-full ml-3 px-2 py-1 bg-[#2E5E4E] text-white text-sm rounded shadow-lg z-10
                    transition-opacity duration-200 ${activeHover === item.path ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                  >
                    {item.name}
                    {item.hasNotification && item.notificationCount > 0 && (
                      <span className="ml-2 text-xs bg-red-500 rounded-full px-1">
                        {item.notificationCount}
                      </span>
                    )}
                  </div>
                )}

                {item.hasNotification && item.notificationCount > 0 && (
                  <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold
                    ${item.path === "/staff/returnrequesttracker" ? "bg-[#F39C12]" : "bg-[#E74C3C]"} text-white shadow-md`}>
                    {item.notificationCount > 9 ? "9+" : item.notificationCount}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="h-0.5 bg-yellow-400 mx-4 my-2 opacity-80"></div>

        {/* Staff ID & Logout */}
        <div className="mb-4 px-4 pt-2">
          {!collapsed && staffId && (
            <div className="mb-3 px-3 py-2 bg-[#3A6B5A] rounded-lg text-sm border border-[#4A7B6A]">
              <div className="text-[#A3F7BF] text-xs font-semibold">STAFF ID</div>
              <div className="truncate font-medium">{staffId}</div>
            </div>
          )}
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              `flex items-center px-3 py-3 rounded-lg transition-colors duration-200 group
              ${isActive ? "bg-white text-[#2E5E4E] font-semibold" : "hover:bg-[#3A6B5A] hover:text-white"}`
            }
            onClick={closeMobile}
          >
            <FiLogOut className="text-lg" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </NavLink>
        </div>
      </aside>

      <style>{`
        @media (min-width: 768px) {
          main {
            margin-left: ${collapsed ? "5rem" : "16rem"};
            transition: margin-left 0.3s ease;
          }
        }
      `}</style>
    </>
  );
};

export default StaffSidebar;
