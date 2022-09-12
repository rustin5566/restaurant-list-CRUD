const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurant-list')

router.get('/', (req, res) => {

  RestaurantList.find()
    .lean()
    .sort({ _id: 'asc'})
    .then(restaurantlists => res.render('index', { restaurantlists }))
    .catch(error => console.error(error))
})

module.exports = router