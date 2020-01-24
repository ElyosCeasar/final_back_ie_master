const functions = {
  getId() {
    return privates.forms.length;
  },

  createUser(username, password, role) {
    try {
      const newUser = {
        Role: role,
        username: username,
        password: password
      };
      //save
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

module.exports = functions;
