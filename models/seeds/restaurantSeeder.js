const mongoose = require('mongoose')
const RestaurantList = require('../restaurant-list')
const restaurant = require('../../restaurant.json').results


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  RestaurantList.create(restaurant)
    .then(() => {
      console.log('restaurant.json is done')

    })
    .catch(error => console.log(error))
  console.log('done')
})
