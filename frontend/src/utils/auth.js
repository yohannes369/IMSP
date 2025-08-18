// src/utils/auth.js

// Mock functions (replace with real authentication logic)
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const getUserRole = () => {
  return localStorage.getItem("role"); // Example: "admin", "clerk", "staff", "manager"
};
