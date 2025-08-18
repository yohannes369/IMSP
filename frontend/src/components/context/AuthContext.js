// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('inventoryUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('inventoryUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const user = {
        id: `user-${Date.now()}`,
        email: credentials.email,
        role: credentials.role || 'staff',
        name: credentials.name || 'User',
        token: `mock-token-${Math.random().toString(36).substring(2, 15)}`
      };
      
      setCurrentUser(user);
      localStorage.setItem('inventoryUser', JSON.stringify(user));
      
      const redirectPath = {
        admin: '/admin',
        clerk: '/clerk',
        manager: '/manager',
        staff: '/staff'
      }[user.role] || '/';
      
      navigate(redirectPath);
      return { success: true };
    } catch (error) {
      console.error('Login failed', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('inventoryUser');
    navigate('/login');
  };

  const hasRole = (requiredRole) => {
    if (!currentUser) return false;
    return currentUser.role === 'admin' || currentUser.role === requiredRole;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};