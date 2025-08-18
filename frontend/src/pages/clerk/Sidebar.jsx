// ;
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboardIcon,
//   UsersIcon,
//   BoxIcon,
//   ClipboardListIcon,
//   LogOutIcon,
//   MenuIcon,
//   XIcon
// } from 'lucide-react';
// import axios from 'axios';

// const calPolyGreen = '#154734';
// const calPolyGold = '#C4820E';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [pendingCount, setPendingCount] = useState(0);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Fetch pending requests count
//   useEffect(() => {
//     const fetchPending = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/requests/manager/pending');
//         setPendingCount(res.data.length || 0);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPending();
//     const interval = setInterval(fetchPending, 10000); // refresh every 10s
//     return () => clearInterval(interval);
//   }, []);

//   const menuItems = [
//     { path: '/Clerk', name: 'Dashboard', icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
//     { 
//       path: '/Clerk/item-managment', 
//       name: 'Item Management', 
//       icon: <ClipboardListIcon className="h-5 w-5 mr-2" />,
//       hasNotification: true 
//     },
//     { path: '/Clerk/add-item', name: 'Add Item', icon: <BoxIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/give', name: 'Assign Items', icon: <UsersIcon className="h-5 w-5 mr-2" /> },
//     { 
//       path: '/Clerk/c', 
//       name: 'Pending Returns', 
//       icon: <ClipboardListIcon className="h-5 w-5 mr-2" />,
//       hasNotification: pendingCount > 0
//     },
//   ];

//   return (
//     <>
//       {/* Mobile menu button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-md focus:outline-none"
//           style={{ backgroundColor: calPolyGreen, color: 'white' }}
//         >
//           {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
//         md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
//         style={{ backgroundColor: calPolyGreen }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center justify-center h-16 px-4 border-b" style={{ borderColor: calPolyGold }}>
//             <h1 className="text-xl font-bold text-white">Smart IMS</h1>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map((item) => (
//                 <li key={item.path} className="relative">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center px-4 py-3 rounded-lg transition-colors
//                       ${location.pathname.startsWith(item.path) 
//                         ? 'bg-white text-green-800 font-medium' 
//                         : 'text-white hover:bg-green-700'}`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {item.icon}
//                     {item.name}

//                     {/* Red notification badge */}
//                     {item.hasNotification && pendingCount > 0 && (
//                       <span className="absolute right-4 top-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                         {pendingCount}
//                       </span>
//                     )}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Logout */}
//           <div className="px-4 py-6 border-t" style={{ borderColor: calPolyGold }}>
//             <Link
//               to="/logout"
//               className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-green-700 transition-colors"
//             >
//               <LogOutIcon className="h-5 w-5 mr-2" />
//               Logout
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={toggleSidebar}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;


// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboardIcon,
//   UsersIcon,
//   BoxIcon,
//   ClipboardListIcon,
//   LogOutIcon,
//   MenuIcon,
//   XIcon,
//   BellIcon
// } from 'lucide-react';
// import axios from 'axios';
// import { io } from "socket.io-client";

// const calPolyGreen = '#154734';
// const calPolyGold = '#C4820E';

// const socket = io("http://localhost:5000"); // backend socket server

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [pendingCount, setPendingCount] = useState(0);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Fetch initial pending returns count
//   const fetchPending = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/returns/pending'); // your API for pending returns
//       setPendingCount(res.data.length || 0);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPending();

//     // Listen for new return requests from staff
//     socket.on("returnRequestCreated", () => {
//       setPendingCount((prev) => prev + 1);
//     });

//     // Listen for approved/handled returns
//     socket.on("returnRequestApproved", () => {
//       fetchPending();
//     });

//     return () => {
//       socket.off("returnRequestCreated");
//       socket.off("returnRequestApproved");
//     };
//   }, []);

//   const menuItems = [
//     { path: '/Clerk', name: 'Dashboard', icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/item-managment', name: 'Item Management', icon: <ClipboardListIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/add-item', name: 'Add Item', icon: <BoxIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/give', name: 'Assign Items', icon: <UsersIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/c', name: 'Pending Returns', icon: <ClipboardListIcon className="h-5 w-5 mr-2" /> }, // only this shows notification
//   ];

