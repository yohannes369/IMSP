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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-tr from-green-700 via-green-800 to-green-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-700/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-800/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-green-700/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <Card className="w-full max-w-md relative bg-white/80 backdrop-blur-xl border-green-700/50 shadow-lg animate-slide-up">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-green-700 to-green-800 rounded-full animate-glow">
              <Sparkles className="w-8 h-8 text-green-900" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-green-900">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div
              className="space-y-2 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Label htmlFor="email" className="text-sm font-medium text-green-900">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="pl-10 bg-green-50 border-green-700 focus:border-green-700 focus:ring-green-700 transition-all duration-300 hover:shadow-lg"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div
              className="space-y-2 animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Label
                htmlFor="password"
                className="text-sm font-medium text-green-900"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-4 h-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-green-50 border-green-700 focus:border-green-700 focus:ring-green-700 transition-all duration-300 hover:shadow-lg"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-900 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-scale-in"
              style={{ animationDelay: "0.3s" }}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div
            className="relative animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-green-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-green-700">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full bg-green-50 border-green-700 hover:bg-green-100 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-scale-in"
            style={{ animationDelay: "0.5s" }}
          >
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>

          {error && (
            <Alert
              variant="destructive"
              className="animate-scale-in bg-red-100 border-red-400 text-red-700"
              role="alert"
            >
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
