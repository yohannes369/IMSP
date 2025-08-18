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
//       const res = await axios.post("http://localhost:5000/api/auth/login", form, {
//         withCredentials: true,
//       });

//       if (res.data.requires2FA) {
//         navigate("/verify-2fa", { state: { email: form.email } });
//       } else {
//         localStorage.setItem("token", res.data.token);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.open("http://localhost:5000/api/auth/google", "_self");
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

//       <div className="text-center mt-4">
//         <p className="mb-2">Or login with</p>
//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           className="w-full bg-red-600 text-white p-2 rounded"
//         >
//           Sign in with Google
//         </button>
//       </div>

//       {error && <p className="text-red-600 mt-3">{error}</p>}
//     </div>
//   );
// };

// export default Login;

//corect one
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// const Login = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form, {
//         withCredentials: true,
//       });

//       if (res.data.requires2FA) {
//         navigate("/verify-2fa", { state: { email: form.email } });
//       } else {
//         localStorage.setItem("token", res.data.token);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.open("http://localhost:5000/api/auth/google", "_self");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-green-700 via-green-800 to-green-900 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Floating background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-700/20 rounded-full blur-3xl animate-float"></div>
//         <div
//           className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-800/20 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "3s" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 w-60 h-60 bg-green-700/10 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "1.5s" }}
//         ></div>
//       </div>

//       <Card className="w-full max-w-md relative bg-white/80 backdrop-blur-xl border-green-700/50 shadow-lg animate-slide-up">
//         <CardHeader className="space-y-1 text-center pb-8">
//           <div className="flex justify-center mb-4">
//             <div className="p-3 bg-gradient-to-r from-green-700 to-green-800 rounded-full animate-glow">
//               <Sparkles className="w-8 h-8 text-green-900" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent">
//             Welcome Back
//           </CardTitle>
//           <CardDescription className="text-green-900">
//             Sign in to your account to continue
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <form onSubmit={handleLogin} className="space-y-4" noValidate>
//             <div
//               className="space-y-2 animate-scale-in"
//               style={{ animationDelay: "0.1s" }}
//             >
//               <Label htmlFor="email" className="text-sm font-medium text-green-900">
//                 Email
//               </Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-4 h-4" />
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="pl-10 bg-green-50 border-green-700 focus:border-green-700 focus:ring-green-700 transition-all duration-300 hover:shadow-lg"
//                   required
//                   autoComplete="email"
//                 />
//               </div>
//             </div>

//             <div
//               className="space-y-2 animate-scale-in"
//               style={{ animationDelay: "0.2s" }}
//             >
//               <Label
//                 htmlFor="password"
//                 className="text-sm font-medium text-green-900"
//               >
//                 Password
//               </Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-4 h-4" />
//                 <Input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="pl-10 pr-10 bg-green-50 border-green-700 focus:border-green-700 focus:ring-green-700 transition-all duration-300 hover:shadow-lg"
//                   required
//                   autoComplete="current-password"
//                 />
//                 <button
//                   type="button"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-900 transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-4 h-4" />
//                   ) : (
//                     <Eye className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-scale-in"
//               style={{ animationDelay: "0.3s" }}
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing In..." : "Sign In"}
//             </Button>
//           </form>

//           <div
//             className="relative animate-fade-in"
//             style={{ animationDelay: "0.4s" }}
//           >
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t border-green-700" />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-white px-2 text-green-700">
//                 Or continue with
//               </span>
//             </div>
//           </div>

//           <Button
//             type="button"
//             variant="outline"
//             onClick={handleGoogleLogin}
//             className="w-full bg-green-50 border-green-700 hover:bg-green-100 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-scale-in"
//             style={{ animationDelay: "0.5s" }}
//           >
//             <svg
//               className="w-4 h-4 mr-2"
//               viewBox="0 0 24 24"
//               aria-hidden="true"
//               focusable="false"
//             >
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Sign in with Google
//           </Button>

//           {error && (
//             <Alert
//               variant="destructive"
//               className="animate-scale-in bg-red-100 border-red-400 text-red-700"
//               role="alert"
//             >
//               <AlertDescription className="text-red-700">
//                 {error}
//               </AlertDescription>
//             </Alert>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { FcGoogle } from "react-icons/fc";
// // src/pages/Auth/Login.jsx
// import loginImage from "../../assets/4.jpg"; // Corrected path


