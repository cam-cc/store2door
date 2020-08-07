const mongoose = require('mongoose');
// LOad environment variable file.
require('dotenv').config({path:"./config/keys.env"});
//Mongoose Model
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cameron', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('connected',() =>{
  console.log('Mongoose is connected')
});

mongoose.connection.on('error',(err) =>{
  console.log(err.message)
});

mongoose.connection.on('disconnected',() =>{
  console.log('Mongoose is disconnected')
});

process.on('SIGINT', async()=>{
  await mongoose.connection.close();
  process.exit(0);
})
