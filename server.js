const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session')
var mongoStore = require('connect-mongo')(session);

require('./helpers/init_mongodb')
const PORT = process.env.PORT || 8080;
// LOad environment variable file.
require('dotenv').config({path:"./config/keys.env"});
//handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Importing CSS
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(session({secret:process.env.SECRET_HASH,
	resave:false,
	saveUninitialized:true,
	store: new mongoStore({ mongooseConnection: mongoose.connection}),
	cookie: { maxAge: 180 * 60 * 1000 }
}))

//Load controllers
const registerController = require('./controllers/register');
const generalController = require('./controllers/general');
const loginController = require('./controllers/login');
const mealController = require('./controllers/meals');
const cartController = require('./controllers/cart');
//map controllers
app.use("/",generalController);
app.use("/register",registerController);
app.use("/login",loginController);
app.use("/meals",mealController);
app.use("/cart",cartController);

app.listen(PORT, () => {
  console.log("Server connected");
})