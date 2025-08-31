


// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   FaTh, 
//   FaUsers, 
//   FaBoxes, 
//   FaClipboardList, 
//   FaSignOutAlt,
//   FaBars,
//   FaTimes
// } from 'react-icons/fa';
// import axios from 'axios';

// const calPolyGreen = '#154734';
// const calPolyGold = '#C4820E';

// const ManagerSidebar = () => {
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
//     { path: '/mdashboard', name: 'Dashboard', icon: <FaTh className="mr-2" /> },
//     { path: '/manager/request', name: 'Requests', icon: <FaClipboardList className="mr-2" />, hasNotification: true },
//     // { path: '/manager/inventory', name: 'Inventory', icon: <FaBoxes className="mr-2" /> },
//     // { path: '/manager/staff', name: 'Staff', icon: <FaUsers className="mr-2" /> },
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
//           {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
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
//                   <div className="relative">
//                     <Link
//                       to={item.path}
//                       className={`flex items-center px-4 py-3 rounded-lg transition-colors
//                         ${location.pathname === item.path 
//                           ? 'bg-white text-green-800 font-medium' 
//                           : 'text-white hover:bg-green-700'}`}
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {item.icon}
//                       {item.name}

//                       {/* Red notification badge */}
//                       {item.hasNotification && pendingCount > 0 && (
//                         <span className="absolute right-4 top-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                           {pendingCount}
//                         </span>
//                       )}
//                     </Link>
//                     {/* Horizontal orange line for active item */}
//                     {location.pathname === item.path && (
//                       <div 
//                         className="absolute bottom-0 left-0 right-0 h-1"
//                         style={{ backgroundColor: calPolyGold }}
//                       />
//                     )}
//                   </div>
//                 </li>
//               ))}

//               {/* Logout immediately after Requests */}
//               <li className="relative">
//                 <Link
//                   to="/logout"
//                   className="flex items-center px-4 py-3 rounded-lg text-white hover:bg-green-700 transition-colors"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <FaSignOutAlt className="mr-2" />
//                   Logout
//                 </Link>
//               </li>
//             </ul>
//           </nav>
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

// export default ManagerSidebar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTh, 
  FaUsers, 
  FaBoxes, 
  FaClipboardList, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import axios from 'axios';
import { io } from 'socket.io-client';

const calPolyGreen = '#154734';
const calPolyGold = '#C4820E';

const socket = io('http://localhost:5000'); // connect to backend Socket.IO

const ManagerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Fetch pending requests count from backend
  const fetchPending = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests/manager/pending');
      setPendingCount(res.data.length || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPending();
    const interval = setInterval(fetchPending, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // Listen for real-time new requests
  useEffect(() => {
    const handleNewRequest = () => {
      setPendingCount(prev => prev + 1);
    };
    socket.on('new_request', handleNewRequest);

    return () => {
      socket.off('new_request', handleNewRequest);
    };
  }, []);

  const menuItems = [
    { path: '/mdashboard', name: 'Dashboard', icon: <FaTh className="mr-2" /> },
    { path: '/manager/request', name: 'Requests', icon: <FaClipboardList className="mr-2" />, hasNotification: true },
    // { path: '/manager/inventory', name: 'Inventory', icon: <FaBoxes className="mr-2" /> },
    // { path: '/manager/staff', name: 'Staff', icon: <FaUsers className="mr-2" /> },
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
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
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
              {menuItems.map((item) => (
                <li key={item.path} className="relative">
                  <div className="relative">
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors
                        ${location.pathname === item.path 
                          ? 'bg-white text-green-800 font-medium' 
                          : 'text-white hover:bg-green-700'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      {item.name}

                      {/* Red notification badge for pending requests */}
                      {item.hasNotification && pendingCount > 0 && (
                        <span className="absolute right-4 top-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          {pendingCount}
                        </span>
                      )}
                    </Link>

                    {/* Horizontal orange line for active item */}
                    {location.pathname === item.path && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ backgroundColor: calPolyGold }}
                      />
                    )}
                  </div>
                </li>
              ))}

              {/* Logout */}
              <li className="relative">
                <Link
                  to="/logout"
                  className="flex items-center px-4 py-3 rounded-lg text-white hover:bg-green-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default ManagerSidebar;
