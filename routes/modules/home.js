const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurant-list')

router.get('/', (req, res) => {
  const userId = req.user._id

  RestaurantList.find({ userId: req.user._id })
    .lean()
    .sort({ _id: 'asc'})
    .then(restaurantlists => res.render('index', { restaurantlists }))
    .catch(error => console.error(error))
})

module.exports = router