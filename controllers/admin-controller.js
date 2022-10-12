const { user, course, role, user_role, time } = require('../models')
const { Op } = require("sequelize") // operator

// create, edit, viewAll, view, delete
const adminController = {
  getTeachers: async (req, res) => {
    // 自組sub queries: role_id > user_id > find users detail
    const roleId = await role.findAll({ attributes: ['id'], where: { name: "teacher" }, raw: true })
    // user_id alias id to fit next query column_name: [ {id: 1}, {id: 2}... ]
    const userId = await user_role.findAll({ attributes: [['user_id', 'id']], where: { roleId: roleId[0].id }, raw: true })
    const teachers = await user.findAll({
      attributes: { exclude: ['password'] },
      where: {
        [Op.or]: userId
      }, raw: true
    })

    if (teachers.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: "Teachers not found"
      })
    }

    return res.status(200).json({
      status: 'success',
      teachers
    })
  },
  getStudents: async (req, res) => {
    const roleId = await role.findAll({ attributes: ['id'], where: { name: "student" }, raw: true })
    const userId = await user_role.findAll({ attributes: [['user_id', 'id']], where: { roleId: roleId[0].id }, raw: true })
    const students = await user.findAll({
      attributes: { exclude: ['password'] },
      where: {
        [Op.or]: userId
      }, raw: true
    })

    if (students.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: "Student not found"
      })
    }

    return res.status(200).json({
      status: 'success',
      students
    })
  },
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
module.exports = adminController