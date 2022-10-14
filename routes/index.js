const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')

const userController = require('../controllers/user-controller')
const courseController = require('../controllers/course-controller')
const enrollmentController = require('../controllers/enrollment-controller')
const { authenticated } = require('../middleware/auth')

router.use('/admin', admin)

// enrollment
router.put('/enrollments/courses/:id', authenticated, enrollmentController.editScores)
router.post('/enrollments/courses/:id', authenticated, enrollmentController.NewCourse)
router.delete('/enrollments/courses/:id', authenticated, enrollmentController.deleteCourse)
router.get('/enrollments', authenticated, enrollmentController.getEnrollments)

// courses
router.get('/courses/open', authenticated, courseController.openCourses)
router.get('/courses/:id', authenticated, courseController.getCourse)
router.put('/courses/:id', authenticated, courseController.editCourse)
router.delete('/courses/:id', authenticated, courseController.deleteCourse)
router.get('/courses', authenticated, courseController.getCourses)
router.post('/courses', authenticated, courseController.NewCourse)

// users
router.get('/user', authenticated, userController.getUser)
router.post('/user', authenticated, userController.editUser)
router.post('/login', passport.authenticate('local', { session: false }), userController.login)
router.post('/signup', userController.signUp)

// router.use('/', (req, res) => res.redirect('/index'))

module.exports = router
