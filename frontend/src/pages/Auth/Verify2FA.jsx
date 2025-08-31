// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";

// const Verify2FA = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || "";
//   const [code, setCode] = useState("");
//   const [message, setMessage] = useState("");

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(`${BASE_URL}/verify-2fa`, {
//         email,
//         code,
//       });
//       setMessage("2FA verified! Redirecting...");
//       setTimeout(() => navigate("/Dashboard"), 1000);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Invalid 2FA code.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Enter 2FA Code</h2>
//       <p>A 6-digit code has been sent to your email: {email}</p>
//       <form onSubmit={handleVerify}>
//         <input
//           type="text"
//           maxLength={6}
//           placeholder="Enter 6-digit code"
//           required
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           style={{ width: "100%", marginBottom: 10 }}
//         />
//         <button type="submit">Verify</button>
//       </form>
//       {message && <p style={{ color: "green" }}>{message}</p>}
//     </div>
//   );
// };

// export default Verify2FA;

// import React, { useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";

// const Verify2FA = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || "";

//   // Use an array to hold each digit of the 6-digit code
//   const [code, setCode] = useState(new Array(6).fill(""));
//   const [message, setMessage] = useState("");

//   // Create refs to manage focus for each input
//   const inputsRef = useRef([]);

//   // Handle input change, only allow numbers, move focus automatically
//   const handleChange = (element, index) => {
//     if (!/^\d*$/.test(element.value)) return; // allow only digits or empty

//     const newCode = [...code];
//     newCode[index] = element.value;
//     setCode(newCode);

//     // Focus next input if current has a digit and next exists
//     if (element.value && index < 5) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   // Handle backspace to move focus back and clear
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       const newCode = [...code];
//       newCode[index - 1] = "";
//       setCode(newCode);
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     const fullCode = code.join("");
//     if (fullCode.length < 6) {
//       setMessage("Please enter all 6 digits.");
//       return;
//     }
//     try {
//       const { data } = await axios.post(`${BASE_URL}/verify-2fa`, {
//         email,
//         code: fullCode,
//       });
//       setMessage("2FA verified! Redirecting...");
//       setTimeout(() => navigate("/dashboard"), 1000);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Invalid 2FA code.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-8 mt-16 bg-white rounded-lg shadow-lg text-center">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter 2FA Code</h2>
//       <p className="mb-6 text-gray-600">A 6-digit code has been sent to your email:</p>
//       <p className="mb-8 font-semibold text-indigo-600 break-words">{email}</p>

//       <form onSubmit={handleVerify}>
//         <div className="flex justify-center gap-3 mb-6">
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               className="w-12 h-12 text-center text-xl rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={digit}
//               onChange={(e) => handleChange(e.target, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               ref={(el) => (inputsRef.current[index] = el)}
//               autoComplete="one-time-code"
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition"
//         >
//           Verify
//         </button>
//       </form>

//       {message && (
//         <p
//           className={`mt-6 font-medium ${
//             message.toLowerCase().includes("invalid") ? "text-red-600" : "text-green-600"
//           }`}
//           role="alert"
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Verify2FA;

// corect one

// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";

// const Verify2FA = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const [code, setCode] = useState(new Array(6).fill(""));
//   const [message, setMessage] = useState("");
//   const inputsRef = useRef([]);

//   // ✅ Redirect if no email passed
//   useEffect(() => {
//     if (!email) {
//       navigate("/login");
//     }
//   }, [email, navigate]);

//   const handleChange = (element, index) => {
//     if (!/^\d*$/.test(element.value)) return;

//     const newCode = [...code];
//     newCode[index] = element.value;
//     setCode(newCode);

//     if (element.value && index < 5) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       const newCode = [...code];
//       newCode[index - 1] = "";
//       setCode(newCode);
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     const fullCode = code.join("");

//     if (fullCode.length < 6) {
//       setMessage("⚠️ Please enter all 6 digits.");
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/verify-2fa`, {
//         email,
//         code: fullCode,
//       });

//       const { token, user } = res.data;

//       // ✅ Save token to localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       setMessage("✅ 2FA verified! Redirecting...");

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "❌ Invalid 2FA code.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-8 mt-16 bg-white rounded-lg shadow-lg text-center">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter 2FA Code</h2>
//       <p className="mb-6 text-gray-600">A 6-digit code was sent to your email:</p>
//       <p className="mb-8 font-semibold text-indigo-600 break-words">{email}</p>

//       <form onSubmit={handleVerify}>
//         <div className="flex justify-center gap-3 mb-6">
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               className="w-12 h-12 text-center text-xl rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={digit}
//               onChange={(e) => handleChange(e.target, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               ref={(el) => (inputsRef.current[index] = el)}
//               autoComplete="one-time-code"
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition"
//         >
//           Verify
//         </button>
//       </form>

//       {message && (
//         <p
//           className={`mt-6 font-medium ${
//             message.includes("Invalid") || message.includes("⚠️") || message.includes("❌")
//               ? "text-red-600"
//               : "text-green-600"
//           }`}
//           role="alert"
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Verify2FA;


// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";

// const Verify2FA = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const [code, setCode] = useState(new Array(6).fill(""));
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const inputsRef = useRef([]);

//   // Redirect to login if no email is passed (invalid access)
//   useEffect(() => {
//     if (!email) {
//       navigate("/login");
//     }
//   }, [email, navigate]);

//   const handleChange = (element, index) => {
//     if (!/^\d*$/.test(element.value)) return; // Only digits allowed

//     const newCode = [...code];
//     newCode[index] = element.value;
//     setCode(newCode);

//     // Focus next input if value entered
//     if (element.value && index < 5) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       const newCode = [...code];
//       newCode[index - 1] = "";
//       setCode(newCode);
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     const fullCode = code.join("");
//     if (fullCode.length < 6) {
//       setMessage("⚠️ Please enter all 6 digits.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/verify-2fa`, {
//         email,
//         code: fullCode,
//       });

//       const { token, user } = res.data;

//       // Save token, role, and user info
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("user", JSON.stringify(user));

//       setMessage("✅ 2FA verified! Redirecting...");

//       // Redirect based on role after 1 second
//       setTimeout(() => {
//         switch (user.role) {
//           case "admin":
//             navigate("/admin");
//             break;
//           case "manager":
//             navigate("/manager");
//             break;
//           case "clerk":
//             navigate("/clerk");
//             break;
//           case "staff":
//             navigate("/staff");
//             break;
//           default:
//             navigate("/unauthorized");
//         }
//       }, 1000);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "❌ Invalid 2FA code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-8 mt-16 bg-white rounded-lg shadow-lg text-center">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter 2FA Code</h2>
//       <p className="mb-6 text-gray-600">A 6-digit code was sent to your email:</p>
//       <p className="mb-8 font-semibold text-indigo-600 break-words">{email}</p>

//       <form onSubmit={handleVerify}>
//         <div className="flex justify-center gap-3 mb-6">
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               className="w-12 h-12 text-center text-xl rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={digit}
//               onChange={(e) => handleChange(e.target, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               ref={(el) => (inputsRef.current[index] = el)}
//               autoComplete="one-time-code"
//               disabled={loading}
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Verifying..." : "Verify"}
//         </button>
//       </form>

//       {message && (
//         <p
//           className={`mt-6 font-medium ${
//             message.includes("Invalid") || message.includes("⚠️") || message.includes("❌")
//               ? "text-red-600"
//               : "text-green-600"
//           }`}
//           role="alert"
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Verify2FA;

// corect one 

// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/auth";

// const Verify2FA = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const [code, setCode] = useState(new Array(6).fill(""));
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const inputsRef = useRef([]);

//   // Redirect to login if no email is passed
//   useEffect(() => {
//     if (!email) navigate("/login");
//   }, [email, navigate]);

//   // Handle input change
//   const handleChange = (element, index) => {
//     if (!/^\d*$/.test(element.value)) return; // only digits
//     const newCode = [...code];
//     newCode[index] = element.value;
//     setCode(newCode);

//     if (element.value && index < 5) inputsRef.current[index + 1].focus();
//   };

//   // Handle backspace navigation
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       const newCode = [...code];
//       newCode[index - 1] = "";
//       setCode(newCode);
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   // Verify 2FA code
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     const fullCode = code.join("");
//     if (fullCode.length < 6) {
//       setMessage("⚠️ Please enter all 6 digits.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/verify-2fa`, { email, code: fullCode });
//       const { token, user } = res.data;

//       // Save token, role, and user info
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role || "guest"); // Default to guest if no role
//       localStorage.setItem("user", JSON.stringify(user));

//       setMessage("✅ 2FA verified! Redirecting...");

//       // Redirect based on role after short delay
//       setTimeout(() => {
//         switch (user.role) {
//           case "admin":
//             navigate("/admin/dashboard");
//             break;
//           case "manager":
//             navigate("/manager/dashboard");
//             break;
//           case "clerk":
//             navigate("/clerk");
//             break;
//           case "staff":
//             navigate("/staff/dashboard");
//             break;
//           case "guest":
//           default:
//             navigate("/guest"); // <-- guest users go here
//         }
//       }, 1000);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "❌ Invalid 2FA code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-8 mt-16 bg-white rounded-lg shadow-lg text-center">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter 2FA Code</h2>
//       <p className="mb-6 text-gray-600">A 6-digit code was sent to your email:</p>
//       <p className="mb-8 font-semibold text-indigo-600 break-words">{email}</p>

//       <form onSubmit={handleVerify}>
//         <div className="flex justify-center gap-3 mb-6">
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               className="w-12 h-12 text-center text-xl rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={digit}
//               onChange={(e) => handleChange(e.target, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               ref={(el) => (inputsRef.current[index] = el)}
//               autoComplete="one-time-code"
//               disabled={loading}
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Verifying..." : "Verify"}
//         </button>
//       </form>

//       {message && (
//         <p
//           className={`mt-6 font-medium ${
//             message.includes("Invalid") || message.includes("⚠️") || message.includes("❌")
//               ? "text-red-600"
//               : "text-green-600"
//           }`}
//           role="alert"
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Verify2FA;

//  corect one


// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Footer from "../../components/Footer/Footer";
// import { FaShieldAlt, FaCheckCircle, FaSpinner } from "react-icons/fa";

// const BASE_URL = "http://localhost:5000/api/auth";

// // Cal Poly color palette
// const calPolyGreen = "#154734";
// const calPolyGold = "#C4820E";
// const lightGreen = "#E8F4EA";

// const Verify2FA = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const [code, setCode] = useState(new Array(6).fill(""));
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const inputsRef = useRef([]);

//   // Redirect to login if no email is passed
//   useEffect(() => {
//     if (!email) navigate("/login");
//   }, [email, navigate]);

//   // Handle input change
//   const handleChange = (element, index) => {
//     if (!/^\d*$/.test(element.value)) return; // only digits
//     const newCode = [...code];
//     newCode[index] = element.value;
//     setCode(newCode);

//     if (element.value && index < 5) inputsRef.current[index + 1].focus();
//   };

//   // Handle backspace navigation
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       const newCode = [...code];
//       newCode[index - 1] = "";
//       setCode(newCode);
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   // Verify 2FA code
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setMessage({ text: "", type: "" });
//     setLoading(true);

//     const fullCode = code.join("");
//     if (fullCode.length < 6) {
//       setMessage({ text: "Please enter all 6 digits", type: "error" });
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/verify-2fa`, { email, code: fullCode });
//       const { token, user } = res.data;

//       // Save token, role, and user info
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role || "guest");
//       localStorage.setItem("user", JSON.stringify(user));

//       setMessage({ text: "2FA verified successfully!", type: "success" });
//       setSuccess(true);

//       // Redirect based on role after short delay
//       setTimeout(() => {
//         switch (user.role) {
//           case "admin":
//             navigate("/admin/dashboard");
//             break;
//           case "manager":
//             navigate("/mdashboard");
//             break;
//           case "clerk":
//             navigate("/clerk");
//             break;
//           case "staff":
//             navigate("/staff");
//             break;
//           case "guest":
//           default:
//             navigate("/guest");
//         }
//       }, 1500);
//     } catch (error) {
//       setMessage({ 
//         text: error.response?.data?.message || "Invalid 2FA code", 
//         type: "error" 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!email) {
//     return (
//       <div className="min-h-screen flex flex-col" style={{ backgroundColor: lightGreen }}>
//         <div className="flex-grow flex items-center justify-center p-6">
//           <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-red-200 text-center">
//             <h2 className="text-2xl font-bold text-red-600 mb-4">Session Expired</h2>
//             <p className="text-gray-700 mb-6">
//               No email found for 2FA verification. Please login again.
//             </p>
//             <button
//               onClick={() => navigate("/login")}
//               className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all`}
//               style={{ backgroundColor: calPolyGreen }}
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//         <Footer bgColor={calPolyGreen} textColor="white" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col" style={{ backgroundColor: lightGreen }}>
//       <div className="flex-grow flex items-center justify-center p-6">
//         <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-green-200">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4" style={{ color: calPolyGreen }}>
//               {success ? (
//                 <FaCheckCircle className="text-5xl animate-pulse" />
//               ) : (
//                 <FaShieldAlt className="text-5xl" />
//               )}
//             </div>
//             <h2 className="text-3xl font-bold mb-2" style={{ color: calPolyGreen }}>
//               Two-Factor Authentication
//             </h2>
//             <p className="text-gray-600">
//               Enter the 6-digit code sent to your email:
//             </p>
//             <p className="mt-2 font-semibold break-words" style={{ color: calPolyGreen }}>
//               {email}
//             </p>
//           </div>

//           <form onSubmit={handleVerify} className="space-y-6">
//             <div className="flex justify-center gap-3 mb-6">
//               {code.map((digit, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   className="w-12 h-12 text-center text-xl rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   style={{ borderColor: calPolyGreen }}
//                   value={digit}
//                   onChange={(e) => handleChange(e.target, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   ref={(el) => (inputsRef.current[index] = el)}
//                   autoComplete="one-time-code"
//                   disabled={loading || success}
//                 />
//               ))}
//             </div>

//             <button
//               type="submit"
//               disabled={loading || success}
//               className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
//                 loading || success
//                   ? "bg-green-400 cursor-not-allowed"
//                   : "hover:bg-green-700 shadow-md hover:shadow-lg"
//               }`}
//               style={{ backgroundColor: calPolyGreen }}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <FaSpinner className="animate-spin mr-2" />
//                   Verifying...
//                 </span>
//               ) : success ? (
//                 "Verified Successfully!"
//               ) : (
//                 "Verify Code"
//               )}
//             </button>
//           </form>

//           {message.text && (
//             <div className={`mt-6 p-4 rounded-lg text-center ${
//               message.type === "error" 
//                 ? "bg-red-100 text-red-700" 
//                 : "bg-green-100 text-green-700"
//             }`}>
//               {message.text}
//             </div>
//           )}

//           <div className="mt-6 text-center text-sm text-gray-500">
//             Didn't receive a code?{" "}
//             <button 
//               className="font-medium hover:underline" 
//               style={{ color: calPolyGold }}
//               onClick={() => alert("Resend functionality would go here")}
//             >
//               Resend code
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <Footer bgColor={calPolyGreen} textColor="white" />
//     </div>
//   );
// };

// export default Verify2FA;


import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { FaShieldAlt, FaCheckCircle, FaSpinner } from "react-icons/fa";

const BASE_URL = "http://localhost:5000/api/auth";

// Cal Poly colors
const calPolyGreen = "#154734";
const calPolyGold = "#C4820E";
const lightGreen = "#E8F4EA";

const Verify2FA = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Try to get email from state or URL query params
  const emailFromState = location.state?.email;
  const emailFromQuery = searchParams.get("email");
  const oauthToken = searchParams.get("token");

  const email = emailFromState || emailFromQuery;

  const [code, setCode] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const inputsRef = useRef([]);

  // Redirect to login only if no email AND no OAuth token
  useEffect(() => {
    if (!email && !oauthToken && !localStorage.getItem("token")) {
      navigate("/login");
    } else if (oauthToken) {
      // Save OAuth token if available
      localStorage.setItem("token", oauthToken);
    }
  }, [email, oauthToken, navigate]);

  // Focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Handle digit input
  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return; // only digits
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    if (val && index < 5) inputsRef.current[index + 1].focus();
  };

  // Handle backspace & arrow navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        const prevCode = [...code];
        prevCode[index - 1] = "";
        setCode(prevCode);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Verify 2FA
  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      setMessage({ text: "Please enter all 6 digits", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/verify-2fa`, { email, code: fullCode });
      const { token, user } = res.data;

      // Save token and user info
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role || "guest");
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess(true);
      setMessage({ text: "2FA verified successfully!", type: "success" });

      setTimeout(() => {
        switch (user.role) {
          case "admin":
            navigate("/admin");
            break;
          case "manager":
            navigate("/mdashboard");
            break;
          case "clerk":
            navigate("/clerk");
            break;
          case "staff":
            navigate("/staff");
            break;
          default:
            navigate("/guest");
        }
      }, 1200);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Invalid 2FA code",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!email && !oauthToken) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: lightGreen }}>
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-red-200 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Session Expired</h2>
            <p className="text-gray-700 mb-6">No email or token found for 2FA verification. Please login again.</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white"
              style={{ backgroundColor: calPolyGreen }}
            >
              Go to Login
            </button>
          </div>
        </div>
        <Footer bgColor={calPolyGreen} textColor="white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: lightGreen }}>
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-green-200">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4" style={{ color: calPolyGreen }}>
              {success ? <FaCheckCircle className="text-5xl animate-pulse" /> : <FaShieldAlt className="text-5xl" />}
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: calPolyGreen }}>Two-Factor Authentication</h2>
            <p className="text-gray-600">Enter the 6-digit code sent to your email:</p>
            {email && <p className="mt-2 font-semibold break-words" style={{ color: calPolyGreen }}>{email}</p>}
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-3 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  pattern="\d*"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl rounded border focus:outline-none focus:ring-2"
                  style={{ borderColor: calPolyGreen }}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  autoComplete="one-time-code"
                  disabled={loading || success}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${loading || success ? "bg-green-400 cursor-not-allowed" : "hover:bg-green-700 shadow-md hover:shadow-lg"}`}
              style={{ backgroundColor: calPolyGreen }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" /> Verifying...
                </span>
              ) : success ? (
                "Verified Successfully!"
              ) : (
                "Verify Code"
              )}
            </button>
          </form>

          {message.text && (
            <div className={`mt-6 p-4 rounded-lg text-center ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message.text}
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Didn't receive a code?{" "}
            <button className="font-medium hover:underline" style={{ color: calPolyGold }} onClick={() => alert("Resend functionality goes here")}>
              Resend code
            </button>
          </div>
        </div>
      </div>

      <Footer bgColor={calPolyGreen} textColor="white" />
    </div>
  );
};

export default Verify2FA;
