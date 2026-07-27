const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  getDashboard,
  getAllOrders,
  updateOrderStatus,
  getAllPizzas,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/adminController");

// Dashboard
router.get("/dashboard", protect, adminOnly, getDashboard);

// Orders
router.get("/orders", protect, adminOnly, getAllOrders);

router.patch("/orders/:id", protect, adminOnly, updateOrderStatus);

// Pizzas
router.get("/pizzas", protect, adminOnly, getAllPizzas);

router.post("/pizzas", protect, adminOnly, createPizza);

router.put("/pizzas/:id", protect, adminOnly, updatePizza);

router.delete("/pizzas/:id", protect, adminOnly, deletePizza);

module.exports = router;