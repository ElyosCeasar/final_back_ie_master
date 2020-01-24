const privates = {
  forms: []
};

const functions = {
  getId() {
    return privates.forms.length;
  },
  insert: form => {
    const { id } = form;
    privates.forms.push(form);
  },

  fetch(id) {
    return privates.forms[id];
  },

  delete(id) {
    delete privates.forms[id];
  },

  fetchAllForms() {
    return privates.forms;
  },
  reset() {
    privates.forms = [];
    return "reset = done";
  }
};

module.exports = functions;
