const jwt = require('jsonwebtoken')
const sequelize = require('sequelize') // 可以寫原生語法
const bcrypt = require('bcryptjs')
const { user } = require('../models')
const userController = {
  signUp: (req, res) => {
    const { username, email, password, checkPassword } = req.body

    // check if info valid
    if (!validateEmail(email)) {
      return res.status(400).json({
        status: 'failed',
        message: 'email not valid'
      })
    }

    function validateEmail (email) {
      const re = /\S+@\S+\.\S+/
      return re.test(email)
    }

    if (!username || !email || !password || !checkPassword) {
      return res.status(400).json({
        status: 'failed',
        message: 'all required'
      })
    }

    if (password !== checkPassword) {
      return res.status(400).json({
        status: 'failed',
        message: 'check password again'
      })
    }
    return Promise.all([
      user.findOne({ where: { email }, raw: true })
    ])
      .then(([findEmail]) => {
        if (findEmail) {
          return res.status(400).json({
            status: 'failed',
            message: 'email already registered'
          })
        }
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
      })
  },
  login: async (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      res.json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController