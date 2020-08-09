const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/create',(req, res) => {
  res.render('clerk',{
    user : req.session.user,
    isClerk : req.session.isClerk
  });
})
router.post('/add',[
  check('name')
  .exists()
  .withMessage('Name have a name')
  .isLength({min: 3})
  .withMessage('Name must be atleast 3 characters.'),
  check('price')
  .exists()
  .withMessage('Must have valid price'),
  check('desc')
  .exists()
  .withMessage('Must have valid description'),
  check('category')
  .exists()
  .withMessage('Must have valid category'),
  check('qty')
  .exists()
  .withMessage('Must choose a quantity')
], (req,res) => {
    const Meal = require('../lib/Meal');
    const {name,price,desc,category,qty} = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      var newMeal = new Meal();
      newMeal.name = name;
      newMeal.price = price;
      newMeal.desc = desc;
      newMeal.category = category;
      newMeal.qty = qty;
      newMeal.save((err, savedMeal)=>{
        if(err){
          console.log(err);
          return res.status(500).send();
        } else {
          return res.status(202).json({
                success: 'Sent',
                name: name,
                price: price,
                desc: desc,
                category: category,
                qty: qty
          })
        }
      })
    }
});

module.exports = router;
