'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const week = ['MON', 'THU', 'WED', 'THUR', 'FRI']
    const time = ['AM', 'PM']
    await queryInterface.bulkInsert('times', [
      {
        week: week[0],
        time: time[0],
        created_at: new Date(),
        updated_at: new Date()
      }, {
        week: week[1],
        time: time[0],
        created_at: new Date(),
        updated_at: new Date()
      }, {
        week: week[2],
        time: time[0],
        created_at: new Date(),
        updated_at: new Date()
      }, {
        week: week[3],
        time: time[0],
        created_at: new Date(),
        updated_at: new Date()
      }, {
        week: week[4],
        time: time[0],
        created_at: new Date(),
        updated_at: new Date()
      }, {
        week: week[0],
        time: time[1],
        created_at: new Date(),
        updated_at: new Date()
      }, {
        week: week[1],
        time: time[1],
        created_at: new Date(),
        updated_at: new Date()
      }, {
        week: week[2],
        time: time[1],
        created_at: new Date(),
        updated_at: new Date()
      }, {
        week: week[3],
        time: time[1],
        created_at: new Date(),
        updated_at: new Date()
      }, {
        week: week[4],
        time: time[1],
        created_at: new Date(),
        updated_at: new Date()
      }], { underscored: true })
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('times', {})
  }
};
