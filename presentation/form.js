const express = require("express");

const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const formHandler = require("../application/form");
const authHandler = require("../application/auth");
const adminHandler = require("../application/admin");
const PORT = process.env.PORT || 5000;
var jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
  res.send("Welcome to FormNegar app");
});

//start $form reg

app.get("/api/forms/:id", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        if (
          !(
            "fieldAgent" === decoded.Role ||
            "controlCentreAgent" === decoded.Role
          )
        ) {
          res.status(400).send("شما به این بخش دسترسی ندارید");
          return;
        }
        const { id } = req.params;
        const { form, error } = formHandler.fetch(id);
        if (error) {
          res.error(error);
        }
        res.send({ form });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

app.get("/api/forms", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        if (
          !(
            "fieldAgent" === decoded.Role ||
            "controlCentreAgent" === decoded.Role
          )
        ) {
          res.status(400).send("شما به این بخش دسترسی ندارید");
          return;
        }

        const forms = formHandler.fetchAllForms();
        console.log("f4", forms);
        res.send({ forms });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});
app.post("/api/forms", (req, res) => {
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

app.post("/api/forms/:id", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        // console.log(decoded.Role);
        if (
          !(
            "fieldAgent" === decoded.Role ||
            "controlCentreAgent" === decoded.Role
          )
        ) {
          res.status(400).send("شما به این بخش دسترسی ندارید");
          return;
        }
        const form = req.body;
        formHandler.printForm(form);
        res.send({ form });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});
//end $form reg

//start $auth
app.post("/api/auth/login", (req, res) => {
  try {
    const data = req.body;

    const result = authHandler.login(data);
    if (result !== null) {
      res.status(200).send(result);
    } else {
      res.status(401).send("متاسفانه هویت تایید نشد");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});
// {
// 	"username":"ali",
// 	"password":"ali"
// }

//end $auth
//start $admin
app.post("/api/admin/createUser", ensureToken, (req, res) => {
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
        const result = adminHandler.createUser(datas);
        if (result === true) {
          res.status(200).send("کاربر ایجاد شد");
        } else {
          res.status(400).send("کاربر ایجاد نشد");
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

//end $admin
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
app.listen(PORT, () => console.log("FormNegar app listening on port " + PORT));

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

//heroku  https://hw2-ie-back-master.herokuapp.com/ | https://git.heroku.com/hw2-ie-back-master.git
//https://github.com/ElyosCeasar/hw2_ie_back-master
//  git push heroku master
