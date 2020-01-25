const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const Form = mongoose.model(
  "Form",
  new Schema(
    { _id: Number, title: String, username: String },
    { _id: false, strict: false }
  )
);
module.exports = Form;
