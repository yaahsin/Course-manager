'use strict';
module.exports = (sequelize, DataTypes) => {
  const enrollment = sequelize.define('enrollment', {
    scores: DataTypes.TINYINT
  }, { underscored: true });
  enrollment.associate = function(models) {
    // associations can be defined here
    enrollment.belongsTo(models.user)
    enrollment.belongsTo(models.course)
  };
  return enrollment;
};