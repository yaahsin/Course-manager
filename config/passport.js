const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const bcrypt = require('bcryptjs')

const { user } = require('../models')

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, cb) => {
    user.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return cb(null, { err: { status: 'error', message: '帳號或密碼錯誤' } })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return cb(null, { err: { status: 'error', message: '帳號或密碼錯誤' } })
            }
            return cb(null, user)
          })
      })
      .catch(err => cb(err))
  }
))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}
passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  user.findByPk(jwtPayload.id)
    .then(user => {
      if (!user) { return cb(null, false) }
      return cb(null, user)
    })
    .catch(err => cb(err))
}))

module.exports = passport