const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const users = new Schema ({
  email: {
    type: String,
    unique: true
  },
  password: String,
  name: String,
  date: {
    type: String,
    default: Date.now()
  }
})

const user = mongoose.model('user', users);
module.exports = user;
