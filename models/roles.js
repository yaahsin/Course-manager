'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    role_name: DataTypes.STRING
  }, {});
  role.associate = function(models) {
    // associations can be defined here
    role.hasOne(models.permission)
    role.hasMany(models.user_role)
  };
  return role;
};