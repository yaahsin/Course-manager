const db = require('../models')
const { course, role, user_role, enrollment } = require('../models')

// create, edit, viewAll, view, delete
const enrollmentController = {
  getEnrollments: async (req, res) => {
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

  },
  NewCourse: async (req, res) => {
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

    const newCourse = await enrollment.create({
      courseId,
      userId: id
    })

    return res.status(200).json(
      {
        status: 'success',
        message: 'New course added to student plan',
        newCourse
      })

  },
  deleteCourse: async (req, res) => {
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
  }
}
module.exports = enrollmentController