// const Login = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form, {
//         withCredentials: true,
//       });

//       if (res.data.requires2FA) {
//         navigate("/verify-2fa", { state: { email: form.email } });
//       } else {
//         localStorage.setItem("token", res.data.token);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.open("http://localhost:5000/api/auth/google", "_self");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 relative overflow-hidden">
//       {/* Background Polygons */}
//       <div className="absolute inset-0 overflow-hidden z-0">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 opacity-10 clip-path-polygon-1 transform rotate-45"></div>
//         <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-600 opacity-10 clip-path-polygon-2 transform -rotate-12"></div>
//         <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-green-400 opacity-15 clip-path-polygon-3 transform rotate-15"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-700 opacity-10 clip-path-polygon-4 transform -rotate-30"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
//         {/* Image Section */}
//         <div className="w-full md:w-1/2 relative overflow-hidden">
//           <img
//             src={loginImage}
//             alt="Login Visual"
//             className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-1000"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-green-700/30"></div>
//           <div className="absolute bottom-8 left-8 text-white">
//             <h2 className="text-3xl font-bold mb-2">InventoryPro</h2>
//             <p className="opacity-90">Streamline your inventory management</p>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8 text-green-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
//                 />
//               </svg>
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//             <p className="text-gray-600">Sign in to access your dashboard</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div className="space-y-1">
//               <label htmlFor="email" className="text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiMail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={form.email}
//                   onChange={handleChange}
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
//                   placeholder="you@example.com"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label htmlFor="password" className="text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiLock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="current-password"
//                   required
//                   value={form.password}
//                   onChange={handleChange}
//                   className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//               <div className="flex justify-end">
//                 <a
//                   href="#"
//                   className="text-sm text-green-600 hover:text-green-800 hover:underline"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//             </div>

//             {error && (
//               <div className="rounded-md bg-red-50 p-4">
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     <svg
//                       className="h-5 w-5 text-red-400"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-red-800">{error}</h3>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-1 gap-3">
//               <button
//                 type="button"
//                 onClick={handleGoogleLogin}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
//               >
//                 <FcGoogle className="h-5 w-5 mr-2" />
//                 Google
//               </button>
//             </div>
//           </div>

//           <div className="mt-8 text-center text-sm text-gray-600">
//             Don't have an account?{" "}
//             <a
//               href="#"
//               className="font-medium text-green-600 hover:text-green-800 hover:underline"
//             >
//               Get started
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* CSS for polygon shapes */}
//       <style jsx>{`
//         .clip-path-polygon-1 {
//           clip-path: polygon(0 0, 100% 0, 100% 100%);
//         }
//         .clip-path-polygon-2 {
//           clip-path: polygon(0 0, 100% 0, 0 100%);
//         }
//         .clip-path-polygon-3 {
//           clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
//         }
//         .clip-path-polygon-4 {
//           clip-path: polygon(50% 100%, 0 0, 100% 0);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../../assets/4.jpg";
import Footer from "../../components/Footer/Footer"; // <-- import footer here
import NavBar from "../../components/NavBar/NavBar";
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  return (

    <div className="min-h-screen flex flex-col justify-between bg-gray-50 relative overflow-hidden">
      <NavBar />
      {/* Background Polygons */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 opacity-10 clip-path-polygon-1 transform rotate-45"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-600 opacity-10 clip-path-polygon-2 transform -rotate-12"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-green-400 opacity-15 clip-path-polygon-3 transform rotate-15"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-700 opacity-10 clip-path-polygon-4 transform -rotate-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative overflow-hidden">
          <img
            src={loginImage}
            alt="Login Visual"
            className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-green-700/30"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">InventoryPro</h2>
            <p className="opacity-90">Streamline your inventory management</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <div className="flex justify-end">
                <a
                  href="forgot-password"
                  className="text-sm text-green-600 hover:text-green-800 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Google Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                Google
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="register"
              className="font-medium text-green-600 hover:text-green-800 hover:underline"
            >
            Register
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* CSS for polygon shapes */}
      <style jsx>{`
        .clip-path-polygon-1 {
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
        .clip-path-polygon-2 {
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }
        .clip-path-polygon-3 {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .clip-path-polygon-4 {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
      `}</style>
    </div>
  );
};

export default Login;
