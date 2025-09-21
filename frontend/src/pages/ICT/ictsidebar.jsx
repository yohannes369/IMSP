
// import React from "react";
// import { Package } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import { LayoutDashboardIcon, UsersIcon, MenuIcon, XIcon, LogOutIcon } from "lucide-react";

// const calPolyGreen = "#154734";
// const calPolyGold = "#C4820E";

// const IctSidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();

//   const menuItems = [
//     { path: "/ict", name: "Dashboard", icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
//    { path: "/ictdashboared/ict", name: "Return request", icon: <Package className="h-5 w-5 mr-2" /> },
//     // Add more menu items here
//   ];

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-md focus:outline-none"
//           style={{ backgroundColor: calPolyGreen, color: "white" }}
//         >
//           {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
//         style={{ backgroundColor: calPolyGreen }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center px-4 py-4 border-b" style={{ borderColor: calPolyGold }}>
//             <span className="text-white font-bold text-lg">ICT Dashboard</span>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map((item) => (
//                 <li key={item.path}>
//                   <Link
//                     to={item.path}
//                     className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
//                       location.pathname.startsWith(item.path)
//                         ? "bg-white text-green-800 font-medium"
//                         : "text-white hover:bg-green-700"
//                     }`}
//                     onClick={() => toggleSidebar(false)}
//                   >
//                     {item.icon}
//                     {item.name}
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
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => toggleSidebar(false)}
//         />
//       )}
//     </>
//   );
// };

// export default IctSidebar;
// import React, { useEffect, useState } from "react";
// import { Package, Bell } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import { LayoutDashboardIcon, MenuIcon, XIcon, LogOutIcon } from "lucide-react";
// import axios from "axios";

// const calPolyGreen = "#154734";
// const calPolyGold = "#C4820E";

// const IctSidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();
//   const [hasNewReturn, setHasNewReturn] = useState(false);

//   // Polling to check for new pending returns every 5 seconds
//   useEffect(() => {
//     const checkNewReturns = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/returns");
//         const pending = res.data.filter(r => r.status === "Pending");
//         setHasNewReturn(pending.length > 0); // bell only shows if pending requests exist
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     checkNewReturns(); // initial check
//     const interval = setInterval(checkNewReturns, 5000); // poll every 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const menuItems = [
//     { path: "/ict", name: "Dashboard", icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
//     { 
//       path: "/ictdashboared/ict", 
//       name: "Return request", 
//       icon: <Package className="h-5 w-5 mr-2" />,
//       hasNotification: hasNewReturn
//     },
//   ];

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => toggleSidebar(!isOpen)}
//           className="p-2 rounded-md focus:outline-none"
//           style={{ backgroundColor: calPolyGreen, color: "white" }}
//         >
//           {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
//         style={{ backgroundColor: calPolyGreen }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center px-4 py-4 border-b" style={{ borderColor: calPolyGold }}>
//             <span className="text-white font-bold text-lg">ICT Dashboard</span>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map((item) => (
//                 <li key={item.path} className="relative flex items-center">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
//                       location.pathname.startsWith(item.path)
//                         ? "bg-white text-green-800 font-medium"
//                         : "text-white hover:bg-green-700"
//                     }`}
//                     onClick={() => toggleSidebar(false)}
//                   >
//                     {item.icon}
//                     {item.name}
//                   </Link>

//                   {/* Red Bell Notification */}
//                   {item.hasNotification && (
//                     <Bell
//                       className="ml-2 text-red-600 animate-pulse cursor-pointer absolute right-4"
//                     />
//                   )}
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
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => toggleSidebar(false)}
//         />
//       )}
//     </>
//   );
// };

// export default IctSidebar;
import React, { useEffect, useState } from "react";
import { Package, Bell as BellIcon, LayoutDashboardIcon, MenuIcon, XIcon, LogOutIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const calPolyGreen = "#154734";
const calPolyGold = "#C4820E";

const IctSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [hasNewReturn, setHasNewReturn] = useState(false);

  // Polling to check for new pending returns every 5 seconds
  useEffect(() => {
    const checkNewReturns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/returns");
        const pending = res.data.filter(r => r.status === "Pending");
        setHasNewReturn(pending.length > 0);
      } catch (err) {
        console.error(err);
      }
    };

    checkNewReturns(); // initial check
    const interval = setInterval(checkNewReturns, 5000); // poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { path: "/ict", name: "Dashboard", icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
    { 
      path: "/ictdashboared/ict", 
      name: "Return request", 
      icon: <Package className="h-5 w-5 mr-2" />,
      hasNotification: hasNewReturn
    },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => toggleSidebar(!isOpen)}
          className="p-2 rounded-md focus:outline-none"
          style={{ backgroundColor: calPolyGreen, color: "white" }}
        >
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out z-40 w-64`}
        style={{ backgroundColor: calPolyGreen }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center px-4 py-4 border-b" style={{ borderColor: calPolyGold }}>
            <span className="text-white font-bold text-lg">ICT Dashboard</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path} className="relative flex items-center">
                  <Link
                    to={item.path}
                    className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                      location.pathname.startsWith(item.path)
                        ? "bg-white text-green-800 font-medium"
                        : "text-white hover:bg-green-700"
                    }`}
                    onClick={() => toggleSidebar(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>

                  {/* Red Filled Bell Notification */}
                  {item.hasNotification && (
                    <BellIcon
                      className="ml-2 absolute right-4 cursor-pointer animate-pulse"
                      size={20}
                      color="red"
                      fill="red"
                    />
                  )}
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}
    </>
  );
};

export default IctSidebar;
