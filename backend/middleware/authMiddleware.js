import jwt from 'jsonwebtoken';

// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Try to get token from cookie (most common with httpOnly)
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. Fallback: Authorization header (Bearer token)
  // if (!token && req.headers.authorization?.startsWith('Bearer')) {
  //   token = req.headers.authorization.split(' ')[1];
  // }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // This is what getMe uses!
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
export default protect;