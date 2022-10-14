const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/auth')

const adminController = require('../../controllers/admin-controller')

router.put('/enrollments/courses/:id', authenticated, adminController.editScores)
router.get('/courses/open', authenticated, adminController.openCourses)
router.get('/courses/enrollment', authenticated, adminController.enrolledCourses)
router.get('/courses/:id', adminController.getCourse)
router.put('/courses/:id', authenticated, adminController.editCourse)
router.delete('/courses/:id', authenticated, adminController.deleteCourse)

router.get('/teachers', adminController.getTeachers)
router.get('/students', adminController.getStudents)
router.get('/users/:id', adminController.getUser)

router.get('/courses', adminController.getCourses)
router.post('/courses', authenticated, adminController.NewCourse)




router.use('/', (req, res) => res.redirect('/'))

module.exports = router