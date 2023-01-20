module.exports = app => {
  const shifts = require("../controllers/shift.controller.js");

  var router = require("express").Router();

  // Retrieve all shifts
  router.get("/", shifts.findAll);

  router.get("/overlap/:id1/:id2", shifts.checkOverlap);

  app.use("/api/shifts", router);
};
