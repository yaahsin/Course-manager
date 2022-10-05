const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')

const userController = require('../controllers/user-controller')
const courseController = require('../controllers/course-controller')
const enrollmentController = require('../controllers/enrollment-controller')
const { authenticated } = require('../middleware/auth')

router.use('/admin', authenticated, admin)

router.get('/', authenticated, (req, res) => {
  res.render('index')
})

// courses
// router.get('/courses', courseController.getCourses)


// users
router.post('/login', passport.authenticate('local', { session: false }), userController.login)
router.post('/signup', userController.signUp)

// enrollment
// router.get('/enrollments', enrollmentController.getEnrollments)

// router.use('/', (req, res) => res.redirect('/index'))

module.exports = router
