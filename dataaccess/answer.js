const Answer = require("../models/answer");

//-------------------------------------------------------------------
const functions = {
  getAllAnswersByFormId(formId) {
    console.log("answers must search for form ", formId);
    return Answer.find({ formId: formId });
  },
  getById(id) {
    console.log("answers must search ", id);
    return Answer.findOne({ _id: id });
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
  },
  filterAnswersForGrid(filter, formId) {
    console.log("filter", filter);
    return Answer.find({ formId: formId }).then(data => {
      const res = data.filter(x => {
        // console.log("x86", x);
        let output = true;
        for (let i = 0; i < filter.length; i++) {
          if (
            filter[i].hasOwnProperty("value") &&
            filter[i].value !== "" &&
            filter[i].value !== null
          ) {
            //  console.log("cc", filter);
            if (filter[i].value !== x.fields[i].answer) {
              output = false;
              break;
            }
          }
        }
        return output;
      });

      // return res;
      return res;
    });
  }
};

module.exports = functions;
