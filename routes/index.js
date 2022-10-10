const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')

const userController = require('../controllers/user-controller')
const courseController = require('../controllers/course-controller')
const enrollmentController = require('../controllers/enrollment-controller')
const { authenticated } = require('../middleware/auth')

router.use('/admin', admin)

router.get('/', (req, res) => {
  res.render('index')
})

// courses
router.get('/courses/:id', authenticated, courseController.getCourse)
router.put('/courses/:id', authenticated, courseController.editCourse)
router.delete('/courses/:id', authenticated, courseController.deleteCourse)
router.post('/courses/:id', authenticated, enrollmentController.NewCourse)
router.get('/courses', authenticated, courseController.getCourses)
router.post('/courses', authenticated, courseController.NewCourse)

// users
router.post('/login', passport.authenticate('local', { session: false }), userController.login)
router.post('/signup', userController.signUp)

// enrollment
// router.get('/enrollments', enrollmentController.getEnrollments)

// router.use('/', (req, res) => res.redirect('/index'))

module.exports = router
