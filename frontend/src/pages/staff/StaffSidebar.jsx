// // src/components/StaffSidebar.jsx
// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import styled from 'styled-components';
// import {
//   FiHome,
//   FiClipboard,
//   FiClock,
//   FiBox,
//   FiPackage,
//   FiSettings,
//   FiMenu,
//   FiX,
//   FiLogOut,
// } from 'react-icons/fi';
// import { motion } from 'framer-motion';

// const colors = {
//   primary: '#1B5E20',  // dark green
//   accent: '#4CAF50',   // green accent
//   white: '#ffffff',
//   dark: '#0d2e1f',     // sidebar bg
// };

// const SidebarContainer = styled(motion.aside)`
//   width: ${props => (props.$collapsed ? '80px' : '250px')};
//   background: ${colors.dark};
//   color: ${colors.white};
//   transition: width 0.3s ease;
//   position: relative;
//   overflow: hidden;
//   flex-shrink: 0;

//   @media (max-width: 768px) {
//     position: fixed;
//     z-index: 100;
//     height: 100vh;
//     transform: ${props => (props.$mobileOpen ? 'translateX(0)' : 'translateX(-100%)')};
//     width: 250px;
//     top: 0;
//     left: 0;
//     transition: transform 0.3s ease;
//   }
// `;

// const SidebarHeader = styled.div`
//   padding: 1.5rem;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//   display: flex;
//   align-items: center;
//   justify-content: ${props => (props.$collapsed ? 'center' : 'space-between')};
// `;

// const SidebarLogo = styled.div`
//   font-weight: 700;
//   font-size: 1.2rem;
//   display: ${props => (props.$collapsed ? 'none' : 'block')};
// `;

// const SidebarMenu = styled.ul`
//   list-style: none;
//   padding: 1rem 0;
//   margin: 0;
// `;

// const SidebarItem = styled.li`
//   margin: 0.25rem 0;
// `;

// const SidebarLink = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   padding: 0.75rem 1.5rem;
//   color: rgba(255, 255, 255, 0.85);
//   text-decoration: none;
//   font-weight: 500;
//   position: relative;
//   outline: none;

//   &:hover {
//     background: rgba(255, 255, 255, 0.06);
//     color: ${colors.white};
//   }

//   &.active {
//     background: ${colors.primary};
//     color: ${colors.white};

//     &:before {
//       content: '';
//       position: absolute;
//       left: 0;
//       top: 0;
//       height: 100%;
//       width: 4px;
//       background: ${colors.accent};
//     }
//   }
// `;

// const SidebarIcon = styled.div`
//   margin-right: ${props => (props.$collapsed ? '0' : '1rem')};
//   font-size: 1.25rem;
//   display: flex;
//   justify-content: center;
//   width: ${props => (props.$collapsed ? '100%' : 'auto')};
//   line-height: 0;
// `;

// const SidebarText = styled.span`
//   display: ${props => (props.$collapsed ? 'none' : 'block')};
// `;

// const SidebarToggle = styled.button`
//   position: absolute;
//   right: -15px;
//   top: 20px;
//   background: ${colors.white};
//   border: 2px solid #e8f5e9;
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   cursor: pointer;
//   color: ${colors.primary};
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const MobileToggle = styled.button`
//   display: none;

//   @media (max-width: 768px) {
//     display: inline-flex;
//     position: fixed;
//     top: 16px;
//     left: 16px;
//     z-index: 110;
//     background: ${colors.primary};
//     color: ${colors.white};
//     width: 42px;
//     height: 42px;
//     border-radius: 12px;
//     align-items: center;
//     justify-content: center;
//     box-shadow: 0 6px 16px rgba(0,0,0,0.2);
//   }
// `;

// const MobileOverlay = styled(motion.div)`
//   @media (max-width: 768px) {
//     position: fixed;
//     inset: 0;
//     background: rgba(0,0,0,0.45);
//     z-index: 90;
//   }
// `;

// // Self-contained component (no external state required)
// const StaffSidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const closeMobile = () => setMobileOpen(false);

//   return (
//     <>
//       {/* Mobile hamburger */}
//       <MobileToggle
//         aria-label="Toggle sidebar"
//         onClick={() => setMobileOpen(prev => !prev)}
//       >
//         {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//       </MobileToggle>

//       {/* Mobile overlay */}
//       {mobileOpen && (
//         <MobileOverlay
//           onClick={closeMobile}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         />
//       )}

//       <SidebarContainer
//         $collapsed={collapsed}
//         $mobileOpen={mobileOpen}
//         initial={{ x: -250 }}
//         animate={{ x: 0 }}
//       >
//         <SidebarHeader $collapsed={collapsed}>
//           <SidebarLogo $collapsed={collapsed}>Staff Portal</SidebarLogo>
//         </SidebarHeader>

//         <SidebarMenu>
//           <SidebarItem>
//             <SidebarLink
//               to="/staff"
//               end
//               className={({ isActive }) => (isActive ? 'active' : '')}
//               onClick={closeMobile}
//             >
//               <SidebarIcon $collapsed={collapsed}><FiHome /></SidebarIcon>
//               <SidebarText $collapsed={collapsed}>Dashboard</SidebarText>
//             </SidebarLink>
//           </SidebarItem>

