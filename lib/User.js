const mongoose = require('mongoose');
// LOad environment variable file.
require('dotenv').config({path:"./config/keys.env"});
const MONGODB_URI = process.env.MONGODB_URI;
//Mongoose Model
mongoose.connect(MONGODB_URI || 'mongodb://localhost/cameron', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected',() =>{
  console.log('Mongoose is connected')
});

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

const User = mongoose.model('User', users);
module.exports = User;
