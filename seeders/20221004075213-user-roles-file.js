'use strict';
const { user, role } = require('../models')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userIds = await user.findAll({ attribute: ['id'], raw: true }) // 0 1~4 5~14
    const roleIds = await role.findAll({ attribute: ['id'], raw: true }) // 0 1   2    3

    await queryInterface.bulkInsert('user_roles', [{
      user_id: userIds[0].id,
      role_id: roleIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, { // teacher
      user_id: userIds[1].id,
      role_id: roleIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: userIds[2].id,
      role_id: roleIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[3].id,
      role_id: roleIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[4].id,
      role_id: roleIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, { //student
      user_id: userIds[5].id,
      role_id: roleIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[6].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[7].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[8].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[9].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[10].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[11].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[12].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[13].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[14].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userIds[15].id,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', {});
  }
};
