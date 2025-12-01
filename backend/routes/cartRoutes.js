import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, mergeCart } from '../controllers/cartController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',protect, getCart);
router.post('/add',protect, addToCart);

router.put('/update', protect, updateCartItem);
router.delete('/remove', protect, removeFromCart);
router.post('/merge', protect, mergeCart) 
export default router;