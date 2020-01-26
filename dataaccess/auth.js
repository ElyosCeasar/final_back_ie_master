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
  }
};

module.exports = functions;
