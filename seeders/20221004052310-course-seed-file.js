'use strict';

const { user, time } = require('../models')
const faker = require("faker")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userIds = await user.findAll({ attribute: ['id'], raw: true })
    const teachers = userIds.splice(1, 5)
    const course = await time.findAll({ attribute: ['week', 'time'], raw: true })

    await queryInterface.bulkInsert('courses',
      Array.from({ length: 25 }).map((_, index) => ({
        name: faker.lorem.word(),
        user_id: teachers[~~(index / 5)].id,
        description: faker.lorem.sentences(3),
        time: course[index % 10].week + ': ' + course[index % 10].time,
        created_at: faker.date.recent(),
        updated_at: new Date()
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('courses', {})
  }
}
