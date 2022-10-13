const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/auth')

const adminController = require('../../controllers/admin-controller')


router.get('/teachers', adminController.getTeachers)
router.get('/students', adminController.getStudents)
router.get('/courses', adminController.getCourses)
router.get('/courses/:id', adminController.getCourse)
router.put('/courses/:id', authenticated, adminController.editCourse)
router.delete('/courses/:id', authenticated, adminController.deleteCourse)
router.post('/courses', authenticated, adminController.NewCourse)

router.get('/courses/open', authenticated, adminController.openCourses)
router.get('/courses/enrollment', authenticated, adminController.enrolledCourses)

router.use('/', (req, res) => res.redirect('/'))

module.exports = router