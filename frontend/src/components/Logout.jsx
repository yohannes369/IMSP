// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const confirmAndLogout = async () => {
//       // Ask user for confirmation
//       const confirmed = window.confirm("Are you sure you want to logout?");
//       if (!confirmed) {
//         // Redirect back to dashboard or previous page if canceled
//         navigate("/staff", { replace: true });
//         return;
//       }

//       try {
//         // Call backend logout
//         await axios.post(
//           "http://localhost:5000/api/auth/logout",
//           {},
//           { withCredentials: true }
//         );

//         // Clear token from localStorage
//         localStorage.removeItem("token");

//         // Redirect to login page and prevent back navigation
//         navigate("/login", { replace: true });

//         // Optional: reload page to clear cached state
//         window.location.reload();
//       } catch (error) {
//         console.error("Logout failed:", error);
//         alert("Logout failed. Please try again.");
//       }
//     };

//     confirmAndLogout();
//   }, [navigate]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-xl font-semibold">Logging out...</p>
//     </div>
//   );
// };

// export default Logout;
// src/components/Logout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const calPolyGreen = "#154734";
const calPolyGold = "#C4820E";

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("token");
      navigate("/login", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/staff", { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-gray-200">
        <h2 className="text-2xl font-bold mb-4" style={{ color: calPolyGreen }}>
          Confirm Logout
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to logout of your account?
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {showConfirmation && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-6 py-2 rounded-xl text-white font-medium shadow-md hover:shadow-lg disabled:opacity-50 transition"
              style={{ backgroundColor: calPolyGreen }}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition"
              style={{ backgroundColor: calPolyGold, color: "white" }}
            >
              Cancel
            </button>
          </div>
        )}

        {!showConfirmation && loading && (
          <p className="text-gray-700 mt-4">Logging out...</p>
        )}
      </div>
    </div>
  );
};

export default Logout;