//   return (
//     <>
//       {/* Mobile menu button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-md focus:outline-none"
//           style={{ backgroundColor: calPolyGreen, color: 'white' }}
//         >
//           {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
//         md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
//         style={{ backgroundColor: calPolyGreen }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center justify-center h-16 px-4 border-b" style={{ borderColor: calPolyGold }}>
//             <h1 className="text-xl font-bold text-white">Smart IMS</h1>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map((item) => (
//                 <li key={item.path} className="relative">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors
//                       ${location.pathname.startsWith(item.path) 
//                         ? 'bg-white text-green-800 font-medium' 
//                         : 'text-white hover:bg-green-700'}`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="flex items-center">
//                       {item.icon}
//                       {item.name}
//                     </div>

//                     {/* Only Pending Returns shows notification */}
//                     {item.path === "/Clerk/c" && pendingCount > 0 && (
//                       <div className="flex items-center gap-1">
//                         <BellIcon className="h-5 w-5 text-red-600" />
//                         <span className="bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                           {pendingCount}
//                         </span>
//                       </div>
//                     )}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Logout */}
//           <div className="px-4 py-6 border-t" style={{ borderColor: calPolyGold }}>
//             <Link
//               to="/logout"
//               className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-green-700 transition-colors"
//             >
//               <LogOutIcon className="h-5 w-5 mr-2" />
//               Logout
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={toggleSidebar}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { LayoutDashboardIcon, UsersIcon, BoxIcon, ClipboardListIcon, LogOutIcon, MenuIcon, XIcon, BellIcon } from 'lucide-react';
// import axios from 'axios';
// import { io } from "socket.io-client";

// const calPolyGreen = '#154734';
// const calPolyGold = '#C4820E';

// // Connect to backend Socket.IO
// const socket = io("http://localhost:5000");

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [pendingAssignCount, setPendingAssignCount] = useState(0);
//   const [pendingReturnCount, setPendingReturnCount] = useState(0);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Fetch counts from backend
//   const fetchPendingCounts = async () => {
//     try {
//       const assignRes = await axios.get('http://localhost:5000/api/requests/clerk/pending');
//       const returnRes = await axios.get('http://localhost:5000/api/requests/clerk/pending-returns');
//       setPendingAssignCount(assignRes.data.length || 0);
//       setPendingReturnCount(returnRes.data.length || 0);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPendingCounts();

//     // Listen for real-time events
//     socket.on("new_assign_request", fetchPendingCounts);
//     socket.on("assign_request_processed", fetchPendingCounts);
//     socket.on("new_return_request", fetchPendingCounts);
//     socket.on("return_request_processed", fetchPendingCounts);

//     return () => {
//       socket.off("new_assign_request", fetchPendingCounts);
//       socket.off("assign_request_processed", fetchPendingCounts);
//       socket.off("new_return_request", fetchPendingCounts);
//       socket.off("return_request_processed", fetchPendingCounts);
//     };
//   }, []);

//   const menuItems = [
//     { path: '/Clerk', name: 'Dashboard', icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/item-managment', name: 'Item Management', icon: <ClipboardListIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/add-item', name: 'Add Item', icon: <BoxIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/give', name: 'Assign Items', icon: <UsersIcon className="h-5 w-5 mr-2" />, count: pendingAssignCount },
//     { path: '/Clerk/return', name: 'Pending Returns', icon: <ClipboardListIcon className="h-5 w-5 mr-2" />, count: pendingReturnCount },
//   ]; { path: '/Clerk/report', name: 'Report', icon: <ClipboardListIcon className="h-5 w-5 mr-2" />, count: pendingReturnCount }

