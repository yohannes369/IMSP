


// // // // corect one 

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
// import Aa from "./pages/admin/a";
// Clerk Pages
import ClerkReportDashboard from  './pages/clerk/a';
import ClerkDashboard from "./pages/clerk/ClerkDashboard";
import ClerkPage from "./pages/clerk/ClerkPage";
import UpdateItem from "./pages/clerk/UpdateItem";
import AddItemPage from "./pages/clerk/AddItemPage";
// import GiveItemToStaff from "./pages/clerk/GiveItemToStaff";
import InventoryReport from "./pages/clerk/InventoryReport";
import InventoryReportsPage from "./pages/clerk/InventoryReportsPage";
import ManagerApprovedReturnsPage from "./pages/clerk/ManagerApprovedReturnsPage";
// import ClerkPendingReturns from './pages/clerk/c';
// import ForecastItem from  './pages/clerk/ForecastItem';
import IssuedItems from './pages/clerk/IssuedItems';
// import StaffName from './pages/clerk/staffname';
import IssueItemForm from './pages/clerk/IssueItemForm';
import Model22FormList from './pages/clerk/Model22FormList';
import CD from './pages/clerk/a';
// import ForecastItem from  './pages/clerk/ForecastItem';

// Staff Pages
import StaffPage from "./pages/staff/StaffPage";
import StaffRequestForm from './pages/staff/StaffRequestForm';
import StaffRequestStatus from './pages/staff/StaffRequestStatus';
// import StaffGivenItems from './pages/staff/s';
import ItemRequests from './pages/staff/ItemRequests';
import ReturnItemPage from './pages/staff/ReturnItemPage';
import IssuedItemGet from './pages/staff/issueditemsget';
import StaffReturnRequestTracker from './pages/staff/StaffReturnRequestTracker';
// Manager Pages
import ManagerReview from './pages/manager/ManagerReview';
import ManagerDashboard from  './pages/manager/ManagerDashboard';
import ManagerReturnPage from './pages/manager/ManagerReturnPage';
import ContactMessages from './pages/manager/ContactMessages'
import InventoryReportsPagemanager from './pages/manager/InventoryReportsPagemanger';
// ict departmen
import ICTDashboard from './pages/ICT/ictD';
import ICTReturnPage from './pages/ICT/ICTReturnPage';
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
        {/* <Route path="/chat"  element={<Aa />} /> */}
        {/* Clerk Routes */}
        
          <Route path="/Clerk" element={<ClerkDashboard />} />
        <Route path="/Clerk/item-managment" element={<ClerkPage />} />
        <Route path="Clerk/add-item" element={<AddItemPage />} />
        <Route path="Clerk/update-item/:id" element={<UpdateItem />} />
        {/* <Route path="Clerk/give" element={<GiveItemToStaff />} /> */}
        {/* <Route path="Clerk/return" element={<ClerkPendingReturns />} /> */}
         {/* <Route path="staffname" element={<StaffName />} /> */}
         <Route path="/Clerk/issueitemform" element={<IssueItemForm />} />
          <Route path="/Clerk/model22formlist" element={<Model22FormList />} />
          <Route path="/Clerk/cd" element={<CD />} />
          <Route path="/Clerk/repo" element={<InventoryReport />} />
          <Route path="/Clerk/InventoryReportsPage" element={<InventoryReportsPage />} />
          <Route path="/Clerk/manager-approved-returns" element={<ManagerApprovedReturnsPage />} />
        <Route path="/report" element={<ClerkReportDashboard />} />

      
        <Route path="/i" element={<IssuedItems />} />
        
        

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/staff-request-form" element={<StaffRequestForm />} />
        <Route path="/staff/staff-request-status" element={<StaffRequestStatus />} />
        {/* <Route path="/s" element={<StaffGivenItems />} /> */}
        <Route path="/item-requests" element={<ItemRequests />} />
        <Route path="/staff/returnrequest" element={<ReturnItemPage />} />
        <Route path="/staff/issueditemsget" element={<IssuedItemGet />} />
        <Route path="/staff/returnrequesttracker" element={<StaffReturnRequestTracker />} />

        {/* Manager Routes */}
        <Route path="/manager/request" element={<ManagerReview />} />
        <Route path="/manager/contactmessage" element={<ContactMessages />} />
        <Route path="/manager-review" element={<ManagerReview />} />
        <Route path="/manager/inventoryreports" element={<InventoryReportsPagemanager />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/return" element={<ManagerReturnPage />} />


          
                 <Route path="/guest" element={<GuestPage />} />
                      <Route path="/report" element={<ClerkReportDashboard />} />
          <Route path="/ictdashboared/ict" element={<ICTReturnPage />} />
          <Route path="/ict" element={<ICTDashboard />} />
        
      </Routes>
    </div>
  );
};

export default App;



// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import "./components/i18n/i18n"; // Import i18n configuration

// // Context & Protection
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

// // Auth Pages
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import ResetPassword from "./pages/Auth/ResetPassword";
// import Verify2FA from "./pages/Auth/Verify2FA";
// import VerifyEmail from "./pages/Auth/verify-email";

