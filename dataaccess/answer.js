const Answer = require("../models/answer");
var inside = require("point-in-polygon");
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
    return Answer.find({ formId: formId }).then(data => {
      const res = data.filter(x => {
        let output = true;
        for (let i = 0; i < filter.length; i++) {
          if (
            filter[i].hasOwnProperty("value") &&
            filter[i].value !== "" &&
            filter[i].value !== null
          ) {
            if (filter[i].type !== "Location") {
              if (filter[i].value !== x.fields[i].answer) {
                output = false;
                break;
              }
            } else {
              //  in loca tion case if that point is inside we return okay
              let convertedArea = [];
              // console.log(allpol[i].coordinates);
              for (let z = 0; z < x.fields[i].answer.length; z++) {
                convertedArea.push([
                  x.fields[i].answer[z].lat,
                  x.fields[i].answer[z].lng
                ]);
              }

              if (
                !inside(
                  [filter[i].value.lat, filter[i].value.lng],
                  convertedArea
                )
              ) {
                output = false;
                break;
              }
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
