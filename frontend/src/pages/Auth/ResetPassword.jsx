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
// corect one 

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
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (newPassword !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

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
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Enter 6-digit code"
//           required
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           required
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           required
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//       {message && (
//         <p className="text-green-600 mt-4 text-center">{message}</p>
//       )}
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { FaLock, FaKey, FaCheckCircle } from "react-icons/fa";

const BASE_URL = "http://localhost:5000/api/auth";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!code || !newPassword || !confirmPassword) {
      setMessage({ text: "All fields are required", type: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ 
        text: "Password must be at least 6 characters", 
        type: "error" 
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/reset-password`, {
        email,
        code,
        newPassword,
      });
      setMessage({ 
        text: data.message || "Password reset successful!", 
        type: "success" 
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Reset failed", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-green-200">
          <div className="text-center mb-8">
            <div className="flex justify-center text-green-500 mb-4">
              {success ? (
                <FaCheckCircle className="text-5xl animate-pulse" />
              ) : (
                <FaLock className="text-5xl" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-green-800 mb-2">
              Reset Password
            </h2>
            <p className="text-green-600">
              Enter your verification code and new password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-green-700 mb-2 font-medium">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-green-500">
                    <FaKey />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-green-700 mb-2 font-medium">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-green-500">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-green-700 mb-2 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-green-500">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                loading || success
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : success ? (
                "Success!"
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {message.text && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              message.type === "error" 
                ? "bg-red-100 text-red-700" 
                : "bg-green-100 text-green-700"
            }`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
      
      <Footer className="bg-green-800 text-white" />
    </div>
  );
};

export default ResetPassword;