'use strict';
module.exports = (sequelize, DataTypes) => {
  const enrollment = sequelize.define('enrollment', {
    scores: DataTypes.TINYINT
  }, {});
  enrollment.associate = function(models) {
    // associations can be defined here
    enrollment.belongsTo(models.users)
    enrollment.belongsToMany(users, { through: 'enrollment' })
  };
  return enrollment;
};