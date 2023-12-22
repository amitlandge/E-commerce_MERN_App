const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = new mongoose.Schema({
  phone: {
    type: Number,
    required: [true, "Please Enter Your Phone Number"],
    maxLength: [10, "Your Number Length Must be  10 Digit"],
    trim: true,
  },
  contactEmail: {
    type: String,
    required: [true, "Please Enter Your Email"],
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("contact", contactSchema);
