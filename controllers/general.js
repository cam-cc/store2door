const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/',(req, res) => {
  res.render('home', {
    user : req.session.user,
    isClerk : req.session.isClerk,
    name : req.session.name,
    price : req.session.price,
    desc : req.session.desc,
    category : req.session.category,
    qty : req.session.qty
  });
});
router.get('/login',(req, res) => {
  res.render('index', {
    user : req.session.user,
    isClerk : req.session.isClerk
  });
});
router.get('/products',(req, res) => {
  const Meal = require('../lib/Meal');
  Meal.find({}, function(err,meal){
  }).lean().exec().then((data )=> {
    res.render('products', {
      user : req.session.user,
      isClerk : req.session.isClerk,
      meal : data
    });
  })
  // console.log(meal.name);

});
router.get('/dashboard', (req, res)=>{
  if(!req.session.user){
    return res.status(401).send()
  }
  res.render('dashboard', {
    user : req.session.user,
    isClerk : req.session.isClerk,
    meal : req.session.meal,
    name : req.session.name
  });
})
router.get('/clerkdashboard', (req, res)=>{
  if(!req.session.user){
    return res.status(401).send()
  }
  res.render('dashboard', {
    user : req.session.user,
    isClerk : req.session.isClerk,
    meal : req.session.meal
  });
})
router.get('/logout', (req,res) =>{
  req.session.destroy();
  res.render('home');
})
module.exports = router;
