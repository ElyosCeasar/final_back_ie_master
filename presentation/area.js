const express = require("express");
const router = express.Router();
const areaHandler = require("../application/area");
var jwt = require("jsonwebtoken");
router.post("/", ensureToken, (req, res) => {
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
        areaHandler
          .save(datas)
          .then(data => res.status(200).send("ناحیه ایجاد شد"))
          .catch(er => res.status(400).send("ناحیه ایجاد نشد"));
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});

router.get("/", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        if ("admin" !== decoded.Role) {
          res.status(400).send("شما به این بخش دسترسی ندارید");
          return;
        }
        areaHandler
          .getAll()
          .then(data => res.status(200).send(data))
          .catch(er => res.status(400).send(er));
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});
router.get("/:id", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        if ("admin" !== decoded.Role) {
          res.status(400).send("شما به این بخش دسترسی ندارید");
          return;
        }
        const { id } = req.params;
        areaHandler
          .getById(id)
          .then(data => res.status(200).send(data))
          .catch(er => res.status(400).send(er));
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});
router.get("/getByName/:name", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        if ("admin" !== decoded.Role) {
          res.status(400).send("شما به این بخش دسترسی ندارید");
          return;
        }
        const { name } = req.params;
        areaHandler
          .getByName(name)
          .then(data => res.status(200).send(data))
          .catch(er => res.status(400).send(er));
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("حطای پیشبینی نشده");
  }
});
//it is for test purpose
router.post("/getAllAreasNameForPoligon", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, "your-256-bit-secret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        //access all
        // if ("admin" !== decoded.Role) {
        //   res.status(400).send("شما به این بخش دسترسی ندارید");
        //   return;
        // }
        const datas = req.body;
        areaHandler
          .getAllAreasNameForPoligon(datas)
          .then(data => res.status(200).send(data))
          .catch(er => {
            res.status(400).send("مشکل در تطابق نواحی");
            console.log(er);
          });
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