//   return (
//     <>
//       {/* Mobile menu button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button onClick={toggleSidebar} className="p-2 rounded-md focus:outline-none" style={{ backgroundColor: calPolyGreen, color: 'white' }}>
//           {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`} style={{ backgroundColor: calPolyGreen }}>
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-center h-16 px-4 border-b" style={{ borderColor: calPolyGold }}>
//             <h1 className="text-xl font-bold text-white">Smart IMS</h1>
//           </div>

//           <nav className="flex-1 px-4 py-6 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map(item => (
//                 <li key={item.path} className="relative">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${location.pathname.startsWith(item.path) ? 'bg-white text-green-800 font-medium' : 'text-white hover:bg-green-700'}`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="flex items-center">{item.icon}{item.name}</div>
//                     {item.count > 0 && (
//                       <div className="flex items-center gap-1">
//                         <BellIcon className="h-5 w-5 text-red-600" />
//                         <span className="bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.count}</span>
//                       </div>
//                     )}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="px-4 py-6 border-t" style={{ borderColor: calPolyGold }}>
//             <Link to="/logout" className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-green-700 transition-colors">
//               <LogOutIcon className="h-5 w-5 mr-2" /> Logout
//             </Link>
//           </div>
//         </div>
//       </div>

//       {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />}
//     </>
//   );
// };

// export default Sidebar;

// corcet one

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { LayoutDashboardIcon, UsersIcon, BoxIcon, ClipboardListIcon, LogOutIcon, MenuIcon, XIcon, BellIcon } from 'lucide-react';
// import axios from 'axios';
// import { io } from "socket.io-client";

// const calPolyGreen = '#154734';
// const calPolyGold = '#C4820E';

// // Connect to backend Socket.IO
// const socket = io("http://localhost:5000");

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [pendingAssignCount, setPendingAssignCount] = useState(0);
//   const [pendingReturnCount, setPendingReturnCount] = useState(0);
//   const [reportCount, setReportCount] = useState(0);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Fetch counts from backend
//   const fetchPendingCounts = async () => {
//     try {
//       const assignRes = await axios.get('http://localhost:5000/api/requests/clerk/pending');
//       const returnRes = await axios.get('http://localhost:5000/api/requests/clerk/pending-returns');
//       const reportRes = await axios.get('http://localhost:5000/api/reports/pending'); // Adjust endpoint if needed
//       setPendingAssignCount(assignRes.data.length || 0);
//       setPendingReturnCount(returnRes.data.length || 0);
//       setReportCount(reportRes.data.length || 0);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPendingCounts();

//     // Listen for real-time events
//     socket.on("new_assign_request", fetchPendingCounts);
//     socket.on("assign_request_processed", fetchPendingCounts);
//     socket.on("new_return_request", fetchPendingCounts);
//     socket.on("return_request_processed", fetchPendingCounts);
//     socket.on("new_report", fetchPendingCounts);
//     socket.on("report_processed", fetchPendingCounts);

//     return () => {
//       socket.off("new_assign_request", fetchPendingCounts);
//       socket.off("assign_request_processed", fetchPendingCounts);
//       socket.off("new_return_request", fetchPendingCounts);
//       socket.off("return_request_processed", fetchPendingCounts);
//       socket.off("new_report", fetchPendingCounts);
//       socket.off("report_processed", fetchPendingCounts);
//     };
//   }, []);

//   const menuItems = [
//     { path: '/Clerk', name: 'Dashboard', icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/item-managment', name: 'Item Management', icon: <ClipboardListIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/add-item', name: 'Add Item', icon: <BoxIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/give', name: 'Assign Items', icon: <UsersIcon className="h-5 w-5 mr-2" />, count: pendingAssignCount },
//     { path: '/Clerk/return', name: 'Pending Returns', icon: <ClipboardListIcon className="h-5 w-5 mr-2" />, count: pendingReturnCount },
//     { path: '/Clerk/report', name: 'Report', icon: <ClipboardListIcon className="h-5 w-5 mr-2" />, count: reportCount }
//   ];

