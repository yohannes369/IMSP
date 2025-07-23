import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Error</h2>
        <p>No email found to verify. Please register or try again.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setMessage("Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-email",
        { email, code }
      );

      setMessage(response.data.message || "Email verified successfully!");
      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Verification failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h2>Verify Your Email</h2>
      <p>Please check your email <strong>{email}</strong> for the verification code.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} // only digits allowed
          required
          style={{ width: "100%", marginBottom: 10, fontSize: 16, padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {message && <p style={{ marginTop: 15, color: message.includes("success") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default VerifyEmail;


// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const VerifyEmail = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || "";

//   const [code, setCode] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!email) {
//     return (
//       <div className="p-6 text-center font-sans">
//         <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
//         <p className="text-gray-700">No email found to verify. Please register or try again.</p>
//       </div>
//     );+
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (code.length !== 6) {
//       setMessage("Please enter the 6-digit verification code.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/verify-email", {
//         email,
//         code,
//       });

//       setMessage(response.data.message || "Email verified successfully!");
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md font-sans">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Verify Your Email</h2>
//       <p className="text-sm text-center text-gray-600 mb-6">
//         Please check your email <span className="font-medium">{email}</span> for the verification code.
//       </p>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="block">
//           <span className="sr-only">Verification Code</span>
//           <input
//             type="text"
//             maxLength={6}
//             placeholder="Enter 6-digit code"
//             value={code}
//             onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
//             required
//             className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 text-white text-lg font-medium rounded-md bg-blue-500 hover:bg-blue-600 transition duration-200 ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Verifying..." : "Verify"}
//         </button>
//       </form>
//       {message && (
//         <p
//           className={`mt-4 text-center ${
//             message.toLowerCase().includes("success")
//               ? "text-green-600"
//               : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default VerifyEmail;
