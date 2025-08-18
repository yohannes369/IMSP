
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

//corect one

// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import "./components/i18n/i18n"; // Import i18n configuration
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import ResetPassword from "./pages/Auth/ResetPassword";
// import Verify2FA from "./pages/Auth/Verify2FA";
// import VerifyEmail from "./pages/Auth/verify-email";

// // Role-specific pages

// import AdminDashboard from "./pages/admin/AdminDashboard"
// import AdminPage from "./pages/admin/UserManagment";
// // import ManagerPage from "./pages/ManagerPage";


// //clerk

// import ClerkPage from "./pages/clerk/ClerkPage";


// import UpdateItem from './pages/clerk/UpdateItem';
// import AddItemPage from './pages/clerk/AddItemPage';
// import  GiveItemToStaff from './pages/clerk/GiveItemToStaff';
// import ClerkPendingReturns  from'./pages/clerk/c'



// // import ManagerReview from './pages/manager/ManagerReview';

// //staff
// import StaffPage from "./pages/staff/StaffPage";


// import StaffRequestForm from './pages/staff/StaffRequestForm';
// import StaffRequestStatus from './pages/staff/StaffRequestStatus';
// import StaffGivenItems from './pages/staff/s';
// import  ItemRequests from './pages/staff/ItemRequests';

// import ManagerReview from './pages/manager/ManagerReview';
// // import ClerkReview from './components/ClerkReview';
// // import BarcodeScanner from './pages/BarcodeScanner';


// // import ClerkGiveItem from './components/ClerkGiveItem';
// // import StaffAcknowledgeItem from './components/StaffAcknowledgeItem';
// // import Navigation from './components/Navigation';


// // import ClerkPendingReturns  from'./components/c'
// import Home from "./components/Home";
// import  About from "./components/About"
// import Service from "./components/Service"
// import Contact from "./components/Contact"
// const App = () => {
//   return (
//     <div style={{ padding: 20 }}>
//       {/* <nav style={{ marginBottom: 20 }}>
//         <Link to="/navigation" style={{ marginRight: 10 }}></Link>
//         <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
//         <Link to="/forgot-password">Forgot Password</Link>
//       </nav> */}

//       <Routes>
//          {/* <Route path="/navigation" element={<Navigation />} /> */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/verify-2fa" element={<Verify2FA />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />

//         {/* Role-based Routes */}
//         <Route path="/AdminDashboard/users" element={<AdminPage />} />
//           <Route path="/AdminDashboard" element={<AdminDashboard />} />


//         {/* <Route path="/manager" element={<ManagerPage />} /> */}
//         <Route path="/clerk" element={<ClerkPage />} />
//         <Route path="/staff" element={<StaffPage />} />
//         <Route path="/add-item" element={<AddItemPage />} />
//   <Route path="/update-item/:id" element={<UpdateItem />} />
//         <Route path="/item-requests" element={<ItemRequests />} />  
//         <Route path="/manager" element={<ManagerReview />} />





//         <Route path="/staff-request-form" element={<StaffRequestForm />} />
//         <Route path="/staff-request-status" element={<StaffRequestStatus />} />
//         <Route path="/manager-review" element={<ManagerReview />} />
//         {/* <Route path="/clerk-review" element={<ClerkReview />} />   */}

//         {/* <Route path="/clerk-give-item" element={<ClerkGiveItem />} /> */}
//         {/* <Route path="/staff-acknowledge-item" element={<StaffAcknowledgeItem />} /> */}
       
//         <Route path="/give" element={<GiveItemToStaff />} />
//         <Route path="/home" element={<Home />} />
//              <Route path="/about" element={<About />} />
//             < Route path="/services" element={<Service />} />
//             < Route path="/contact" element={<Contact />} />
               
               

//           <Route path="/s" element={<StaffGivenItems />} />
//              <Route path="/c" element={<ClerkPendingReturns />} />

//         {/* <Route path="/barcode" element={<BarcodeScanner />} /> */}
//         {/* Default route */}

//       </Routes>
//     </div>
//   );
// };

// export default App;


// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from './components/context/AuthContext';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import Verify2FA from './pages/Verify2FA';
// import VerifyEmail from './pages/verify-email';
// import Unauthorized from './pages/Unauthorized';
// // import NotFound from './pages/NotFound';
// import Home from './pages/Home';

// // Role-specific pages
// import AdminPage from './pages/AdminPage';
// import ClerkPage from './pages/ClerkPage';
// import StaffPage from './pages/StaffPage';
// import AddItemPage from './pages/AddItemPage';
// import UpdateItem from './pages/UpdateItem';
// import ItemRequests from './pages/ItemRequests';

// // Components
// import StaffRequestForm from './components/StaffRequestForm';
// import ManagerReview from './components/ManagerReview';
// import ClerkReview from './components/ClerkReview';
// import Navigation from './components/Navigation';
// import GiveItemToStaff from './components/GiveItemToStaff';

// const App = () => {
//   const { currentUser } = useAuth();
//   const location = useLocation();

