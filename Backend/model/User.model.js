const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  avatar: {
    type: String,
    default: "https://avatar.jpg" 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email format validation
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel
};
