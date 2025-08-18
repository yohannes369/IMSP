import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAndLogout = async () => {
      // Ask user for confirmation
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (!confirmed) {
        // Redirect back to dashboard or previous page if canceled
        navigate("/staff", { replace: true });
        return;
      }

      try {
        // Call backend logout
        await axios.post(
          "http://localhost:5000/api/auth/logout",
          {},
          { withCredentials: true }
        );

        // Clear token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page and prevent back navigation
        navigate("/login", { replace: true });

        // Optional: reload page to clear cached state
        window.location.reload();
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again.");
      }
    };

    confirmAndLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl font-semibold">Logging out...</p>
    </div>
  );
};

export default Logout;
