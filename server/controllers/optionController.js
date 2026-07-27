const Option = require("../models/Option");

// Get All Options
const getOptions = async (req, res) => {
  try {
    const options = await Option.find().sort({ type: 1, name: 1 });

    res.status(200).json({
      success: true,
      options,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Option
const createOption = async (req, res) => {
  try {
    const { name, type, price, isAvailable } = req.body;

    const exists = await Option.findOne({ name, type });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Option already exists",
      });
    }

    const option = await Option.create({
      name,
      type,
      price,
      isAvailable,
    });

    res.status(201).json({
      success: true,
      message: "Option created successfully",
      option,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Option
const updateOption = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);

    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    option.name = req.body.name;
    option.type = req.body.type;
    option.price = req.body.price;
    option.isAvailable = req.body.isAvailable;

    await option.save();

    res.status(200).json({
      success: true,
      message: "Option updated successfully",
      option,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Option
const deleteOption = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);

    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    await option.deleteOne();

    res.status(200).json({
      success: true,
      message: "Option deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getOptions,
  createOption,
  updateOption,
  deleteOption,
};