//   return (
//     <>
//       {/* Mobile menu button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button onClick={toggleSidebar} className="p-2 rounded-md focus:outline-none" style={{ backgroundColor: calPolyGreen, color: 'white' }}>
//           {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`} style={{ backgroundColor: calPolyGreen }}>
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-center h-16 px-4 border-b" style={{ borderColor: calPolyGold }}>
//             <h1 className="text-xl font-bold text-white">Smart IMS</h1>
//           </div>

//           <nav className="flex-1 px-4 py-6 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map(item => (
//                 <li key={item.path} className="relative">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${location.pathname.startsWith(item.path) ? 'bg-white text-green-800 font-medium' : 'text-white hover:bg-green-700'}`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="flex items-center">{item.icon}{item.name}</div>
//                     {item.count > 0 && (
//                       <div className="flex items-center gap-1">
//                         <BellIcon className="h-5 w-5 text-red-600" />
//                         <span className="bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.count}</span>
//                       </div>
//                     )}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="px-4 py-6 border-t" style={{ borderColor: calPolyGold }}>
//             <Link to="/logout" className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-green-700 transition-colors">
//               <LogOutIcon className="h-5 w-5 mr-2" /> Logout
//             </Link>
//           </div>
//         </div>
//       </div>

//       {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />}
//     </>
//   );
// };

// export default Sidebar;


//corect 

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { LayoutDashboardIcon, UsersIcon, BoxIcon, ClipboardListIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
// import axios from 'axios';
// import { io } from "socket.io-client";

// const calPolyGreen = '#154734';
// const calPolyGold = '#C4820E';
// const socket = io("http://localhost:5000");

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [pendingAssignCount, setPendingAssignCount] = useState(0);
//   const [pendingReturnCount, setPendingReturnCount] = useState(0);
//   const [reportCount, setReportCount] = useState(0);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Fetch counts from backend
//   const fetchPendingCounts = async () => {
//     try {
//       const [assignRes, returnRes, reportRes] = await Promise.all([
//         axios.get('http://localhost:5000/api/requests/clerk/pending'),
//         axios.get('http://localhost:5000/api/requests/clerk/pending-returns'),
//         axios.get('http://localhost:5000/api/reports/pending')
//       ]);
//       setPendingAssignCount(assignRes.data.length || 0);
//       setPendingReturnCount(returnRes.data.length || 0);
//       setReportCount(reportRes.data.length || 0);
//     } catch (err) {
//       console.error("Error fetching pending counts:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPendingCounts(); // initial fetch

//     // Real-time updates
//     const events = [
//       "new_assign_request",
//       "assign_request_processed",
//       "new_return_request",
//       "return_request_processed",
//       "new_report",
//       "report_processed"
//     ];

//     events.forEach(event => socket.on(event, fetchPendingCounts));

//     return () => {
//       events.forEach(event => socket.off(event, fetchPendingCounts));
//     };
//   }, []);

//   const menuItems = [
//     { path: '/Clerk', name: 'Dashboard', icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/item-managment', name: 'Item Management', icon: <ClipboardListIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/add-item', name: 'Add Item', icon: <BoxIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/give', name: 'Assign Items', icon: <UsersIcon className="h-5 w-5 mr-2" />, count: pendingAssignCount },
//     { path: '/Clerk/return', name: 'Pending Returns', icon: <ClipboardListIcon className="h-5 w-5 mr-2" />, count: pendingReturnCount },
//     { path: '/Clerk/report', name: 'Report', icon: <ClipboardListIcon className="h-5 w-5 mr-2" />, count: reportCount }
//   ];

//   return (
//     <>
//       {/* Mobile menu button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-md focus:outline-none"
//           style={{ backgroundColor: calPolyGreen, color: 'white' }}
//         >
//           {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
//         style={{ backgroundColor: calPolyGreen }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center justify-center h-16 px-4 border-b" style={{ borderColor: calPolyGold }}>
//             <h1 className="text-xl font-bold text-white">Smart IMS</h1>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map(item => (
//                 <li key={item.path} className="relative">
//                   <div className="relative">
//                     <Link
//                       to={item.path}
//                       className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
//                         location.pathname.startsWith(item.path)
//                           ? 'bg-white text-green-800 font-medium'
//                           : 'text-white hover:bg-green-700'
//                       }`}
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <div className="flex items-center">{item.icon}{item.name}</div>

//                       {/* Notification badge */}
//                       {item.count > 0 && (
//                         <span className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                           {item.count}
//                         </span>
//                       )}
//                     </Link>

//                     {/* Horizontal gold line for active item */}
//                     {location.pathname.startsWith(item.path) && (
//                       <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: calPolyGold }} />
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Logout */}
//           <div className="px-4 py-6 border-t" style={{ borderColor: calPolyGold }}>
//             <Link
//               to="/logout"
//               className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-green-700 transition-colors"
//             >
//               <LogOutIcon className="h-5 w-5 mr-2" /> Logout
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />}
//     </>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, UsersIcon, BoxIcon, ClipboardListIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
import axios from 'axios';
import { io } from "socket.io-client";

