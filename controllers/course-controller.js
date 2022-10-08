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

  },
  editCourse: async (req, res) => {
    const { name, description } = req.body
    const id = req.user.id
    const courseId = req.params.id

    // Check if user is teacher
    const roleId = await user_role.findOne({ where: { userId: id }, raw: true })
    const identity = await role.findOne({ where: { id: roleId.role_id }, raw: true })
    if (identity.name !== "teacher") {
      return res.status(403).json({
        status: 'error',
        message: "Only teacher can edit course"
      })
    }

    if (!name.trim() || !description.trim()) {
      return res.status(406).json({
        status: 'error',
        message: "All fields required"
      })
    }

    const Course = await course.findOne({ where: { id: courseId, userId: id }, raw: true })
    if (!Course) {
      return res.status(404).json(
        {
          status: 'error',
          message: 'Course not found',
        })
    }

    await course.update({ name: name, description }, { where: { id: courseId, userId: id }, raw: true })
    return res.status(200).json(
      {
        status: 'success',
        message: 'Course edited',
        Course
      })
  },
  deleteCourse: async (req, res) => {
    const id = req.user.id
    const courseId = req.params.id

    const Course = await course.findOne({ where: { id: courseId, userId: id }})
    if (!Course) {
      return res.status(404).json(
        {
          status: 'error',
          message: 'Course not found',
        })
    }

    await Course.destroy()

    return res.status(200).json(
      {
        status: 'success',
        message: 'Course deleted',
        Course
      })
  }
}
module.exports = userController
