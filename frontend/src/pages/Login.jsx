// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       const { data } = await axios.post(`${BASE_URL}/login`, { email, password });
//       setMessage(data.message || "Login successful!");
//       // Navigate to 2FA verification page after login
//       setTimeout(() => navigate("/verify-2fa", { state: { email } }), 1000);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ width: "100%", marginBottom: 10 }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ width: "100%", marginBottom: 10 }}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       {/* Forgot password link */}
//       <p style={{ marginTop: 10 }}>
//         <Link to="/forgot-password">Forgot Password?</Link>
//       </p>

//       {/* Register link */}
//       <p style={{ marginTop: 10 }}>
//         Don’t have an account? <Link to="/register">Register</Link>
//       </p>

//       {message && (
//         <p style={{ marginTop: 10, color: message.includes("successful") ? "green" : "red" }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/login`, { email, password });
      setMessage(data.message || "Login successful!");
      setTimeout(() => navigate("/verify-2fa", { state: { email } }), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold transition ${
            loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="flex justify-between mt-6 text-sm text-indigo-600">
        <Link
          to="/forgot-password"
          className="hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Forgot Password?
        </Link>

        <Link
          to="/register"
          className="hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Don’t have an account? Register
        </Link>
      </div>

      {message && (
        <p
          className={`mt-6 text-center font-medium ${
            message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
