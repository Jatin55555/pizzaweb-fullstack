const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventoryController");

// Inventory should only be visible to admin
router.get("/", protect, adminOnly, getInventory);

router.post("/", protect, adminOnly, addInventoryItem);

router.put("/:id", protect, adminOnly, updateInventoryItem);

router.delete("/:id", protect, adminOnly, deleteInventoryItem);

module.exports = router;