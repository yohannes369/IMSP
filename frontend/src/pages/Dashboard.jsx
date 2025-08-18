// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       // Call backend logout (optional, if session/cookie used)
//       await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

//       // ✅ Remove token from localStorage
//       localStorage.removeItem("token");

//       // ✅ Navigate to login page
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-24 text-center">
//       <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
//       <button
//         onClick={handleLogout}
//         className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend logout endpoint (optional if using session/cookie)
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true } // send cookies if any
      );

      // ✅ Clear token from localStorage
      localStorage.removeItem("token");

      // ✅ Navigate to login page
      navigate("/login", { replace: true }); // replace to prevent back navigation

      // Optional: reload page to clear any cached data
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-24 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
