"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trips = sequelize.define("Trips", {
    destination: DataTypes.STRING,
    activity: DataTypes.STRING,
    time: DataTypes.INTEGER
  }, {});
  Trips.associate = function (models) {
    // associations can be defined here
    // add belongs to user
    console.log(models);
  };
  return Trips;
};