//corect one

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
//       <div style={{ padding: 20 }}>
//         <h2>Error</h2>
//         <p>No email found to verify. Please register or try again.</p>
//       </div>
//     );
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
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/verify-email",
//         { email, code }
//       );

//       setMessage(response.data.message || "Email verified successfully!");
//       // Redirect to login after short delay
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Verification failed. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial" }}>
//       <h2>Verify Your Email</h2>
//       <p>Please check your email <strong>{email}</strong> for the verification code.</p>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           maxLength={6}
//           placeholder="Enter 6-digit code"
//           value={code}
//           onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} // only digits allowed
//           required
//           style={{ width: "100%", marginBottom: 10, fontSize: 16, padding: 8 }}
//         />
//         <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
//           {loading ? "Verifying..." : "Verify"}
//         </button>
//       </form>

//       {message && <p style={{ marginTop: 15, color: message.includes("success") ? "green" : "red" }}>{message}</p>}
//     </div>
//   );
// };

// export default VerifyEmail;


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
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { FaEnvelope, FaCheckCircle, FaLock } from "react-icons/fa";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Cal Poly color palette
  const calPolyGreen = "#154734";
  const calPolyGold = "#C4820E";
  const lightGreen = "#E8F4EA";

  if (!email) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-red-200 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">
              No email found to verify. Please register or try again.
            </p>
            <button
              onClick={() => navigate("/register")}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all bg-${calPolyGreen} hover:bg-green-800`}
            >
              Go to Registration
            </button>
          </div>
        </div>
        <Footer bgColor={calPolyGreen} textColor="white" />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setMessage({ text: "Please enter the 6-digit verification code", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-email",
        { email, code }
      );

      setMessage({ 
        text: response.data.message || "Email verified successfully!", 
        type: "success" 
      });
      setSuccess(true);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Verification failed. Try again.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: lightGreen }}>
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-green-200">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4" style={{ color: calPolyGreen }}>
              {success ? (
                <FaCheckCircle className="text-5xl animate-pulse" />
              ) : (
                <FaEnvelope className="text-5xl" />
              )}
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: calPolyGreen }}>
              Verify Your Email
            </h2>
            <p className="text-gray-600">
              We've sent a verification code to <span className="font-semibold">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium" style={{ color: calPolyGreen }}>
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: calPolyGreen }}>
                  <FaLock />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  style={{ borderColor: calPolyGreen }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                loading || success
                  ? "bg-green-400 cursor-not-allowed"
                  : "hover:bg-green-700 shadow-md hover:shadow-lg"
              }`}
              style={{ backgroundColor: calPolyGreen }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : success ? (
                "Verified!"
              ) : (
                "Verify Email"
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

          <div className="mt-6 text-center text-sm text-gray-500">
            Didn't receive a code?{" "}
            <button 
              className="font-medium hover:underline" 
              style={{ color: calPolyGold }}
              onClick={() => alert("Resend functionality would go here")}
            >
              Resend code
            </button>
          </div>
        </div>
      </div>
      
      <Footer bgColor={calPolyGreen} textColor="white" />
    </div>
  );
};

export default VerifyEmail;