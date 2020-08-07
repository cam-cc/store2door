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
  check('email')
  .isEmail()
  .withMessage('Email is not a valid Email address'),
  check('password')
  .exists()
  .isLength({ min: 8 })
  .withMessage('Password must be 8 characters long')
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
  .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.')
], (req,res) => {
  const {email,password} = req.body;
  const isClerk = false;
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  } else {
    const User = require('../lib/User');
    User.findOne({email: email}, (err,user)=>{
      if (err) {
        console.log(err);
        res.status(500).send();
      }
      if(!user){
        return res.status(401).json({
              success: 'fail'
        })
      }
      console.log(user.isClerk);
      user.comparePassword(password, (err, isMatch)=>{
        if(isMatch && isMatch == true){
          return res.status(202).json({
                success: 'Sent',
                email: email,
                isClerk: user.isClerk
          })
        }else{
          return res.status(401).json({
                success: 'fail'
          })
        }
      })
      req.session.user = {user: user, email: email, isClerk: isClerk};
    })
  }
});
module.exports = router;
