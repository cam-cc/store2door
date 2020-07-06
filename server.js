const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
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

//Load controllers
const registerController = require('./controllers/register');
const generalController = require('./controllers/general');
//map controllers
app.use("/",generalController);
app.use("/register",registerController);

app.listen(PORT, () => {
  console.log("Server connected");
})
