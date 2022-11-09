// 載入外部套件
const express = require('express')
const session = require('express-session')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const RestaurantList = require('./models/restaurant-list')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
const flash = require('connect-flash')


require('./config/mongoose')

// setting engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//setting static files 能成功透過 Express 來載入 Bootstrap 與 Popper
app.use(express.static('public'))
// setting mehtodoverride
app.use(methodOverride('_method'))
// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
// setting routes
app.use(routes)






app.listen(3000, () => {
  console.log('app is running on http://localhost:3000')
})