// frontend/src/pages/Home.jsx

import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products?limit=8")
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white p-10">
      <section className="relative h-96 sm:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1713586573817-12d4f123cbec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="New Collection"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative text-center px-6 max-w-5xl mx-auto z-10">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold opacity-80 tracking-tight text-white drop-shadow-2xl leading-tight">
            New Collection
          </h1>
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-white/90 font-light leading-relaxed drop-shadow-lg">
            Timeless pieces crafted with precision and passion.
          </p>
          <a
            href="/products"
            className="inline-block md:mt-30 sm:mt-12 px-10 py-5 border-2  border-white text-red-300 font-medium uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            Shop Now
          </a>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">
        <div className="text-center mb-16 sm:mb-20 space-y-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black">
            Featured Products
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 font-light">
            Curated just for you
          </p>
        </div>

        <div className="m-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-14 justify-center">
          {loading
            ? [...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl aspect-square mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded w-4/5 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/5"></div>
                </div>
              ))
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>

        {!loading && products.length > 0 && (
          <div className="text-center mt-20 sm:mt-24">
            <a
              href="/products"
              className="inline-block  p-4 border-2 text-black font-medium uppercase tracking-wider text-sm hover:bg-gray-400 hover:text-black transition-all duration-300"
            >
              View All Products
            </a>
          </div>
        )}
      </section>

      <section className="bg-yellow-700 mt-10 text-black py-12 sm:py-32 text-center">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Free Shipping on All Orders
        </h3>
        <p className="text-lg sm:text-xl opacity-90 font-light  mx-auto leading-relaxed">
          Premium quality. Ethical production. Delivered to your door.
        </p>
      </section>
    </div>
  );
}
