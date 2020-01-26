const express = require("express");
const router = express.Router();
const answerHandler = require("../application/answer");
var jwt = require("jsonwebtoken");

router.get("/getAllAnswersByFormId/:id", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        // console.log(decoded.Role);
        if (!("controlCentreAgent" === decoded.Role)) {
          res.status(400).send("شما به این بخش دسترسی ندارید");
          return;
        }
        const { id: formId } = req.params;

        answerHandler.getAllAnswersByFormId(formId).then(ans => {
          console.log(ans);
          res.send(ans);
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

router.post("/:id", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        // console.log(decoded.Role);
        if (!("fieldAgent" === decoded.Role)) {
          res.status(400).send("شما به این بخش دسترسی ندارید");
          return;
        }
        const answer = req.body;
        const { id } = req.params;
        answer.formId = id;
        answer.username = decoded.username;
        answer.time = Date.now();
        answerHandler.saveAnswer(answer).then(() => {
          res.status(200).send("با موفقیت ثبت شد");
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

function ensureToken(req, res, next) {
  const bearerheader = req.headers["authorization"];
  if (typeof bearerheader !== "undefined") {
    const bearer = bearerheader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send("توکن وجود ندارد");
  }
}
module.exports = router;
