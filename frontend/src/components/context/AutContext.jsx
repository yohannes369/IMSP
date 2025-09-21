// // src/context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('inventoryUser');
//     if (storedUser) {
//       try {
//         setCurrentUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error('Failed to parse user data', error);
//         localStorage.removeItem('inventoryUser');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const user = {
//         id: `user-${Date.now()}`,
//         email: credentials.email,
//         role: credentials.role || 'staff',
//         name: credentials.name || 'User',
//         token: `mock-token-${Math.random().toString(36).substring(2, 15)}`
//       };
      
//       setCurrentUser(user);
//       localStorage.setItem('inventoryUser', JSON.stringify(user));
      
//       const redirectPath = {
//         admin: '/admin',
//         clerk: '/clerk',
//         manager: '/manager',
//         staff: '/staff'
//       }[user.role] || '/';
      
//       navigate(redirectPath);
//       return { success: true };
//     } catch (error) {
//       console.error('Login failed', error);
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem('inventoryUser');
//     navigate('/login');
//   };

//   const hasRole = (requiredRole) => {
//     if (!currentUser) return false;
//     return currentUser.role === 'admin' || currentUser.role === requiredRole;
//   };

//   const value = {
//     currentUser,
//     loading,
//     login,
//     logout,
//     hasRole
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('inventoryUser');
//     if (storedUser) {
//       try {
//         setCurrentUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error('Failed to parse user data', error);
//         localStorage.removeItem('inventoryUser');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const user = {
//         id: `user-${Date.now()}`,
//         email: credentials.email,
//         role: credentials.role || 'staff',
//         name: credentials.name || 'User',
//         token: `mock-token-${Math.random().toString(36).substring(2, 15)}`
//       };

//       setCurrentUser(user);
//       localStorage.setItem('inventoryUser', JSON.stringify(user));

//       const redirectPath = {
//         admin: '/admin',
//         clerk: '/clerk',
//         manager: '/manager',
//         staff: '/staff'
//       }[user.role] || '/';

//       navigate(redirectPath);
//       return { success: true };
//     } catch (error) {
//       console.error('Login failed', error);
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem('inventoryUser');
//     navigate('/login');
//   };

//   const hasRole = (requiredRole) => {
//     if (!currentUser) return false;
//     return currentUser.role === 'admin' || currentUser.role === requiredRole;
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, loading, login, logout, hasRole }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for easier context consumption
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create Auth context
// const AuthContext = createContext();

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     const userData = localStorage.getItem("user");
//     if (token && role && userData) {
//       setUser({ token, role, ...JSON.parse(userData) });
//     }
//     setLoading(false);
//   }, []);

//   const login = ({ token, user }) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("role", user.role);
//     localStorage.setItem("user", JSON.stringify(user));
//     setUser({ token, ...user });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };
// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create AuthContext
export const AuthContext = createContext();

// 2. Create AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user from localStorage or API
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easier use in components
export const useAuth = () => useContext(AuthContext);
