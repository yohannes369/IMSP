// // Sidebar.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import styled from 'styled-components';
// import { FiUsers, FiActivity, FiSettings, FiHome, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
// import { motion } from 'framer-motion';

// const colors = {
//   primary: '#154734',
//   accent: '#2a7d4a',
//   white: '#ffffff',
//   dark: '#0d2e1f',
// };

// const SidebarContainer = styled(motion.div)`
//   width: ${props => props.collapsed ? '80px' : '250px'};
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
//     transform: ${props => props.mobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
//     width: 250px;
//   }
// `;

// const SidebarHeader = styled.div`
//   padding: 1.5rem;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//   display: flex;
//   align-items: center;
//   justify-content: ${props => props.collapsed ? 'center' : 'space-between'};
// `;

// const SidebarLogo = styled.div`
//   font-weight: 700;
//   font-size: 1.2rem;
//   display: ${props => props.collapsed ? 'none' : 'block'};
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
//   color: rgba(255, 255, 255, 0.8);
//   text-decoration: none;
//   font-weight: 500;
//   position: relative;

//   &:hover {
//     background: rgba(255, 255, 255, 0.05);
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
//   margin-right: ${props => props.collapsed ? '0' : '1rem'};
//   font-size: 1.2rem;
//   display: flex;
//   justify-content: center;
//   width: ${props => props.collapsed ? '100%' : 'auto'};
// `;

// const SidebarText = styled.span`
//   display: ${props => props.collapsed ? 'none' : 'block'};
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

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const Sidebar = ({ collapsed, toggleSidebar, mobileOpen, setMobileSidebarOpen }) => {
//   return (
//     <SidebarContainer collapsed={collapsed} mobileOpen={mobileOpen} initial={{ x: -250 }} animate={{ x: 0 }}>
//       <SidebarHeader collapsed={collapsed}>
//         <SidebarLogo collapsed={collapsed}>Admin Panel</SidebarLogo>
//       </SidebarHeader>

//       <SidebarMenu>
//         <SidebarItem>
//           <SidebarLink to="/admin" exact onClick={() => setMobileSidebarOpen(false)}>
//             <SidebarIcon collapsed={collapsed}><FiHome /></SidebarIcon>
//             <SidebarText collapsed={collapsed}>Dashboard</SidebarText>
//           </SidebarLink>
//         </SidebarItem>

//         <SidebarItem>
//           <SidebarLink to="/admin/users" onClick={() => setMobileSidebarOpen(false)}>
//             <SidebarIcon collapsed={collapsed}><FiUsers /></SidebarIcon>
//             <SidebarText collapsed={collapsed}>User Management</SidebarText>
//           </SidebarLink>
//         </SidebarItem>

//         <SidebarItem>
//           <SidebarLink to="/admin/settings" onClick={() => setMobileSidebarOpen(false)}>
//             <SidebarIcon collapsed={collapsed}><FiSettings /></SidebarIcon>
//             <SidebarText collapsed={collapsed}>System Settings</SidebarText>
//           </SidebarLink>
//         </SidebarItem>

//         <SidebarItem>
//           <SidebarLink to="/admin/reports" onClick={() => setMobileSidebarOpen(false)}>
//             <SidebarIcon collapsed={collapsed}><FiActivity /></SidebarIcon>
//             <SidebarText collapsed={collapsed}> Report</SidebarText>
//           </SidebarLink>
//         </SidebarItem>
//       </SidebarMenu>

//       <SidebarMenu style={{ position: 'absolute', bottom: 0, width: '100%' }}>
//         <SidebarItem>
//           <SidebarLink to="/logout" onClick={() => setMobileSidebarOpen(false)}>
//             <SidebarIcon collapsed={collapsed}><FiLogOut /></SidebarIcon>
//             <SidebarText collapsed={collapsed}>Logout</SidebarText>
//           </SidebarLink>
//         </SidebarItem>
//       </SidebarMenu>

//       <SidebarToggle onClick={toggleSidebar}>
//         {collapsed ? <FiMenu size={16} /> : <FiX size={16} />}
//       </SidebarToggle>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;
// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FiUsers, FiActivity, FiSettings, FiHome, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const colors = {
  primary: '#154734',
  accent: '#2a7d4a',
  white: '#ffffff',
  dark: '#0d2e1f',
  lightGray: 'rgba(255, 255, 255, 0.1)',
  mediumGray: 'rgba(255, 255, 255, 0.2)',
};

