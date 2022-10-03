'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_roles = sequelize.define('user_roles', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  user_roles.associate = function(models) {
    // associations can be defined here
    user_roles.belongsTo(models.users)
    user_roles.belongsTo(models.roles)
    
  };
  return user_roles;
};