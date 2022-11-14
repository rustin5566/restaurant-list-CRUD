const bcrypt = require('bcryptjs')
const DinerUser = require('../user')
const RestaurantList = require('../restaurant-list')
const db = require('../../config/mongoose')
const RestaurantListJson = require('../../restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  defaultDiner: [0, 1, 2]
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  defaultDiner: [3, 4, 5]
}]

db.once('open', () => {
  Promise.all(
    SEED_USER.map((user) => {
      const { name, email, password, defaultDiner } = user
      return DinerUser.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) })
        .then((user) => {
          const restaurantSeeds = defaultDiner.map(index => {
            RestaurantListJson[index].userId = user._id
            return RestaurantListJson[index]
          })
          return RestaurantList.create(restaurantSeeds)
        })
    }))
    .then(() => {
      console.log('done')
      process.exit()
    })
})