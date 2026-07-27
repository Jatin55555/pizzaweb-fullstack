const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const pizzaRoutes = require("./routes/pizzaRoutes");
const customOptionRoutes = require("./routes/customOptionRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const optionRoutes = require("./routes/optionRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const checkLowStock = require("./jobs/checkLowStock");
const app = express();

// Connect Database
connectDB();

//lowstock check 
checkLowStock();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/pizzas", pizzaRoutes);

app.use("/api/custom-options", customOptionRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/options", optionRoutes);

app.use("/api/payment", paymentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Pizza Delivery Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});