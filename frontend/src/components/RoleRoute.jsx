// src/components/RoleRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

const RoleRoute = ({ allowedRoles, children }) => {
  if (!isAuthenticated()) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();
  if (!allowedRoles.includes(userRole)) {
    // Logged in but wrong role → redirect to home or unauthorized page
    return <Navigate to="/login" replace />;
  }

  return children; // Allowed, render the page
};

export default RoleRoute;
