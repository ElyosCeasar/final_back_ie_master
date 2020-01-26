const authDataAccess = require("../dataaccess/auth");
const model = require("../models/model");
var jwt = require("jsonwebtoken");

const functions = {
  login(data) {
    console.log("user data: ", data);
    const user = new model(data);
    return authDataAccess
      .login(user.username.trim(), user.password.trim())
      .then(userRole => {
        if (userRole === "notDef") {
          return null;
        } else {
          const secondsSinceEpoch = Math.round(Date.now() / 1000);
          return jwt.sign(
            {
              Role: userRole,
              username: user.username.trim(),
              exp: secondsSinceEpoch + 600000
            },
            "your-256-bit-secret"
          );
        }
      });
  }
};

module.exports = functions;
