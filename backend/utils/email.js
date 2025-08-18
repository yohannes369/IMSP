


// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER || 'yohannesyeneakal6@gmail.com',
//     pass: process.env.EMAIL_PASS || 'fakz wasj ufzt ubqk' // App password
//   }
// });

// // ==================== Verification Email ====================
// async function sendVerificationEmail(email, code) {
//   if (!email || typeof email !== 'string') {
//     console.error("❌ Email provided is invalid:", email);
//     throw new Error('Invalid email address format');
//   }

//   console.log(`📧 Preparing to send verification code to: ${email}, code: ${code}`);

//   const appName = 'Bonga University GCVS';
//   const mailOptions = {
//     from: `"${appName}" <${process.env.EMAIL_USER}>`,
//     to: email.trim(),
//     subject: '🔐 Email Verification - Action Required',
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 10px;">
//         <h2 style="color: #4CAF50;">Verify Your Email Address</h2>
//         <p>Use the following code to verify your email address:</p>
//         <div style="font-size: 22px; background: #f0f0f0; padding: 10px; border-radius: 5px; display: inline-block; margin: 10px 0;">
//           ${code}
//         </div>
//         <p><b>Note:</b> This code will expire in <b>24 hours</b>. Do not share this code with anyone.</p>
//       </div>
//     `,
//     text: `Your email verification code is: ${code}. It expires in 24 hours.`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Verification code sent to ${email}`);
// }

// // ==================== Verification Success Email ====================
// async function sendVerificationSuccessEmail(email) {
//   if (!email || typeof email !== 'string') {
//     console.error("❌ Email provided is invalid for success email:", email);
//     throw new Error('Invalid email address format');
//   }

//   console.log(`📧 Preparing to send verification success email to: ${email}`);

//   const appName = 'Bonga University GCVS';
//   const mailOptions = {
//     from: `"${appName}" <${process.env.EMAIL_USER}>`,
//     to: email.trim(),
//     subject: '✅ Email Verified Successfully',
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 10px;">
//         <h2 style="color: #4CAF50;">Email Verified!</h2>
//         <p>Congratulations! Your email <b>${email}</b> has been successfully verified.</p>
//         <p>You can now log in and enjoy all the features of ${appName}.</p>
//       </div>
//     `,
//     text: `Your email ${email} has been successfully verified. You can now log in.`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Verification success email sent to ${email}`);
// }

// // ==================== 2FA Email ====================
// async function sendTwoFactorCodeEmail(email, code) {
//   if (!email || typeof email !== 'string') {
//     console.error("❌ Email provided is invalid for 2FA:", email);
//     throw new Error('Invalid email address format');
//   }

//   console.log(`📧 Sending 2FA code to: ${email}, code: ${code}`);

//   const appName = 'Bonga University GCVS';
//   const mailOptions = {
//     from: `"${appName} Security Team" <${process.env.EMAIL_USER}>`,
//     to: email.trim(),
//     subject: '🔑 Secure Login - Your 2FA Code',
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 10px;">
//         <h2 style="color: #FF5722;">Two-Factor Authentication</h2>
//         <p>We received a login request for your account. Use the 2FA code below to continue:</p>
//         <div style="font-size: 22px; background: #fff3e0; padding: 10px; border-radius: 5px; border: 1px solid #FF9800; display: inline-block; margin: 10px 0;">
//           ${code}
//         </div>
//         <p><b>This code will expire in 5 minutes.</b></p>
//         <p>If you did not try to log in, please reset your password immediately.</p>
//       </div>
//     `,
//     text: `Your 2FA login code is: ${code}. It will expire in 5 minutes. If you did not request this code, reset your password immediately.`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ 2FA code sent to ${email}`);
// }

// module.exports = { sendVerificationEmail, sendVerificationSuccessEmail, sendTwoFactorCodeEmail };

// corect one


// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER || 'yohannesyeneakal6@gmail.com',
//     pass: process.env.EMAIL_PASS || 'fakz wasj ufzt ubqk' // App password (move to .env!)
//   }
// });

// /** ------------------ Email Verification ------------------ */
// async function sendVerificationEmail(email, code) {
//   if (!email || typeof email !== 'string') {
//     console.error("❌ Email provided is invalid:", email);
//     throw new Error('Invalid email address format');
//   }

//   console.log(`📧 Preparing to send verification code to: ${email}, code: ${code}`);

