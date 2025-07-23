


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

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'yohannesyeneakal6@gmail.com',
    pass: process.env.EMAIL_PASS || 'fakz wasj ufzt ubqk' // App password (move to .env!)
  }
});

/** ------------------ Email Verification ------------------ */
async function sendVerificationEmail(email, code) {
  if (!email || typeof email !== 'string') {
    console.error("❌ Email provided is invalid:", email);
    throw new Error('Invalid email address format');
  }

  console.log(`📧 Preparing to send verification code to: ${email}, code: ${code}`);

  const appName = 'Bonga University IMS';
  const mailOptions = {
    from: `"${appName}" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: '🔐 Email Verification - Action Required',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2 style="color: #4CAF50;">Verify Your Email Address</h2>
        <p>Use the following code to verify your email address:</p>
        <div style="font-size: 22px; background: #f0f0f0; padding: 10px; border-radius: 5px; display: inline-block; margin: 10px 0;">
          ${code}
        </div>
        <p><b>Note:</b> This code will expire in <b>24 hours</b>. Do not share this code with anyone.</p>
      </div>
    `,
    text: `Your email verification code is: ${code}. It expires in 24 hours.`
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Verification code sent to ${email}`);
}

/** ------------------ Verification Success ------------------ */
async function sendVerificationSuccessEmail(email) {
  if (!email || typeof email !== 'string') {
    console.error("❌ Email provided is invalid for success email:", email);
    throw new Error('Invalid email address format');
  }

  console.log(`📧 Preparing to send verification success email to: ${email}`);

  const appName = 'Bonga University IMS';
  const mailOptions = {
    from: `"${appName}" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: '✅ Email Verified Successfully',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2 style="color: #4CAF50;">Email Verified!</h2>
        <p>Congratulations! Your email <b>${email}</b> has been successfully verified.</p>
        <p>You can now log in and enjoy all the features of ${appName}.</p>
      </div>
    `,
    text: `Your email ${email} has been successfully verified. You can now log in.`
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Verification success email sent to ${email}`);
}

/** ------------------ 2FA Login Code ------------------ */
async function sendTwoFactorCodeEmail(email, code) {
  if (!email || typeof email !== 'string') {
    console.error("❌ Email provided is invalid for 2FA:", email);
    throw new Error('Invalid email address format');
  }

  console.log(`📧 Sending 2FA code to: ${email}, code: ${code}`);

  const appName = 'Bonga University IMS';
  const mailOptions = {
    from: `"${appName} Security Team" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: '🔑 Secure Login - Your 2FA Code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2 style="color: #FF5722;">Two-Factor Authentication</h2>
        <p>We received a login request for your account. Use the 2FA code below to continue:</p>
        <div style="font-size: 22px; background: #fff3e0; padding: 10px; border-radius: 5px; border: 1px solid #FF9800; display: inline-block; margin: 10px 0;">
          ${code}
        </div>
        <p><b>This code will expire in 5 minutes.</b></p>
        <p>If you did not try to log in, please reset your password immediately.</p>
      </div>
    `,
    text: `Your 2FA login code is: ${code}. It will expire in 5 minutes. If you did not request this code, reset your password immediately.`
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ 2FA code sent to ${email}`);
}

/** ------------------ Password Reset Code ------------------ */
async function sendPasswordResetEmail(email, code) {
  if (!email || typeof email !== 'string') {
    console.error("❌ Email provided is invalid for password reset:", email);
    throw new Error('Invalid email address format');
  }

  console.log(`📧 Sending password reset code to: ${email}, code: ${code}`);

  const appName = 'Bonga University GCVS';
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const resetLink = `${baseUrl}/reset-password?email=${encodeURIComponent(email)}&code=${code}`;

  const mailOptions = {
    from: `"${appName} Support" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: '🔁 Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>Reset Your Password</h2>
        <p>You (or someone) requested to reset the password for your account.</p>
        <p>Use the reset code below OR click the reset link:</p>
        <div style="font-size: 22px; background: #e3f2fd; padding: 10px; border-radius: 5px; border: 1px solid #2196F3; display: inline-block; margin: 10px 0;">
          ${code}
        </div>
        <p><a href="${resetLink}" style="display:inline-block;padding:8px 16px;background:#2196F3;color:#fff;text-decoration:none;border-radius:4px;">Reset Password</a></p>
        <p>This code expires in 15 minutes. If you did not request a reset, ignore this email.</p>
      </div>
    `,
    text: `Use this password reset code: ${code} (expires in 15 minutes).\nOr reset here: ${resetLink}`
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
