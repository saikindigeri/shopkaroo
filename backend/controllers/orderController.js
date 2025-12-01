import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import sendOrderEmail from '../utils/sendEmail.js';

export const createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;
  if (!req.user) return res.status(401).json({ message: 'Login required' });

  const order = await Order.create({ user: req.user.id, items, totalPrice });
  await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

  const user = await User.findById(req.user.id);
  await sendOrderEmail(order, user);

  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Login required' });
    }

    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })  // Latest first
      .populate('items.product', 'name image price'); // Optional: populate product details

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};