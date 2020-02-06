const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const form = require("./presentation/form");
app.use("/api/forms", form);
const auth = require("./presentation/auth");
app.use("/api/auth", auth);
const user = require("./presentation/user");
app.use("/api/user", user);
const answer = require("./presentation/answer");
app.use("/api/answer", answer);
const area = require("./presentation/area");
app.use("/api/area", area);
mongoose
  .connect("mongodb+srv://admin:admin@cluster0-qexgr.azure.mongodb.net/final_1")
  .then(() => console.log("connect to db ok"))
  .catch(error => console.log("db connection error", error));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("app listening on port " + PORT));

//https://final-ie-back.herokuapp.com/ | https://git.heroku.com/final-ie-back.git
