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
      // 如果驗證失敗:回傳 cb(req.user.error)
      .then(user => {
        if (!user) { return cb(null, { error: { status: 'error', message: '帳號或密碼錯誤' } }) }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return cb(null, { error: { status: 'error', message: '帳號或密碼錯誤' } })
            }
            // All good return user data
            return cb(null, user)
          })
      })
      .catch(err => cb(err))
  }
))

// middleware: JWT authentication
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // 查詢token的位置
  secretOrKey: process.env.JWT_SECRET // 檢查密鑰
}

// 解開token後, 從payload取得使用者資料, 並回傳
passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
    try {
      // 變數名字不要取跟資料庫一樣
      const TheUser = await user.findByPk(jwtPayload.id)
      if (!TheUser) return cb(null, false)
      return cb(null, TheUser)
    } catch (error) {
      cb(error, false)
    }
  })
)

module.exports = passport