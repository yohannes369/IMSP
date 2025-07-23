// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || "";

//   const [code, setCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       const { data } = await axios.post(`${BASE_URL}/reset-password`, {
//         email,
//         code,
//         newPassword,
//       });
//       setMessage(data.message || "Password reset successful!");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Reset failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter 6-digit code"
//           required
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           style={{ width: "100%", marginBottom: 10 }}
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           required
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           style={{ width: "100%", marginBottom: 10 }}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//       {message && <p style={{ marginTop: 10, color: "green" }}>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/reset-password`, {
        email,
        code,
        newPassword,
      });
      setMessage(data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter 6-digit code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {message && (
        <p className="text-green-600 mt-4 text-center">{message}</p>
      )}
    </div>
  );
};

export default ResetPassword;
