const mongoose = require("mongoose");

const customOptionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["base", "sauce", "cheese", "vegetable"],
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomOption", customOptionSchema);