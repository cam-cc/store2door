const express = require('express')
const router = express.Router();

router.get('/',(req, res) => {
  res.render('home');
});
router.get('/login',(req, res) => {
  res.render('index');
});
router.get('/products',(req, res) => {
  res.render('products');
});

module.exports = router;