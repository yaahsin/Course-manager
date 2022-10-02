'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      teacher: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      student: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      view_only: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        underscored: true
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id'
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        underscored: true
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('permissions');
  }
};