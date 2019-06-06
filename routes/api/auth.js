const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Auth & Get user
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate/LogIn user & get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});

      //See if user not exists
      if (!user) {
        // 400 - Bad request
        return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
      }

      //Comparing req.password and user`s password in database
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
      }

      //Create and Return jwt
      //1 - create payload that will be encrypted
      const payload = {
        user: {id: user.id} // id from database
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 43200},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );

    } catch (err) {
      console.log(err.message);
      res.send('Server error');
    }

  });


module.exports = router;