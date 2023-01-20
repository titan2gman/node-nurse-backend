module.exports = (sequelize, Sequelize) => {
  const Job = sequelize.define("job", {
    jobId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    facilityId: {
      type: Sequelize.INTEGER,      
    },
    nurseTypeNeeded: {
      type: Sequelize.STRING
    },
    totalNumberNursesNeeded: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false,
    underscored: true
  });

  return Job;
};
