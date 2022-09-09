const mongoose = require('mongoose')
const RestaurantList = require('../restaurant-list')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  RestaurantList.create({
    name: 'Sababa 沙巴巴中東美食',
    nameEn: 'Sababa Pita Bar',
    category: '中東料理',
    image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg',
    location: '台北市羅斯福路三段 283 巷 17 號',
    phone: '(02)2363-8009',
    googole_map: 'https://goo.gl/maps/BJdmLuVdDbw',
    rating: 4.1,
    description: '沙巴巴批塔是台灣第一家純手工批塔專賣店,只選用最新鮮的頂級原料,以及道地的中東家傳配方'

  })
  console.log('done')
})