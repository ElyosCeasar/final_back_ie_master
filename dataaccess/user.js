const User = require("../models/user");
//-------------------------------------------------------------------
const functions = {
  createUser(username, password, role) {
    try {
      const user = new User({
        Role: role,
        username: username,
        password: password
      });
      // course.save().then(res => console.log("res", res));
      return user.save();
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

module.exports = functions;
