const mongoose = require("mongoose");
const Area = mongoose.model(
  "Area",
  new mongoose.Schema({
    name: String,
    coordinates: [{ lat: Number, lng: Number }]
  })
);
module.exports = Area;
