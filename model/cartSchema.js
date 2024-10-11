const mongoose = require("mongoose");
// const validator = require("validator");
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  cartItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      _id: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
