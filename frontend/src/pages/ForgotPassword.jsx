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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/forgot-password`, { email });
      setMessage(data.message || "If your email exists, a reset code has been sent.");
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
      {message && (
        <p className="text-green-600 mt-4 text-center">{message}</p>
      )}
    </div>
  );
};

export default ForgotPassword;
