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
    const form = formDataAccess.fetch(id);
    if (form) {
      return { form: form.toJson() };
    } else {
      return { error: "there is no such form" };
    }
  },

  fetchAllForms() {
    return formDataAccess.fetchAllForms().then(form => {
      console.log("ss", form[0]);
      const f = form[0];
      console.log(f[["title"]]);
      // const obj = {
      //   _id: 0,
      //   title: "Form",
      //   fields: [
      //     {
      //       name: "name",
      //       title: "نام",
      //       type: "Text",
      //       required: "false",
      //       hasOptions: false
      //     }
      //   ],
      //   username: "admin",
      //   __v: 0
      // };
      // console.log("ss", obj.title);
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
