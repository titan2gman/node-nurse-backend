const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.facilities = require("./facility.model.js")(sequelize, Sequelize);
db.shifts = require("./shift.model.js")(sequelize, Sequelize);
db.jobs = require("./job.model.js")(sequelize, Sequelize);
db.nurses = require("./nurse.model.js")(sequelize, Sequelize);
db.nurseJobs = require("./nurseJob.model.js")(sequelize, Sequelize);

db.facilities.hasMany(db.shifts, { foreignKey: "facility_id" });
db.shifts.belongsTo(db.facilities, { foreignKey: "facility_id" });

db.facilities.hasMany(db.jobs, { foreignKey: "facility_id" });
db.jobs.belongsTo(db.facilities, { foreignKey: "facility_id" });

db.jobs.belongsToMany(db.nurses, { through: db.nurseJobs, foreignKey: "job_id" });
db.nurses.belongsToMany(db.jobs, { through: db.nurseJobs, foreignKey: "nurse_id" });

module.exports = db;
