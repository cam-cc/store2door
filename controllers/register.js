const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/home',(req, res) => {
  res.render('register', {
    user : req.session.user
  });
})
router.get('/sent',(req, res) => {
  res.render('email');
})
router.post('/send',[
  check('name')
  .exists()
  .isAlpha()
  .withMessage('Email must be only alphaNumeric')
  .isLength({min: 3})
  .withMessage('Name must be atleast 3 characters.'),
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
  const User = require('../lib/User');
  const {name,email,password} = req.body;
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }else if(errors.isEmpty()){
    var newuser = new User();
    newuser.email = email;
    newuser.password = password;
    newuser.name = name;
    newuser.save((err, savedUser)=>{
      if(err){
        console.log(err);
        return res.status(500).send();
      } else {
        return res.status(200).send();
      }
    })
    console.log(req.body);

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
      to: `${email}`,
      from: `camcoenjarts@gmail.com`,
      subject: 'Registratrion Form ✔️',
      html: `<p> You have officially registered to Store2Door.com <br> Where delivery is our focus</p>
      <h3> Account Details </h3>
      <ul>
        <li> Name: ${name} </li>
        <li> Email: ${email} </li>
      </ul>
        <h3> Thank you! 🙂  You may now login to your account! </h3>`,
    };
    sgMail.send(msg)
    .then(()=>{
      res.status(202).json({
        success: 'Sent'
      })
    })
    .catch(err =>{
      console.log(`error : ${err}`);
    })
  }
});

module.exports = router;
