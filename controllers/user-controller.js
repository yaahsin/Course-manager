const jwt = require('jsonwebtoken')
const sequelize = require('sequelize') // 可以寫原生語法
const bcrypt = require('bcryptjs')
const { user, role, user_role } = require('../models')
const id = require('faker/lib/locales/id_ID')


const userController = {
  signUp: (req, res) => {
    const { username, email, password, checkPassword, identity } = req.body

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

    if(identity !== 'teacher') {
      return res.status(400).json({
        status: 'failed',
        message: 'identity invalid'
      })
    }

    return Promise.all([
      user.findOne({ where: { email }, raw: true }), role.findOne({ where: { name: identity }, raw: true })
    ])
      .then(([findEmail, role]) => {
        if (findEmail) {
          return res.status(400).json({
            status: 'failed',
            message: 'email already registered'
          })
        }
        if (!role) {
          return res.status(400).json({
            status: 'failed',
            message: 'identity invalid'
          })
        }
        bcrypt.hash(req.body.password, 10)
          .then(hash =>
              user.create({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            })
          )
          .then (user =>
            user_role.create({
              userId: user.toJSON().id,
              roleId: role.id
            }))
        return res.status(200).json({
          status: 'success',
          message: 'Sign up success.'
        })
      })
  },
  login: (req, res, next) => {
    try {
      //  在passport內的local驗證失敗的話
      if (req.user.error) {
        return res.status(404).json(req.user.error)
      }

      // if success: 簽發token
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '30d'
      })
      // return token and data
      return res.status(200).json({
        status: 'success',
        token,
        user: userData
      })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController
