
// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboardIcon, 
//   FileTextIcon, 
//   UsersIcon,
//   ClipboardListIcon, 
//   BarChart2Icon, 
//   MenuIcon, 
//   XIcon, 
//   LogOutIcon 
// } from 'lucide-react';
// import { io } from 'socket.io-client';
// import axios from 'axios';

// const calPolyGreen = '#154734';
// const calPolyGold = '#C4820E';
// const socket = io('http://localhost:5000'); // Connect to backend Socket.IO

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [issuedCount, setIssuedCount] = useState(0); // Red badge count
//   const location = useLocation();
//   const pollingRef = useRef();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Fetch issued items from backend
//   const fetchIssuedItems = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/requests');
//       setIssuedCount(Array.isArray(res.data) ? res.data.length : 0);
//     } catch (err) {
//       console.error('Error fetching issued items:', err);
//     }
//   };

//   useEffect(() => {
//     fetchIssuedItems();

//     // Real-time updates using Socket.IO
//     socket.emit('joinClerk'); // Join clerk room
//     socket.on('new_issued_item', fetchIssuedItems);

//     pollingRef.current = setInterval(fetchIssuedItems, 5000);

//     return () => {
//       socket.off('new_issued_item', fetchIssuedItems);
//       clearInterval(pollingRef.current);
//     };
//   }, []);

//   const handleBadgeClick = () => {
//     setIssuedCount(0); // Reset count
//   };

//   const menuItems = [
//     { path: '/Clerk/cd', name: 'Dashboard', icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/item-managment', name: 'Item Management', icon: <UsersIcon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/issueitemform', name: 'Issued Items', icon: <ClipboardListIcon className="h-5 w-5 mr-2" />, count: issuedCount },
//     { path: '/Clerk/model22formlist', name: 'Model22 Form List', icon: <FileTextIcon className="h-5 w-5 mr-2" />, count: issuedCount },
//     { path: '/Clerk/repo', name: 'Report Make', icon: <BarChart2Icon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/InventoryReportsPage', name: 'Item Inventory Reports Page', icon: <BarChart2Icon className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/manager-approved-returns', name: 'manager-approved-returns', icon: <BarChart2Icon className="h-5 w-5 mr-2" /> },
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
//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map(item => (
//                 <li key={item.path} className="relative">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
//                       location.pathname.startsWith(item.path)
//                         ? 'bg-white text-green-800 font-medium'
//                         : 'text-white hover:bg-green-700'
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="flex items-center">
//                       {item.icon}
//                       {item.name}
//                     </div>

//                     {item.count > 0 && (
//                       <span
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleBadgeClick();
//                         }}
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold cursor-pointer"
//                         title="Click to clear"
//                       >
//                         {item.count}
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


// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Package, 
//   ClipboardList, 
//   FileText, 
//   BarChart2, 
//   TrendingUp,
//   PieChart,
//   RotateCcw,
//   Menu,
//   X,
//   LogOut 
// } from 'lucide-react';
// import { io } from 'socket.io-client';
// import axios from 'axios';

// const calPolyGreen = '#154734';
// const calPolyGold = '#C4820E';
// const socket = io('http://localhost:5000'); // Connect to backend Socket.IO

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [issuedCount, setIssuedCount] = useState(0); // Red badge count
//   const location = useLocation();
//   const pollingRef = useRef();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Fetch issued items from backend
//   const fetchIssuedItems = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/requests');
//       setIssuedCount(Array.isArray(res.data) ? res.data.length : 0);
//     } catch (err) {
//       console.error('Error fetching issued items:', err);
//     }
//   };

//   useEffect(() => {
//     fetchIssuedItems();

//     // Real-time updates using Socket.IO
//     socket.emit('joinClerk'); // Join clerk room
//     socket.on('new_issued_item', fetchIssuedItems);

//     pollingRef.current = setInterval(fetchIssuedItems, 5000);

//     return () => {
//       socket.off('new_issued_item', fetchIssuedItems);
//       clearInterval(pollingRef.current);
//     };
//   }, []);

//   const handleBadgeClick = () => {
//     setIssuedCount(0); // Reset count
//   };

