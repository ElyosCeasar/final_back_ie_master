const answerDataAccess = require("../dataaccess/answer");
const Form = require("../models/model");

const functions = {
  getAllAnswersByFormId(formId) {
    return answerDataAccess.getAllAnswersByFormId(formId);
  },
  saveAnswer(answer) {
    console.log("The answer was received and is: ");
    // const toBePrintedForm = new Form(form);
    // console.log(toBePrintedForm.toJson());
    console.log(answer);
    return answerDataAccess.saveAnswer(answer);
  }
};

module.exports = functions;
