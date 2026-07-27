const mongoose = require("mongoose");
require("dotenv").config();

const CustomOption = require("../models/CustomOption");

const options = [
  // Bases
  { type: "base", name: "Thin Crust", price: 0 },
  { type: "base", name: "Pan", price: 30 },
  { type: "base", name: "Stuffed Crust", price: 60 },
  { type: "base", name: "Whole Wheat", price: 20 },
  { type: "base", name: "Cheese Burst", price: 80 },

  // Sauces
  { type: "sauce", name: "Tomato", price: 0 },
  { type: "sauce", name: "BBQ", price: 20 },
  { type: "sauce", name: "White Sauce", price: 25 },
  { type: "sauce", name: "Pesto", price: 30 },
  { type: "sauce", name: "Garlic", price: 15 },

  // Cheese
  { type: "cheese", name: "Mozzarella", price: 0 },
  { type: "cheese", name: "Cheddar", price: 20 },
  { type: "cheese", name: "Parmesan", price: 30 },
  { type: "cheese", name: "Mix Cheese", price: 40 },
  { type: "cheese", name: "Vegan Cheese", price: 50 },

  // Vegetables
  { type: "vegetable", name: "Onion", price: 10 },
  { type: "vegetable", name: "Capsicum", price: 10 },
  { type: "vegetable", name: "Mushroom", price: 20 },
  { type: "vegetable", name: "Corn", price: 15 },
  { type: "vegetable", name: "Jalapeno", price: 20 },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await CustomOption.deleteMany();

    await CustomOption.insertMany(options);

    

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();