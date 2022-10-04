'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.STRING
  }, { underscored: true });
  role.associate = function (models) {
    // associations can be defined here
    role.hasOne(models.permission)
    role.hasMany(models.user_role)
  };
  return role;
};