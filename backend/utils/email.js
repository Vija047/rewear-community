const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email
const sendEmail = async (to, subject, html, text = null) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"ReWear" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '') // Strip HTML tags for text version
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

// Welcome email template
const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to ReWear!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2c3e50; text-align: center;">Welcome to ReWear!</h1>
      <p>Hi ${user.firstName},</p>
      <p>Welcome to ReWear - the community clothing exchange platform! We're excited to have you join our sustainable fashion community.</p>
      <p>Here's what you can do:</p>
      <ul>
        <li>Browse and search for clothing items</li>
        <li>List your own items for swapping</li>
        <li>Request swaps with other community members</li>
        <li>Earn points for your contributions</li>
      </ul>
      <p>Start exploring and happy swapping!</p>
      <p>Best regards,<br>The ReWear Team</p>
    </div>
  `;

  return sendEmail(user.email, subject, html);
};

// Swap request notification email
const sendSwapRequestEmail = async (swapRequest, recipient) => {
  const subject = 'New Swap Request on ReWear';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2c3e50;">New Swap Request</h1>
      <p>Hi ${recipient.firstName},</p>
      <p>You have received a new swap request for your item.</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>Request Details:</h3>
        <p><strong>Requested Item:</strong> ${swapRequest.requestedItemId.title}</p>
        <p><strong>Offered Item:</strong> ${swapRequest.offeredItemId.title}</p>
        <p><strong>Message:</strong> ${swapRequest.message || 'No message provided'}</p>
      </div>
      <p>Please log in to your account to review and respond to this request.</p>
      <p>Best regards,<br>The ReWear Team</p>
    </div>
  `;

  return sendEmail(recipient.email, subject, html);
};

// Swap request response email
const sendSwapResponseEmail = async (swapRequest, recipient) => {
  const status = swapRequest.status === 'accepted' ? 'accepted' : 'rejected';
  const subject = `Swap Request ${status.charAt(0).toUpperCase() + status.slice(1)}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2c3e50;">Swap Request ${status.charAt(0).toUpperCase() + status.slice(1)}</h1>
      <p>Hi ${recipient.firstName},</p>
      <p>Your swap request has been <strong>${status}</strong>.</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>Request Details:</h3>
        <p><strong>Requested Item:</strong> ${swapRequest.requestedItemId.title}</p>
        <p><strong>Offered Item:</strong> ${swapRequest.offeredItemId.title}</p>
        ${swapRequest.responseMessage ? `<p><strong>Response:</strong> ${swapRequest.responseMessage}</p>` : ''}
      </div>
      <p>Please log in to your account for more details.</p>
      <p>Best regards,<br>The ReWear Team</p>
    </div>
  `;

  return sendEmail(recipient.email, subject, html);
};

// Item approval notification email
const sendItemApprovalEmail = async (item, user, isApproved) => {
  const subject = isApproved ? 'Your Item Has Been Approved!' : 'Item Listing Update';
  const status = isApproved ? 'approved' : 'requires changes';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2c3e50;">Item ${isApproved ? 'Approved' : 'Update Required'}</h1>
      <p>Hi ${user.firstName},</p>
      <p>Your item "<strong>${item.title}</strong>" has been ${status}.</p>
      ${!isApproved ? `
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Next Steps:</h3>
          <p>Please review and update your item listing to meet our community guidelines.</p>
        </div>
      ` : `
        <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Your item is now live!</h3>
          <p>Community members can now view and request swaps for your item.</p>
        </div>
      `}
      <p>Please log in to your account for more details.</p>
      <p>Best regards,<br>The ReWear Team</p>
    </div>
  `;

  return sendEmail(user.email, subject, html);
};

// Points earned notification email
const sendPointsEarnedEmail = async (user, points, reason) => {
  const subject = 'Points Earned on ReWear!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2c3e50;">Points Earned!</h1>
      <p>Hi ${user.firstName},</p>
      <p>Congratulations! You've earned <strong>${points} points</strong> on ReWear.</p>
      <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>Details:</h3>
        <p><strong>Reason:</strong> ${reason}</p>
        <p><strong>Points Earned:</strong> ${points}</p>
        <p><strong>Total Points:</strong> ${user.points + points}</p>
      </div>
      <p>Use your points to redeem items from other community members!</p>
      <p>Best regards,<br>The ReWear Team</p>
    </div>
  `;

  return sendEmail(user.email, subject, html);
};

// Password reset email
const sendPasswordResetEmail = async (user, resetToken) => {
  const subject = 'Password Reset Request - ReWear';
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2c3e50;">Password Reset Request</h1>
      <p>Hi ${user.firstName},</p>
      <p>You requested a password reset for your ReWear account.</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      </div>
      <p>If you didn't request this reset, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
      <p>Best regards,<br>The ReWear Team</p>
    </div>
  `;

  return sendEmail(user.email, subject, html);
};

// Account verification email
const sendVerificationEmail = async (user, verificationToken) => {
  const subject = 'Verify Your ReWear Account';
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2c3e50;">Verify Your Account</h1>
      <p>Hi ${user.firstName},</p>
      <p>Welcome to ReWear! Please verify your email address to complete your registration.</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>Click the button below to verify your account:</p>
        <a href="${verificationUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Account</a>
      </div>
      <p>If you didn't create this account, please ignore this email.</p>
      <p>Best regards,<br>The ReWear Team</p>
    </div>
  `;

  return sendEmail(user.email, subject, html);
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendSwapRequestEmail,
  sendSwapResponseEmail,
  sendItemApprovalEmail,
  sendPointsEarnedEmail,
  sendPasswordResetEmail,
  sendVerificationEmail
}; 