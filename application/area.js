const areaDataAccess = require("../dataaccess/area");

const functions = {
  getAll() {
    return areaDataAccess.getAll();
  },
  getById(id) {
    return areaDataAccess.getById(id);
  },
  getByName(id) {
    return areaDataAccess.getByName(id);
  },
  save(area) {
    console.log("The area was received and is: ");
    console.log(area);
    return areaDataAccess.save(area);
  },
  getAllAreasNameForPoligon(poligon) {
    return areaDataAccess.getAllAreasNameForPoligon(poligon);
  }
};

module.exports = functions;
