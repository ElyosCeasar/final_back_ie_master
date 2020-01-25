const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    Role: String,
    username: String,
    password: String
  })
);
module.exports = User;
