'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    role_name: DataTypes.STRING
  }, {});
  roles.associate = function(models) {
    // associations can be defined here
    roles.hasOne(models.permissions)
    roles.hasMany(models.user_roles)
  };
  return roles;
};