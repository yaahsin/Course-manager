const jwt = require('jsonwebtoken')
const sequelize = require('sequelize') // 可以寫原生語法
const { course, role, user_role } = require('../models')


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
  },
  NewCourse: async (req, res) => {
    const { name, time, description } = req.body
    const id = req.user.id

    const roleId = await user_role.findOne({ where: { userId: id }, raw: true })

    const identity = await role.findOne({ where: { id: roleId.role_id }, raw: true })

    if (identity.name !== "teacher") {
      return res.status(403).json({
        status: 'error',
        message: "Only teacher can open course"
      })
    }

    const newCourse = await course.create({
      name,
      time,
      description,
      userId: id
    })

    return res.status(200).json(
      {
        status: 'success',
        message: 'New course added',
        newCourse
      })

  }
}
module.exports = userController
