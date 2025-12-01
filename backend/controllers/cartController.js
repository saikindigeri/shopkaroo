import Cart from '../models/Cart.js';

// backend/controllers/cartController.js

export const getCart = async (req, res) => {
  try {
    // req.user comes from protect middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product')

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] })
      await cart.populate('items.product')
    }

    res.json(cart)
  } catch (error) {
    console.error('Get cart error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const addToCart = async (req, res) => {
  const { product, name, size, qty = 1, price, image } = req.body;
  if (!req.user) return res.json({ message: 'Added to guest cart' });

  let cart = await Cart.findOne({ user: req.user.id }) || await Cart.create({ user: req.user.id, items: [] });

  const index = cart.items.findIndex(i => 
  i.product.toString() === product && i.size === size   // ← Add .toString()!
)
  if (index > -1) {
    cart.items[index].qty += qty;
  } else {
    cart.items.push({ product, name, size, qty, price, image });
  }

  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
};

export const updateCartItem = async (req, res) => {
  const { productId, size, qty } = req.body;
  if (!req.user) return res.status(401).json({ message: 'Login required' });

  const cart = await Cart.findOne({ user: req.user.id });
  const index = cart.items.findIndex(i => i.product.toString() === productId && i.size === size);

  if (index > -1) {
    if (qty <= 0) cart.items.splice(index, 1);
    else cart.items[index].qty = qty;
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  }
};

export const removeFromCart = async (req, res) => {
  const { productId, size } = req.body;
  if (!req.user) return res.json({ message: 'Remove from local cart' });

  const cart = await Cart.findOne({ user: req.user.id });
  cart.items = cart.items.filter(i => !(i.product.toString() === productId && i.size === size));
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
};

// backend/controllers/cartController.js

export const mergeCart = async (req, res) => {
  try {
    const { guestCart } = req.body
    if (!req.user || !guestCart || !Array.isArray(guestCart) || guestCart.length === 0) {
      return res.json({ message: 'Nothing to merge' })
    }

    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] })
    }

    guestCart.forEach(guestItem => {
      // FIX: Convert both to string for comparison
      const existingIndex = cart.items.findIndex(item =>
        item.product.toString() === guestItem.product && 
        item.size === guestItem.size
      )

      if (existingIndex > -1) {
        cart.items[existingIndex].qty += guestItem.qty
      } else {
        cart.items.push({
          product: guestItem.product,
          name: guestItem.name,
          image: guestItem.image,
          price: guestItem.price,
          size: guestItem.size,
          qty: guestItem.qty
        })
      }
    })

    await cart.save()
    await cart.populate('items.product')

    res.json({
      message: 'Guest cart merged successfully',
      items: cart.items
    })
  } catch (error) {
    console.error('Merge cart error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
