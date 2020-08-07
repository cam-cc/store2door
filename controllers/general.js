const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/',(req, res) => {
  res.render('home', {
    user : req.session.user
  });
});
router.get('/login',(req, res) => {
  res.render('index', {
    user : req.session.user
  });
});
router.get('/products',(req, res) => {
  res.render('products', {
    user : req.session.user
  });
});
router.get('/dashboard', (req, res)=>{
  if(!req.session.user){
    return res.status(401).send()
  }
  res.render('home', {
    user : req.session.user
  });
})
router.get('/clerkdashboard', (req, res)=>{
  if(!req.session.user){
    return res.status(401).send()
  }
  res.render('home', {
    user : req.session.user
  });
})
router.get('/logout', (req,res) =>{
  req.session.destroy();
  res.render('home');
})
module.exports = router;
