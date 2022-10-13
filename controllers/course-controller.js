const { course, role, user_role, enrollment, time } = require('../models')


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
    const { name, week, timing, description } = req.body
    const id = req.user.id

    const validWeek = ['MON', 'THU', 'WED', 'THUR', 'FRI']
    const validTime = ['AM', 'PM']

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

    const roleId = await user_role.findOne({ where: { userId: id }, raw: true })
    const identity = await role.findOne({ where: { id: roleId.role_id }, raw: true })

    if (identity.name !== "teacher") {
      return res.status(403).json({
        status: 'error',
        message: "Only teacher can open course"
      })
    }

    const existedCourse = await course.findOne({ where: { userId: id, time: timeId.id } })

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

    await course.update({ name, description }, { where: { id: courseId, userId: id }, raw: true })
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

    const Course = await course.findOne({ where: { id: courseId, userId: id } })
    if (!Course) {
      return res.status(404).json(
        {
          status: 'error',
          message: 'Course not found',
        })
    }

    const Enrollment = await enrollment.findOne({ where: { id: courseId } })

    if (!Enrollment) {
      return res.status(403).json(
        {
          status: 'error',
          message: 'Course cannot delete now, student enrolled already'
        })
    }

    await Course.destroy()

    return res.status(200).json(
      {
        status: 'success',
        message: 'Course deleted',
        Course
      })
  },
  openCourses: async (req, res) => {
    const teacherId = req.user.id

    const openCourse = await course.findAll({ where: { userId: teacherId }, raw: true })

    if (!openCourse) {
      return res.status(404).json({
        status: "failed",
        message: "User didn't open any course yet"
      })
    }

    return res.status(200).json({
      status: "success",
      openCourse
    })

  }
}
module.exports = userController
