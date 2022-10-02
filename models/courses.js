'use strict';
module.exports = (sequelize, DataTypes) => {
  const courses = sequelize.define('courses', {
    name: DataTypes.STRING,
    time: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  courses.associate = function(models) {
    // associations can be defined here
    courses.belongsTo(models.users)
    courses.hasMany(models.enrollment)
  };
  return courses;
};