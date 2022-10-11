const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')


router.get('/teachers', adminController.getTeachers)
router.get('/students', adminController.getStudents)

router.use('/', (req, res) => res.redirect('/'))

module.exports = router