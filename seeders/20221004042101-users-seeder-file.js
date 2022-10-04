const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{ // 一次新增三筆資料
      email: 'root@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'root',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user1@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'user1',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user2@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'user2',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user3@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'user3',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user4@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'user4',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user5@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'user5',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student1@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student1',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student2@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student2',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student3@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student3',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student4@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student4',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student5@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student5',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student6@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student6',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student7@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student7',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student8@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student8',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student9@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student9',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'student10@example.com',
      password: await bcrypt.hash('123456', 10),
      username: 'student10',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {})
  }
}