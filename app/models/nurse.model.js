module.exports = (sequelize, Sequelize) => {
  const Nurse = sequelize.define("nurse", {
    nurseId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nurseName: {
      type: Sequelize.STRING
    },
    nurseType: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    underscored: true
  });

  return Nurse;
};
