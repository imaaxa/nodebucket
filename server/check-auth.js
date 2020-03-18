/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Auth Guard for the API.
===========================================*/

// Requires
const options = require('./options');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, options.storageConfig.env.JWT_KEY);
    req.userData = decoded;
  } catch (err) {
    return res.status(401).json('Auth failed');
  }
  next();
}
