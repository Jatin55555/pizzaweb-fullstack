const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  console.log("📧 Sending email to:", to);

  const { data, error } = await resend.emails.send({
    from: "PizzaWeb <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) {
    console.error("❌ Resend API Error:");
    console.error(error);
    throw new Error(error.message);
  }

  console.log("✅ Email sent successfully!");
  console.log(data);

  return data;
};

module.exports = sendEmail;