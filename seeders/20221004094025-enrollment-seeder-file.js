const { user, course } = require('../models')
const faker = require("faker")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userIds = await user.findAll({ attribute: ['id'], raw: true })
    const students = userIds.splice(6)
    const courseIds = await course.findAll({ attribute: ['id'], raw: true })

    await queryInterface.bulkInsert('enrollments',
      Array.from({ length: 30 }).map((_, index) => ({
        scores: Math.floor(Math.random() * 100 + 1),
        user_id: students[index % 10].id,
        course_id: courseIds[~~(index / 3)].id,
        created_at: faker.date.recent(),
        updated_at: new Date()
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('enrollments', {})
  }
}
