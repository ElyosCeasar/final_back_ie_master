const Area = require("../models/area");
var inside = require("point-in-polygon");
//-------------------------------------------------------------------
const functions = {
  getAll() {
    console.log("get all area ");
    return Area.find({});
  },
  save(area) {
    //it returns user role
    const newArea = new Area(area);
    return newArea.save();
  },
  getByName(name) {
    console.log("get all area by name ", name);
    return Area.find({ name: name });
  },
  getById(id) {
    console.log("get all area by id ", id);
    return Area.find({ _id: id });
  },
  getAllAreasNameForPoligon(poligon) {
    //poligon is array of lat long
    return Area.find({}).then(allpol => {
      let areaNames = [];
      for (let i = 0; i < allpol.length; i++) {
        let convertedArea = [];
        // console.log(allpol[i].coordinates);
        for (let z = 0; z < allpol[i].coordinates.length; z++) {
          convertedArea.push([
            allpol[i].coordinates[z].lat,
            allpol[i].coordinates[z].long
          ]);
        }
        //console.log(convertedArea);
        for (let j = 0; j < poligon.length; j++) {
          if (inside([poligon[j].lat, poligon[j].long], convertedArea)) {
            if (!areaNames.includes(allpol[i].name)) {
              areaNames.push(allpol[i].name);
            }
          }
        }
      }
      if (areaNames.length === 0) {
        areaNames.push("not match");
      }
      return areaNames;
    });
  }
};

module.exports = functions;
