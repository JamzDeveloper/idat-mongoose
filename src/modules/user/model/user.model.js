const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  photo: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  phone: String,
  role: {
    type: String,
    default: "USER",
  },
});

module.exports = User;
