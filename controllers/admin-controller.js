const { user, course, role, user_role, time, enrollment } = require('../models')
const { Op } = require("sequelize") // operator
const bcrypt = require('bcryptjs')

// create, edit, viewAll, view, delete
const adminController = {
  getTeachers: async (req, res) => {
    try {
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
    } catch (err) {
      next(err)
    }
  },
  getStudents: async (req, res) => {
    try {
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
    } catch (err) {
      next(err)
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.params.id

      const User = await user.findOne({ attributes: { exclude: ['password'] }, where: { id: userId } })

      if (!User) {
        return res.status(404).json({
          status: "error",
          message: "user not found"
        })
      }

      return res.status(404).json({
        status: "error",
        message: "User found",
        User
      })
    } catch (err) {
      next(err)
    }
  },
  editUser: async (req, res) => {
    try {
      const { userId, username, email, password } = req.body
      const adminId = req.user.id

      const roleId = await user_role.findOne({ where: { userId: adminId }, raw: true })
      const identity = await role.findOne({ where: { id: roleId.role_id }, raw: true })

      if (identity.name !== "admin") {
        return res.status(403).json({
          status: 'error',
          message: "Only admin can updated all users"
        })
      }

      const User = await user.findOne({ where: { id: userId } })
      if (!User) {
        return res.status(404).json({
          status: "error",
          message: "user not found"
        })
      }

      if (!username || !email || !password) {
        return res.status(403).json({
          status: "error",
          message: "All fields are required"
        })
      }

      if (!validateEmail(email)) {
        return res.status(400).json({
          status: 'failed',
          message: 'email not valid'
        })
      }

      function validateEmail (email) {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
      }

      const checkEmail = await user.findOne({ where: { email } })

      if (checkEmail) {
        return res.status(403).json({
          status: "error",
          message: "Email existed"
        })
      }

      const hash = await bcrypt.hash(password, 10)

      await User.update({ username, password: hash, email })

      return res.status(200).json({
        status: "success",
        message: "User updated",
      })
    } catch (err) {
      next(err)
    }
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
    try {
      const selected = await req.params.id
      const TheCourse = await course.findByPk(selected)
      return res.status(200).json({
        status: 'success',
        TheCourse
      })
    } catch (err) {
      next(err)
    }
  },
  NewCourse: async (req, res) => {
    try {
      const { teacherId, name, week, timing, description } = req.body
      const userId = req.user.id

      const validWeek = ['MON', 'THU', 'WED', 'THUR', 'FRI']
      const validTime = ['AM', 'PM']
      // todo: 抽取驗證時間
      if (!validWeek.includes(week) || !validTime.includes(timing)) {
        return res.status(403).json({
          status: 'error',
          message: "please enter valid format: week(MON, THU, WED, THUR, FRI); timing(AM, PM)"
        })
      }

      const timeId = await time.findOne({ attributes: ['id'], where: { week, time: timing }, raw: true })

      if (!timeId) {
        return res.status(404).json({
          status: 'error',
          message: "time not found"
        })
      }

      const roleId = await user_role.findOne({ where: { userId }, raw: true })
      const identity = await role.findOne({ where: { id: roleId.role_id }, raw: true })

      if (identity.name !== "admin") {
        return res.status(403).json({
          status: 'error',
          message: "Only teacher can open course"
        })
      }

      const existedCourse = await course.findOne({ where: { userId: teacherId, timeId: timeId.id } })

      if (existedCourse) {
        return res.status(403).json({
          status: "error",
          message: "One cannot have courses at the same time!"
        })
      }

      const newCourse = await course.create({
        name,
        timeId: timeId.id,
        description,
        userId: teacherId
      })

      return res.status(200).json(
        {
          status: 'success',
          message: 'New course added',
          newCourse
        })
    } catch (err) {
      next(err)
    }
  },
  editCourse: async (req, res) => {
    try {
      const { name, description } = req.body
      const userId = req.user.id
      const courseId = req.params.id

      // Check if user is teacher
      const roleId = await user_role.findOne({ where: { userId }, raw: true })
      const identity = await role.findOne({ where: { id: roleId.role_id }, raw: true })
      if (identity.name !== "admin") {
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

      const Course = await course.findOne({ where: { id: courseId }, raw: true })
      if (!Course) {
        return res.status(404).json(
          {
            status: 'error',
            message: 'Course not found',
          })
      }

      await course.update({ name: name, description }, { where: { id: courseId }, raw: true })
      const editedCourse = await course.findOne({ where: { id: courseId }, raw: true })
      return res.status(200).json(
        {
          status: 'success',
          message: 'Course edited',
          editedCourse
        })
    } catch (err) { next(err) }
  },
  deleteCourse: async (req, res) => {
    try {
      const courseId = req.params.id

      const Course = await course.findOne({ where: { id: courseId } })
      if (!Course) {
        return res.status(404).json(
          {
            status: 'error',
            message: 'Course not found',
          })
      }

      const Enrollment = await enrollment.findAll({ where: { courseId } })
      await enrollment.destroy({ where: { courseId } })

      let affectedStudents = Enrollment.length

      await Course.destroy()
      return res.status(200).json(
        {
          status: 'success',
          message: `Course deleted, affected Students: ${affectedStudents}`,
          Course
        })
    } catch (err) {
      next(err)
    }
  },
  openCourses: async (req, res) => {
    try {
      const { userId } = req.body

      const openCourses = await course.findAll({ where: { userId }, raw: true })

      if (!openCourses) {
        return res.status(404).json({
          status: "failed",
          message: "User didn't open any course yet"
        })
      }

      return res.status(200).json({
        status: "success",
        openCourses
      })
    } catch (err) {
      next(err)
    }
  },
  enrolledCourses: async (req, res) => {
    try {
      const { userId } = req.body

      const enrolledCourses = await enrollment.findAll({ where: { userId }, raw: true })

      if (!enrolledCourses) {
        return res.status(404).json({
          status: "failed",
          message: "User didn't enroll any course yet"
        })
      }

      return res.status(200).json({
        status: "success",
        enrolledCourses
      })
    } catch (err) {
      next(err)
    }
  },
  editScores: async (req, res) => {
    try {
      const { scores, studentId } = req.body
      const courseId = req.params.id

      const enrolledCourse = await enrollment.findOne({ where: { courseId, userId: studentId }, raw: true })

      if (!enrolledCourse) {
        return res.status(404).json({
          status: "error",
          message: "Student enrollment not found"
        })
      }

      await enrollment.update(
        { scores },
        { where: { courseId, userId: studentId } }
      )

      return res.status(200).json({
        status: "success",
        message: "Student scores updated"
      })
    } catch (err) { next(err) }
  }
}
module.exports = adminController