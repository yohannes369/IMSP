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
};

const SidebarContainer = styled(motion.div)`
  width: ${props => props.collapsed ? '80px' : '250px'};
  background: ${colors.dark};
  color: ${colors.white};
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 768px) {
    position: fixed;
    z-index: 100;
    height: 100vh;
    transform: ${props => props.mobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
    width: 250px;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: ${props => props.collapsed ? 'center' : 'space-between'};
`;

const SidebarLogo = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  display: ${props => props.collapsed ? 'none' : 'block'};
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 1rem 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  margin: 0.25rem 0;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${colors.white};
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
`;

const SidebarText = styled.span`
  display: ${props => props.collapsed ? 'none' : 'block'};
`;

const SidebarToggle = styled.button`
  position: absolute;
  right: -15px;
  top: 20px;
  background: ${colors.white};
  border: 2px solid #e8f5e9;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  color: ${colors.primary};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({ collapsed, toggleSidebar, mobileOpen, setMobileSidebarOpen }) => {
  return (
    <SidebarContainer collapsed={collapsed} mobileOpen={mobileOpen} initial={{ x: -250 }} animate={{ x: 0 }}>
      <SidebarHeader collapsed={collapsed}>
        <SidebarLogo collapsed={collapsed}>Admin Panel</SidebarLogo>
      </SidebarHeader>

      <SidebarMenu>
        <SidebarItem>
          <SidebarLink to="/admin" exact onClick={() => setMobileSidebarOpen(false)}>
            <SidebarIcon collapsed={collapsed}><FiHome /></SidebarIcon>
            <SidebarText collapsed={collapsed}>Dashboard</SidebarText>
          </SidebarLink>
        </SidebarItem>

        <SidebarItem>
          <SidebarLink to="/admin/users" onClick={() => setMobileSidebarOpen(false)}>
            <SidebarIcon collapsed={collapsed}><FiUsers /></SidebarIcon>
            <SidebarText collapsed={collapsed}>User Management</SidebarText>
          </SidebarLink>
        </SidebarItem>

        <SidebarItem>
          <SidebarLink to="/admin/settings" onClick={() => setMobileSidebarOpen(false)}>
            <SidebarIcon collapsed={collapsed}><FiSettings /></SidebarIcon>
            <SidebarText collapsed={collapsed}>System Settings</SidebarText>
          </SidebarLink>
        </SidebarItem>

        <SidebarItem>
          <SidebarLink to="/admin/reports" onClick={() => setMobileSidebarOpen(false)}>
            <SidebarIcon collapsed={collapsed}><FiActivity /></SidebarIcon>
            <SidebarText collapsed={collapsed}> Report</SidebarText>
          </SidebarLink>
        </SidebarItem>
      </SidebarMenu>

      <SidebarMenu style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <SidebarItem>
          <SidebarLink to="/logout" onClick={() => setMobileSidebarOpen(false)}>
            <SidebarIcon collapsed={collapsed}><FiLogOut /></SidebarIcon>
            <SidebarText collapsed={collapsed}>Logout</SidebarText>
          </SidebarLink>
        </SidebarItem>
      </SidebarMenu>

      <SidebarToggle onClick={toggleSidebar}>
        {collapsed ? <FiMenu size={16} /> : <FiX size={16} />}
      </SidebarToggle>
    </SidebarContainer>
  );
};

export default Sidebar;
