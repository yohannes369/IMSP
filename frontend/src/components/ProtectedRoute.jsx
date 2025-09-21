// // src/components/ProtectedRoute.jsx
// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children, role }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     // Not logged in
//     return <Navigate to="/login" replace />;
//   }

//   if (role && user.role !== role) {
//     // Role mismatch
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Role mismatch
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;