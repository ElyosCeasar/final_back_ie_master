const User = require("../models/user");

//-------------------------------------------------------------------
const functions = {
  login(username, password) {
    //it returns user role
    return User.findOne({ username: username, password: password }).then(
      data => {
        return data.Role;
      }
    );
    // if (username === "ali" && password === "ali") {
    //   return "fieldAgent";
    // } else if (username === "amir" && password === "amir") {
    //   return "controlCentreAgent";
    // } else if (username === "admin" && password === "admin") {
    //   return "admin";
    // } else {
    //   return "notDef"; //not autherized
    // }
  }
};

module.exports = functions;