// // // Admin Pages
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminPage from "./pages/admin/UserManagment";
// import AdminReports  from "./pages/admin/AdminReports";
// import Aa from "./pages/admin/a";

// // Clerk Pages
// import ClerkDashboard from "./pages/clerk/ClerkDashboard";
// import ClerkPage from "./pages/clerk/ClerkPage";
// import AddItemPage from "./pages/clerk/AddItemPage";
// import UpdateItem from "./pages/clerk/UpdateItem";
// import IssueItemForm from "./pages/clerk/IssueItemForm";
// import Model22FormList from "./pages/clerk/Model22FormList";
// import CD from "./pages/clerk/a";
// import InventoryReport from "./pages/clerk/InventoryReport";
// import InventoryReportsPage from "./pages/clerk/InventoryReportsPage";
// import ManagerApprovedReturnsPage from "./pages/clerk/ManagerApprovedReturnsPage";
// import IssuedItems from "./pages/clerk/IssuedItems";
// import ClerkReportDashboard from "./pages/clerk/a"; // report alias

// // Staff Pages
// import StaffPage from "./pages/staff/StaffPage";
// import StaffRequestForm from "./pages/staff/StaffRequestForm";
// import StaffRequestStatus from "./pages/staff/StaffRequestStatus";
// import ItemRequests from "./pages/staff/ItemRequests";
// import ReturnItemPage from "./pages/staff/ReturnItemPage";
// import IssuedItemGet from "./pages/staff/issueditemsget";
// import StaffReturnRequestTracker from "./pages/staff/StaffReturnRequestTracker";

// // Manager Pages
// import ManagerDashboard from "./pages/manager/ManagerDashboard";
// import ManagerReview from "./pages/manager/ManagerReview";
// import ManagerReturnPage from "./pages/manager/ManagerReturnPage";
// import ContactMessages from "./pages/manager/ContactMessages";
// import InventoryReportsPagemanager from "./pages/manager/InventoryReportsPagemanger";

// // ICT Department Pages
// import ICTDashboard from "./pages/ICT/ictD";
// import ICTReturnPage from "./pages/ICT/ICTReturnPage";

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
// {/* Admin Routes */}
// <Route
//   path="/admin"
//   element={
//     <ProtectedRoute>
//       <AdminDashboard />
//     </ProtectedRoute>
//   }
// />
// <Route
//   path="/admin/users"
//   element={
//     <ProtectedRoute>
//       <AdminPage />
//     </ProtectedRoute>
//   }
// />
// <Route
//   path="/admin/reports"
//   element={
//     <ProtectedRoute>
//       <AdminReports />
//     </ProtectedRoute>
//   }
// />


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
//             path="/clerk/issueitemform"
//             element={
//               <ProtectedRoute>
//                 <IssueItemForm />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/model22formlist"
//             element={
//               <ProtectedRoute>
//                 <Model22FormList />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/cd"
//             element={
//               <ProtectedRoute>
//                 <CD />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/repo"
//             element={
//               <ProtectedRoute>
//                 <InventoryReport />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/InventoryReportsPage"
//             element={
//               <ProtectedRoute>
//                 <InventoryReportsPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/manager-approved-returns"
//             element={
//               <ProtectedRoute>
//                 <ManagerApprovedReturnsPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/issued-items"
//             element={
//               <ProtectedRoute>
//                 <IssuedItems />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/clerk/report"
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
//             path="/staff/staff-request-form"
//             element={
//               <ProtectedRoute>
//                 <StaffRequestForm />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/staff/staff-request-status"
//             element={
//               <ProtectedRoute>
//                 <StaffRequestStatus />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/staff/item-requests"
//             element={
//               <ProtectedRoute>
//                 <ItemRequests />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/staff/returnrequest"
//             element={
//               <ProtectedRoute>
//                 <ReturnItemPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/staff/issueditemsget"
//             element={
//               <ProtectedRoute>
//                 <IssuedItemGet />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/staff/returnrequesttracker"
//             element={
//               <ProtectedRoute>
//                 <StaffReturnRequestTracker />
//               </ProtectedRoute>
//             }
//           />

//           {/* Manager Routes */}
//           <Route
//             path="/manager"
//             element={
//               <ProtectedRoute>
//                 <ManagerDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/manager/request"
//             element={
//               <ProtectedRoute>
//                 <ManagerReview />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/manager/contactmessage"
//             element={
//               <ProtectedRoute>
//                 <ContactMessages />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/manager/review"
//             element={
//               <ProtectedRoute>
//                 <ManagerReview />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/manager/inventoryreports"
//             element={
//               <ProtectedRoute>
//                 <InventoryReportsPagemanager />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/manager/return"
//             element={
//               <ProtectedRoute>
//                 <ManagerReturnPage />
//               </ProtectedRoute>
//             }
//           />

//           {/* ICT Department */}
//           <Route
//             path="/ict"
//             element={
//               <ProtectedRoute>
//                 <ICTDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/ictdashboared/ict"
//             element={
//               <ProtectedRoute>
//                 <ICTReturnPage />
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

















