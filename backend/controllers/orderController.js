import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import sendOrderEmail from '../utils/sendEmail.js';

// controllers/orderController.js
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import sendOrderEmail from '../utils/sendOrderEmail.js';

export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    // 1. Check authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Login required' });
    }

    // 2. Validate request body
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ message: 'Invalid total price' });
    }

    // 3. Create order safely
    const order = await Order.create({
      user: req.user.id,
      items: items.map(item => ({
        product: item.product._id || item.product,  // ← handle both cases
        name: item.product.name,
        image: item.product.image,
        price: item.price,
        size: item.size,
        qty: item.qty,
      })),
      totalPrice,
    });

    // 4. Clear user's cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $set: { items: [] } },  // ← use $set
      { upsert: true }
    );

    // 5. Send email (wrap in try-catch — email failure shouldn't break order)
    try {
      const user = await User.findById(req.user.id);
      if (user && user.email) {
        await sendOrderEmail(order, user);
      }
    } catch (emailErr) {
      console.error("Email failed (but order was created):", emailErr);
      // Don't throw — order already created
    }

    // 6. Success
    res.status(201).json({
      success: true,
      order,
      message: "Order placed successfully",
    });

  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
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