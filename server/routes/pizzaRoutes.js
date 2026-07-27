const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const express = require("express");

const router = express.Router();

const { getAllPizzas,getPizzaById } = require("../controllers/pizzaController");

router.get("/", getAllPizzas);
router.get("/:id", getPizzaById);

module.exports = router;