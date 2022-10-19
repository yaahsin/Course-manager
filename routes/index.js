const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')

const userController = require('../controllers/user-controller')
const courseController = require('../controllers/course-controller')
const enrollmentController = require('../controllers/enrollment-controller')
const { authenticated } = require('../middleware/auth')
const { errorHandler } = require('../middleware/error-handler')

router.use('/admin', admin)

// enrollment
router.put('/enrollments/courses/:id', authenticated, enrollmentController.editScores)
router.post('/enrollments/courses/:id', authenticated, enrollmentController.NewCourse)
router.delete('/enrollments/courses/:id', authenticated, enrollmentController.deleteCourse)
router.get('/enrollments/users/:id', authenticated, enrollmentController.getEnrollments)

// courses
router.get('/users/:id/courses/openings', authenticated, courseController.openCourses)
router.get('/users/:id/courses/:courseId/enrollments', authenticated, courseController.enrolledCourses)
router.get('/courses/:id', authenticated, courseController.getCourse)
router.put('/courses/:id', authenticated, courseController.editCourse)
router.delete('/courses/:id', authenticated, courseController.deleteCourse)
router.get('/courses', authenticated, courseController.getCourses)
router.post('/courses', authenticated, courseController.NewCourse)

// users
router.get('/users/:id', authenticated, userController.getUser)
router.put('/users/:id', authenticated, userController.editUser)
router.post('/login', passport.authenticate('local', { session: false }), userController.login)
router.post('/signup', userController.signUp)

router.get('/index',courseController.getIndex )

router.use('/', errorHandler)

module.exports = router
