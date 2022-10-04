'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [{ // 一次新增三筆資料
      name: "admin",
      created_at: new Date(),
      updated_at: new Date()
    },{
        name: "teacher",
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: "student",
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: "alarm",
        created_at: new Date(),
        updated_at: new Date()
      } ],{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', {})
  }
}
