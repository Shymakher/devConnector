const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
//  Get token from header
  const token = req.header('x-auth-token');

//  Check if not token
  if (!token) {
    return res.status(401).json({errors: [{msg: 'No token, authorization denied'}]});
  }

// Verify token
  try {
    // get payload from token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

  //  save to req object
    req.user = decoded.user; // because it contains user in his payload

    next();
  } catch (err) {
    res.status(401).json({errors: [{msg: 'Token is not valid'}]});
  }
};