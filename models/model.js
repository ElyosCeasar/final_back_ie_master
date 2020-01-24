class model {
  constructor(form) {
    for (const key in form) {
      this[key] = form[key];
    }
  }

  toJson() {
    const result = {};
    for (const key in this) {
      result[key] = this[key];
    }
    return result;
  }
}

module.exports = model;
