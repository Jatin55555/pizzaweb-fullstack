const Order = require("../models/Orders");
const Pizza = require("../models/Pizza");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalCustomers = await User.countDocuments();

    const totalPizzas = await Pizza.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: { $ne: "Delivered" },
    });

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.json({
      success: true,

      dashboard: {
        totalOrders,
        totalCustomers,
        totalPizzas,
        pendingOrders,
        revenue: revenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
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

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "Order Received",
      "Preparing",
      "Baking",
      "Out for Delivery",
      "Delivered",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      pizzas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createPizza = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !image ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const pizza = await Pizza.create({
      name,
      description,
      price,
      image,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Pizza created successfully",
      pizza,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    const {
      name,
      description,
      price,
      image,
      category,
    } = req.body;

    pizza.name = name;
    pizza.description = description;
    pizza.price = price;
    pizza.image = image;
    pizza.category = category;

    await pizza.save();

    res.status(200).json({
      success: true,
      message: "Pizza updated successfully",
      pizza,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    await pizza.deleteOne();

    res.status(200).json({
      success: true,
      message: "Pizza deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
  getAllOrders,
  updateOrderStatus,
  getAllPizzas,
  createPizza,
  updatePizza,
  deletePizza,
};