const db = require("../models");
const sequelize = db.sequelize;

exports.findSpots = async (req, res) => {
  try {
    const [jobs,] = await sequelize.query(`
      select 
        "job_id" as "jobId", 
        "facility_id" as "facilityId",
        "nurse_type_needed" as "nurseTypeNeeded",
        "total_number_nurses_needed" as "totalNumberNursesNeeded", 
        (
          select count(*) 
          from nurse_hired_jobs as nurseJob 
          where nurseJob.job_id = job.job_id
        ) as "totalNumberNursesHired" 
      from "jobs" as "job"
      order by facility_id, nurse_type_needed;
    `);

    const data = jobs.map(job => {
      job.spots = job.totalNumberNursesNeeded - parseInt(job.totalNumberNursesHired);
      return job;
    });
  
    res.send({
      data,
      message: "Success"
    });
  } catch (err) {
    res.status(500).send({
      message: "Error"
    });
  }
};