const express = require("express");
const router = express.Router();
const adminHandler = require("../application/admin");

var jwt = require("jsonwebtoken");
router.post("/createUser", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        if ("admin" !== decoded.Role) {
          res.status(400).send("شما به این بخش دسترسی ندارید");
          return;
        }
        const datas = req.body;
        const result = adminHandler
          .createUser(datas)
          .then(data => res.status(200).send("کاربر ایجاد شد"))
          .catch(er => res.status(400).send("کاربر ایجاد نشد"));
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
