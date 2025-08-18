// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       const { data } = await axios.post(`${BASE_URL}/forgot-password`, { email });
//       setMessage(data.message || "If your email exists, a reset code has been sent.");
//       setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ width: "100%", marginBottom: 10 }}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Sending..." : "Send Reset Code"}
//         </button>
//       </form>
//       {message && <p style={{ color: "green", marginTop: 10 }}>{message}</p>}
//     </div>
//   );
// };

// export default ForgotPassword;

// corect

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       const { data } = await axios.post(`${BASE_URL}/forgot-password`, { email });
//       setMessage(data.message || "If your email exists, a reset code has been sent.");
//       setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Sending..." : "Send Reset Code"}
//         </button>
//       </form>
//       {message && (
//         <p className="text-green-600 mt-4 text-center">{message}</p>
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { FiMail, FiArrowLeft } from "react-icons/fi";

const BASE_URL = "http://localhost:5000/api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    // Basic email validation
    if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/forgot-password`, { email });
      setMessage({ 
        text: data.message || "If your email exists, a reset code has been sent.", 
        type: "success" 
      });
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Something went wrong. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with Cal Poly green */}
          <div className="bg-[#154734] py-4 px-6 relative">
            <button 
              onClick={() => navigate(-1)}
              className="absolute left-4 top-4 text-white hover:text-gray-200"
            >
              <FiArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold text-white text-center">Reset Your Password</h2>
          </div>

          {/* Form Section */}
          <div className="p-6">
            {message.text && (
              <div className={`mb-4 p-3 rounded-md ${
                message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-[#154734] text-white rounded-lg font-medium hover:bg-[#0e3528] transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Reset Code...
                  </span>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Remember your password?{" "}
                <button 
                  onClick={() => navigate("/login")} 
                  className="text-[#154734] font-medium hover:underline"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ForgotPassword;
