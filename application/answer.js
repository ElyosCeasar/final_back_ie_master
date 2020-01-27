const answerDataAccess = require("../dataaccess/answer");
const Form = require("../models/model");

const functions = {
  getAllAnswersByFormId(formId) {
    return answerDataAccess.getAllAnswersByFormId(formId);
  },
  getById(id) {
    return answerDataAccess.getById(id);
  },
  saveAnswer(answer) {
    console.log("The answer was received and is: ");
    // const toBePrintedForm = new Form(form);
    // console.log(toBePrintedForm.toJson());
    console.log(answer);
    return answerDataAccess.saveAnswer(answer);
  },
  getAnswerStatesticByFormId(formId) {
    return answerDataAccess.getAnswerStatesticByFormId(formId);
  }
};

module.exports = functions;
