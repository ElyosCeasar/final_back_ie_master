const functions = {
  getId() {
    return privates.forms.length;
  },

  login(username, password) {
    //it returns user role
    if (username === "ali" && password === "ali") {
      return "fieldAgent";
    } else if (username === "amir" && password === "amir") {
      return "controlCentreAgent";
    } else if (username === "admin" && password === "admin") {
      return "admin";
    } else {
      return "notDef"; //not autherized
    }
  }
};

module.exports = functions;
