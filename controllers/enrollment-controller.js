const { course, role, user_role, enrollment } = require('../models')
const { Op } = require("sequelize")

// create, edit, viewAll, view, delete
const enrollmentController = {
  getEnrollments: async (req, res, next) => {
    try {
      const id = req.user.id

      const Course = await enrollment.findAll({ where: { userId: id }, raw: true })

      if (!Course) {
        return res.status(404).json(
          {
            status: 'error',
            message: 'Course not found',
          })
      }

      return res.status(200).json(
        {
          status: 'success',
          message: 'student enrollment found',
          Course
        })
    } catch (err) {
      next(err)
    }
  },
  NewCourse: async (req, res, next) => {
    try {
      const courseId = req.params.id
      const id = req.user.id

      const roleId = await user_role.findOne({ where: { userId: id }, raw: true })

      const identity = await role.findOne({ where: { id: roleId.role_id }, raw: true })

      if (identity.name !== "student") {
        return res.status(401).json({
          status: 'error',
          message: "Only student can enroll course"
        })
      }

      const Course = await enrollment.findOne({ where: { courseId, userId: id }, raw: true })

      if (Course) {
        return res.status(403).json(
          {
            status: 'error',
            message: 'Course enrolled already',
          })
      }

      const timeId = await course.findOne({ attributes: ['time_id'], where: { id: courseId }, raw: true })
      const existedCourse = await enrollment.findAll({ attributes: [['course_id', 'id']], where: { userId: id }, raw: true })
      const sameTimeCourses = await course.findAll({attributes: ['id'],
        where: {
          [Op.or]: existedCourse,
          timeId: timeId.time_id
        }, raw: true
      })


      if (sameTimeCourses.length > 0) {
        return res.status(403).json({
          status: "error",
          message: "One cannot have courses at the same time!"
        })
      }

      const newCourse = await enrollment.create({
        courseId,
        userId: id,
        newCourse
      })

      return res.status(200).json(
        {
          status: 'success',
          message: 'New course added to student plan',
          // newCourse
        })
    } catch (err) {
      next(err)
    }
  },
  deleteCourse: async (req, res, next) => {
    try {
      const id = req.user.id
      const courseId = req.params.id

      const Course = await enrollment.findOne({ where: { courseId, userId: id } })
      if (!Course) {
        return res.status(404).json(
          {
            status: 'error',
            message: 'Course not found',
          })
      }

      if (Course.scores >= 0) {
        return res.status(403).json(
          {
            status: 'error',
            message: 'Course cannot delete now, score made'
          })
      }

      await Course.destroy()

      return res.status(200).json(
        {
          status: 'success',
          message: 'Course deleted',
          Course
        })
    } catch (err) {
      next(err)
    }
  },
  editScores: async (req, res, next) => {
    try {
      const { scores, studentId } = req.body
      const teacherId = req.user.id
      const courseId = req.params.id

      const ownCourse = await course.findOne({ where: { id: courseId, userId: teacherId } })

      if (!ownCourse) {
        return res.status(404).json({
          status: "error",
          message: "Course not found"
        })
      }

      const enrolledCourse = await enrollment.findOne({ where: { courseId, userId: studentId }, raw: true })

      if (!enrolledCourse) {
        return res.status(404).json({
          status: "error",
          message: "Student enrollment not found"
        })
      }

      if (scores < 0 || scores > 100 || isNaN(scores)) {
        return res.status(403).json({
          status: 'error',
          message: 'invalid scores, range: 1-100',
          inputScores: scores
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

    } catch (err) {
      next(err)
    }
  }
}
module.exports = enrollmentController