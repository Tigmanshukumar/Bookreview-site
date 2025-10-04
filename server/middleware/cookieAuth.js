const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Cookie-based authentication middleware
const cookieAuth = async (req, res, next) => {
  try {
    // Get token from cookie instead of header
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token cookie' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    next();
  } catch (error) {
    console.error('Cookie authentication error:', error);
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

module.exports = { cookieAuth };
