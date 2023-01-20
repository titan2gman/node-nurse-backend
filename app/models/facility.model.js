module.exports = (sequelize, Sequelize) => {
  const Facility = sequelize.define("facility", {
    facilityId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    facilityName: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    underscored: true
  });

  return Facility;
};
