


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
import ClerkReportDashboard from  './pages/clerk/a';
import ClerkDashboard from "./pages/clerk/ClerkDashboard";
import ClerkPage from "./pages/clerk/ClerkPage";
import UpdateItem from "./pages/clerk/UpdateItem";
import AddItemPage from "./pages/clerk/AddItemPage";
import GiveItemToStaff from "./pages/clerk/GiveItemToStaff";
import ClerkPendingReturns from './pages/clerk/c';
// import ForecastItem from  './pages/clerk/ForecastItem';
import IssuedItems from './pages/clerk/IssuedItems';
import StaffName from './pages/clerk/staffname';
import IssueItemForm from './pages/clerk/IssueItemForm';
import Model22FormList from './pages/clerk/Model22FormList';
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
import Logout from "./components/Logout";



import GuestPage from'./pages/guest/GuestPage';
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
          <Route path="/logout" element={<Logout />} />

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
         <Route path="staffname" element={<StaffName />} />
         <Route path="issueitemform" element={<IssueItemForm />} />
          <Route path="model22formlist" element={<Model22FormList />} />
         
               {/* <Route path="/for" element={<ForecastItem />} /> */}
        <Route path="/report" element={<ClerkReportDashboard />} />
      
        <Route path="/i" element={<IssuedItems />} />
        
        

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


          
                 <Route path="/guest" element={<GuestPage />} />
                      <Route path="/report" element={<ClerkReportDashboard />} />
        
      </Routes>
    </div>
  );
};

export default App;













// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import "./components/i18n/i18n";

// // Context
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

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
// import AdminReports from "./pages/admin/AdminReports";

// // Clerk Pages
// import ClerkReportDashboard from "./pages/clerk/a";
// import ClerkDashboard from "./pages/clerk/ClerkDashboard";
// import ClerkPage from "./pages/clerk/ClerkPage";
// import UpdateItem from "./pages/clerk/UpdateItem";
// import AddItemPage from "./pages/clerk/AddItemPage";
// import GiveItemToStaff from "./pages/clerk/GiveItemToStaff";
// import ClerkPendingReturns from "./pages/clerk/c";
// import ForecastItem from "./pages/clerk/ForecastItem";

// // Staff Pages
// import StaffPage from "./pages/staff/StaffPage";
// import StaffRequestForm from "./pages/staff/StaffRequestForm";
// import StaffRequestStatus from "./pages/staff/StaffRequestStatus";
// import StaffGivenItems from "./pages/staff/s";
// import ItemRequests from "./pages/staff/ItemRequests";

// // Manager Pages
// import ManagerReview from "./pages/manager/ManagerReview";
// import ManagerDashboard from "./pages/manager/ManagerDashboard";

// // Guest Page
// import GuestPage from "./pages/guest/GuestPage";

// // Public Pages
// import Home from "./components/Home";
// import About from "./components/About";
// import Service from "./components/Service";
// import Contact from "./components/Contact";
// import Logout from "./components/Logout";
// import NotFound from "./components/NotFound";

// const App = () => {
//   return (
//     <AuthProvider>
//       <div className="m-0 p-0 w-full min-h-screen">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/services" element={<Service />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/logout" element={<Logout />} />

//           {/* Auth Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/verify-2fa" element={<Verify2FA />} />
//           <Route path="/verify-email" element={<VerifyEmail />} />

//           {/* Admin Routes */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/users"
//             element={
//               <ProtectedRoute>
//                 <AdminPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/reports"
//             element={
//               <ProtectedRoute>
//                 <AdminReports />
//               </ProtectedRoute>
//             }
//           />

//           {/* Clerk Routes */}
//           <Route
//             path="/clerk"
//             element={
//               <ProtectedRoute>
//                 <ClerkDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/item-managment"
//             element={
//               <ProtectedRoute>
//                 <ClerkPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/add-item"
//             element={
//               <ProtectedRoute>
//                 <AddItemPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/update-item/:id"
//             element={
//               <ProtectedRoute>
//                 <UpdateItem />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/give"
//             element={
//               <ProtectedRoute>
//                 <GiveItemToStaff />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/return"
//             element={
//               <ProtectedRoute>
//                 <ClerkPendingReturns />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/for"
//             element={
//               <ProtectedRoute>
//                 <ForecastItem />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/report"
//             element={
//               <ProtectedRoute>
//                 <ClerkReportDashboard />
//               </ProtectedRoute>
//             }
//           />

//           {/* Staff Routes */}
//           <Route
//             path="/staff"
//             element={
//               <ProtectedRoute>
//                 <StaffPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/staff-request-form"
//             element={
//               <ProtectedRoute>
//                 <StaffRequestForm />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/staff-request-status"
//             element={
//               <ProtectedRoute>
//                 <StaffRequestStatus />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/s"
//             element={
//               <ProtectedRoute>
//                 <StaffGivenItems />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/item-requests"
//             element={
//               <ProtectedRoute>
//                 <ItemRequests />
//               </ProtectedRoute>
//             }
//           />

//           {/* Manager Routes */}
//           <Route
//             path="/manager/request"
//             element={
//               <ProtectedRoute>
//                 <ManagerReview />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/manager-review"
//             element={
//               <ProtectedRoute>
//                 <ManagerReview />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/mdashboard"
//             element={
//               <ProtectedRoute>
//                 <ManagerDashboard />
//               </ProtectedRoute>
//             }
//           />

//           {/* Guest */}
//           <Route path="/guest" element={<GuestPage />} />

//           {/* 404 */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// };

// export default App;















