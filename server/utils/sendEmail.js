const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
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