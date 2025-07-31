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




Project ID: imsp-466818. It cannot be changed later.
AIzaSyDXMaQEv81Qu1cNqGMJ-XbOOsKB4iZp1oo
http://localhost:5000/api/auth/google/callback
http://localhost:5173


import React from 'react';

export default function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Login with Google
    </button>
  );
}



id
firstName
lastName
gender
phone
email
password
is_verified
verification_code
two_factor_code
two_factor_expires
password_reset_code
password_reset_expires
role
created_at
googleId
photo

C-- 1. Table to store unique item names
CREATE TABLE item_names (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- 2. Table to store individual items with serial numbers
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serial_no VARCHAR(100) UNIQUE NOT NULL,
  name_id INT NOT NULL,
  description TEXT,
  quantity INT NOT NULL DEFAULT 1,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (name_id) REFERENCES item_names(id) ON DELETE CASCADE
);








// iuse 

CREATE TABLE item_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL,              -- requester user id
  staff_name VARCHAR(255) NOT NULL,
  staff_email VARCHAR(255) NOT NULL,
  item_type VARCHAR(255) NOT NULL,
  item_serial VARCHAR(255),
  quantity INT NOT NULL,
  explanation TEXT,
  status ENUM('pending_manager', 'rejected_manager', 'pending_clerk', 'rejected_clerk', 'approved') DEFAULT 'pending_manager',

  manager_cause TEXT DEFAULT NULL,

  clerk_cause TEXT DEFAULT NULL,
  given_to_staff_at DATETIME DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (staff_id) REFERENCES users(id)
);
 


 correct
 ALTER TABLE users
ADD COLUMN staff_id VARCHAR(10) UNIQUE;


CREATE TABLE item_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id VARCHAR(10) NOT NULL,
  staff_name VARCHAR(255) NOT NULL,
  staff_email VARCHAR(255) NOT NULL,
  item_type VARCHAR(255) NOT NULL,
  item_serial VARCHAR(255),
  quantity INT NOT NULL,
  explanation TEXT,
  status ENUM('pending_manager', 'rejected_manager', 'pending_clerk', 'rejected_clerk', 'approved') DEFAULT 'pending_manager',
  manager_cause TEXT DEFAULT NULL,
  clerk_cause TEXT DEFAULT NULL,
  given_to_staff_at DATETIME DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (staff_id) REFERENCES users(staff_id)
);



CREATE TABLE item_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id VARCHAR(10) NOT NULL,
  staff_name VARCHAR(255) NOT NULL,
  staff_email VARCHAR(255) NOT NULL,
  item_type VARCHAR(255) NOT NULL,
  item_serial VARCHAR(255),
  quantity INT NOT NULL,
  explanation TEXT,
  
  manager_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  manager_cause TEXT DEFAULT NULL,
  
  clerk_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  clerk_cause TEXT DEFAULT NULL,
  
  given_to_staff_at DATETIME DEFAULT NULL,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (staff_id) REFERENCES users(staff_id)
);


CREATE TABLE item_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id VARCHAR(10) NOT NULL,
  staff_name VARCHAR(255) NOT NULL,
  staff_email VARCHAR(255) NOT NULL,
  item_type VARCHAR(255) NOT NULL,
  item_serial VARCHAR(255),
  quantity INT NOT NULL,
  explanation TEXT,
  
  -- Manager approval section
  manager_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  manager_decision_at DATETIME DEFAULT NULL,
  manager_cause TEXT DEFAULT NULL,
  manager_id VARCHAR(10) DEFAULT NULL,
  manager_name VARCHAR(255) DEFAULT NULL,
  
  -- Clerk approval section
  clerk_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  clerk_decision_at DATETIME DEFAULT NULL,
  clerk_cause TEXT DEFAULT NULL,
  clerk_id VARCHAR(10) DEFAULT NULL,
  clerk_name VARCHAR(255) DEFAULT NULL,
  
  -- Item fulfillment section
  given_to_staff_at DATETIME DEFAULT NULL,
  given_by_id VARCHAR(10) DEFAULT NULL,
  given_by_name VARCHAR(255) DEFAULT NULL,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (staff_id) REFERENCES users(staff_id),
  FOREIGN KEY (manager_id) REFERENCES users(staff_id),
  FOREIGN KEY (clerk_id) REFERENCES users(staff_id),
  FOREIGN KEY (given_by_id) REFERENCES users(staff_id)
);



CREATE TABLE item_requests (
  id SERIAL PRIMARY KEY,
  staff_id VARCHAR(10) NOT NULL,
  staff_name VARCHAR(255) NOT NULL,
  staff_email VARCHAR(255) NOT NULL,
  item_type VARCHAR(255) NOT NULL,
  item_serial VARCHAR(255),
  quantity INT NOT NULL,
  explanation TEXT,
  status VARCHAR(20) DEFAULT 'pending_manager',
  manager_comment TEXT,
  clerk_comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
