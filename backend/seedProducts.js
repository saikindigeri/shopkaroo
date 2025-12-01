import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
dotenv.config();

const products = [
  { name: "Classic White Tee", price: 799, image: "https://images.unsplash.com/photo-1622445272461-c6580cab8755?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["S","M","L","XL"], description: "Premium cotton" },
  { name: "Black Hoodie", price: 1899, image: "https://images.unsplash.com/photo-1561151593-7059b6b4ff57?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["M","L","XL"], description: "Warm & cozy" },
  { name: "Denim Jacket", price: 3499, image: "https://images.unsplash.com/photo-1614699745279-2c61bd9d46b5?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["S","M","L"], description: "Vintage wash" },
  { name: "Floral Summer Dress", price: 2299, image: "https://plus.unsplash.com/premium_photo-1723914108893-ac3047a4f1df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["XS","S","M"], description: "Light & breezy" },
  { name: "Slim Fit Jeans", price: 1999, image: "https://images.unsplash.com/photo-1738618806206-b2cb6331193c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["30","32","34","36"], description: "Stretch denim" },

  // Newly Added
  { name: "Red Checked Shirt", price: 1299, image: "https://plus.unsplash.com/premium_photo-1663036230428-a5f1f910d167?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["M","L","XL"], description: "Soft cotton fabric" },
  { name: "Oversized Graphic Tee", price: 999, image: "https://plus.unsplash.com/premium_photo-1690038781199-1c75a1e406c0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["L","XL"], description: "Trendy streetwear" },
  { name: "Elegant Black Gown", price: 4599, image: "https://images.unsplash.com/photo-1761574028442-20c1d6131eb5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["S","M","L"], description: "Evening wear" },
  { name: "High Waist Trousers", price: 1799, image: "https://images.unsplash.com/photo-1648111145274-a3c1b196f2d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["S","M","L"], description: "Soft stretch" },
  { name: "Sports Joggers", price: 1399, image: "https://images.unsplash.com/photo-1679216129573-0aeac687d8f6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["M","L","XL"], description: "Athleisure comfort" },

  { name: "Kids Cartoon Tee", price: 499, image: "https://images.unsplash.com/photo-1625853995023-a6172d5b82a5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Kids", sizes: ["3-4","5-6","7-8"], description: "Printed casual wear" },
  { name: "Kids Denim Shorts", price: 699, image: "https://plus.unsplash.com/premium_photo-1661549594441-574097be10ff?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Kids", sizes: ["5-6","7-8","9-10"], description: "Durable denim" },
  { name: "Women Yoga Leggings", price: 1199, image: "https://images.unsplash.com/photo-1596641211273-938aeaf926a9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["S","M","L"], description: "High stretch" },
  { name: "Puffer Jacket", price: 3899, image: "https://plus.unsplash.com/premium_photo-1707928725311-45834acfc6bc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["M","L","XL"], description: "Winter essential" },
  { name: "Silk Scarf", price: 899, image: "https://images.unsplash.com/photo-1677478863154-55ecce8c7536?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["Free"], description: "Soft silk blend" },

  { name: "Women's Sandals", price: 1599, image: "https://images.unsplash.com/photo-1603290939650-b553549a5739?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["5","6","7","8"], description: "Comfort footbed" },
  { name: "Men's Sneakers", price: 2899, image: "https://images.unsplash.com/photo-1517389274750-a758d503b69e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["8","9","10","11"], description: "Everyday comfort" },
  { name: "Kids Hoodie", price: 999, image: "https://plus.unsplash.com/premium_photo-1698305283034-6fc20d4bf946?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Kids", sizes: ["5-6","7-8","9-10"], description: "Warm fleece" },
  { name: "Women's Crop Top", price: 799, image: "https://plus.unsplash.com/premium_photo-1689371956254-1a8adca96b78?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["XS","S","M"], description: "Trendy look" },
  { name: "Men’s Formal Shirt", price: 1499, image: "https://plus.unsplash.com/premium_photo-1661266906739-429a936075cd?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["M","L","XL"], description: "Office essential" },

  { name: "Women’s Cardigan", price: 1899, image: "https://images.unsplash.com/photo-1597582927786-bae43be837a0?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["S","M","L"], description: "Soft wool blend" },
  { name: "Cargo Pants", price: 1699, image: "https://images.unsplash.com/photo-1584302052153-623ee529b70c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["30","32","34"], description: "Utility pockets" },
  { name: "Kids Party Dress", price: 1299, image: "https://plus.unsplash.com/premium_photo-1693242804074-20a78966f4e6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Kids", sizes: ["4-5","6-7","8-9"], description: "Elegant & cute" },
  { name: "Women's Handbag", price: 2499, image: "https://images.unsplash.com/photo-1691480250099-a63081ecfcb8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["Free"], description: "Spacious design" },
  { name: "Men's Leather Belt", price: 699, image: "https://images.unsplash.com/photo-1664285612706-b32633c95820?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["Free"], description: "Genuine leather" },

  { name: "Women’s Heels", price: 1999, image: "https://plus.unsplash.com/premium_photo-1723780857712-2f0f5c99a463?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["5","6","7","8"], description: "Elegant style" },
  { name: "Men’s Track Jacket", price: 2099, image: "https://images.unsplash.com/photo-1610870156989-4bbb7d63fd0a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["M","L","XL"], description: "Lightweight sporty" },
  { name: "Women's Hoodie", price: 1699, image: "https://images.unsplash.com/photo-1641735563696-020765b93506?q=80&w=652&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Women", sizes: ["S","M","L"], description: "Soft brushed fleece" },
  { name: "Kids Joggers", price: 799, image: "https://images.unsplash.com/photo-1742994034976-caca92e871da?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Kids", sizes: ["5-6","7-8","9-10"], description: "Comfort stretch" },
  { name: "Men’s Polo Tee", price: 999, image: "https://images.unsplash.com/photo-1666358086199-975d5538947c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Men", sizes: ["M","L","XL"], description: "Soft breathable fabric" }
];


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("25+ Products Seeded Successfully!");
    process.exit();
  })
  .catch(err => console.log(err));