//   const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
//   const shouldShowNav = !authRoutes.includes(location.pathname);

//   return (
//     <div className="app-container">
//       {shouldShowNav && <Navigation />}
      
//       <main className="content">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/verify-2fa" element={<Verify2FA />} />
//           <Route path="/verify-email" element={<VerifyEmail />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />
          
//           {/* Protected Routes */}
//           <Route path="/admin" element={
//             currentUser?.role === 'admin' ? <AdminPage /> : <Navigate to="/unauthorized" replace />
//           } />
          
//           <Route path="/clerk" element={
//             currentUser?.role === 'clerk' ? <ClerkPage /> : <Navigate to="/unauthorized" replace />
//           } />
          
//           <Route path="/staff" element={
//             currentUser?.role === 'staff' ? <StaffPage /> : <Navigate to="/unauthorized" replace />
//           } />
          
//           <Route path="/manager" element={
//             currentUser?.role === 'manager' ? <ManagerReview /> : <Navigate to="/unauthorized" replace />
//           } />
          
//           <Route path="/add-item" element={
//             currentUser ? <AddItemPage /> : <Navigate to="/login" state={{ from: location }} replace />
//           } />
          
//           <Route path="/update-item/:id" element={
//             currentUser ? <UpdateItem /> : <Navigate to="/login" state={{ from: location }} replace />
//           } />
          
//           <Route path="/item-requests" element={
//             currentUser ? <ItemRequests /> : <Navigate to="/login" state={{ from: location }} replace />
//           } />
          
//           <Route path="/staff-request-form" element={
//             currentUser?.role === 'staff' ? <StaffRequestForm /> : <Navigate to="/unauthorized" replace />
//           } />
          
//           <Route path="/give" element={
//             currentUser?.role === 'clerk' ? <GiveItemToStaff /> : <Navigate to="/unauthorized" replace />
//           } />
          
//           {/* <Route path="*" element={<NotFound />} /> */}
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default App;


// corect one 

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./components/i18n/i18n"; // Import i18n configuration

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Verify2FA from "./pages/Auth/Verify2FA";
import VerifyEmail from "./pages/Auth/verify-email";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPage from "./pages/admin/UserManagment";
import AdminReports  from "./pages/admin/AdminReports";

// Clerk Pages
import ClerkDashboard from "./pages/clerk/ClerkDashboard";
import ClerkPage from "./pages/clerk/ClerkPage";
import UpdateItem from "./pages/clerk/UpdateItem";
import AddItemPage from "./pages/clerk/AddItemPage";
import GiveItemToStaff from "./pages/clerk/GiveItemToStaff";
import ClerkPendingReturns from './pages/clerk/c';
import ForecastItem from  './pages/clerk/ForecastItem';
// import ClerkReportDashboard from  './pages/clerk/ClerkReportDashboard';
// import ForecastItem from  './pages/clerk/ForecastItem';

// Staff Pages
import StaffPage from "./pages/staff/StaffPage";
import StaffRequestForm from './pages/staff/StaffRequestForm';
import StaffRequestStatus from './pages/staff/StaffRequestStatus';
import StaffGivenItems from './pages/staff/s';
import ItemRequests from './pages/staff/ItemRequests';

// Manager Pages
import ManagerReview from './pages/manager/ManagerReview';
import ManagerDashboard from  './pages/manager/ManagerDashboard';

// Public Pages
import Home from "./components/Home";
import About from "./components/About";
import Service from "./components/Service";
import Contact from "./components/Contact";

const App = () => {
  return (
    // Remove all padding/margin, full width and height
    <div className="m-0 p-0 w-full min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminPage />} />
        <Route path="/admin/reports" element={<AdminReports />} />

        {/* Clerk Routes */}
        
          <Route path="/Clerk" element={<ClerkDashboard />} />
        <Route path="Clerk/item-managment" element={<ClerkPage />} />
        <Route path="Clerk/add-item" element={<AddItemPage />} />
        <Route path="Clerk/update-item/:id" element={<UpdateItem />} />
        <Route path="Clerk/give" element={<GiveItemToStaff />} />
        <Route path="Clerk/return" element={<ClerkPendingReturns />} />
               <Route path="/for" element={<ForecastItem />} />
        {/* <Route path="/Clerk/report" element={<ClerkReportDashboard />} /> */}
        {/* <Route path="/for" element={<ForecastItem />} /> */}
        
        

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff-request-form" element={<StaffRequestForm />} />
        <Route path="/staff-request-status" element={<StaffRequestStatus />} />
        <Route path="/s" element={<StaffGivenItems />} />
        <Route path="/item-requests" element={<ItemRequests />} />

        {/* Manager Routes */}
        <Route path="/manager/request" element={<ManagerReview />} />
        <Route path="/manager-review" element={<ManagerReview />} />
          <Route path="/mdashboard" element={<ManagerDashboard />} />
        
      </Routes>
    </div>
  );
};

export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import "./components/i18n/i18n";

// // import gust 


