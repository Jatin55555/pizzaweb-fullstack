const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  getOptions,
  createOption,
  updateOption,
  deleteOption,
} = require("../controllers/optionController");

// Everyone can view options
router.get("/", getOptions);

// Only Admin
router.post("/", protect, adminOnly, createOption);

router.put("/:id", protect, adminOnly, updateOption);

router.delete("/:id", protect, adminOnly, deleteOption);

module.exports = router;