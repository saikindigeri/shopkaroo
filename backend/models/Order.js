import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    price: Number,
    size: String,
    qty: Number
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);