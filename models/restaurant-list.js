const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restauarantListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  googole_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  }

})

module.exports = mongoose.model('RestaurantList', restauarantListSchema)