const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const meals = new Schema ({
  name: {
    type: String,
    unique: true
  },
  price: Number,
  desc: String,
  category: String,
  quantity: Number,
  special: Boolean,
  date: {
    type: String,
    default: Date.now()
  },
  image: String
})
const Meal = mongoose.model('Meal', meals);
module.exports = Meal;
