const jwt = require('jsonwebtoken')
const sequelize = require('sequelize') // 可以寫原生語法
const { course } = require('../models')


const userController = {
  getCourses: async (req, res) => {
    try {
      const courses = await course.findAll({ raw: true })
      return res.status(200).json({
        status: 'success',
        courses
      })
    } catch (err) {
      next(err)
    }
  },
  getCourse: async (req, res) => {
    const selected = await req.params.id
    const TheCourse = await course.findByPk(selected)
    return res.status(200).json({
      status: 'success',
      TheCourse
    })
  }
}
module.exports = userController
