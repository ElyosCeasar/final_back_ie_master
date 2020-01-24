const formDataAccess = require("../dataaccess/form");
const Form = require("../models/model");

const functions = {
  insert(form) {
    console.log(
      "I got the form and Im gonna insert the form with properties: ",
      form
    );
    const toBeInsertedForm = new Form(form);
    toBeInsertedForm.id = formDataAccess.getId();
    formDataAccess.insert(toBeInsertedForm);
    console.log("The form was inserted");
  },

  fetch(id) {
    console.log("Looking for a form with the id of: ", id);
    const form = formDataAccess.fetch(id);
    if (form) {
      return { form: form.toJson() };
    } else {
      return { error: "there is no such form" };
    }
  },

  fetchAllForms() {
    const allForms = [];
    const forms = formDataAccess.fetchAllForms();
    const arrayElementsFixer = forms.map(x => ({
      key: x.id,
      name: x.title,
      number: x.id
    }));
    // for (const key in arrayElementsFixer) {
    //   allForms.push(arrayElementsFixer[key].toJson());
    // }
    return arrayElementsFixer;
  },

  printForm(form) {
    console.log("The from was received and is: ");
    const toBePrintedForm = new Form(form);
    console.log(toBePrintedForm.toJson());
  },
  reset() {
    console.log("reset request recived ");
    return formDataAccess.reset();
  }
};

module.exports = functions;
