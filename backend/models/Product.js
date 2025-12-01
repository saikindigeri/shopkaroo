import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  sizes: [{ type: String }],
  stock: { type: Number, default: 100 }
});

export default mongoose.model('Product', productSchema);