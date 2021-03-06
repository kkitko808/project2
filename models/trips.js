"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trips = sequelize.define("Trips", {
    destination: DataTypes.STRING,
    activity: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME
  }, {});
  Trips.associate = function (models) {
    // trips belong to a user
    models.Trips.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    console.log(models);
  };
  return Trips;
};
