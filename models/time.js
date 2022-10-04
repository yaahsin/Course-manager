'use strict';
module.exports = (sequelize, DataTypes) => {
  const time = sequelize.define('time', {
    week: DataTypes.STRING,
    time: DataTypes.STRING
  }, { underscored: true });
  time.associate = function (models) {
    // associations can be defined here
  };
  return time;
};