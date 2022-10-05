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
    passwordField: 'password',
  },
  // verify user
  (email, password, cb) => {
    user.findOne({ where: { email } })
      .then(user => {
        // 如果驗證失敗:回傳 cb(req.user.error)
        if (!user) return cb(null, { error: { status: 'error', message: '帳號或密碼錯誤' } })
        bcrypt.compare(password, user.password).then(res => {
          if (!res) return cb(null, { error: { status: 'error', message: '帳號或密碼錯誤' } })
        })
      })
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
      const user = await user.findByPk(jwtPayload.id)
      if (!user) return cb(null, false)
      return cb(null, user)
    } catch (error) {
      cb(error, false)
    }
  })
)

module.exports = passport