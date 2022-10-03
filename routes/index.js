const express = require('express')
const router = express.Router()

const admin = require('./modules/admin')

const userController = require('../controllers/user-controller')
const courseController = require('../controllers/course-controller')
const enrollmentController = require('../controllers/enrollment-controller')

router.use('/admin', admin)

router.get('/', (req, res) => {
  res.render('index')
})

// courses
// router.get('/courses', courseController.getCourses)


// users
// router.get('/users, userController.signUp)

// enrollment
// router.get('/enrollments', enrollmentController.getEnrollments)

// router.use('/', (req, res) => res.redirect('/index'))

module.exports = router