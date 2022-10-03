const bcrypt = require('bcryptjs')
const { user } = require('../models')
const userController = {
  test: (req, res, next) => {
    return res.status(200).json({
      status: 'success',
      message: 'test success'
    })
  },
  signUp: (req, res) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => user.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }))

    return res.status(200).json({
      status: 'success',
      message: 'Sign up success.'
    })

  }
}
module.exports = userController