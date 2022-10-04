'use strict';
module.exports = (sequelize, DataTypes) => {
  const permission = sequelize.define('permission', {
    admin: DataTypes.BOOLEAN,
    teacher: DataTypes.BOOLEAN,
    student: DataTypes.BOOLEAN,
    view_only: DataTypes.BOOLEAN
  }, { underscored: true });
  permission.associate = function(models) {
    // associations can be defined here
    permission.belongsTo(models.role)
  };
  return permission;
};