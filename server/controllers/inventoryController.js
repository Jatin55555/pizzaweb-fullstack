const Inventory = require("../models/Inventory");

// Get All Inventory
const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Inventory Item
const addInventoryItem = async (req, res) => {
  try {
   const { name, quantity, unit, lowStockLimit } = req.body;

// Remove extra spaces from the name
const cleanName = name.trim();

// Check if ingredient already exists
const exists = await Inventory.findOne({ name: cleanName });

if (exists) {
  return res.status(400).json({
    success: false,
    message: "Ingredient already exists",
  });
}

// Create new ingredient
const item = await Inventory.create({
  name: cleanName,
  quantity,
  unit,
  lowStockLimit,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Inventory Item
const updateInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Ingredient not found",
      });
    }

    item.name = req.body.name.trim();
    item.quantity = req.body.quantity;
    item.unit = req.body.unit;
    item.lowStockLimit = req.body.lowStockLimit;
    if (item.quantity > item.lowStockLimit) {
  item.alertSent = false;
}

    await item.save();

    res.status(200).json({
      success: true,
      message: "Ingredient updated successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Inventory Item
const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Ingredient not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Ingredient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
