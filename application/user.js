const adminDataAccess = require("../dataaccess/user");
const model = require("../models/model");
var jwt = require("jsonwebtoken");
const functions = {
  createUser(data) {
    console.log("user data: ", data);
    //checking if needed
    const user = new model(data);
    return adminDataAccess.createUser(
      user.username.trim(),
      user.password.trim(),
      user.role.trim()
    );
  }
};

module.exports = functions;
