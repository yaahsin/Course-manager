'use strict';
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    name: DataTypes.STRING,
    time: DataTypes.STRING,
    description: DataTypes.STRING
  }, { underscored: true });
  course.associate = function (models) {
    // associations can be defined here
    course.belongsTo(models.user)
    course.hasMany(models.enrollment)
  };
  return course;
};