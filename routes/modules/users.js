const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const dinerUser = require('../../models/user')



router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})


router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  dinerUser.findOne({ email }).then(user => {
    if (user) {
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return dinerUser.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })

})
module.exports = router
