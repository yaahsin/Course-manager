'use strict';
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define('permissions', {
    admin: DataTypes.BOOLEAN,
    teacher: DataTypes.BOOLEAN,
    student: DataTypes.BOOLEAN,
    view_only: DataTypes.BOOLEAN
  }, {});
  permissions.associate = function(models) {
    // associations can be defined here
    permission.belongsTo(models.roles)
  };
  return permissions;
};