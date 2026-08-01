const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  // Fail fast if Gmail doesn't respond
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async (to, subject, html) => {
  console.log("📧 Sending email to:", to);
  console.log("📧 Using email:", process.env.EMAIL_USER);

  try {
    const info = await transporter.sendMail({
      from: `"PizzaWeb" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email Error:");
    console.error(error);
    throw error;
  }
};

module.exports = sendEmail;