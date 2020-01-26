const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const Answer = mongoose.model(
  "Answer",
  new Schema(
    {
      title: String,
      username: String,
      formId: Number,
      type: String,
      fields: [],
      time: Date
    },
    { strict: false }
  )
);
module.exports = Answer;
