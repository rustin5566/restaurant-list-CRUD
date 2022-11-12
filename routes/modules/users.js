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
  req.flash('success_msg', '成功登出')
  res.redirect('/users/login')
})


router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  
  dinerUser.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'email had been used.'})
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 
      return bcrypt 
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => dinerUser.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  )

})
module.exports = router