//           <SidebarItem>
//             <SidebarLink
//               to="/staff-request-form"
//               className={({ isActive }) => (isActive ? 'active' : '')}
//               onClick={closeMobile}
//             >
//               <SidebarIcon $collapsed={collapsed}><FiClipboard /></SidebarIcon>
//               <SidebarText $collapsed={collapsed}>Request Form</SidebarText>
//             </SidebarLink>
//           </SidebarItem>

//           <SidebarItem>
//             <SidebarLink
//               to="/staff-request-status"
//               className={({ isActive }) => (isActive ? 'active' : '')}
//               onClick={closeMobile}
//             >
//               <SidebarIcon $collapsed={collapsed}><FiClock /></SidebarIcon>
//               <SidebarText $collapsed={collapsed}>Request Status</SidebarText>
//             </SidebarLink>
//           </SidebarItem>

//           <SidebarItem>
//             <SidebarLink
//               to="/s"
//               className={({ isActive }) => (isActive ? 'active' : '')}
//               onClick={closeMobile}
//             >
//               <SidebarIcon $collapsed={collapsed}><FiBox /></SidebarIcon>
//               <SidebarText $collapsed={collapsed}>My Items</SidebarText>
//             </SidebarLink>
//           </SidebarItem>

//           {/* <SidebarItem>
//             <SidebarLink
//               to="/r"
//               className={({ isActive }) => (isActive ? 'active' : '')}
//               onClick={closeMobile}
//             >
//               <SidebarIcon $collapsed={collapsed}><FiPackage /></SidebarIcon>
//               <SidebarText $collapsed={collapsed}>Report</SidebarText>
//             </SidebarLink>
//           </SidebarItem> */}

//           <SidebarItem>
//             <SidebarLink
//               to="/langauge"
//               className={({ isActive }) => (isActive ? 'active' : '')}
//               onClick={closeMobile}
//             >
//               <SidebarIcon $collapsed={collapsed}><FiSettings /></SidebarIcon>
//               <SidebarText $collapsed={collapsed}>Settings</SidebarText>
//             </SidebarLink>
//           </SidebarItem>
//         </SidebarMenu>

//         <SidebarMenu style={{ position: 'absolute', bottom: 0, width: '100%' }}>
//           <SidebarItem>
//             <SidebarLink
//               to="/logout"
//               className={({ isActive }) => (isActive ? 'active' : '')}
//               onClick={closeMobile}
//             >
//               <SidebarIcon $collapsed={collapsed}><FiLogOut /></SidebarIcon>
//               <SidebarText $collapsed={collapsed}>Logout</SidebarText>
//             </SidebarLink>
//           </SidebarItem>
//         </SidebarMenu>

//         {/* Desktop collapse toggle */}
//         <SidebarToggle
//           aria-label="Collapse sidebar"
//           onClick={() => setCollapsed(prev => !prev)}
//         >
//           {collapsed ? <FiMenu size={16} /> : <FiX size={16} />}
//         </SidebarToggle>
//       </SidebarContainer>
//     </>
//   );
// };

// export default StaffSidebar;
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiHome, FiClipboard, FiClock, FiBox, FiSettings, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { io } from "socket.io-client";

// Connect to backend Socket.IO server
const socket = io("http://localhost:5000");

const StaffSidebar = ({ staffId }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [requestNotifications, setRequestNotifications] = useState(0);

  // Listen for manager updates
  useEffect(() => {
    const handleRequestUpdate = (data) => {
      // Increment notification only if this staff's request was updated
      if (data.staff_id === staffId && (data.status === "APPROVED" || data.status === "REJECTED")) {
        setRequestNotifications((prev) => prev + 1);
      }
    };

    socket.on("update_request", handleRequestUpdate);
    return () => socket.off("update_request", handleRequestUpdate);
  }, [staffId]);

  // Reset notifications when staff opens the Request Status page
  useEffect(() => {
    if (location.pathname === "/staff-request-status") {
      setRequestNotifications(0);
    }
  }, [location.pathname]);

  const toggleSidebar = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const menuItems = [
    { path: "/staff", name: "Dashboard", icon: <FiHome /> },
    { path: "/staff-request-form", name: "Request Form", icon: <FiClipboard /> },
    { path: "/staff-request-status", name: "Request Status", icon: <FiClock />, hasNotification: true },
    { path: "/my-items", name: "My Items", icon: <FiBox /> },
    { path: "/settings", name: "Settings", icon: <FiSettings /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-800 text-white p-2 rounded"
        onClick={toggleSidebar}
      >
        {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobile} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-green-900 text-white z-50 transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-green-700">
          {!collapsed && <span className="font-bold text-lg">Staff Portal</span>}
          <button className="md:block hidden text-white" onClick={() => setCollapsed((prev) => !prev)}>
            {collapsed ? <FiMenu /> : <FiX />}
          </button>
        </div>

        {/* Menu */}
        <ul className="flex-1 py-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 hover:bg-green-800 transition-colors relative 
                  ${isActive ? "bg-green-800 font-semibold" : ""}`
                }
                onClick={closeMobile}
              >
                <div className="mr-3 text-lg">{item.icon}</div>
                {!collapsed && <span>{item.name}</span>}

                {/* Notification badge */}
                {item.hasNotification && requestNotifications > 0 && (
                  <span className="absolute right-4 top-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {requestNotifications}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mb-4 px-4">
          <NavLink
            to="/logout"
            className="flex items-center px-4 py-3 hover:bg-green-800 transition-colors"
            onClick={closeMobile}
          >
            <FiLogOut className="mr-3 text-lg" />
            {!collapsed && <span>Logout</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default StaffSidebar;
