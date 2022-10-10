const db = require('../models')
const { course, role, user_role, enrollment } = require('../models')

// create, edit, viewAll, view, delete
const enrollmentController = {
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

  }
}
module.exports = enrollmentController