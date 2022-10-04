'use strict';
const { role } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roleIds = await role.findAll({ attribute: ['id'], raw: true })

    await queryInterface.bulkInsert('permissions', [{ // 一次新增三筆資料
      admin: 1,
      teacher: 0,
      student: 0,
      view_only: 0,
      role_id: roleIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      admin: 0,
      teacher: 1,
      student: 0,
      view_only: 0,
      role_id: roleIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      admin: 0,
      teacher: 0,
      student: 1,
      view_only: 0,
      role_id: roleIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      admin: 0,
      teacher: 0,
      student: 0,
      view_only: 1,
      role_id: roleIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permissions', {})
  }
}
