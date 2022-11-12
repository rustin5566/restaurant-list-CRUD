const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const dinerUser = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    dinerUser.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'email or password incorrect.' })
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    dinerUser.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt 
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => dinerUser.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    dinerUser.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}