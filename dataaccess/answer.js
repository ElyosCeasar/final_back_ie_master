const Answer = require("../models/answer");

//-------------------------------------------------------------------
const functions = {
  getAllAnswersByFormId(formId) {
    console.log("answers must search for form ", formId);
    return Answer.find({ formId: formId });
  },
  saveAnswer(answer) {
    //it returns user role
    const newAnswer = new Answer(answer);
    return newAnswer.save();
  }
};

module.exports = functions;
