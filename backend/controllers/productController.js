import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const { search, category, size, minPrice, maxPrice, page = 1, limit = 12 } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  if (category && category !== 'All') query.category = category;
  if (size) query.sizes = size;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  res.json({
    products,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page)
  });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};