import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    image: String,
    price: Number,
    size: String,
    qty: { type: Number, default: 1 }
  }]
});

export default mongoose.model('Cart', cartSchema);