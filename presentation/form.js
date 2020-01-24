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

app.get("/", (req, res) => {
  res.send("Welcome to FormNegar app");
});

//start $form reg

app.get("/api/forms/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { form, error } = formHandler.fetch(id);
    if (error) {
      res.error(error);
    }
    res.send({ form });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

app.get("/api/forms", (req, res) => {
  try {
    const forms = formHandler.fetchAllForms();
    res.send({ forms });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});
app.post("/api/forms", (req, res) => {
  try {
    const form = req.body;
    formHandler.insert(form);
    res.send("form inserted");
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

app.post("/api/forms/:id", (req, res) => {
  try {
    const form = req.body;
    formHandler.printForm(form);
    res.send({ form });
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
app.post("/api/admin/createUser", (req, res) => {
  try {
    const data = req.body;

    const result = adminHandler.createUser(data);
    if (result === true) {
      res.status(200).send("کاربر ایجاد شد");
    } else {
      res.status(400).send("کاربر ایجاد نشد");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

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