const SidebarContainer = styled(motion.div)`
  width: ${props => props.collapsed ? '80px' : '250px'};
  background: ${colors.dark};
  color: ${colors.white};
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    position: fixed;
    z-index: 100;
    height: 100vh;
    transform: ${props => props.mobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
    width: 250px;
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: ${props => props.collapsed ? 'center' : 'space-between'};
  min-height: 80px;
  box-sizing: border-box;
`;

const SidebarLogo = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  display: ${props => props.collapsed ? 'none' : 'block'};
  color: ${colors.white};
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const SidebarItem = styled.li`
  margin: 0;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.9rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${colors.white};
    padding-left: 1.7rem;
  }

  &.active {
    background: ${colors.primary};
    color: ${colors.white};

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: ${colors.accent};
    }
  }
`;

const SidebarIcon = styled.div`
  margin-right: ${props => props.collapsed ? '0' : '1rem'};
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  width: ${props => props.collapsed ? '100%' : 'auto'};
  transition: margin-right 0.3s ease;
`;

const SidebarText = styled.span`
  display: ${props => props.collapsed ? 'none' : 'block'};
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.2s ease;
`;

const SidebarToggle = styled.button`
  position: absolute;
  right: -15px;
  top: 20px;
  background: ${colors.white};
  border: 2px solid ${colors.accent};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${props => props.light ? colors.lightGray : colors.mediumGray};
  margin: ${props => props.light ? '0.5rem 0' : '1rem 0'};
  width: 100%;
`;

const SidebarFooter = styled.div`
  padding: 1rem 0;
  border-top: 1px solid ${colors.mediumGray};
`;

const SidebarSection = styled.div`
  margin: 1.5rem 0 0.5rem 0;
  padding: 0 1.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  display: ${props => props.collapsed ? 'none' : 'block'};
`;

const Sidebar = ({ collapsed, toggleSidebar, mobileOpen, setMobileSidebarOpen }) => {
  return (
    <SidebarContainer 
      collapsed={collapsed} 
      mobileOpen={mobileOpen} 
      initial={{ x: -250 }} 
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <SidebarHeader collapsed={collapsed}>
        <SidebarLogo collapsed={collapsed}>Admin Panel</SidebarLogo>
      </SidebarHeader>

      <Divider light />

      <SidebarMenu>
        <SidebarSection collapsed={collapsed}>Main</SidebarSection>
        <SidebarItem>
          <SidebarLink to="/admin" exact onClick={() => setMobileSidebarOpen(false)}>
            <SidebarIcon collapsed={collapsed}><FiHome /></SidebarIcon>
            <SidebarText collapsed={collapsed}>Dashboard</SidebarText>
          </SidebarLink>
        </SidebarItem>

        <Divider light />

        <SidebarSection collapsed={collapsed}>Management</SidebarSection>
        <SidebarItem>
          <SidebarLink to="/admin/users" onClick={() => setMobileSidebarOpen(false)}>
            <SidebarIcon collapsed={collapsed}><FiUsers /></SidebarIcon>
            <SidebarText collapsed={collapsed}>User Management</SidebarText>
          </SidebarLink>
        </SidebarItem>

        <SidebarItem>
          <SidebarLink to="/admin/reports" onClick={() => setMobileSidebarOpen(false)}>
            <SidebarIcon collapsed={collapsed}><FiActivity /></SidebarIcon>
            <SidebarText collapsed={collapsed}>Reports</SidebarText>
          </SidebarLink>
        </SidebarItem>

        <Divider light />

        <SidebarSection collapsed={collapsed}>Configuration</SidebarSection>
        {/* <SidebarItem>
          <SidebarLink to="/admin/settings" onClick={() => setMobileSidebarOpen(false)}>
            <SidebarIcon collapsed={collapsed}><FiSettings /></SidebarIcon>
            <SidebarText collapsed={collapsed}>System Settings</SidebarText>
          </SidebarLink>
        </SidebarItem> */}
      </SidebarMenu>

      <SidebarFooter>
        <Divider />
        <SidebarMenu>
          <SidebarItem>
            <SidebarLink to="/logout" onClick={() => setMobileSidebarOpen(false)}>
              <SidebarIcon collapsed={collapsed}><FiLogOut /></SidebarIcon>
              <SidebarText collapsed={collapsed}>Logout</SidebarText>
            </SidebarLink>
          </SidebarItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarToggle onClick={toggleSidebar}>
        {collapsed ? <FiMenu size={16} /> : <FiX size={16} />}
      </SidebarToggle>
    </SidebarContainer>
  );
};

export default Sidebar;