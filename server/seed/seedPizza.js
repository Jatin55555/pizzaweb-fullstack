const mongoose = require("mongoose");
require("dotenv").config();

const Pizza = require("../models/Pizza");

const pizzas = [
  {
    name: "Margherita",
    description: "Classic cheese pizza",
    price: 199,
    image: "https://placehold.co/600x400?text=Margherita",
    category: "Veg",
  },
  {
    name: "Farmhouse",
    description: "Loaded with fresh vegetables",
    price: 299,
    image: "https://placehold.co/600x400?text=Farmhouse",
    category: "Veg",
  },
  {
    name: "Veggie Paradise",
    description: "Sweet corn and capsicum",
    price: 269,
    image: "https://placehold.co/600x400?text=Veggie+Paradise",
    category: "Veg",
  },
  {
    name: "Paneer Makhani",
    description: "Paneer with makhani sauce",
    price: 329,
    image: "https://placehold.co/600x400?text=Paneer+Makhani",
    category: "Veg",
  },
  {
    name: "Pepperoni",
    description: "Loaded pepperoni slices",
    price: 399,
    image: "https://placehold.co/600x400?text=Pepperoni",
    category: "Non-Veg",
  },
  {
    name: "Chicken Dominator",
    description: "Loaded chicken toppings",
    price: 449,
    image: "https://placehold.co/600x400?text=Chicken+Dominator",
    category: "Non-Veg",
  },
  {
    name: "Cheese Burst",
    description: "Extra cheese overload",
    price: 349,
    image: "https://placehold.co/600x400?text=Cheese+Burst",
    category: "Veg",
  },
  {
    name: "Mexican Green Wave",
    description: "Mexican herbs and veggies",
    price: 319,
    image: "https://placehold.co/600x400?text=Mexican+Green+Wave",
    category: "Veg",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Pizza.deleteMany();

    await Pizza.insertMany(pizzas);

    

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();