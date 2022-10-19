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
    } catch (err) {
      next(err)
    }
  },
  editCourse: async (req, res) => {
    try {
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
    } catch (err) {
      next(err)
    }

  },
  deleteCourse: async (req, res) => {
    try {
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
    } catch (err) {
      next(err)
    }

  },
  openCourses: async (req, res) => {
    try {
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
    } catch (err) {
      next(err)
    }
  },
  enrolledCourses: async (req, res) => {
    try {
      const { courseId } = req.params
      const enrolledCourses = await course.findAll({ attributes: [['user_id', 'student_id'], 'scores', 'created_at', 'updated_at'], where: { courseId } })

      if (!enrolledCourses) {
        return res.status(404), json({
          status: 'error',
          message: 'course not yet enrolled'
        })
      }

      return res.status(200).json({
        status: 'success',
        enrolledCourses
      })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController
