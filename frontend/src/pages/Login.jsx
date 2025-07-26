// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       });

//       if (res.data.requires2FA) {
//         // Redirect to 2FA page with token
//         localStorage.setItem('tempToken', res.data.tempToken); // Temporary token for 2FA
//         navigate('/verify-2fa');
//       } else {
//         localStorage.setItem('token', res.data.token); // Final token
//         alert('Login successful!');
//         navigate('/dashboard'); // Redirect after login
//       }
//     } catch (err) {
//       console.error('Login failed:', err);
//       alert('Login failed!');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// correct

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", form, {
//         withCredentials: true,
//       });

//       // Check if 2FA is required
//       if (response.data.requires2FA) {
//         // Navigate to 2FA page with email passed as state
//         navigate("/verify-2fa", { state: { email: form.email } });
//       } else {
//         // If no 2FA, user is authenticated
//         localStorage.setItem("token", response.data.token);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto p-6 mt-20 shadow border rounded">
//       <h2 className="text-xl font-semibold mb-4">Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full mb-4 p-2 border rounded"
//           required
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
//           Login
//         </button>
//       </form>
//       {error && <p className="text-red-600 mt-3">{error}</p>}
//     </div>
//   );
// };

// export default Login;
// correct one 

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form, {
        withCredentials: true,
      });

      if (res.data.requires2FA) {
        navigate("/verify-2fa", { state: { email: form.email } });
      } else {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  return (
    <div className="max-w-sm mx-auto p-6 mt-20 shadow border rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="mb-2">Or login with</p>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white p-2 rounded"
        >
          Sign in with Google
        </button>
      </div>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
};

export default Login;
