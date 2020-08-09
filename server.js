const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session')

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
app.use(session({secret:process.env.SECRET_HASH,resave:false,saveUninitialized:true}))

//Load controllers
const registerController = require('./controllers/register');
const generalController = require('./controllers/general');
const loginController = require('./controllers/login');
const mealController = require('./controllers/meals');
//map controllers
app.use("/",generalController);
app.use("/register",registerController);
app.use("/login",loginController);
app.use("/meals",mealController);

app.listen(PORT, () => {
  console.log("Server connected");
})
