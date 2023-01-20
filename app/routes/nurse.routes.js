module.exports = app => {
  const nurses = require("../controllers/nurse.controller.js");

  var router = require("express").Router();

  router.get("/spots", nurses.findSpots);

  router.get("/coworkers/:id", nurses.findCowokersFor);

  app.use("/api/nurses", router);
};
