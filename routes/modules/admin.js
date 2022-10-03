const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')
// router.get('/courses', adminController.getCourses)
router.use('/', (req, res) => res.redirect('/'))

module.exports = router