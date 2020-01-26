const formDataAccess = require("../dataaccess/form");
const Form = require("../models/model");

const functions = {
  async insert(form) {
    console.log(
      "I got the form and Im gonna insert the form with properties: ",
      form
    );
    form = { ...form, username: "admin" };
    let toBeInsertedForm = new Form(form);
    const _id = await formDataAccess.getId();
    console.log("id is", _id);
    toBeInsertedForm = { ...toBeInsertedForm, _id: _id };
    formDataAccess
      .insert(toBeInsertedForm)
      .then(() => {
        console.log("The form was inserted");
      })
      .catch(err => console.log("not inserted", form, err));
  },

  fetch(id) {
    console.log("Looking for a form with the id of: ", id);
    return formDataAccess.fetch(id).then(form => {
      return { form: form };
    });
  },

  fetchAllForms() {
    return formDataAccess.fetchAllForms().then(form => {
      return form.map(x => ({
        key: x._id,
        name: x.title,
        number: x._id
      }));
    });
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
