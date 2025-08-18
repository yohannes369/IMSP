// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaLock, FaHome, FaArrowLeft } from 'react-icons/fa';

// const Unauthorized = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center border-l-8 border-[#C69214]">
//         <div className="text-[#154734] mb-6">
//           <FaLock className="text-6xl mx-auto" />
//         </div>
        
//         <h1 className="text-3xl font-bold text-[#154734] mb-4">
//           403 - Unauthorized Access
//         </h1>
        
//         <p className="text-gray-600 mb-6">
//           You don't have permission to access this page. Please contact your administrator if you believe this is an error.
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center justify-center gap-2 bg-[#E8F3EC] hover:bg-[#5B8E7D] text-[#154734] hover:text-white font-medium py-2 px-4 rounded transition duration-300"
//           >
//             <FaArrowLeft /> Go Back
//           </button>
          
//           <button
//             onClick={() => navigate('/')}
//             className="flex items-center justify-center gap-2 bg-[#C69214] hover:bg-[#e0aa2a] text-white font-medium py-2 px-4 rounded transition duration-300"
//           >
//             <FaHome /> Return Home
//           </button>
//         </div>
        
//         <div className="mt-8 pt-6 border-t border-gray-200">
//           <p className="text-sm text-gray-500">
//             Cal Poly Inventory Management System
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Unauthorized;