const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async (to, subject, html) => {
  try {
    console.log("📧 Sending email to:", to);

    const result = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "PizzaWeb",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [
        {
          email: to,
        },
      ],
      subject,
      htmlContent: html,
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", result.messageId);

    return result;
  } catch (error) {
    console.error("❌ Brevo API Error:");
    console.error(error);

    throw error;
  }
};

module.exports = sendEmail;