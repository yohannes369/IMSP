// // src/pages/ICT/ictD.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { LayoutDashboardIcon, UsersIcon, MenuIcon, XIcon, LogOutIcon } from "lucide-react";
// import { useState } from "react";

// const calPolyGreen = "#154734";
// const calPolyGold = "#C4820E";

// // Sidebar component
// const IctSidebar = () => {
//   const [isOpen, setIsOpen] = useState(true); // Sidebar open by default
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { path: "/ict", name: "Dashboard", icon: <LayoutDashboardIcon className="h-5 w-5 mr-2" /> },
//     { path: "/ictdashboared/ict", name: "Return request", icon: <UsersIcon className="h-5 w-5 mr-2" /> },
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
//                     onClick={() => setIsOpen(false)}
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
//       {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />}
//     </>
//   );
// };

// // Main ICT Dashboard page
// const ICTDashboard = ({ staffName }) => {
//   const currentHour = new Date().getHours();

//   const getGreeting = () => {
//     if (currentHour < 12) return "Good Morning";
//     if (currentHour < 18) return "Good Afternoon";
//     return "Good Evening";
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <IctSidebar />

//       {/* Main content */}
//       <main className="flex-1 ml-64 p-6 md:ml-64 transition-all duration-300">
//         <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-xl shadow-lg p-6 mb-6 text-gray-900">
//           <h1 className="text-3xl font-bold mb-2">
//             {getGreeting()}, {staffName || "Staff"}!
//           </h1>
//           <p className="text-md">
//             Welcome to the ICT Dashboard. Here you can monitor requests, manage inventory, and stay updated in real-time.
//           </p>
//         </div>

//         {/* Additional dashboard content can go here */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Example widgets */}
//           <div className="bg-white rounded-xl shadow p-4">Widget 1</div>
//           <div className="bg-white rounded-xl shadow p-4">Widget 2</div>
//           <div className="bg-white rounded-xl shadow p-4">Widget 3</div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ICTDashboard;
import React, { useState } from "react";
import IctSidebar from "./IctSidebar";

const ICTDashboard = ({ staffName }) => {
  const [isOpen, setIsOpen] = useState(true); // sidebar open by default
  const currentHour = new Date().getHours();

  const toggleSidebar = (value) => {
    if (typeof value === "boolean") setIsOpen(value);
    else setIsOpen(!isOpen);
  };

  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <IctSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <main className="flex-1 ml-64 p-6 md:ml-64 transition-all duration-300">
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-xl shadow-lg p-6 mb-6 text-gray-900">
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {staffName || "Staff"}!
          </h1>
          <p className="text-md">
            Welcome to the ICT Dashboard. Here you can monitor requests, manage
            inventory, and stay updated in real-time.
          </p>
        </div>

        {/* Example widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-4">Widget 1</div>
          <div className="bg-white rounded-xl shadow p-4">Widget 2</div>
          <div className="bg-white rounded-xl shadow p-4">Widget 3</div>
        </div>
      </main>
    </div>
  );
};

export default ICTDashboard;
