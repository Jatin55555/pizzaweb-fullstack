const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/Orders");
const Inventory = require("../models/Inventory");
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const crypto = require("crypto");

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
    } = req.body;
    

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentStatus: "Paid",
      paymentId: razorpay_payment_id,
      status: "Order Received",
    });
   // Update Inventory
for (const item of items) {
  const quantity = item.quantity;

  
  // Base
  await Inventory.findOneAndUpdate(
    { name: item.base },
    { $inc: { quantity: -quantity } }
  );

  // Sauce
  await Inventory.findOneAndUpdate(
    { name: item.sauce },
    { $inc: { quantity: -quantity } }
  );

  // Cheese
  await Inventory.findOneAndUpdate(
    { name: item.cheese },
    { $inc: { quantity: -quantity } }
  );

  // Vegetables
  for (const vegetable of item.vegetables) {
    await Inventory.findOneAndUpdate(
      { name: vegetable },
      { $inc: { quantity: -quantity } }
    );
  }
}

    res.status(201).json({
      success: true,
      message: "Payment Verified Successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
