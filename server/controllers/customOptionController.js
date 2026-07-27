const CustomOption = require("../models/CustomOption");

// Get all customization options
const getCustomOptions = async (req, res) => {
  try {
    const options = await CustomOption.find();

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

module.exports = {
  getCustomOptions,
};