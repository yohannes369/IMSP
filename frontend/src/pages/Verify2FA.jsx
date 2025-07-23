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
import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

const Verify2FA = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  // Use an array to hold each digit of the 6-digit code
  const [code, setCode] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");

  // Create refs to manage focus for each input
  const inputsRef = useRef([]);

  // Handle input change, only allow numbers, move focus automatically
  const handleChange = (element, index) => {
    if (!/^\d*$/.test(element.value)) return; // allow only digits or empty

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Focus next input if current has a digit and next exists
    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace to move focus back and clear
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      setMessage("Please enter all 6 digits.");
      return;
    }
    try {
      const { data } = await axios.post(`${BASE_URL}/verify-2fa`, {
        email,
        code: fullCode,
      });
      setMessage("2FA verified! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid 2FA code.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-16 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter 2FA Code</h2>
      <p className="mb-6 text-gray-600">A 6-digit code has been sent to your email:</p>
      <p className="mb-8 font-semibold text-indigo-600 break-words">{email}</p>

      <form onSubmit={handleVerify}>
        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 text-center text-xl rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              autoComplete="one-time-code"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition"
        >
          Verify
        </button>
      </form>

      {message && (
        <p
          className={`mt-6 font-medium ${
            message.toLowerCase().includes("invalid") ? "text-red-600" : "text-green-600"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Verify2FA;
