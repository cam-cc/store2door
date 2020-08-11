const express = require('express')
const Cart = require('../models/cart');
const router = express.Router();

router.get('/shopping-cart',(req, res) => {
  if(!req.session.cart){
    return res.render('shopping-cart', {products: null, user: req.session.user});
  }
  var cart = new Cart(req.session.cart);
  res.render('shopping-cart', {products: cart.generateArray(),
   totalPrice: cart.t_price,
    user : req.session.user,
    isClerk : req.session.isClerk,
    cart : req.session.cart});
});
router.post('/checkout',(req, res) => {
  if(!req.session.cart){
    return res.render('shopping-cart', {products: null});
  }
  var basket = new Cart(req.session.cart);
  var u = req.session.user;
  basket.generateArray();
  const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  console.log(basket);
  console.log(u);
    const msg = {
      to: `${u.email}`,
      from: `camcoenjarts@gmail.com`,
      subject: 'Purchase Details ✔️',
      html: `<p> You have officially Submitted an order to Store2Door.com <br> for ${basket.name} 's</p>
      <h3> Order Details </h3>
      <ul>
        <li> Name: ${basket.name} </li>
        <li> Quantity: ${basket.t_qty} </li>
        <li> Total Price: $${basket.t_price}.00 </li>
      </ul>
        <h3> Thank you! 🙂  Have a nice day! </h3>`,
    };
    console.log(msg.html)
    sgMail.send(msg)
    .then(()=>{
      delete req.session.cart;
      res.redirect('/cart/shopping-cart');
    })
    .catch(err =>{
      console.log(`error : ${err}`);
    })
});
router.post('/add/:id',(req, res) => {
  var prodId = req.params.id;
});

module.exports = router;
