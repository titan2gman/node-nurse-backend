module.exports = app => {
  const jobs = require("../controllers/job.controller.js");

  var router = require("express").Router();

  router.get("/spots", jobs.findSpots);

  app.use("/api/jobs", router);
};
