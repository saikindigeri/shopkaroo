import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Fill all fields' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashed });

  const token = generateToken(user._id);
  res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 * 1000 });

  res.status(201).json({ _id: user._id, name, email });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);

      
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
       maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
      });

      console.log("login done from backend")
     
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token, 
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  console.log("user",user)
  res.json(user);
};

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.json({ message: 'Logged out' });
};