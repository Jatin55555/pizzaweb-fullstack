const Order = require("../models/Orders");

// Create Order
const createOrder = async (req, res) => {
  try {
    const {
      items,
      subtotal,
      deliveryFee,
      totalAmount,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const order = await Order.create({
      user: req.user.id,

      items,

      subtotal,

      deliveryFee,

      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
  .populate("items.pizza")
  .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get Logged-in User Orders
const getMyOrders = async (req, res) => {
  
  try {
   
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("items.pizza")
      .sort({ createdAt: -1 });
 
      
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
};