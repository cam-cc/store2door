const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/home',(req, res) => {
  res.render('index');
});
router.get('/success',(req, res) => {
  res.render('products');
});
router.post('/send',[
  check('name')
  .exists()
  .isAlpha()
  .withMessage('Name must be only alphaNumeric')
  .isLength({min: 3})
  .withMessage('Name must be atleast 3 characters.'),
  check('password')
  .exists()
  .isLength({ min: 8 })
  .withMessage('Password must be 8 characters long')
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
  .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.')
], (req,res) => {
  const User = require('../lib/User');
  const {name,email,password} = req.body;
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  User.findOne({email:email, password:password}, (err,user)=>{
    if (err) {
      console.log(err);
      res.status(500).send();
    }
    if(!user){
      return res.status(404).send()
    }
  })
  res.status(202).json({
        success: 'Sent'
  })

});
module.exports = router;
