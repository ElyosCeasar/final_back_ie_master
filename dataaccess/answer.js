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
  },
  getAnswerStatesticByFormId(formId) {
    return Answer.find({}).then(all => {
      return Answer.find({ formId: formId }).then(forThis => {
        // console.log(forThis.length, all.length);
        if (all === 0) {
          return 0;
        } else {
          return (forThis.length * 100) / all.length;
        }
      });
    });
  }
};

module.exports = functions;
