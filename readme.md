CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  gender ENUM('male','female') NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_verified TINYINT DEFAULT 0,
  verification_code VARCHAR(10) DEFAULT NULL,
  two_factor_code VARCHAR(10) DEFAULT NULL,
  two_factor_expires DATETIME DEFAULT NULL,
  password_reset_code VARCHAR(10) DEFAULT NULL,
  password_reset_expires DATETIME DEFAULT NULL,
  role ENUM('admin','manager','clerk','staff') DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


1. REGISTER
URL:

bash
Copy
Edit
POST http://localhost:5000/api/auth/register
Body (JSON):

json
Copy
Edit
{
  "firstName": "John",
  "lastName": "Doe",
  "gender": "male",
  "phone": "0912345678",
  "email": "yohannesyeneakal6@gmail.com",
  "password": "123456"
}
Expected Response:

json
Copy
Edit
{
  "message": "Registered successfully. Please verify your email."
}
(Verification code will be sent to the email.)

2. VERIFY EMAIL
URL:

bash
Copy
Edit
POST http://localhost:5000/api/auth/verify-email
Body (JSON):

json
Copy
Edit
{
  "email": "yohannesyeneakal6@gmail.com",
  "code": "123456"   // Replace with the code sent via email
}
Expected Response:

json
Copy
Edit
{
  "message": "Email verified successfully"
}
3. LOGIN (STEP 1)
URL:

bash
Copy
Edit
POST http://localhost:5000/api/auth/login
Body (JSON):

json
Copy
Edit
{
  "email": "yohannesyeneakal6@gmail.com",
  "password": "123456"
}
Expected Response:

json
Copy
Edit
{
  "message": "2FA code sent to your email. Please verify to complete login."
}
4. VERIFY 2FA (STEP 2)
URL:

bash
Copy
Edit
POST http://localhost:5000/api/auth/verify-2fa
Body (JSON):

json
Copy
Edit
{
  "email": "yohannesyeneakal6@gmail.com",
  "code": "123456"  // Replace with 2FA code sent to email
}
Expected Response (with JWT token):

json
Copy
Edit
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "2FA verified. Logged in successfully."
}
5. FORGOT PASSWORD (Send Reset Code)
URL:

bash
Copy
Edit
POST http://localhost:5000/api/auth/forgot-password
Body (JSON):

json
Copy
Edit
{
  "email": "yohannesyeneakal6@gmail.com"
}
Expected Response:

json
Copy
Edit
{
  "message": "Password reset code sent if account exists."
}
6. RESET PASSWORD
URL:

bash
Copy
Edit
POST http://localhost:5000/api/auth/reset-password
Body (JSON):

json
Copy
Edit
{
  "email": "yohannesyeneakal6@gmail.com",
  "code": "654321",       // Reset code from email
  "newPassword": "newPass123"
}
Expected Response:

json
Copy
Edit
{
  "message": "Password reset successful. You can now log in."
}
7. LOGOUT
URL:

bash
Copy
Edit
POST http://localhost:5000/api/auth/logout
Headers:

makefile
Copy
Edit
Authorization: Bearer <your_jwt_token>
Expected Response:

json
Copy
Edit
{
  "message": "Logged out successfully"
}
Next Step
Would you like me to generate a ready-to-import Postman collection (JSON file) with all these endpoints and sample data?








You said:

    "message": "Invalid or expired reset code"
}


ChatGPT said:
The "Invalid or expired reset code" message means one of these issues is happening during your password reset flow:

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const verifyEmail = (data) => axios.post(`${API_URL}/verify-email`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const verify2FA = (data) => axios.post(`${API_URL}/verify-2fa`, data);
export const forgotPassword = (data) => axios.post(`${API_URL}/forgot-password`, data);
export const resetPassword = (data) => axios.post(`${API_URL}/reset-password`, data);
export const logout = () => axios.post(`${API_URL}/logout`);

/frontend
├── /public
│    └── index.html                 # Static HTML entry point
│
├── /src
│    ├── /api
│    │     └── auth.js              # API calls (register, login, 2FA, etc.)
│    │
│    ├── /components
│    │     ├── Auth
│    │     │    ├── Register.jsx
│    │     │    ├── Login.jsx
│    │     │    ├── VerifyEmail.jsx
│    │     │    ├── TwoFactorAuth.jsx
│    │     │    ├── ForgotPassword.jsx
│    │     │    ├── ResetPassword.jsx
│    │     │    └── Logout.jsx
│    │     │
│    │     ├── UI                   # Buttons, Inputs, Layout wrappers, Modals, etc.
│    │     └── RoleBased            # Role-specific reusable components
│    │           ├── AdminPanel.jsx
│    │           ├── ManagerPanel.jsx
│    │           ├── ClerkPanel.jsx
│    │           └── StaffPanel.jsx
│    │
│    ├── /contexts
│    │     └── AuthContext.jsx      # User auth + role global state + methods
│    │
│    ├── /hooks
│    │     └── useAuth.js           # Custom hooks (e.g., useAuth, useRole)
│    │
│    ├── /pages
│    │     ├── AdminDashboard.jsx
│    │     ├── ManagerDashboard.jsx
│    │     ├── ClerkDashboard.jsx
│    │     ├── StaffDashboard.jsx
│    │     ├── LoginPage.jsx
│    │     ├── RegisterPage.jsx
│    │     ├── VerifyEmailPage.jsx
│    │     ├── TwoFactorAuthPage.jsx
│    │     ├── ForgotPasswordPage.jsx
│    │     └── ResetPasswordPage.jsx
│    │
│    ├── App.jsx                   # Main app component with routes & layout
│    ├── index.js                  # ReactDOM render root
│    └── routes.js                 # React Router setup + protected routes
│
├── package.json
└── README.md

npm install -D tailwindcss@^3 autoprefixer@^10 postcss@^8
