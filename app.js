// 載入外部套件
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const RestaurantList = require('./models/restaurant-list')
const methodOverride = require('method-override')

// mongoose 連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

//setting static files 能成功透過 Express 來載入 Bootstrap 與 Popper
app.use(express.static('public'))

// setting mehtodoverride
app.use(methodOverride('_method'))

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// routig


// 點新增餐廳button routing頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 瀏覽首頁全部餐廳
app.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurantlists => res.render('index', { restaurantlists }))
    .catch(error => console.error(error))
})



// 瀏覽特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurantlists => res.render('detail', { restaurantlists }))
    .catch(error => console.log(error))
})

// 修改資料頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurantlists => res.render('edit', { restaurantlists }))
    .catch(error => console.log(error))
})

// 接住修改後的資料後重新渲染
app.put('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  RestaurantList.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

// 刪除資料
app.delete('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  RestaurantList.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 新增資料
app.post('/restaurants', (req, res) => {

  // const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  // const nameEn = req.body.nameEn
  // const category = req.body.category
  // const image = req.body.image
  // const location = req.body.location
  // const phone = req.body.phone
  // const google_map = req.body.google_map
  // const rating = req.body.rating
  // const description = req.body.description

  return RestaurantList.create(req.body)// 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))

})

app.listen(3000, () => {
  console.log('app is running on http://localhost:3000')
})