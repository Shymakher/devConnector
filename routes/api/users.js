const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  //if there are errors
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {name, email, password} = req.body;

  try {
    let user = await User.findOne({email});

    //See if user exists
    if (user) {
      // 400 - Bad request
      return res.status(400).json({errors: [{msg: 'User already exists'}]});
    }

    //Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    //Create new user
    user = new User({
      email,
      avatar,
      name,
      password
    });

    //Encrypt password
    //1 - create salt
    const salt = await bcrypt.genSalt(10);
    //2 - create hash
    user.password = await bcrypt.hash(password, salt);

    //Save user to DB
    await user.save();

    //Return jwt
    //1 - create payload that will be encrypted
    const payload = {
      user: {id: user.id} // id from database
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn: 43200},
      (err, token) => {
        if(err) throw err;
        res.json({token});
      }
    );

  } catch (err) {
    console.log(err.message);
    res.send('Server error');
  }

});

module.exports = router;