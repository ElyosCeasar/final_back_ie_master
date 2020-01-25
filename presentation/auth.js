const express = require("express");
const router = express.Router();
const authHandler = require("../application/auth");
router.post("/login", (req, res) => {
  try {
    const data = req.body;
    authHandler.login(data).then(result => {
      if (result !== null) {
        res.status(200).send(result);
      } else {
        res.status(401).send("متاسفانه هویت تایید نشد");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});
// {
// 	"username":"ali",
// 	"password":"ali"
// }

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
