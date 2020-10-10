const mongoose = require("mongoose");

const userModal = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

module.exports = User = mongoose.model("user", userModal);
