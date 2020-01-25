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
const admin = require("./presentation/admin");
app.use("/api/admin", admin);
mongoose
  .connect("mongodb+srv://admin:admin@cluster0-qexgr.azure.mongodb.net/final_1")
  .then(() => console.log("connect to db ok"))
  .catch(error => console.log("db connection error", error));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("app listening on port " + PORT));
