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
  },
  NewCourse: async (req, res) => {
    const { name, time, description } = req.body
    const userId = req.user.id
    // const identity = await sequelize.query(`SELECT name FROM roles WHERE id = (SELECT role_id FROM user_roles WHERE user_id = ${userId})`)

    // if (identity !== "老師" ) {
    //   res.status(404).json({
    //     status: 'error',
    //     message: "Only teacher can open course"
    //   })
    // }

    if (!course) {
      res.status(404).json({
        status: 'error',
        message: "Course not exists"
      })
    }

    await course.create({
      name,
      time,
      description,
      userId: userId
    })
    return res.status(200).json({ status: 'success', message: 'New course added' })

  }
}
module.exports = userController
