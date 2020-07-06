const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/',(req, res) => {
  res.render('home');
});
router.get('/login',(req, res) => {
  res.render('index');
});
router.get('/products',(req, res) => {
  res.render('products');
});
router.post('/login/send',[
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
  const {name,email} = req.body;
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
      res.status(202).json({
        success: 'Sent'
      })
});
module.exports = router;