//   const appName = 'Bonga University IMS';
//   const mailOptions = {
//     from: `"${appName}" <${process.env.EMAIL_USER}>`,
//     to: email.trim(),
//     subject: '🔐 Email Verification - Action Required',
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 10px;">
//         <h2 style="color: #4CAF50;">Verify Your Email Address</h2>
//         <p>Use the following code to verify your email address:</p>
//         <div style="font-size: 22px; background: #f0f0f0; padding: 10px; border-radius: 5px; display: inline-block; margin: 10px 0;">
//           ${code}
//         </div>
//         <p><b>Note:</b> This code will expire in <b>24 hours</b>. Do not share this code with anyone.</p>
//       </div>
//     `,
//     text: `Your email verification code is: ${code}. It expires in 24 hours.`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Verification code sent to ${email}`);
// }

// /** ------------------ Verification Success ------------------ */
// async function sendVerificationSuccessEmail(email) {
//   if (!email || typeof email !== 'string') {
//     console.error("❌ Email provided is invalid for success email:", email);
//     throw new Error('Invalid email address format');
//   }

//   console.log(`📧 Preparing to send verification success email to: ${email}`);

//   const appName = 'Bonga University IMS';
//   const mailOptions = {
//     from: `"${appName}" <${process.env.EMAIL_USER}>`,
//     to: email.trim(),
//     subject: '✅ Email Verified Successfully',
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 10px;">
//         <h2 style="color: #4CAF50;">Email Verified!</h2>
//         <p>Congratulations! Your email <b>${email}</b> has been successfully verified.</p>
//         <p>You can now log in and enjoy all the features of ${appName}.</p>
//       </div>
//     `,
//     text: `Your email ${email} has been successfully verified. You can now log in.`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Verification success email sent to ${email}`);
// }

// /** ------------------ 2FA Login Code ------------------ */
// async function sendTwoFactorCodeEmail(email, code) {
//   if (!email || typeof email !== 'string') {
//     console.error("❌ Email provided is invalid for 2FA:", email);
//     throw new Error('Invalid email address format');
//   }

//   console.log(`📧 Sending 2FA code to: ${email}, code: ${code}`);

//   const appName = 'Bonga University IMS';
//   const mailOptions = {
//     from: `"${appName} Security Team" <${process.env.EMAIL_USER}>`,
//     to: email.trim(),
//     subject: '🔑 Secure Login - Your 2FA Code',
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 10px;">
//         <h2 style="color: #FF5722;">Two-Factor Authentication</h2>
//         <p>We received a login request for your account. Use the 2FA code below to continue:</p>
//         <div style="font-size: 22px; background: #fff3e0; padding: 10px; border-radius: 5px; border: 1px solid #FF9800; display: inline-block; margin: 10px 0;">
//           ${code}
//         </div>
//         <p><b>This code will expire in 5 minutes.</b></p>
//         <p>If you did not try to log in, please reset your password immediately.</p>
//       </div>
//     `,
//     text: `Your 2FA login code is: ${code}. It will expire in 5 minutes. If you did not request this code, reset your password immediately.`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ 2FA code sent to ${email}`);
// }

// /** ------------------ Password Reset Code ------------------ */
// async function sendPasswordResetEmail(email, code) {
//   if (!email || typeof email !== 'string') {
//     console.error("❌ Email provided is invalid for password reset:", email);
//     throw new Error('Invalid email address format');
//   }

//   console.log(`📧 Sending password reset code to: ${email}, code: ${code}`);

//   const appName = 'Bonga University GCVS';
//   const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//   const resetLink = `${baseUrl}/reset-password?email=${encodeURIComponent(email)}&code=${code}`;

//   const mailOptions = {
//     from: `"${appName} Support" <${process.env.EMAIL_USER}>`,
//     to: email.trim(),
//     subject: '🔁 Password Reset Request',
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 10px;">
//         <h2>Reset Your Password</h2>
//         <p>You (or someone) requested to reset the password for your account.</p>
//         <p>Use the reset code below OR click the reset link:</p>
//         <div style="font-size: 22px; background: #e3f2fd; padding: 10px; border-radius: 5px; border: 1px solid #2196F3; display: inline-block; margin: 10px 0;">
//           ${code}
//         </div>
//         <p><a href="${resetLink}" style="display:inline-block;padding:8px 16px;background:#2196F3;color:#fff;text-decoration:none;border-radius:4px;">Reset Password</a></p>
//         <p>This code expires in 15 minutes. If you did not request a reset, ignore this email.</p>
//       </div>
//     `,
//     text: `Use this password reset code: ${code} (expires in 15 minutes).\nOr reset here: ${resetLink}`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Password reset email sent to ${email}`);
// }

// module.exports = { 
//   sendVerificationEmail, 
//   sendVerificationSuccessEmail, 
//   sendTwoFactorCodeEmail,
//   sendPasswordResetEmail 
// };
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'yohannesyeneakal6@gmail.com',
    pass: process.env.EMAIL_PASS || 'fakz wasj ufzt ubqk' // App password (move to .env!)
  }
});

// Cal Poly color scheme
const CALPOLY_GREEN = '#154734';
const CALPOLY_GOLD = '#C4820E';
const LIGHT_GREEN = '#E8F4EA';

const emailTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background-color: ${CALPOLY_GREEN};
      padding: 25px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
    }
    .footer {
      background-color: ${LIGHT_GREEN};
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #555;
    }
    .code-box {
      background: ${LIGHT_GREEN};
      color: ${CALPOLY_GREEN};
      font-size: 24px;
      font-weight: bold;
      padding: 15px;
      text-align: center;
      margin: 25px 0;
      border-radius: 6px;
      letter-spacing: 3px;
      border: 1px dashed ${CALPOLY_GREEN};
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: ${CALPOLY_GOLD};
      color: white !important;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 15px 0;
    }
    .note {
      font-size: 13px;
      color: #666;
      margin-top: 25px;
      padding-top: 15px;
      border-top: 1px solid #eee;
    }
    .logo {
      height: 50px;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Smart Inventory Management System</h1>
      <div style="font-size: 16px; margin-top: 10px;">${title}</div>
    </div>
    <div class="content">
      ${content}
      <div class="note">
        <p>If you didn't request this action, please ignore this email or contact our support team immediately.</p>
      </div>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Smart IMS. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

/** ------------------ Email Verification ------------------ */
async function sendVerificationEmail(email, code) {
  if (!email || typeof email !== 'string') {
    console.error("❌ Invalid email:", email);
    throw new Error('Invalid email address format');
  }

  console.log(`📧 Sending verification code to: ${email}`);

  const mailOptions = {
    from: `"Smart IMS" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: '🔐 Verify Your Email - Smart IMS',
    html: emailTemplate(
      'Complete Your Registration',
      `
      <p>Welcome to Smart Inventory Management System!</p>
      <p>To complete your registration, please verify your email address using the following code:</p>
      <div class="code-box">${code}</div>
      <p>This verification code will expire in <strong>24 hours</strong>.</p>
      <p>Please do not share this code with anyone.</p>
      `
    ),
    text: `Your Smart IMS verification code is: ${code}\nThis code expires in 24 hours.`
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Verification code sent to ${email}`);
}

/** ------------------ Verification Success ------------------ */
async function sendVerificationSuccessEmail(email) {
  const mailOptions = {
    from: `"Smart IMS" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: '✅ Email Verified - Smart IMS',
    html: emailTemplate(
      'Verification Successful',
      `
      <p>Congratulations! Your email <strong>${email}</strong> has been successfully verified.</p>
      <p>You now have full access to the Smart Inventory Management System.</p>
      <center><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" class="button">Access Your Account</a></center>
      <p>If you have any questions about using our system, please contact our support team.</p>
      `
    ),
    text: `Your email ${email} has been successfully verified. You can now log in to Smart IMS.`
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Verification success email sent to ${email}`);
}

/** ------------------ 2FA Login Code ------------------ */
async function sendTwoFactorCodeEmail(email, code) {
  const mailOptions = {
    from: `"Smart IMS Security" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: '🔒 Your Secure Login Code - Smart IMS',
    html: emailTemplate(
      'Two-Factor Authentication',
      `
      <p>We detected a login attempt for your Smart IMS account.</p>
      <p>For your security, please use this verification code to complete your login:</p>
      <div class="code-box">${code}</div>
      <p style="color: #d32f2f;"><strong>This code will expire in 5 minutes.</strong></p>
      <p>If you didn't attempt to log in, please secure your account immediately.</p>
      `
    ),
    text: `Your Smart IMS 2FA code is: ${code}\nExpires in 5 minutes. If unauthorized, secure your account.`
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ 2FA code sent to ${email}`);
}

/** ------------------ Password Reset Code ------------------ */
async function sendPasswordResetEmail(email, code) {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const resetLink = `${baseUrl}/reset-password?email=${encodeURIComponent(email)}&code=${code}`;

  const mailOptions = {
    from: `"Smart IMS Support" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: '🔁 Password Reset Request - Smart IMS',
    html: emailTemplate(
      'Password Reset',
      `
      <p>We received a request to reset your Smart IMS account password.</p>
      <p>Use this verification code to proceed:</p>
      <div class="code-box">${code}</div>
      <p>Or click the button below to reset your password:</p>
      <center><a href="${resetLink}" class="button">Reset Password</a></center>
      <p><strong>This code will expire in 15 minutes.</strong></p>
      <p>If you didn't request a password reset, please ignore this email.</p>
      `
    ),
    text: `Password reset code: ${code}\nOr use this link: ${resetLink}\nExpires in 15 minutes.`
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Password reset email sent to ${email}`);
}

module.exports = { 
  sendVerificationEmail, 
  sendVerificationSuccessEmail, 
  sendTwoFactorCodeEmail,
  sendPasswordResetEmail 
};