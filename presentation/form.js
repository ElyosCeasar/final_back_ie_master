const express = require("express");
const router = express.Router();
const formHandler = require("../application/form");
var jwt = require("jsonwebtoken");

router.get("/:id", ensureToken, (req, res) => {
  try {
    // jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
    //   if (err) {
    //     res.sendStatus(403);
    //   } else {
    //     if (
    //       !(
    //         "fieldAgent" === decoded.Role ||
    //         "controlCentreAgent" === decoded.Role
    //       )
    //     ) {
    //       res.status(400).send("شما به این بخش دسترسی ندارید");
    //       return;
    //     }
    const { id } = req.params;
    const { form, error } = formHandler.fetch(id);
    if (error) {
      res.error(error);
    }
    res.send({ form });
    //   }
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

router.get("/", ensureToken, (req, res) => {
  try {
    // jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
    //   if (err) {
    //     res.sendStatus(403);
    //   } else {
    //     if (
    //       !(
    //         "fieldAgent" === decoded.Role ||
    //         "controlCentreAgent" === decoded.Role
    //       )
    //     ) {
    //       res.status(400).send("شما به این بخش دسترسی ندارید");
    //       return;
    //     }

    formHandler.fetchAllForms().then(forms => {
      console.log("f4", forms);
      res.send({ forms });
    });

    //   }
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});
router.post("/", (req, res) => {
  try {
    // jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
    //   if (err) {
    //     res.sendStatus(403);
    //   } else {
    //     if ("admin" !== decoded.Role) {
    //       res.status(400).send("شما به این بخش دسترسی ندارید");
    //      return;
    //     }
    const form = req.body;
    formHandler.insert(form);
    res.send("form inserted");
    //   }
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

router.post("/:id", ensureToken, (req, res) => {
  try {
    // jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
    //   if (err) {
    //     res.sendStatus(403);
    //   } else {
    //     // console.log(decoded.Role);
    //     if (
    //       !(
    //         "fieldAgent" === decoded.Role ||
    //         "controlCentreAgent" === decoded.Role
    //       )
    //     ) {
    //       res.status(400).send("شما به این بخش دسترسی ندارید");
    //       return;
    //     }
    const form = req.body;
    formHandler.printForm(form);
    res.send({ form });
    //   }
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

function ensureToken(req, res, next) {
  next();
  // const bearerheader = req.headers["authorization"];
  // if (typeof bearerheader !== "undefined") {
  //   const bearer = bearerheader.split(" ");
  //   const bearerToken = bearer[1];
  //   req.token = bearerToken;
  //   next();
  // } else {
  //   res.status(403).send("توکن وجود ندارد");
  // }
}
module.exports = router;
// http://localhost:5000/api/forms
// {
//   "title": "sample ",
//     "fields": [{
//       "name": "name",
//       "title": "title",
//       "type": "type",
//       "required": "required",
//       "hasOptions": "hasOptions",
//       "options": "options"
//     }]

// }
