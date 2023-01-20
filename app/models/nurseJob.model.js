module.exports = (sequelize, Sequelize) => {
  const NurseJob = sequelize.define("nurseJob", {
    jobId: {
      type: Sequelize.INTEGER
    },
    nurseId: {
      type: Sequelize.INTEGER
    }
  }, {
    tableName: "nurse_hired_jobs",
    timestamps: false,
    underscored: true
  });

  return NurseJob;
};
