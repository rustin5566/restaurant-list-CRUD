const express = require('express')
const router = express.Router()
const dinerUser = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword} = req.body
  dinerUser.findOne({email}).then(user => {
    if(user) {
      console.log('email have benn used.')
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