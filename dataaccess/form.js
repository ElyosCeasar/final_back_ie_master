const Form = require("../models/form");
const privates = {
  forms: []
};

const functions = {
  async getId() {
    const count = await Form.count();

    if (count > 0) {
      return count; //for now because we dont have delete and time
    } else {
      return 0;
    }

    // return privates.forms.length;
  },
  insert: form => {
    const newForm = new Form(form);
    return newForm.save();
    //privates.forms.push(form);
  },

  fetch(id) {
    return privates.forms[id];
  },

  delete(id) {
    //don't have
    delete privates.forms[id];
  },

  fetchAllForms() {
    return Form.find({});
  },
  reset() {
    //don't have
    privates.forms = [];
    return "reset = done";
  }
};

module.exports = functions;
//mongodb+srv://admin:admin@cluster0-qexgr.azure.mongodb.net/test?retryWrites=true&w=majority
