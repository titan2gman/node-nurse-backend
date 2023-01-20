const db = require("../models");
const sequelize = db.sequelize;

exports.findSpots = async (req, res) => {
  try {
    const [nurses,] = await sequelize.query(`
      select 
        "nurse_id" as "nurseId", 
        "nurse_name" as "nurseName",
        "nurse_type" as "nurseType",
        (
          select count(*)
          from jobs as job
          where 
            job.nurse_type_needed = nurse.nurse_type
            and
            (
              select count(*)
              from nurse_hired_jobs as nurseJob
              where 
                nurseJob.job_id = job.job_id
                and
                nurseJob.nurse_id = nurse.nurse_id
            ) = 0
            and
            job.total_number_nurses_needed > (
              select count(*)
              from nurse_hired_jobs as nurseJob
              where nurseJob.job_id = job.job_id
            )
        ) as "spots"
      from "nurses" as "nurse"
      order by nurse_id;
    `);

    res.send({
      data: nurses,
      message: "Success"
    });
  } catch (err) {
    res.status(500).send({
      message: "Error"
    });
  }
};

exports.findCowokersFor = async (req, res) => {
  try {
    const nurseId = req.params.id;

    const [data,] = await sequelize.query(`
      select count(distinct nurse_id)
      from "nurse_hired_jobs"
      where job_id in 
        (
          select "job_id"
          from "jobs"
          where facility_id in 
          (          
            select distinct "facility_id"
            from "jobs"
            where job_id in
              (
                select "job_id"
                from "nurse_hired_jobs" as "nurseJob"
                where nurse_id = ${nurseId}
              )
          )
        )
    `);

    res.send({
      data: data[0].count,
      message: "Success"
    });
  } catch (err) {
    res.status(500).send({
      message: "Error"
    });
  }
};