


// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER || 'yohannesyeneakal6@gmail.com',
//     pass: process.env.EMAIL_PASS || 'fakz wasj ufzt ubqk' // App password
//   }
// });

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
//     subject: '🔐 Email Verification',
//     html: `
//       <h2>Verify Your Email Address</h2>
//       <p>Use the verification code below:</p>
//       <div style="font-size:24px; margin:10px 0; border:1px dashed #ccc; padding:10px;">${code}</div>
//       <p>This code expires in 24 hours.</p>
//     `,
//     text: `Your verification code is: ${code}. It expires in 24 hours.`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Verification code sent to ${email}`);
// }

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
//     subject: '✅ Email Successfully Verified',
//     html: `
//       <h2>Email Verified</h2>
//       <p>Your email has been successfully verified. You can now log in to your account.</p>
//     `,
//     text: 'Your email has been successfully verified. You can now log in to your account.'
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Verification success email sent to ${email}`);
// }

// module.exports = { sendVerificationEmail, sendVerificationSuccessEmail };


// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER || 'yohannesyeneakal6@gmail.com',
//     pass: process.env.EMAIL_PASS || 'fakz wasj ufzt ubqk' // App password
//   }
// });

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
//     subject: '🔐 Email Verification',
//     html: `
//       <h2>Verify Your Email Address</h2>
//       <p>Use the verification code below:</p>
//       <div style="font-size:24px; margin:10px 0; border:1px dashed #ccc; padding:10px;">${code}</div>
//       <p>This code expires in 24 hours.</p>
//     `,
//     text: `Your verification code is: ${code}. It expires in 24 hours.`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Verification code sent to ${email}`);
// }

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
//     subject: '✅ Email Successfully Verified',
//     html: `
//       <h2>Email Verified</h2>
//       <p>Your email has been successfully verified. You can now log in to your account.</p>
//     `,
//     text: 'Your email has been successfully verified. You can now log in to your account.'
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
//     from: `"${appName}" <${process.env.EMAIL_USER}>`,
//     to: email.trim(),
//     subject: '🔐 Your 2FA Login Code',
//     html: `
//       <h2>Two-Factor Authentication Code</h2>
//       <p>Use the code below to complete your login:</p>
//       <div style="font-size:24px; margin:10px 0; border:1px dashed #ccc; padding:10px;">${code}</div>
//       <p>This code expires in 5 minutes.</p>
//     `,
//     text: `Your 2FA code is: ${code}. It expires in 5 minutes.`
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ 2FA code sent to ${email}`);
// }

// module.exports = { sendVerificationEmail, sendVerificationSuccessEmail, sendTwoFactorCodeEmail };
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'yohannesyeneakal6@gmail.com',
    pass: process.env.EMAIL_PASS || 'fakz wasj ufzt ubqk' // App password
  }
});

// ==================== Verification Email ====================
async function sendVerificationEmail(email, code) {
  if (!email || typeof email !== 'string') {
    console.error("❌ Email provided is invalid:", email);
    throw new Error('Invalid email address format');
  }

  console.log(`📧 Preparing to send verification code to: ${email}, code: ${code}`);

  const appName = 'Bonga University GCVS';
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

// ==================== Verification Success Email ====================
async function sendVerificationSuccessEmail(email) {
  if (!email || typeof email !== 'string') {
    console.error("❌ Email provided is invalid for success email:", email);
    throw new Error('Invalid email address format');
  }

  console.log(`📧 Preparing to send verification success email to: ${email}`);

  const appName = 'Bonga University GCVS';
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

// ==================== 2FA Email ====================
async function sendTwoFactorCodeEmail(email, code) {
  if (!email || typeof email !== 'string') {
    console.error("❌ Email provided is invalid for 2FA:", email);
    throw new Error('Invalid email address format');
  }

  console.log(`📧 Sending 2FA code to: ${email}, code: ${code}`);

  const appName = 'Bonga University GCVS';
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

module.exports = { sendVerificationEmail, sendVerificationSuccessEmail, sendTwoFactorCodeEmail };
