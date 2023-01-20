module.exports = (sequelize, Sequelize) => {
  const Shift = sequelize.define("shift", {
    shiftId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    facilityId: {
      type: Sequelize.INTEGER,      
    },
    shiftDate: {
      type: Sequelize.DATE
    },
    startTime: {
      type: "TIMESTAMP"
    },
    endTime: {
      type: "TIMESTAMP"
    }
  }, {
    tableName: "question_one_shifts",
    timestamps: false,
    underscored: true
  });

  return Shift;
};
