const express = require("express");

const router = express.Router();

const {
  getCustomOptions,
} = require("../controllers/customOptionController");

router.get("/", getCustomOptions);

module.exports = router;