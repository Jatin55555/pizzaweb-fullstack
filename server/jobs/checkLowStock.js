const cron = require("node-cron");
const Inventory = require("../models/Inventory");
const sendEmail = require("../utils/sendEmail");

const checkLowStock = () => {
  // Every minute (for testing)
  cron.schedule("* * * * *", async () => {
   

    try {
     const lowStockItems = await Inventory.find({
  $expr: {
    $lte: ["$quantity", "$lowStockLimit"],
  },
  alertSent: false,
});

      if (lowStockItems.length === 0) {
        
        return;
      }

      let message = "Low Stock Alert\n\n";

      lowStockItems.forEach((item) => {
        message += `${item.name} : ${item.quantity} ${item.unit}\n`;
      });

      await sendEmail(
  process.env.ADMIN_EMAIL,
  "⚠️ PizzaWeb Low Stock Alert",
  `<pre>${message}</pre>`
);
      for (const item of lowStockItems) {
  item.alertSent = true;
  await item.save();
}

      
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = checkLowStock;