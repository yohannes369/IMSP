
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
//   const [staff_id, setStaffId] = useState(""); // Staff ID input
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     // Basic frontend validation
//     if (
//       !firstName.trim() ||
//       !lastName.trim() ||
//       !email.trim() ||
//       !password ||
//       !gender.trim() ||
//       !phone.trim() ||
//       !staff_id.trim()
//     ) {
//       setLoading(false);
//       setMessage("Please fill all required fields.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/register", {
//         firstName: firstName.trim(),
//         lastName: lastName.trim(),
//         email: email.trim(),
//         password,
//         gender: gender.trim(),
//         phone: phone.trim(),
//         staff_id: staff_id.trim(),
//       });

//       setMessage(response.data.message || "Registered successfully. Please verify your email.");
//       setLoading(false);

//       if (response.status === 201 || response.status === 200) {
//         navigate("/verify-email", { state: { email } });
//       }
//     } catch (error) {
//       console.error('Registration error response:', error.response?.data);
//       setLoading(false);
//       setMessage(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
//       {message && (
//         <p className={`mb-4 text-center ${loading ? "text-blue-600" : "text-red-600"}`}>
//           {message}
//         </p>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
//           required
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="tel"
//           placeholder="Phone"
//           required
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder="Staff ID"
//           required
//           value={staff_id}
//           onChange={(e) => setStaffId(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           aria-busy={loading}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Footer from "../../components/Footer/Footer";
// import { FiUser, FiMail, FiLock, FiPhone, FiHash } from "react-icons/fi";
// import { FaVenusMars } from "react-icons/fa";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     gender: "",
//     phone: "",
//     staff_id: ""
//   });
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value.trim()
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage({ text: "", type: "" });
//     setLoading(true);

//     if (Object.values(formData).some(field => !field)) {
//       setLoading(false);
//       setMessage({ text: "Please fill all required fields.", type: "error" });
//       return;
//     }

//     if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
//       setLoading(false);
//       setMessage({ text: "Please enter a valid email address.", type: "error" });
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/register", formData);

//       setMessage({ 
//         text: response.data.message || "Registered successfully. Please verify your email.", 
//         type: "success" 
//       });
//       setLoading(false);

//       if (response.status === 201) {
//         navigate("/verify-email", { state: { email: formData.email } });
//       }
//     } catch (error) {
//       setLoading(false);
//       setMessage({ 
//         text: error.response?.data?.message || "Registration failed. Please try again.", 
//         type: "error" 
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <main className="flex-grow flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Header */}
//           <div className="bg-[#154734] py-4 px-6">
//             <h2 className="text-2xl font-bold text-white text-center">Create Your Account</h2>
//           </div>

//           {/* Form Section */}
//           <div className="p-6">
//             {message.text && (
//               <div className={`mb-4 p-3 rounded-md ${
//                 message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
//               }`}>
//                 {message.text}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiUser className="text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First Name"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiUser className="text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last Name"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiMail className="text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
//                   required
//                 />
//               </div>

//               {/* Password */}
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiLock className="text-gray-400" />
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
//                   required
//                   minLength="6"
//                 />
//               </div>

//               {/* Gender and Phone */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaVenusMars className="text-gray-400" />
//                   </div>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent appearance-none"
//                     required
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiPhone className="text-gray-400" />
//                   </div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="Phone Number"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Staff ID */}
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiHash className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="staff_id"
//                   placeholder="Staff ID"
//                   value={formData.staff_id}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 px-4 bg-[#154734] text-white rounded-lg font-medium hover:bg-[#0e3528] transition ${
//                   loading ? "opacity-70 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading ? "Processing..." : "Register Now"}
//               </button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <button 
//                   onClick={() => navigate("/login")} 
//                   className="text-[#154734] font-medium hover:underline"
//                 >
//                   Sign in
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { FiUser, FiMail, FiLock, FiPhone, FiHash } from "react-icons/fi";
import { FaVenusMars } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    staff_id: ""
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    // Validate fields
    if (Object.values(formData).some(field => !field)) {
      setLoading(false);
      setMessage({ text: "Please fill all required fields.", type: "error" });
      return;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      setLoading(false);
      setMessage({ text: "Please enter a valid email address.", type: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);

      setMessage({ 
        text: response.data.message || "Registered successfully. Please verify your email.", 
        type: "success" 
      });
      setLoading(false);

      if (response.status >= 200 && response.status < 300) {
        setFadeOut(true); // trigger fade-out animation
      }
    } catch (error) {
      setLoading(false);
      setMessage({ 
        text: error.response?.data?.message || "Registration failed. Please try again.", 
        type: "error" 
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <motion.main
        className="flex-grow flex items-center justify-center p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: fadeOut ? 0 : 1, y: fadeOut ? -20 : 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => {
          if (fadeOut) {
            navigate("/verify-email", { state: { email: formData.email } });
          }
        }}
      >
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#154734] py-4 px-6">
            <h2 className="text-2xl font-bold text-white text-center">Create Your Account</h2>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
                    required
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
                  required
                  minLength="6"
                />
              </div>

              {/* Gender and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaVenusMars className="text-gray-400" />
                  </div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Staff ID */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHash className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="staff_id"
                  placeholder="Staff ID"
                  value={formData.staff_id}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154734] focus:border-transparent"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-[#154734] text-white rounded-lg font-medium hover:bg-[#0e3528] transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Processing..." : "Register Now"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button 
                  onClick={() => navigate("/login")} 
                  className="text-[#154734] font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Register;
