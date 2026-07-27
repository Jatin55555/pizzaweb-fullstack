require("dotenv").config();

const sendEmail = require("./utils/sendEmail");

const test = async () => {
  try {
    await sendEmail(
      "PizzaWeb Test Email",
      "🎉 Congratulations! Your email configuration is working."
    );

    
  } catch (error) {
    console.log(error);
  }
};

test();