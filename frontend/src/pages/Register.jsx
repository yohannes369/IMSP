// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Register = () => {
// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [gender, setGender] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage("");
// //     setLoading(true);

// //     try {
// //       const response = await axios.post("http://localhost:5000/api/auth/register", {
// //         firstName,
// //         lastName,
// //         email,
// //         password,
// //         gender,
// //         phone,
// //       });

// //       setMessage(response.data.message);
// //       setLoading(false);

// //       // On success navigate to VerifyEmail and pass email in state
// //       if (response.status === 201 || response.status === 200) {
// //         navigate("/verify-email", { state: { email } });
// //       }
// //     } catch (error) {
// //       setLoading(false);
// //       setMessage(error.response?.data?.message || "Registration failed");
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
// //       <h2>Register</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="First Name"
// //           required
// //           value={firstName}
// //           onChange={(e) => setFirstName(e.target.value)}
// //           style={{ width: "100%", marginBottom: 10 }}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Last Name"
// //           required
// //           value={lastName}
// //           onChange={(e) => setLastName(e.target.value)}
// //           style={{ width: "100%", marginBottom: 10 }}
// //         />
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           required
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           style={{ width: "100%", marginBottom: 10 }}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           required
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           style={{ width: "100%", marginBottom: 10 }}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Gender"
// //           value={gender}
// //           onChange={(e) => setGender(e.target.value)}
// //           style={{ width: "100%", marginBottom: 10 }}
// //         />
// //         <input
// //           type="tel"
// //           placeholder="Phone"
// //           value={phone}
// //           onChange={(e) => setPhone(e.target.value)}
// //           style={{ width: "100%", marginBottom: 10 }}
// //         />
// //         <button type="submit" disabled={loading}>
// //           {loading ? "Registering..." : "Register"}
// //         </button>
// //       </form>
// //       {message && <p style={{ color: loading ? "blue" : "red" }}>{message}</p>}
// //     </div>
// //   );
// // };

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender, setGender] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/register", {
//         firstName,
//         lastName,
//         email,
//         password,
//         gender,
//         phone,
//       });

//       setMessage(response.data.message);
//       setLoading(false);

//       if (response.status === 201 || response.status === 200) {
//         navigate("/verify-email", { state: { email } });
//       }
//     } catch (error) {
//       setLoading(false);
//       setMessage(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="First Name"
//           required
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder="Last Name"
//           required
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder="Gender"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="tel"
//           placeholder="Phone"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//       {message && (
//         <p className={`mt-4 text-center ${loading ? "text-blue-600" : "text-red-600"}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Register;
  


// corect one



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender, setGender] = useState("");
//   const [phone, setPhone] = useState("");
//   const [role, setRole] = useState(""); // New role field
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/register", {
//         firstName,
//         lastName,
//         email,
//         password,
//         gender,
//         phone,
//         role, // include role
//       });

//       setMessage(response.data.message);
//       setLoading(false);

//       if (response.status === 201 || response.status === 200) {
//         navigate("/verify-email", { state: { email } });
//       }
//     } catch (error) {
//       setLoading(false);
//       setMessage(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="First Name"
//           required
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder="Last Name"
//           required
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder="Gender"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="tel"
//           placeholder="Phone"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Role dropdown */}
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Select Role</option>
//           <option value="admin">Admin</option>
//           <option value="manager">Manager</option>
//           <option value="staff">Staff</option>
//           <option value="stock_clerk">Stock Clerk</option>
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>

//       {message && (
//         <p className={`mt-4 text-center ${loading ? "text-blue-600" : "text-red-600"}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(""); // Role as text input
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
        gender,
        phone,
        role,
      });

      setMessage(response.data.message);
      setLoading(false);

      if (response.status === 201 || response.status === 200) {
        navigate("/verify-email", { state: { email } });
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Role as input instead of select */}
        <input
          type="text"
          placeholder="Role (e.g., admin, manager)"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center ${loading ? "text-blue-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