// // Auth Pages
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import ResetPassword from "./pages/Auth/ResetPassword";
// import Verify2FA from "./pages/Auth/Verify2FA";
// import VerifyEmail from "./pages/Auth/verify-email";

// // Admin Pages
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminPage from "./pages/admin/UserManagment";
// import AdminReports  from "./pages/admin/AdminReports";

// // Clerk Pages
// import ClerkDashboard from "./pages/clerk/ClerkDashboard";
// import ClerkPage from "./pages/clerk/ClerkPage";
// import UpdateItem from "./pages/clerk/UpdateItem";
// import AddItemPage from "./pages/clerk/AddItemPage";
// import GiveItemToStaff from "./pages/clerk/GiveItemToStaff";
// import ClerkPendingReturns from './pages/clerk/c';

// // Staff Pages
// import StaffPage from "./pages/staff/StaffPage";
// import StaffRequestForm from './pages/staff/StaffRequestForm';
// import StaffRequestStatus from './pages/staff/StaffRequestStatus';
// import StaffGivenItems from './pages/staff/s';
// import ItemRequests from './pages/staff/ItemRequests';

// // Manager Pages
// import ManagerReview from './pages/manager/ManagerReview';
// import ManagerDashboard from  './pages/manager/ManagerDashboard';
// import GuestPage from  './pages/guest/GuestPage';


// // Public Pages
// import Home from "./components/Home";
// import About from "./components/About";
// import Service from "./components/Service";
// import Contact from "./components/Contact";

// // Route Guards
// import ProtectedRoute from "./components/ProtectedRoute";
// import RoleRoute from "./components/RoleRoute";

// const App = () => {
//   return (
//     <div className="m-0 p-0 w-full min-h-screen">
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Service />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Auth Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/verify-2fa" element={<Verify2FA />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />

//         {/* Admin Routes */}
//         <Route path="/admin" element={
//           <RoleRoute allowedRoles={["admin"]}>
//             <AdminDashboard />
//           </RoleRoute>
//         } />
//         <Route path="/admin/users" element={
//           <RoleRoute allowedRoles={["admin"]}>
//             <AdminPage />
//           </RoleRoute>
//         } />
//         <Route path="/admin/reports" element={
//           <RoleRoute allowedRoles={["admin"]}>
//             <AdminReports />
//           </RoleRoute>
//         } />

//         {/* Clerk Routes */}
//         <Route path="/clerk" element={
//           <RoleRoute allowedRoles={["clerk"]}>
//             <ClerkDashboard />
//           </RoleRoute>
//         } />
//         <Route path="/clerk/item-managment" element={
//           <RoleRoute allowedRoles={["clerk"]}>
//             <ClerkPage />
//           </RoleRoute>
//         } />
//         <Route path="/clerk/add-item" element={
//           <RoleRoute allowedRoles={["clerk"]}>
//             <AddItemPage />
//           </RoleRoute>
//         } />
//         <Route path="/clerk/update-item/:id" element={
//           <RoleRoute allowedRoles={["clerk"]}>
//             <UpdateItem />
//           </RoleRoute>
//         } />
//         <Route path="/clerk/give" element={
//           <RoleRoute allowedRoles={["clerk"]}>
//             <GiveItemToStaff />
//           </RoleRoute>
//         } />
//         <Route path="/clerk/return" element={
//           <RoleRoute allowedRoles={["clerk"]}>
//             <ClerkPendingReturns />
//           </RoleRoute>
//         } />

//         {/* Staff Routes */}
//         <Route path="/staff" element={
//           <RoleRoute allowedRoles={["staff"]}>
//             <StaffPage />
//           </RoleRoute>
//         } />
//         <Route path="/staff-request-form" element={
//           <RoleRoute allowedRoles={["staff"]}>
//             <StaffRequestForm />
//           </RoleRoute>
//         } />
//         <Route path="/staff-request-status" element={
//           <RoleRoute allowedRoles={["staff"]}>
//             <StaffRequestStatus />
//           </RoleRoute>
//         } />
//         <Route path="/staff/given-items" element={
//           <RoleRoute allowedRoles={["staff"]}>
//             <StaffGivenItems />
//           </RoleRoute>
//         } />
//         <Route path="/item-requests" element={
//           <RoleRoute allowedRoles={["staff"]}>
//             <ItemRequests />
//           </RoleRoute>
//         } />

//         {/* Manager Routes */}
//         <Route path="/manager/request" element={
//           <RoleRoute allowedRoles={["manager"]}>
//             <ManagerReview />
//           </RoleRoute>
//         } />
//         <Route path="/manager-review" element={
//           <RoleRoute allowedRoles={["manager"]}>
//             <ManagerReview />
//           </RoleRoute>
//         } />

       

//        <Route path="/guest" element={
//           <RoleRoute allowedRoles={["guest"]}>
//             <GuestPage />
//           </RoleRoute>
//         } />


//         <Route path="/mdashboard" element={
//           <RoleRoute allowedRoles={["manager"]}>
//             <ManagerDashboard />
//           </RoleRoute>
//         } />
//       </Routes>
//     </div>
//   );
// };

// export default App;
