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


require('./config/mongoose')

//setting static files 能成功透過 Express 來載入 Bootstrap 與 Popper
app.use(express.static('public'))

// setting mehtodoverride
app.use(methodOverride('_method'))
// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

usePassport(app)

// setting routes
app.use(routes)

// setting engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting session
app.use(session({
  secret: 'WinterIsComing',
  resave: false,
  saveUninitialized: true
}))

app.listen(3000, () => {
  console.log('app is running on http://localhost:3000')
})