//   const menuItems = [
//     { path: '/Clerk/cd', name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/item-managment', name: 'Item Management', icon: <Package className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/issueitemform', name: 'Issued Items', icon: <ClipboardList className="h-5 w-5 mr-2" />, count: issuedCount },
//     { path: '/Clerk/model22formlist', name: 'Model22 Form List', icon: <FileText className="h-5 w-5 mr-2" />, count: issuedCount },
//     { path: '/Clerk/repo', name: 'Report Make', icon: <TrendingUp className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/InventoryReportsPage', name: 'Item Inventory Reports Page', icon: <PieChart className="h-5 w-5 mr-2" /> },
//     { path: '/Clerk/manager-approved-returns', name: 'Manager Approved Returns', icon: <RotateCcw className="h-5 w-5 mr-2" /> },
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
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
//         style={{ backgroundColor: calPolyGreen }}
//       >
//         <div className="flex flex-col h-full border-t-4" style={{ borderColor: calPolyGold }}>
//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map(item => (
//                 <li key={item.path} className="relative">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
//                       location.pathname.startsWith(item.path)
//                         ? 'bg-white text-green-800 font-medium'
//                         : 'text-white hover:bg-green-700'
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="flex items-center">
//                       {item.icon}
//                       {item.name}
//                     </div>

//                     {item.count > 0 && (
//                       <span
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleBadgeClick();
//                         }}
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold cursor-pointer"
//                         title="Click to clear"
//                       >
//                         {item.count}
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
//               <LogOut className="h-5 w-5 mr-2" /> Logout
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
// correct

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  FileText, 
  BarChart2, 
  TrendingUp,
  PieChart,
  RotateCcw,
  Menu,
  X,
  LogOut 
} from 'lucide-react';
import { io } from 'socket.io-client';
import axios from 'axios';

const calPolyGreen = '#154734';
const calPolyGold = '#C4820E';
const socket = io('http://localhost:5000'); // Connect to backend Socket.IO

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [issuedCount, setIssuedCount] = useState(0); // Issued Items count
  const [approvedCount, setApprovedCount] = useState(0); // Manager Approved Returns count
  const location = useLocation();
  const pollingRef = useRef();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Fetch issued items from backend
  const fetchIssuedItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests');
      setIssuedCount(Array.isArray(res.data) ? res.data.length : 0);
    } catch (err) {
      console.error('Error fetching issued items:', err);
    }
  };

  // Fetch manager approved returns
  const fetchApprovedReturns = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/manager-approved-returns');
      setApprovedCount(Array.isArray(res.data) ? res.data.length : 0);
    } catch (err) {
      console.error('Error fetching approved returns:', err);
    }
  };

  useEffect(() => {
    fetchIssuedItems();
    fetchApprovedReturns();

    // Socket.IO for real-time updates
    socket.emit('joinClerk'); // Join clerk room
    socket.on('new_issued_item', fetchIssuedItems);
    socket.on('new_approved_return', fetchApprovedReturns);

    // Polling fallback every 5s
    pollingRef.current = setInterval(() => {
      fetchIssuedItems();
      fetchApprovedReturns();
    }, 5000);

    return () => {
      socket.off('new_issued_item', fetchIssuedItems);
      socket.off('new_approved_return', fetchApprovedReturns);
      clearInterval(pollingRef.current);
    };
  }, []);

  const handleIssuedBadgeClick = () => {
    setIssuedCount(0); // Reset count when clicked
  };

  const handleApprovedBadgeClick = () => {
    setApprovedCount(0); // Reset count when clicked
  };

  const menuItems = [
    { path: '/Clerk/cd', name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
    { path: '/Clerk/item-managment', name: 'Item Management', icon: <Package className="h-5 w-5 mr-2" /> },
    { path: '/Clerk/issueitemform', name: 'Issued Items', icon: <ClipboardList className="h-5 w-5 mr-2" />, count: issuedCount, onBadgeClick: handleIssuedBadgeClick },
    { path: '/Clerk/model22formlist', name: 'Model22 Form List', icon: <FileText className="h-5 w-5 mr-2" /> }, // No red badge
    { path: '/Clerk/repo', name: 'Report Make', icon: <TrendingUp className="h-5 w-5 mr-2" /> },
    { path: '/Clerk/InventoryReportsPage', name: 'Item Inventory Reports Page', icon: <PieChart className="h-5 w-5 mr-2" /> },
    { path: '/Clerk/manager-approved-returns', name: 'Manager Approved Returns', icon: <RotateCcw className="h-5 w-5 mr-2" />, count: approvedCount, onBadgeClick: handleApprovedBadgeClick },
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
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
        style={{ backgroundColor: calPolyGreen }}
      >
        <div className="flex flex-col h-full border-t-4" style={{ borderColor: calPolyGold }}>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.path} className="relative">
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      location.pathname.startsWith(item.path)
                        ? 'bg-white text-green-800 font-medium'
                        : 'text-white hover:bg-green-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {item.name}
                    </div>

                    {item.count > 0 && item.onBadgeClick && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          item.onBadgeClick();
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold cursor-pointer"
                        title="Click to clear"
                      >
                        {item.count}
                      </span>
                    )}
                  </Link>
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
              <LogOut className="h-5 w-5 mr-2" /> Logout
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