const calPolyGreen = '#154734';
const calPolyGold = '#C4820E';
const socket = io("http://localhost:5000");

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAssignCount, setPendingAssignCount] = useState(0);
  const [pendingReturnCount, setPendingReturnCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Fetch counts from backend
  const fetchPendingCounts = async () => {
    try {
      const [assignRes, returnRes, reportRes] = await Promise.all([
        axios.get('http://localhost:5000/api/requests/clerk/pending'),
        axios.get('http://localhost:5000/api/requests/clerk/pending-returns'),
        axios.get('http://localhost:5000/api/reports/pending')
      ]);
      setPendingAssignCount(assignRes.data.length || 0);
      setPendingReturnCount(returnRes.data.length || 0);
      setReportCount(reportRes.data.length || 0);
    } catch (err) {
      console.error("Error fetching pending counts:", err);
    }
  };

  useEffect(() => {
    fetchPendingCounts(); // initial fetch

    // Real-time updates
    const handleUpdate = () => fetchPendingCounts();

    const events = [
      "new_assign_request",
      "assign_request_processed",
      "new_return_request",
      "return_request_processed",
      "new_report",
      "report_processed"
    ];

    events.forEach(event => socket.on(event, handleUpdate));

    return () => {
      events.forEach(event => socket.off(event, handleUpdate));
    };
  }, []);

  const menuItems = [
    { path: '/Clerk', name: 'Dashboard', icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
    { path: '/Clerk/item-managment', name: 'Item Management', icon: <ClipboardListIcon className="h-5 w-5 mr-2" /> },
    { path: '/Clerk/add-item', name: 'Add Item', icon: <BoxIcon className="h-5 w-5 mr-2" /> },
    { path: '/Clerk/give', name: 'Assign Items', icon: <UsersIcon className="h-5 w-5 mr-2" />, count: pendingAssignCount },
    { path: '/Clerk/return', name: 'Pending Returns', icon: <ClipboardListIcon className="h-5 w-5 mr-2" />, count: pendingReturnCount },
    { path: '/Clerk/report', name: 'Report', icon: <ClipboardListIcon className="h-5 w-5 mr-2" />, count: reportCount }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md focus:outline-none"
          style={{ backgroundColor: calPolyGreen, color: 'white' }}
        >
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
        style={{ backgroundColor: calPolyGreen }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b" style={{ borderColor: calPolyGold }}>
            <h1 className="text-xl font-bold text-white">Smart IMS</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.path} className="relative">
                  <div className="relative">
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        location.pathname.startsWith(item.path)
                          ? 'bg-white text-green-800 font-medium'
                          : 'text-white hover:bg-green-700'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">{item.icon}{item.name}</div>

                      {/* Notification badge */}
                      {item.count > 0 && (
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          {item.count}
                        </span>
                      )}
                    </Link>

                    {/* Horizontal gold line for active item */}
                    {location.pathname.startsWith(item.path) && (
                      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: calPolyGold }} />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="px-4 py-6 border-t" style={{ borderColor: calPolyGold }}>
            <Link
              to="/logout"
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <LogOutIcon className="h-5 w-5 mr-2" /> Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />}
    </>
  );
};

export default Sidebar;
