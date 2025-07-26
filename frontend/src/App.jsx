
// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ResetPassword from "./pages/ResetPassword";
// import Verify2FA from "./pages/Verify2FA";
// import Dashboard from "./pages/Dashboard";
// const App = () => {
//   return (
//     <div style={{ padding: 20 }}>
//       <nav style={{ marginBottom: 20 }}>
//         <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
//         <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
//         <Link to="/reset-password">Reset Password</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/verify-2fa" element={<Verify2FA />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

//correct one 


// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import Verify2FA from "./pages/Verify2FA";
// import Dashboard from "./pages/Dashboard";
// import VerifyEmail from "./pages/verify-email";
// const App = () => {
//   return (
//     <div style={{ padding: 20 }}>
//       <nav style={{ marginBottom: 20 }}>
//         <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
//         <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
//         <Link to="/forgot-password">Forgot Password</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/verify-2fa" element={<Verify2FA />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Verify2FA from "./pages/Verify2FA";
import VerifyEmail from "./pages/verify-email";

// Role-specific pages
import AdminPage from "./pages/AdminPage";
// import ManagerPage from "./pages/ManagerPage";
import ClerkPage from "./pages/ClerkPage";
import StaffPage from "./pages/StaffPage";

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
        <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
        <Link to="/forgot-password">Forgot Password</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Role-based Routes */}
        <Route path="/admin" element={<AdminPage />} />
        {/* <Route path="/manager" element={<ManagerPage />} /> */}
        <Route path="/clerk" element={<ClerkPage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </div>
  );
};

export default App;
