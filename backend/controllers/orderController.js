import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import sendOrderEmail from '../utils/sendEmail.js';

export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    if (!req.user) return res.status(401).json({ message: 'Login required' });
    if (!items?.length) return res.status(400).json({ message: 'Cart is empty' });


    const orderItems = items.map(item => ({
      product: item.product._id || item.product,  
      name: item.name,
      image: item.image,
      price: item.price,
      size: item.size,
      qty: item.qty
    }));


    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice
    });


    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [] }
    ).catch(err => console.error("Failed to clear cart:", err));

    
    const user = await User.findById(req.user.id);
    

    sendOrderEmail(order, user).catch(err => {
      console.error("Email failed (non-critical):", err);
    
    });

  
    res.status(201).json(order);

  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ 
      message: "Order failed", 
      error: process.env.NODE_ENV === "production" ? "Server error" : error.message 
    });
  }
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