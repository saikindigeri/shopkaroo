import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

// CORS — Works in BOTH development & production
const allowedOrigins = [
  'https://shopkaroo-coral.vercel.app',  // Your Vercel frontend
  'http://localhost:5173',               // Local dev
  'http://localhost:3000',               // Just in case
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow tools like Postman (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked: ' + origin));
    }
  },
  credentials: true,  // REQUIRED for cookies & auth
}));

// Or even simpler (recommended):
// app.use(cors({
//   origin: true,     // Reflects the request origin (perfect for single frontend)
//   credentials: true
// }));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));