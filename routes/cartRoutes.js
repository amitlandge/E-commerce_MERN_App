const express = require("express");

const auth = require("../middleware/auth");
const {
  createCartItems,
  getCartItems,
} = require("../controllers/CartControllers");

const router = express.Router();
router.post("/cart/create/:uid", auth, createCartItems);
router.get("/cart/cartItems", auth, getCartItems);

module.exports = router;
