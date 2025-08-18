import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './Sidebar'; // Import Sidebar
import { FiUsers, FiUserCheck, FiUserX, FiActivity, FiClock } from 'react-icons/fi';

// Styled Components
const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f5e9 0%, #d4edda 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2.5rem;
  margin-left: ${props => props.collapsed ? '80px' : '250px'};
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1.5rem;
    padding-top: 5rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => props.color || '#154734'};
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.color || '#154734'}, transparent);
    opacity: 0.3;
  }
`;

const StatNumber = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #154734;
  margin: 0.5rem 0;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: ${props => props.color || '#154734'};
  margin-bottom: 0.5rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #154734;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  color: #dc3545;
  background: #f8d7da;
  border-radius: 8px;
  margin-top: 1rem;
`;

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    recentLogins: 0,
    avgSessionTime: 0,
    rolesCount: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/admin/users');
      const users = res.data;

      // Calculate stats
      const totalUsers = users.length;
      const activeUsers = users.filter(u => u.isActive).length;
      const inactiveUsers = totalUsers - activeUsers;
      const recentLogins = users.filter(u => {
        const lastLogin = new Date(u.lastLogin);
        const now = new Date();
        return (now - lastLogin) / (1000 * 60 * 60) <= 24; // Last 24 hours
      }).length;
      const avgSessionTime = users.reduce((acc, u) => acc + (u.sessionDuration || 0), 0) / totalUsers || 0;
      const rolesCount = users.reduce((acc, u) => {
        acc[u.role] = (acc[u.role] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalUsers,
        activeUsers,
        inactiveUsers,
        recentLogins,
        avgSessionTime: Math.round(avgSessionTime / 60), // Convert to minutes
        rolesCount
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: <FiUsers />, color: '#154734' },
    { label: 'Active Users', value: stats.activeUsers, icon: <FiUserCheck />, color: '#28a745' },
    { label: 'Inactive Users', value: stats.inactiveUsers, icon: <FiUserX />, color: '#dc3545' },
    { label: 'Recent Logins (24h)', value: stats.recentLogins, icon: <FiActivity />, color: '#007bff' },
    { label: 'Avg Session Time (min)', value: stats.avgSessionTime, icon: <FiClock />, color: '#ffc107' }
  ];

  return (
    <DashboardLayout>
      <Sidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      <MainContent collapsed={sidebarCollapsed}>
        <h1 style={{ fontSize: '2rem', color: '#154734', marginBottom: '1rem' }}>
          Admin Dashboard
        </h1>

        {loading && <LoadingSpinner>Loading dashboard data...</LoadingSpinner>}
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

        {!loading && !error && (
          <StatsGrid>
            {statCards.map((card, index) => (
              <StatCard key={index} color={card.color} role="region" aria-label={card.label}>
                <IconWrapper color={card.color}>{card.icon}</IconWrapper>
                <StatNumber>{card.value}</StatNumber>
                <StatLabel>{card.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        )}
      </MainContent>
    </DashboardLayout>
  );
};

export default AdminDashboard;